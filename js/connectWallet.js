

function getWeb3() {
	return new Web3(window.ethereum); // web3js就是你需要的web3实例
}
function getEth() {
	return getWeb3().eth;
}

	
var abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

if (typeof window.ethereum !== 'undefined') {
	
	// console.log(getWeb3())
	// console.log(window.ethereum);
	var walletId = ethereum.selectedAddress, ethWei = 0.01;
	var netVer = window.ethereum.networkVersion;
	var address = '0x65aF2dcE9694393496EE7568eeE92660116D5ae6';  //测试
	//var address = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';  //正式
	
	
	// 监听账户变更事件
	ethereum.on('accountsChanged', function (accounts) {
		if (accounts.length > 0) walletId = accounts[0];
		console.log(['accountsChanged', accounts]);
		
	});

	
	// 监听网络变更事件
	ethereum.autoRefreshOnNetworkChange = false;
	ethereum.on('networkChanged', function (netVer) {
		if (window.location.href.indexOf('bazhuayu.io') == -1){
			if(netVer != '97'){
				window.ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainId: '0x61',
							chainName: 'bsctestnet',
							nativeCurrency: {
								name: 'BNB',
								symbol: 'BNB',
								decimals: 18
							},
							rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"],
							blockExplorerUrls: ['https://testnet.bscscan.com']
						}
					]
				});
			}
		}else{
			if(netVer[0]!='56'){
				window.ethereum.request({
					method:'wallet_addEthereumChain',
					params:[
						{
							chainId:'0x38',chainName:'Binance Smart Chain Mainnet',     //如果是切换测试网 就 填 测试网 的RPC配置
							nativeCurrency:{name:'BNB',symbol:'bnb',decimals:18},
							rpcUrls:["https://bsc-dataseed1.ninicoin.io","https://bsc-dataseed1.defibit.io","https://bsc-dataseed.binance.org"],
							blockExplorerUrls:['https://bscscan.com/']
						}
					]
				})
				
			}
		}
		
		
	})
	
}



// 请求钱包授权，并得到当前使用的钱包地址，ES6
$(".metamask").click(function(e){
	
	if (typeof window.ethereum !== 'undefined') {
	  
		window.ethereum.enable().then(function (accounts) {
			loading();
			
			if(window.ethereum&&window.ethereum.isConnected()){
				document.cookie="isConnect=true";
			};
			if (window.location.href.indexOf('bazhuayu.io') == -1) {
				if(netVer!='97'){
					window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [
							{
								chainId: '0x61',
								chainName: 'bsctestnet',
								nativeCurrency: {
									name: 'BNB',
									symbol: 'BNB',
									decimals: 18
								},
								rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"],
								blockExplorerUrls: ['https://testnet.bscscan.com']
							}
						]
					});	
				}
			} else {
				if(netVer!='56'){
					window.ethereum.request({
						method:'wallet_addEthereumChain',
						params:[
							{
											chainId:'0x38',chainName:'Binance Smart Chain Mainnet',     //如果是切换测试网 就 填 测试网 的RPC配置
											nativeCurrency:{name:'BNB',symbol:'bnb',decimals:18},
											rpcUrls:["https://bsc-dataseed1.ninicoin.io","https://bsc-dataseed1.defibit.io","https://bsc-dataseed.binance.org"],
								blockExplorerUrls:['https://bscscan.com/']
							}
						]
					})
					
				}
			}
			
			walletId = accounts[0];
			console.log(['enable', accounts]);
			var data = {
				address:accounts[0],
				walletType:'METAMASK'
			}
			
			$.ajax({
				url:base_url+'/v2/user/wallet/bind',
				type: 'POST',
				contentType: 'application/json',
				dataType: 'json',
				data:JSON.stringify(data),
				success:function(res){
					loadingHide();
					if(res.code==0){
						success('連接成功',1800);
						setTimeout(function(){
							window.location.href = document.referrer;
						},1800);
					}else{
						// error('連接失敗',1800);
					}
					// console.log(res);
				}
			});
			
			
			
		}).catch(function (reason) {
			console.log(['enable.error', reason])
				console.log(reason === "User rejected provider access")
		})
		  
	  
	} else {
	  // 处理用户没安装的情况， 比如显示一个消息
	  // 告诉他们要安装 MetaMask 来使用我们的应用
		alert('請使用任意錢包Dapp中自帶的瀏覽器訪問 bazhuayu.io，則可成功連接錢包。或請使用電腦，通過瀏覽器的錢包插件連接錢包。');
	}
	
	
});