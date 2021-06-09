function safeCharge(res, accounts) {
	loading();
	if (res.data.address != accounts[0]) {
		var hintMessage = "您的賬戶綁定地址與當前錢包地址不符，點擊確定會為您綁定當前錢包地址\n當前錢包地址: " + accounts[0] + " \n賬戶綁定地址: " + res.data.address;
		if (window.confirm(hintMessage)) {
			var data = {
				address: accounts[0],
				walletType: 'METAMASK'
			}

			$.ajax({
				url: base_url + '/v2/user/wallet/bind',
				type: 'POST',
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(data),
				success: function (res1) {
					if (res1.code == 0) {
						loadingHide();
						_charge(res, accounts);
					} else if (res1.code == 2001){
						loadingHide();
						window.alert('當前錢包已被綁定占有, 請更換錢包防止誤充');
					} else if (res1.code == 1011){
						loadingHide();
						window.alert('郵箱未驗證');
					} else if (res1.code == 1002){
						loadingHide();
						window.alert('登錄已失效，請重新登錄');
					} else {
						loadingHide();
						window.alert('系統錯誤');
					}
				},
				error: function (res1) {
					loadingHide();
					window.alert('網絡錯誤，無法獲取賬戶信息');
				}
			})
		} else {
			loadingHide();
		}
	} else {
		loadingHide();
		_charge(res, accounts);
	}
}

function _charge(res, accounts) {
		var cwallet = res.data.cwallet; //收款钱包 地址
		var web3 = new Web3(CHAIN.WALLET.provider());

		var chainId = '';
		CHAIN.WALLET.chainId()
			.then(function (res1) {
				chainId = web3.utils.hexToNumber(res1); 
						
				// busdAddress 供外界使用
				var busdAddress = contractSetting['busd_ERC20'][chainId].address;
				var busdABI = contractSetting['busd_ERC20']['abi'];
				
				busdContractInstance = new web3.eth.Contract(busdABI, busdAddress); 
				var amount = $('.modify-ipt input').val().trim();
						if (amount == '') {
							amount = '0';
						}
				var num = web3.utils.toWei(amount, 'ether');
				busdContractInstance.methods.balanceOf(accounts[0]).call() //查询余额
					.then(function (res2) {

						if (Number(res2) >= Number(num)) {
							setTimeout(function () {
								busdContractInstance.methods.transfer(cwallet, num).send({ //转账
										from: accounts[0]
									})
									.on('transactionHash', function (hash) {
										console.log(['hash', hash]);
										success('充值已發起,期間請勿更換錢包防止誤充', 1800);
										setTimeout(function () {
											tips('請耐心等待');

											setTimeout(function () {
												panduan();
												// window.location.reload();
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


		})

}

$(function () {
	var web3 = new Web3(CHAIN.WALLET.provider());
	$.ajax({
		url: base_url + '/v2/user/wallet/info',
		success: function (res) {
			if (res.code == 0) {
				$('.usdt-rest').text('BUSD '+res.data.usdtRest);
				if (res.data.cardNo == null || res.data.cardNo == '') {
					$('.cardNo').text('---');
					$('.hideenbtn').hide();
					$('.hideenbtn2').show();
				} else {
					$('.cardNo').text('XXXX - XXXX - XXXX - '+res.data.cardNo.slice(-4));
					$('.hideenbtn').show();
					$('.hideenbtn2').hide();
				};
				if (res.data.address) {
					if (getCookie(CHAIN.WALLET.__wallet__)=='WalletConnect') {
						$('.walletconnect-wallet').show();
						$('.metamask-wallet').hide();
						$('.connect-wallet-nothing').hide();
						$('.walletconnect-wallet').addClass('wallet-li');
						$('.metamask-wallet').removeClass('wallet-li');
						$('.walletconnect-wallet .wallet-address').text("當前綁定錢包地址："+res.data.address)
					} else {
						$('.walletconnect-wallet').hide();
						$('.metamask-wallet').show();
						$('.connect-wallet-nothing').hide();
						$('.walletconnect-wallet').removeClass('wallet-li');
						$('.metamask-wallet').addClass('wallet-li');
						$('.metamask-wallet .wallet-address').text("當前綁定錢包地址："+res.data.address)
					};							
				} else {
					$('.walletconnect-wallet').hide();
					$('.metamask-wallet').hide();
					$('.connect-wallet-nothing').show();
					$('.walletconnect-wallet .wallet-address').text('---');
					$(".nowallet-wallet").show();
				}
			} else {
				$(".nowallet-wallet").show();
				$(".walletconnect-wallet").hide();
				$(".metamask-wallet").hide();
			}

		}
	});
	
	//发送交易请求
	$('.modify-btn-active').click(function (e) {
		var tit = $('.modify-tit').data('type');


		if (tit == 'add') {
			$.ajax({
				url: base_url + '/v2/user/wallet/simpleInfo',
				success: function (res) {
					if (res.code == 0) {
						CHAIN.WALLET.accounts()
							.then(function(accounts){
								safeCharge(res, accounts)
							})
					} else {
						window.alert('無法獲取充值信息');
					}
				},
				error: function (res) {
					window.alert('網絡錯誤，無法獲取賬戶信息');
				}
			})	
		} else if (tit == 'dwallet') {
			$.ajax({
				url: base_url + '/v2/user/wallet/delete',
				type: 'POST',
				dataType: 'json',
				success: function (res) {
					if (res.code == 0) {
						success('删除成功', 1800);
						// document.cookie = "isConnect=false";
						setCookie("isConnect",false);
						setTimeout(function () {
							window.location.reload();
						}, 1800)
					}
				}
			});

		} else if (tit == 'withdraw') {
			var amount = $('.modify-ipt input').val().trim();
			var ye = $('.usdt-rest').text().split(' ')[0];
			var text = $('.modify-ipt-tit').text();
			if (text == '請連接錢包') {

				tips('請連接錢包');

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
			console.log('tit == card')
			
		}else if(tit == 'dcard'){
			console.log(tit);
			loading();
					$.ajax({
						url: base_url + '/v2/user/wallet/credit/delete',
						type: 'POST',
						dataType: 'json',
						data: {},
						success: function (res) {
							loadingHide();
							if(res.code==0){
								window.location.reload();
							}
						}
					})
		}
	});

	var url = window.location.search;
	url = url.substring(url.lastIndexOf('?')+1);
	if (url == "isframe=true") {
		addFund();
		$('.modify').fadeIn();
	}
})
function  panduan() {
	var url = window.location.search;
	url = url.substring(url.lastIndexOf('?')+1);
	if (url == "isframe=true") {
		window.location.search = "";
	}
}
