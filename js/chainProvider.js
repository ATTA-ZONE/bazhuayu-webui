var a={};
!function(W){
	W.CHAIN={
		VERSION:'20210406',
		WALLET:{
			__wallet__:"__wallet__", // 写活 cookie名称
			provider: function() {
				var th=W.CHAIN.WALLET;
				var t=cookie(th.__wallet__),wallet=th[t];
				if (wallet){
					return wallet.provider();
				} else {
					console.log('cookie does not exist');
					return null;
				}
			},

			// 监听账户变更事件
			accountsChangedAssign: function(fnc) {
				var th=W.CHAIN.WALLET;
				// console.log('accountsChangedAssign', th);
				th.provider().on('accountsChanged', function(accounts){
					  fnc(accounts)
				});
			  },

			networkChangedAssign: function(fnc) {
				var th=W.CHAIN.WALLET;
				// console.log('networkChangedAssign', th);
				th.provider().on('chainChanged', function (netVer) {
					if (typeof(netVer)=='string') {netVer=Web3.utils.hexToNumber(netVer);}
					fnc(netVer);
				})
			},

			_errorHandleWrapper: function(func) {
				return async function(...args) {
					var th=W.CHAIN.WALLET;
					// console.log('_errorHandleWrapper', func.name);
					try {return await func(...args)} catch(error) {console.log(func.name, error)}
				};
			},
			

			//isUnlocked: g_errorHandleWrapper(CHAIN.WALLET.__isUnlocked),
			// isUnlocked: CHAIN.WALLET._errorHandleWrapper,
			__isUnlocked: async function() {
				var th=W.CHAIN.WALLET;
				var ads = arguments[0];
				// console.log('__isUnlocked', th);
				var res = await th.provider().request({ method: 'eth_accounts' });
        		if (res.length > 0) {
					if (ads) {return res.indexOf(ads)!=-1} else {return true}
				} else {
					return false
				}
			},

			//accounts: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.__accounts),
			__accounts: async function() {
				var th=W.CHAIN.WALLET;
				// console.log('__accounts', th);
				var res =  await th.provider().request({ method: 'eth_accounts'});
				return res;
			},

			//chainId: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.__chainId),
			__chainId: async function() {
				var th=W.CHAIN.WALLET;
				// console.log('__chainId', th);
				var res =  await th.provider().request({ method: 'eth_chainId'});
				if (typeof(res)=='string') {res=Web3.utils.hexToNumber(res);}
				return res;
			},

			//connect: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.__connect),
			__connect: async function() {
				var t=arguments[0];
				var th=W.CHAIN.WALLET;
				if (t=='') {
					t = cookie(th.__wallet__);
				}
				// console.log('__connect', th);
				var wallet=th[t];
				window.debug&&console.log('connect', t, wallet);
				if (wallet) {
					if (cookie(th.__wallet__)&&(cookie(th.__wallet__)!=t)){
						var oldWallet = th[cookie(th.__wallet__)];
						await oldWallet.__disconnect();
					}
					
					cookie(th.__wallet__, wallet.name);

					var res = await wallet.inits();
					return res;
				} else {
					console.log(t + ' is not supported.')
				}
			},

			__switchRPCSettings: async function() {
				var chId=arguments[0];
				var th=W.CHAIN.WALLET;
				var curId=await th.__chainId();
				if (chId!=curId) {
					var t=cookie(th.__wallet__);
					var wallet=th[t];
					var res = await wallet.__switchRPCSettings(chId)
					return res;
				} else{ return True;}
			},

			__walletWatchAsset: async function() {
				var assetRefer = arguments[0];
				var th=W.CHAIN.WALLET;
				var chId= await th.__chainId();
				var t=cookie(th.__wallet__);
				var wallet=th[t];
				var res = await wallet.__walletWatchAsset(assetRefer, chId)
				return res;
			},

			__disconnect: async function() {
				var th=W.CHAIN.WALLET;
				var t=cookie(th.__wallet__);
				var wallet=th[t];
				var res = await wallet.__disconnect();
				return res;
			},


			isConnected: function(t) {
				var th=W.CHAIN.WALLET;
				var wallet=th[t];
				if(wallet){
					return wallet.isConnected();
				} else{
					console.log(t + ' is not supported.')
				}
			},

			MetaMask:{
				name:'MetaMask',
				inits: async function() {
					var th=W.CHAIN.WALLET;
					var th1=W.CHAIN.WALLET.MetaMask;
					var res = await th1.__enable();
					th1.provider().autoRefreshOnNetworkChange=false;
					th.accountsChangedAssign(function(accounts) { console.log(accounts)})
					th.networkChangedAssign(function(netVer) { console.log(netVer)})
					return res
				},

				//metamask 安装即可
				isConnected: function() {
					var th1=W.CHAIN.WALLET.MetaMask;
					return th1.provider()&&th1.provider().isConnected();
				},

				provider: function() {
					// console.log('MetaMask provider called');
					return window.ethereum;
				},

				//enable: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.__enable),
				__enable: async function() {
					var th1=W.CHAIN.WALLET.MetaMask;
					// console.log('__enable', th);
					var res = await th1.provider().request({ method: 'eth_requestAccounts' });
					return res;
				},



				// switchRPCSettings: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.MetaMask.__switchRPCSettings),
				__switchRPCSettings: async function() {
					var th1=W.CHAIN.WALLET.MetaMask;
					var chainId = arguments[0];
					params_dict = {
						chainId: RPCSetting[chainId]['CHAIN_ID_HEX'],
						chainName: RPCSetting[chainId]['CHAIN_NAME'],
						nativeCurrency:{
							name: RPCSetting[chainId]['symbol'],
							symbol: RPCSetting[chainId]['symbol'],
							decimals: 18},
							rpcUrls: [RPCSetting[chainId]['RPC_URL']],
							blockExplorerUrls:[RPCSetting[chainId]['ETHERSCAN_URL']]
					}; 
					var res = await th1.provider().request({
						method:'wallet_addEthereumChain',
						params: params_dict
					});
					return res;
				},

				// wallet_watchAsset: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.MetaMask.__wallet_watchAsset),
				__walletWatchAsset: async function() {
					var th1=W.CHAIN.WALLET.MetaMask;
					var assetRefer = arguments[0], chainId = arguments[1];
					console.log(assetRefer,chainId);
					params_dict = {
						type: contractSetting[assetRefer]['interfaceType'],
  						options: {
							//type: contractSetting[assetRefer]['interfaceType'],
    						address: contractSetting[assetRefer][chainId].address,
    						symbol: contractSetting[assetRefer][chainId].symbol,
    						decimals: contractSetting[assetRefer][chainId].decimals,
    						image: "https://foo.io/token-image.svg",
  						}
					};
					var res = await th1.provider().request({
						method:'wallet_watchAsset',
						params: params_dict
					});
					if (res!=-1) {return res} else {
						var error = new Error('Fail to add asset');
						error.code = 4001;
						throw error;
					}
				},

				__disconnect: async function() {
					var th=W.CHAIN.WALLET;
					cookie(th.__wallet__, null);
					//console.log('__disconnect', 'MetaMask');
				}

			},
			WalletConnect:{
				name:'WalletConnect',
				BRIDGE_API:'https://bridge.walletconnect.org',
				__provider:null,
				inits: async function() {
					var th=W.CHAIN.WALLET;
					var th1=W.CHAIN.WALLET.WalletConnect;
					var res = '';
					try {
						res = await th1.__enable();
						th1.provider().removeAllListeners('disconnect');
						th1.provider().removeAllListeners('accountsChanged');
						th1.provider().removeAllListeners('chainChanged');
						th1.provider().on("disconnect", (code, reason) => {
							console.log('disconnect', code, reason);
							th1.__provider=null;
						});
						th.accountsChangedAssign(function(accounts) { console.log(accounts)});
						th.networkChangedAssign(function(netVer) { console.log(netVer)});
					} catch(err){
						console.log(err);
						th1.__provider = null;
					}
					return res
				},

				isConnected: function() {
					var th1=W.CHAIN.WALLET.WalletConnect;
					return th1.provider().connector.connected;
				},
	
				provider: function() {
					var th1=W.CHAIN.WALLET.WalletConnect;
					if(!th1.__provider){
						const WalletConnectProvider = window.WalletConnectProvider.default;
						th1.__provider = new WalletConnectProvider({ 
							rpc:{
								1: RPCSetting[1]['RPC_URL'],
								3: RPCSetting[1]['RPC_URL'],
								4: RPCSetting[1]['RPC_URL'],
								56: RPCSetting[56]['RPC_URL'],
								97: RPCSetting[97]['RPC_URL'],
								128: RPCSetting[128]['RPC_URL'],
								256: RPCSetting[256]['RPC_URL'],
							}, 
							bridge:th1.BRIDGE_API });
					}
					return th1.__provider;
				},

				//enable: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.__enable),
				__enable: async function() {
					var th1=W.CHAIN.WALLET.WalletConnect;

					if (th1.__provider&&th1.__provider.connector.connected==false) {
						th1.__provider = null;
					}

					th1.provider().chainId=null;
					// console.log('__enable', th);
					var res = await th1.provider().enable();
					return res
				},

				// switchRPCSettings: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.MetaMask.__switchRPCSettings),
				__switchRPCSettings: async function() {
					// var th1=W.CHAIN.WALLET.WalletConnect;
					// var chainId = arguments[0];
					// params_dict = {
					// 	chainId: RPCSetting[chainId]['CHAIN_ID_HEX'],
					// 	chainName: RPCSetting[chainId]['CHAIN_NAME'],
					// 	nativeCurrency:{
					// 		name: RPCSetting[chainId]['symbol'],
					// 		symbol: RPCSetting[chainId]['symbol'],
					// 		decimals: 18},
					// 		rpcUrls: [RPCSetting[chainId]['RPC_URL']],
					// 		blockExplorerUrls:[RPCSetting[chainId]['ETHERSCAN_URL']]
					// }; 
					// var res = await th1.provider().request({
					// 	method:'wallet_addEthereumChain',
					// 	params:params_dict
					// });
					// return res;
				},

				// wallet_watchAsset: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.MetaMask.__wallet_watchAsset),
				__walletWatchAsset: async function() {
					// var th1=W.CHAIN.WALLET.WalletConnect;
					// var assetRefer = arguments[0], chainId = arguments[1];
					// console.log(assetRefer,chainId);
					// params_dict = {
					// 	type: contractSetting[assetRefer]['interfaceType'],
  					// 	options: {
    				// 		address: contractSetting[assetRefer][chainId].address,
    				// 		symbol: contractSetting[assetRefer][chainId].symbol,
    				// 		decimals: contractSetting[assetRefer][chainId].decimals,
    				// 		image: null,
  					// 	}
					// };
					// var res = await th1.provider().request({
					// 	method:'wallet_watchAsset',
					// 	params:params_dict
					// });
					// if (res!=-1) {return res} else {
					// 	var error = new Error('Fail to add asset');
					// 	error.code = 4001;
					// 	throw error;
					// }
				},

				__disconnect: async function() {
					var th1=W.CHAIN.WALLET.WalletConnect;
					await th1.__provider.disconnect();
					var th=W.CHAIN.WALLET;
					cookie(th.__wallet__, null);
				}
			},
		},
	};

	W.CHAIN.WALLET.isUnlocked = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__isUnlocked);
	W.CHAIN.WALLET.accounts = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__accounts);
	W.CHAIN.WALLET.chainId = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__chainId);
	W.CHAIN.WALLET.connect = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__connect);
	W.CHAIN.WALLET.switchRPCSettings = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__switchRPCSettings);
	W.CHAIN.WALLET.walletWatchAsset = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__walletWatchAsset);
	W.CHAIN.WALLET.disconnect = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__disconnect);

	W.CHAIN.WALLET.MetaMask.switchRPCSettings = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.MetaMask.__switchRPCSettings);
	W.CHAIN.WALLET.MetaMask.walletWatchAsset = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.MetaMask.__walletWatchAsset);
	W.CHAIN.WALLET.MetaMask.enable = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.MetaMask.__enable);
	W.CHAIN.WALLET.MetaMask.disconnect = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.MetaMask.__disconnect);  // 无效

	W.CHAIN.WALLET.WalletConnect.switchRPCSettings = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.MetaMask.__switchRPCSettings);  // 无效
	W.CHAIN.WALLET.WalletConnect.walletWatchAsset = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.MetaMask.__walletWatchAsset);  // 无效
	W.CHAIN.WALLET.WalletConnect.enable = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.WalletConnect.__enable);
	W.CHAIN.WALLET.WalletConnect.disconnect = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.WalletConnect.__disconnect);


}(windows);
//a.CHAIN.WALLET.connect('WalletConnect').then(function(res){console.log(res)}); 

// CHAIN.WALLET.disconnect(), 断开 和 数字钱包的连接；用户 切换





