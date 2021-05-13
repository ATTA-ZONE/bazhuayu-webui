function mangeWalletCharge(res, accounts) {
	if (res.data.address == accounts[0]) {
		var cwallet = res.data.cwallet; //收款钱包 地址
		var web3 = getEth();
		var contract = new web3.Contract(abi, address);
		var amount = $('.modify-ipt input').val().trim();
				if (amount == '') {
					amount = '0';
				}
		var num = getWeb3().utils.toWei(amount, 'ether');
		contract.methods.balanceOf(accounts[0]).call() //查询余额
			.then(function (res) {

				if (Number(res) >= Number(num)) {
					setTimeout(function () {
						contract.methods.transfer(cwallet, num).send({ //转账
								from: accounts[0]
							})
							.on('transactionHash', function (hash) {
								console.log(['hash', hash]);
								success('充值成功', 1800);
								setTimeout(function () {
									tips('預計10秒內到賬');

									setTimeout(function () {
										window.location.reload();
									}, 1500)
								}, 1800);
							}).on('receipt', function (receipt) {
								// console.log(['receipt',receipt])
							}).on('error', function (err) {
								// console.log(['error',err])
							});
					}, 500)
				} else {

					tips('餘額不足');

				}
			});

	} else {

		tips('登入帳戶地址與綁定地址不一致，請切換帳戶或重新綁定');

	}
}

$(function () {


	$.ajax({
		url: base_url + '/v2/user/wallet/info',
		success: function (res) {
			console.log(res)
			if (res.code == 0) {
				$('.usdt-rest').text(res.data.usdtRest + ' BUSD');
				if (res.data.cardNo == null || res.data.cardNo == '') {
					$('.cardNo').text('---');
					$('.hideenbtn').hide();
					$('.hideenbtn2').show();
				} else {
					$('.cardNo').text(res.data.cardNo);
					$('.hideenbtn').show();
					$('.hideenbtn2').hide();
				};
				if (getCookie('isConnect')=='true') {
					if (res.data.walletType == "METAMASK") {
						$('.walletconnect-wallet').hide();
						$('.metamask-wallet').show();
						$('.walletconnect-wallet').removeClass('wallet-li');
						$('.metamask-wallet').addClass('wallet-li');
						if (res.data.address == null || res.data.address == '') {
							$('.metamask-wallet .wallet-address').text('---')
						} else {
							$('.metamask-wallet .wallet-address').text(res.data.address)
						}
					} else {
						$('.walletconnect-wallet').show();
						$('.metamask-wallet').hide();
						$('.walletconnect-wallet').addClass('wallet-li');
						$('.metamask-wallet').removeClass('wallet-li');
						if (res.data.address == null || res.data.address == '') {
							$('.walletconnect-wallet .wallet-address').text('---')
						} else {
							$('.walletconnect-wallet .wallet-address').text(res.data.address)
						}
					}
				}else{
					$(".nowallet-wallet").show();
					$(".walletconnect-wallet").hide();
					$('.metamask-wallet').hide();
				}

			}
		}
	});



	var web3 = getEth();
	var contract = new web3.Contract(abi, address);
	// console.log(contract);

	//发送交易请求
	$('.modify-btn-active').click(function (e) {
		var tit = $('.modify-tit').data('type');

		if (tit == 'add') {
			var wallet_type = $('.wallet-li').data('wallet');

			var text = $('.modify-ipt-tit').text();
			if (text == '請連接錢包') {
				window.location.href="connectWallet.html"
			}else{
				if (wallet_type == 'wallectconnect') {
	
					var provider = CHAIN.WALLET.WalletConnect.provider();
					var address = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
					// var web3 = getWeb3();
	
					var contract = new web3.Contract(abi, address);
					console.log(contract)
	
					CHAIN.WALLET.WalletConnect.provider().enable()
						.then(function (res) {
							console.log(res);
	
	
	
						});
	
	
					const web3_p = new Web3(provider);
	
					// Subscribe to accounts change
					provider.on("accountsChanged", (accounts) => {
						console.log(accounts);
					});
	
					// Subscribe to chainId change
					provider.on("chainChanged", (chainId) => {
						console.log(chainId);
					});
	
					// Subscribe to session disconnection
					provider.on("disconnect", (code, reason) => {
						console.log(code, reason);
					});
	
					// contract_provider.methods.balanceOf('0xac1aa8a6c35ff3854b60c2f6bf64de3d8616ef24').call()
					// .then(function(res){
					// 	console.log(res)
					// })
					const accounts = web3_p.eth.getAccounts();
					console.log(accounts)
	
					// console.log(web3Provider)
	
					var dd = CHAIN.WALLET.WalletConnect.isConnected();
					console.log(dd);
	
				} else if (wallet_type == 'metamask') {
					debugger
					var amount = $('.modify-ipt input').val().trim();
					if (amount == '') {
						amount = '0';
					}
					// console.log(amount)
	
					var num = getWeb3().utils.toWei(amount, 'ether');
	
					if (typeof window.ethereum !== 'undefined') {
	
						$.ajax({
							url: base_url + '/v2/user/wallet/simpleInfo',
							success: function (res) {
								// console.log(res)
								if (res.code == 0) {
	
									if (res.data.address == null || res.data.address == '') {
										tips('請連接錢包');
										setTimeout(function () {
											window.location.reload();
										}, 2000);
									} else { //绑定的地址登录的账户地址一致
										loading();
										window.ethereum.enable().then(function (accounts) {
	
	
											if (window.ethereum && window.ethereum.isConnected()) {
												document.cookie = "isConnect=true";
											}
	
											setTimeout(function () {
												loadingHide();
											}, 1000);
											if (window.location.href.indexOf('bazhuayu.io') == -1) {
												window.ethereum.request({
													method: 'wallet_addEthereumChain',
													params: [{
														chainId: '0x61',
														chainName: 'bsctestnet',
														nativeCurrency: {
															name: 'BNB',
															symbol: 'BNB',
															decimals: 18
														},
														rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"],
														blockExplorerUrls: ['https://testnet.bscscan.com']
													}]
												}).then(function () {
													mangeWalletCharge(res, accounts)
												})
											} else {
												window.ethereum.request({
														method: 'wallet_addEthereumChain',
														params: [{
															chainId: '0x38',
															chainName: 'Binance Smart Chain Mainnet', //如果是切换测试网 就 填 测试网 的RPC配置
															nativeCurrency: {
																name: 'BNB',
																symbol: 'bnb',
																decimals: 18
															},
															rpcUrls: ["https://bsc-dataseed1.ninicoin.io", "https://bsc-dataseed1.defibit.io", "https://bsc-dataseed.binance.org"],
															blockExplorerUrls: ['https://bscscan.com/']
														}]
													})
													.then(function () {
														mangeWalletCharge(res, accounts)
													});
											}
										});
									}
								}
							}
						})
	
					} else {
	
						alert('請使用任意錢包Dapp中自帶的瀏覽器訪問 bazhuayu.io，則可成功連接錢包。或請使用電腦，通過瀏覽器的錢包插件連接錢包。');
	
					}
				};
			}

		} else if (tit == 'dwallet') {
			$.ajax({
				url: base_url + '/v2/user/wallet/delete',
				type: 'POST',
				dataType: 'json',
				success: function (res) {
					if (res.code == 0) {
						success('删除成功', 1800);
						document.cookie = "isConnect=false";
						setTimeout(function () {
							window.location.reload();
						}, 1800)
					}
					// console.log(res);
				}
			});

		} else if (tit == 'withdraw') {
			var amount = $('.modify-ipt input').val().trim();
			var ye = $('.usdt-rest').text().split(' ')[0];
			var text = $('.modify-ipt-tit').text();
			if (text == '請連接錢包') {
				window.location.href="connectWallet.html"
				// tips('請連接錢包');

			} else {
				if (amount > ye) {
					tips('餘額不足');
				} else if (amount == '') {
					tips('請填寫提現金額');
				} else {
					loading();
					$.ajax({
						url: base_url + '/v2/user/wallet/withDraw',
						type: 'POST',
						dataType: 'json',
						data: {
							usdtCount: amount
						},
						success: function (res) {
							setTimeout(function () {
								loadingHide();
							}, 1000);

							if (res.code == 0) {
								setTimeout(function () {
									// success('Success',1800);
									tips('提款申請已收到，請等待');
									setTimeout(function () {
										window.location.reload();
									}, 2000);
								}, 1000)
							} else {
								error('提款失敗', 1800);
							}
						}
					})



				}

			}

		} else if (tit == 'card') {

			console.log(1)
		}
	});


})