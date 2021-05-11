


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


// 请求钱包授权，并得到当前使用的钱包地址，ES6
$(".metamask").click(function(e){
	
	if (typeof window.ethereum !== 'undefined') {
	  
		window.ethereum.enable().then(function (accounts) {
			loading();
			
			if(window.ethereum&&window.ethereum.isConnected()){
				document.cookie="isConnect=true";
			};
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
			});
			
			walletId = accounts[0];
			console.log(['enable', accounts]);
			// var data = {
			// 	address:accounts[0],
			// 	walletType:'METAMASK'
			// }
			$('.wallet-address').text(accounts[0]);
			loadingHide();
			// $.ajax({
			// 	url:base_url+'/v2/user/wallet/bind',
			// 	type: 'POST',
			// 	contentType: 'application/json',
			// 	dataType: 'json',
			// 	data:JSON.stringify(data),
			// 	success:function(res){
			// 		loadingHide();
			// 		if(res.code==0){
			// 			success('連接成功',1800);
			// 			setTimeout(function(){
			// 				window.location.href = document.referrer;
			// 			},1800);
			// 		}else{
			// 			// error('連接失敗',1800);
			// 		}
			// 		// console.log(res);
			// 	}
			// });
			
			
			
		}).catch(function (reason) {
			console.log(['enable.error', reason])
				console.log(reason === "User rejected provider access")
		})
		  
	  
	} else {
	  // 处理用户没安装的情况， 比如显示一个消息
	  // 告诉他们要安装 MetaMask 来使用我们的应用
		alert('您未安装MetaMask,请到浏览器插件市场搜索安装');
	}
	
	
});

$(function(){
	
	
	$.ajax({
		url:base_url+'/v2/user/wallet/info',
		success:function(res){
			// console.log(res)
			if(res.code==0){
				$('.usdt-rest').text(res.data.usdtRest+' BUSD');
				if(res.data.address==null||res.data.address==''){
					$('.wallet-address').text('---');
				}else{
					$('.wallet-address').text(res.data.address);
					$(".metamask").hide();
				}
			}
		}
	})
	
	
	var web3 = getEth();
	var contract = new web3.Contract(abi,address);
	// console.log(contract);
	
	//发送交易请求
	$('.modify-btn-active').click(function(e) {
		var tit = $('.modify-tit').data('type');
		
		if(tit=='add'){
			var amount = $('.modify-ipt input').val().trim();
			if(amount==''){
				amount = '0';
			}
			// console.log(amount)
			
			var num = getWeb3().utils.toWei(amount,'ether');
			
			if(typeof window.ethereum !== 'undefined'){
				
				$.ajax({
					url:base_url+'/v2/user/wallet/simpleInfo',
					success:function(res){
						// console.log(res)
						if(res.code==0){
							
							if(res.data.address==null||res.data.address==''){
								tips('請連接錢包');
								setTimeout(function(){
									window.location.reload();
								},2000);
							}else{    //绑定的地址登录的账户地址一致
								loading();
								window.ethereum.enable().then(function(accounts){
									

									if(window.ethereum&&window.ethereum.isConnected()){
										document.cookie="isConnect=true";
									}
									
									setTimeout(function(){
										loadingHide();
									},1000);
									
									//测试
									// window.ethereum.request({
									// 	method: 'wallet_addEthereumChain',
									// 	params: [
									// 		{
									// 			chainId: '0x61',
									// 			chainName: 'bsctestnet',
									// 			nativeCurrency: {
									// 				name: 'BNB',
									// 				symbol: 'BNB',
									// 				decimals: 18
									// 			},
									// 			rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"],
									// 			blockExplorerUrls: ['https://testnet.bscscan.com']
									// 		}
									// 	]
									// })
									
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
									.then(function(){
										if(res.data.address==accounts[0]){
											var cwallet = res.data.cwallet;   //收款钱包 地址
											contract.methods.balanceOf(accounts[0]).call()       //查询余额
											.then(function(res){
												// console.log(res);
												// console.log(num);
												
												if(Number(res)>=Number(num)){
													setTimeout(function(){
														contract.methods.transfer(cwallet, num).send({     //转账
															from:accounts[0]
														})
														.on('transactionHash', function(hash){
															console.log(['hash',hash]);
															success('充值成功',1800);
															setTimeout(function(){
																tips('預計10秒內到賬');
															
																setTimeout(function(){
																	window.location.reload();
																},1500)
															},1800);
														}).on('receipt', function(receipt){
															// console.log(['receipt',receipt])
														}).on('error',function(err){
															// console.log(['error',err])
														});
													},500)
												}else{
													
													tips('餘額不足');
													
												}
											});
											
										}else{
											
											tips('登入帳戶地址與綁定地址不一致，請切換帳戶或重新綁定');
											
										}
									});
								});
							}
						}
					}
				})
				
			}else{
				
				alert('請使用任意錢包Dapp中自帶的瀏覽器訪問 bazhuayu.io，則可成功連接錢包。或請使用電腦，通過瀏覽器的錢包插件連接錢包。');
				
			}
			
			
		}else if(tit=='dwallet'){
			$.ajax({
				url:base_url+'/v2/user/wallet/delete',
				type:'POST',
				dataType: 'json',
				success:function(res){
					if(res.code==0){
						success('删除成功',1800);
						document.cookie="isConnect=false";
						setTimeout(function(){
							window.location.reload();
						},1800)
					}
					// console.log(res);
				}
			});
			
		}else if(tit=='withdraw'){
			var amount = $('.modify-ipt input').val().trim();
			var ye = $('.usdt-rest').text().split(' ')[0];
			var text = $('.modify-ipt-tit').text();
			if(text=='請連接錢包'){
				
				tips('請連接錢包');
				
			}else{
				if(amount>ye){
					tips('餘額不足');
				}else if(amount==''){
					tips('請填寫提現金額');
				}else{
					loading();
					$.ajax({
						url:base_url+'/v2/user/wallet/withDraw',
						type:'POST',
						dataType:'json',
						data:{usdtCount:amount},
						success:function(res){
							setTimeout(function(){
								loadingHide();
							},1000);
							
							if(res.code==0){
								setTimeout(function(){
									// success('Success',1800);
									tips('提款申請已收到，請等待');
									setTimeout(function(){
										window.location.reload();
									},2000);
								},1000)
							}else{
								error('提款失敗',1800);
							}
						}
					})
					
					
					
				}
				
			}
			
		}
		
		
		
	});

	if($('.wallet-address').text() == '---'){
		$('.gh2').hide();
		$('.sc2').hide();
	}
	if($('.wallet-car').text() == '---'){
		$('.gh1').hide();
		$('.sc1').hide();
	}
})