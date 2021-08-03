var targetChainId = '';
var scansite_apiKey = '';
var scansite_base_url = '';

if (window.location.href.indexOf('bazhuayu.io') == -1) {
    targetChainId = 97;
    scansite_apiKey = '9GRF9Q9HT18PBCHQQD84N7U2MGC6I1NE27'
    scansite_base_url = 'https://api-testnet.bscscan.com'
} else {
    targetChainId = 56;
    scansite_apiKey = '';
    scansite_base_url = 'https://api.bscscan.com'
}



!function(W){
	if (!getCookie('_wallet_')) {
		setCookie('_wallet_','MetaMask')
	};
	W.CHAIN={
		VERSION:'20210406',
		WALLET:{
			__wallet__:"_wallet_", // 写活 cookie名称
			provider: function() {
				var th=W.CHAIN.WALLET;
				var t=getCookie(th.__wallet__)
				var wallet=th[t];
				if (wallet){
					return wallet.provider();
				} else {
					// var hintMessage='';
					// window.confirm(hintMessage);
					return null;
				}
			},

			// 监听账户变更事件
			accountsChangedAssign: function(fnc) {
				var th=W.CHAIN.WALLET;
				var t=getCookie(th.__wallet__),wallet=th[t];

				wallet.__accountsChangedAssign(function(accounts){
					fnc(accounts);
			  	});
			},

			networkChangedAssign: function(fnc) {
				var th=W.CHAIN.WALLET;
				var t=getCookie(th.__wallet__),wallet=th[t];

				wallet.__networkChangedAssign(function(accounts){
					fnc(accounts);
			  	});
			},

			_errorHandleWrapper: function(func) {
				return async function(...args) {
					var th=W.CHAIN.WALLET;
					try {return await func(...args)} catch(error) {console.log(func.name, error)}
				};
			},
			

			//isUnlocked: g_errorHandleWrapper(CHAIN.WALLET.__isUnlocked),
			// isUnlocked: CHAIN.WALLET._errorHandleWrapper,
			__isUnlocked: async function() {
				var th=W.CHAIN.WALLET;
				var ads = arguments[0];

				var t=getCookie(th.__wallet__);
				var wallet=th[t];
				if (th.isConnected(t)) {
					var res =  await th.provider().request({ method: 'eth_accounts'});		
				} else {
					var res =  await wallet.__enable();
				}
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
				var t=getCookie(th.__wallet__);
				var wallet=th[t];
				if (th.isConnected(t)) {
					var res = await th.provider().request({ method: 'eth_accounts'});
					return res;
				} else {
					var res =  await wallet.__enable();
					return res;
				}
				// var res =  await th.provider().request({ method: 'eth_accounts'});
				// return res;
			},

			//chainId: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.__chainId),
			__chainId: async function() {
				var th=W.CHAIN.WALLET;
				var t=getCookie(th.__wallet__);
				var wallet=th[t];
				if (th.isConnected(t)) {
					var res =  await th.provider().request({ method: 'eth_chainId'});
					if (typeof(res)=='string') {res=Web3.utils.hexToNumber(res);}
					return res;
				} else {
					await wallet.__enable();
					var res =  await th.provider().request({ method: 'eth_chainId'});
					if (typeof(res)=='string') {res=Web3.utils.hexToNumber(res);}
					return res;
				}

				
			},

			//connect: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.__connect),
			__connect: async function() {
				var t=arguments[0];
				var th=W.CHAIN.WALLET;
				var wallet=th[t];
				window.debug&&console.log('connect', t, wallet);
				if (wallet) {
					var res = await wallet.__connectInit();
					setCookie(th.__wallet__, wallet.name);
					return res;
				} else {
					console.log(t + ' is not supported.')
				}
			},

			//enable: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.__enable),
			__enable: async function() {
				var t=arguments[0];
				var th=W.CHAIN.WALLET;
				if (t==null) {
					t = getCookie(th.__wallet__);
				}
				var wallet=th[t];
				window.debug&&console.log('connect', t, wallet);
				if (wallet) {
					if (getCookie(th.__wallet__)&&(getCookie(th.__wallet__)!=t)){
						var oldWallet = th[getCookie(th.__wallet__)];
						await oldWallet.__disconnect();
					}
					
					//setCookie(th.__wallet__, wallet.name);

					var res = await wallet.__enableInit();
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
					var t=getCookie(th.__wallet__);
					var wallet=th[t];
					var res = await wallet.__switchRPCSettings(chId);
					return res;
				} else{ return True;}
			},

			__walletWatchAsset: async function() {
				var assetRefer = arguments[0];
				var th=W.CHAIN.WALLET;
				var chId= await th.__chainId();
				var t=getCookie(th.__wallet__);
				var wallet=th[t];
				var res = await wallet.__walletWatchAsset(assetRefer, chId);
				return res;
			},

			__disconnect: async function() {
				var th=W.CHAIN.WALLET;
				var t=getCookie(th.__wallet__);
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
				__enableInit: async function() {
					var th1=W.CHAIN.WALLET.MetaMask;
					var res = await th1.__enable();
					th1.__initListener();
					return res
				},

				__initListener: function() {
					var th=W.CHAIN.WALLET;
					var th1=W.CHAIN.WALLET.MetaMask;
					th1.provider().autoRefreshOnNetworkChange=false;
					th1.provider().removeAllListeners('disconnect');
					th1.provider().removeAllListeners('accountsChanged');
					th1.provider().removeAllListeners('chainChanged');
					th1.provider().on("disconnect", (code, reason) => {
						setCookie(th.__wallet__, '');
					});

					th1.__accountsChangedAssign(function(accounts) { console.log(accounts)});
					th1.__networkChangedAssign(function(netVer) { console.log(netVer)});
				},

				// 监听账户变更事件
				__accountsChangedAssign: function(fnc) {
					var th1=W.CHAIN.WALLET.MetaMask;
					th1.provider().on('accountsChanged', function(accounts){
						fnc(accounts);
					});
				},

				__networkChangedAssign: function(fnc) {
					var th1=W.CHAIN.WALLET.MetaMask;
					th1.provider().on('chainChanged', function (netVer) {
						if (typeof(netVer)=='string') {var _netVer=Web3.utils.hexToNumber(netVer);}
						fnc(_netVer);
					})
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

				__connectInit: async function() {
					var th=W.CHAIN.WALLET;
					var th1=W.CHAIN.WALLET.MetaMask;
					// console.log('__enable', th);
					await th1.provider().request({
						method: 'wallet_requestPermissions',
						params: [{ eth_accounts: {} }],
					});

					var res = await th.__accounts();

					if (getCookie(th.__wallet__)&&(getCookie(th.__wallet__)!=th1.name)){
						var oldWallet = th[getCookie(th.__wallet__)];
						await oldWallet.__disconnect();
					}

					th1.__initListener();

					return res;
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
							name: RPCSetting[chainId]['SYMBOL'],
							symbol: RPCSetting[chainId]['SYMBOL'],
							decimals: 18},
							rpcUrls: [RPCSetting[chainId]['RPC_URL']],
							blockExplorerUrls:[RPCSetting[chainId]['ETHERSCAN_URL']]
					}; 
					var res = await th1.provider().request({
						method:'wallet_addEthereumChain',
						params: [params_dict]
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
					setCookie(th.__wallet__, '');
					//console.log('__disconnect', 'MetaMask');
				}

			},
			WalletConnect:{
				name:'WalletConnect',
				BRIDGE_API:'https://bridge.walletconnect.org',
				__provider:null,
				__enableInit: async function() {
					var th1=W.CHAIN.WALLET.WalletConnect;
					var res = '';
					try {

						if (th1.provider()&&th1.__provider.connector.connected==false) {
							await th1.__disconnect();
							res = [];
						} else {
							res = await th1.__enable();
							th1.__initListener();
						}
					} catch(err){
						console.log(err);
						th1.__provider = null;
					}
					return res
				},

				__initListener: function() {
					var th=W.CHAIN.WALLET;
					var th1=W.CHAIN.WALLET.WalletConnect;
					th1.provider().removeAllListeners('disconnect');
					th1.provider().removeAllListeners('accountsChanged');
					th1.provider().removeAllListeners('chainChanged');
					th1.provider().on("disconnect", (code, reason) => {
						console.log('disconnect', code, reason);
						//th1.__provider=null;
						setCookie(th.__wallet__, '');
					});
					th1.__accountsChangedAssign(function(accounts) { console.log(accounts)});
					th1.__networkChangedAssign(function(netVer) { console.log(netVer)});
				},

				// 监听账户变更事件
				__accountsChangedAssign: function(fnc) {
					var th1=W.CHAIN.WALLET.WalletConnect;
					// console.log('accountsChangedAssign', th);
					th1.provider().on('accountsChanged', function(accounts){
						fnc(accounts);
					});
				},

				__networkChangedAssign: function(fnc) {
					var th1=W.CHAIN.WALLET.WalletConnect;
					// console.log('networkChangedAssign', th);
					th1.provider().on('chainChanged', function (netVer) {
						if (typeof(netVer)=='string') {var _netVer=Web3.utils.hexToNumber(netVer);}
						fnc(_netVer);
					})
				},


				isConnected: function() {
					var th1=W.CHAIN.WALLET.WalletConnect;
					return th1.provider().isRunning();
				},
	
				provider: function() {
					var th1=W.CHAIN.WALLET.WalletConnect;
					if(!th1.__provider){
						const WalletConnectProvider = window.WalletConnectProvider.default;
						th1.__provider = new WalletConnectProvider({ 
							rpc:{
								1: RPCSetting[1]['RPC_URL'],
								3: RPCSetting[3]['RPC_URL'],
								4: RPCSetting[4]['RPC_URL'],
								56: RPCSetting[56]['RPC_URL'],
								97: RPCSetting[97]['RPC_URL'],
								128: RPCSetting[128]['RPC_URL'],
								256: RPCSetting[256]['RPC_URL'],
							}, 
							bridge:th1.BRIDGE_API });
					}
					return th1.__provider;
				},

				__connectInit: async function() {
					var th=W.CHAIN.WALLET;
					var th1=W.CHAIN.WALLET.WalletConnect;
					console.log('__connectInit1', th1.__provider);
				
					// if (th1.provider()&&th1.__provider.connector.connected==true) {
					// 	await th1.__disconnect();
					// }

					if (getCookie(th.__wallet__)){
						console.log('__connectInit2', th1.__provider);
						var oldWallet = th[getCookie(th.__wallet__)];
						await oldWallet.__disconnect();
					}

					await th1.__disconnect();

					console.log('__connectInit2.5', th1.__provider);
					

					var res = await th1.__enable();
					th1.__initListener();
					console.log('__connectInit3', th1.__provider);

					return res;
				},


				//enable: CHAIN.WALLET._errorHandleWrapper(CHAIN.WALLET.__enable),
				__enable: async function() {
					var th1=W.CHAIN.WALLET.WalletConnect;

					th1.provider().chainId=targetChainId;
					console.log('__enable', th1.__provider);
					var res = await th1.provider().enable();
					return res;
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
					//var th=W.CHAIN.WALLET;
					var th1=W.CHAIN.WALLET.WalletConnect;
					// setCookie(th.__wallet__, '');
					await th1.provider().disconnect();
					// await th1.provider().disconnect();
					th1.__provider = null;
					
				}
			},
		},
	};

	W.CHAIN.WALLET.isUnlocked = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__isUnlocked);
	W.CHAIN.WALLET.accounts = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__accounts);
	W.CHAIN.WALLET.chainId = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__chainId);
	W.CHAIN.WALLET.enable = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__enable);
	W.CHAIN.WALLET.connect = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__connect);
	W.CHAIN.WALLET.switchRPCSettings = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__switchRPCSettings);
	W.CHAIN.WALLET.walletWatchAsset = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__walletWatchAsset);
	W.CHAIN.WALLET.disconnect = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.__disconnect);

	// W.CHAIN.WALLET.MetaMask.switchRPCSettings = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.MetaMask.__switchRPCSettings);
	// W.CHAIN.WALLET.MetaMask.walletWatchAsset = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.MetaMask.__walletWatchAsset);
	// W.CHAIN.WALLET.MetaMask.enable = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.MetaMask.__enable);
	// W.CHAIN.WALLET.MetaMask.disconnect = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.MetaMask.__disconnect);  // 无效

	// W.CHAIN.WALLET.WalletConnect.switchRPCSettings = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.MetaMask.__switchRPCSettings);  // 无效
	// W.CHAIN.WALLET.WalletConnect.walletWatchAsset = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.MetaMask.__walletWatchAsset);  // 无效
	// W.CHAIN.WALLET.WalletConnect.enable = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.WalletConnect.__enable);
	// W.CHAIN.WALLET.WalletConnect.disconnect = W.CHAIN.WALLET._errorHandleWrapper(W.CHAIN.WALLET.WalletConnect.__disconnect);

	var th=W.CHAIN.WALLET;
	var t=getCookie(th.__wallet__);
	if (t=='WalletConnect' && (th.provider().connector.connected==false)) {
		console.log('Lost WalletConnect');
		setCookie(th.__wallet__, 'MetaMask');
	} else {
	}
}(window);
//a.CHAIN.WALLET.connect('WalletConnect').then(function(res){console.log(res)}); 

// CHAIN.WALLET.disconnect(), 断开 和 数字钱包的连接；用户 切换





