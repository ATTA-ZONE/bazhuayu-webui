var param = window.location.search.substr(1);
parm = param.split('&');
var arr = [];
var selectarr = []; //已选版数数组
var walletType = '';
var maxbannum = 0;
var busdPrice = 0,
	hkdPrice = 0,
	curUserOwned = 0,
	oneUserCountLimit = 0,
	onceCountLimit = 0;
for (var key in parm) {
	arr.push({
		key: parm[key].split('=')
	});
}

var id, prev, success_status;

$.each(arr, function (i, v) {
	if (v.key[0] == 'id') {
		id = v.key[1];
	} else if (v.key[0] == 'prev') {
		prev = v.key[1];
	} else if (v.key[0] == 'success') {
		success_status = v.key[1]
	}
})

function mangeWalletCharge(res, accounts) {
	if (res.data.address == accounts[0]) {
		var cwallet = res.data.cwallet; //收款钱包 地址
		var web3 = getEth();
		var contract = new web3.Contract(abi, address);
		var amount = busdPrice * selectarr.length;
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
								tips('Expected to arrive within 10 seconds');
								$('#cryptoBtn').text('去我的資產核對');
								$('.payment-page-right-balance').hide()
								$('.wallet-payment-desc').text('Crypto wallet: ' + hash)
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

		tips('The login account address is inconsistent with the binding address, please switch account or rebind');

	}
}

function payCrypto() {
	if ($('#cryptoBtn').text() == '去我的資產核對') {
		window.location.href = 'myassets.html';
		return false
	}
	if ($('#cryptoBtn').text() == '請先連接錢包 ->') {
		window.open('mywallet.html');
		return false
	}
	if (walletType == 'wallectconnect') {
		var provider = CHAIN.WALLET.WalletConnect.provider();
		var address_p = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
		const web3_p = new Web3(provider);
		var contract_p = new web3_p.eth.Contract(abi, address_p);

		var amount = $('.modify-ipt input').val().trim();
		if (amount == '') {
			tips('Please enter the recharge amount');
			return;
		}
		var num = getWeb3().utils.toWei(amount, 'ether');

		var isWalletConnect = localStorage.getItem('walletconnect');
		console.log(isWalletConnect);

		if (isWalletConnect) {
			CHAIN.WALLET.WalletConnect.provider().enable()
				.then(function (res) {
					loading();

					$.ajax({
						url: base_url + '/v2/user/wallet/simpleInfo',
						success: function (response) {
							// console.log(response);

							contract_p.methods.transfer(response.data.cwallet, num).send({ //转账
									from: response.data.address
								})
								.on('transactionHash', function (hash) {
									loadingHide();
									console.log(['hash', hash]);
									success('Top up successfully', 1800);
									setTimeout(function () {
										tips('Expected to arrive within 10 seconds');

										setTimeout(function () {
											window.location.reload();
										}, 1500)
									}, 1800);
								}).on('receipt', function (receipt) {
									loadingHide();
									console.log(['receipt', receipt])
								}).on('error', function (err) {
									console.log(['error', err]);
									loadingHide();
									error('Recharge failed', 1800);
									setTimeout(function () {
										window.location.reload();
									}, 1800);
								});

						}
					});

				});

		} else {
			tips('Please Connect Wallet');
		}
		var dd = CHAIN.WALLET.WalletConnect.isConnected();
		console.log(dd);

	} else if (walletType == 'METAMASK') {
		var amount = busdPrice * selectarr.length;
		if (amount == '') {
			amount = '0';
		}
		var num = getWeb3().utils.toWei(amount, 'ether');
		if (typeof window.ethereum !== 'undefined') {
			$.ajax({
				url: base_url + '/v2/user/wallet/simpleInfo',
				success: function (res) {
					// console.log(res)
					if (res.code == 0) {

						if (res.data.address == null || res.data.address == '') {
							tips('Please Connect Wallet');
							setTimeout(function () {
								window.location.reload();
							}, 2000);
						} else { //绑定的地址登录的账户地址一致
							loading();
							window.ethereum.enable().then(function (accounts) {
								if (window.ethereum && window.ethereum.isConnected()) {
									setcookieff('isConnect=true');
									// document.cookie = "isConnect=true";
								}
								setTimeout(function () {
									loadingHide();
								}, 1000);
								if (location.host.indexOf('bazhuayu.io') < 0) {
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
			alert('Please use the browser that comes with any wallet Dapp to visit bazhuayu.io, then you can successfully Connect Wallet. Or please use your computer to connect to the wallet plug-in Connect Wallet of your browser.');
		}
	};
}


//下单
function orderTakePc() {
	payment();
	var data = {
		configCommodityId: id,
		buyCount: 1
	};
}

//下单
function orderTakeMobile() {
	// $('.order-number span').text(res.data.orderNo);
	$('.payment').addClass('payment-active')
	var data = {
		configCommodityId: id,
		buyCount: 1
	};
}

// 播放视频
function playVideo(obj, e) {
	e.stopPropagation();
	$(obj).siblings('video')[0].pause();
	var src = $(obj).siblings('video')[0].src;
	$('.video-model video').attr('src', src);
	$('.video-model video')[0].play();
	$('.video-mask').fadeIn('fast');
	$('.video-model').fadeIn('fast');
}

function closeVideo() {
	$('.video-mask').hide();
	$('.video-model').hide();
	$('#save,#savetips').click(function () {
		var payButton = document.getElementById("pay-button");
		if ($('#savetips').prop('checked')) {
			payButton.disabled = !Frames.isCardValid();
		} else {
			payButton.disabled = true;
		}
	})
}

$('#saveBalance').click(function () {
	var payButton = document.getElementById("balanceBtn");
	var cryButton = document.getElementById("cryptoBtn");
	if ($('#saveBalance').prop('checked')) {
		payButton.disabled = false;
		if (getCookie('isConnect') == 'true') {
			cryButton.disabled = false;
		}
	} else {
		cryButton.disabled = true;
		payButton.disabled = true;
	}
})


//询问弹窗
function saveconfirm() {
	hsycms.confirm('confirm', '去我的資產核對',
		function (res) {
			hsycms.success('success', '確認');
			setTimeout(function () {
				window.location.href = 'myassets.html';
			}, 1500)
		},
		function (res) {
			hsycms.error('error', '取消');
		},
	)
};



$('html').click(function () {
	closeVideo();
})

$('.video-model video').click(function (e) {
	e.stopPropagation();
})


//获取时间
function formatDuring(mss) {
	var days = parseInt(mss / (1000 * 60 * 60 * 24));
	var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = parseInt((mss % (1000 * 60)) / 1000);
	return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}


$(function () {

	if (prev == '1') {
		$('.pre-mask').show();
	} else {
		$('.pre-mask').hide();
	}

	if (success_status == 1) {
		success('支付成功', 1800);
		setTimeout(function () {
			saveconfirm();
		}, 1800)

	} else if (success_status == 0) {
		error('支付失敗', 1800);
	}

	//商品详情业加载
	$.ajax({
		url: base_url + '/v2/commodity/info',
		data: {
			id: id
		},
		success: function (res) {
			if (res.code == 0) {
				var content = res.data.content;
				var saleStartTimeMillis = res.data.saleStartTimeMillis; //开始销售时间
				var saleEndTimeMillis = res.data.saleEndTimeMillis; //销售结束时间
				var systemTime = res.data.systemTime; //当前时间
				var geshi = res.data.primaryPic.substr(res.data.primaryPic.lastIndexOf('.') + 1); //onclick=playVideo(this,event)
				selectarr.push(res.data.edition);
				maxbannum = res.data.endEdition;
				hkdPrice = res.data.hkdPrice;
				busdPrice = res.data.price;
				curUserOwned = res.data.curUserOwned;
				oneUserCountLimit = res.data.oneUserCountLimit;
				onceCountLimit = res.data.onceCountLimit;
				if (geshi == 'mp4') {
					$('.detail-media').css('display', 'block')
					var html = `<video style="width:100%;" autoplay="autoplay" loop="loop" src="` + res.data.primaryPic + `" webkit-playsinline="true" muted="muted" ></video>
								<video class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" src="` + res.data.primaryPic + `" muted="muted"></video>`;

					$('.order-img').append(html);
				} else {
					$('.detail-media').css('display', 'none')
					var html = `<img class="bzy-e-list-img" src="` + res.data.primaryPic + `" >
								<img class="bzy-e-list-img mohu" src="` + res.data.primaryPic + `" >`;
					$('.order-img').append(html);
				}
				// $('.order-img img').attr('src',res.data.primaryPic);
				$('.order-title').text(res.data.name);
				$('.order-price-hdk').text('HK$ ' + moneyFormat(res.data.hkdPrice));
				$('.order-price-busd').text('BUSD ' + moneyFormat(res.data.price));

				if (res.data.name == '徐冬冬 牛N.X潮玩 NFT限量版') {
					res.data.edition = 200;
				}

				$('.details-right-creator-edition').text('第'+res.data.edition+'版， 共'+res.data.endEdition+'版');
				$('.selectarrnum').text(res.data.edition);
				$('.order-introduce').html(res.data.introduce == '' ? '暫無介紹' : (res.data.introduce.replace(/;\|;/g, '<br>')));
				$('.order-content').html(res.data.content == '' ? '暫無更多資訊' : (res.data.content.replace(/;\|;/g, '<br>')));

				if (res.data.endEdition - res.data.edition > 0) { //还有库存

					if (systemTime < saleStartTimeMillis) {
						$('.details-right-btn').addClass('unclick');
						$('.details-right-btn').text('即將開售');
						$('.details-right-btn').data('status', '1');
						// $('.details-right-btn').removeClass('payment-btn-pc');
						// $('.details-right-btn').removeClass('payment-btn-mobile');
						var msTime = saleStartTimeMillis - systemTime;
						var time = formatDuring(msTime);
						$('.details-right-time span:first-child').text('銷售開始於： ');
						$('.details-right-time-djs').text(time);

						setInterval(function () {
							var curTime = Date.now() + 1150;
							var msTime = saleStartTimeMillis - curTime;
							var time = formatDuring(msTime);
							$('.details-right-time-djs').text(time);
						}, 1000);

					} else if (systemTime >= saleStartTimeMillis && systemTime <= saleEndTimeMillis) {

						var msTime = saleEndTimeMillis - systemTime;
						var time = formatDuring(msTime);
						let ycdjs = time.split('d')[0];
						if (ycdjs > 1825) {
							$(".details-right-time").hide();
						}
						$('.details-right-time span:first-child').text('銷售結束於： ');
						$('.details-right-time-djs').text(time);

						setInterval(function () {
							var curTime = Date.now() + 1150;
							var msTime = saleEndTimeMillis - curTime;
							var time = formatDuring(msTime);
							$('.details-right-time-djs').text(time);
						}, 1000);

					} else if (systemTime > saleEndTimeMillis) {

						$('.details-right-btn').addClass('unclick');
						$('.details-right-btn').text('銷售已結束');
						$('.details-right-btn').data('status', '1');
						// $('.details-right-btn').removeClass('payment-btn-pc');
						// $('.details-right-btn').removeClass('payment-btn-mobile');

						$('.details-right-time span:first-child').css('opacity', '0');
						$('.details-right-time-djs').text('銷售已結束');

					}

				} else { //没有库存

					$('.details-right-btn').addClass('unclick');
					$('.details-right-btn').text('已售罄');
					$('.details-right-btn').data('status', '1');

					$('.details-right-time span:first-child').css('opacity', '0');
					$('.details-right-time-djs').text('已售罄');
					$('.details-right-time-djs').css('color', '#cf3737');

				}

				$.ajax({
					url: base_url + '/v2/user/wallet/info',
					success: function (result) {
						if (result.code == 0) {
							$('.busd-ye').text('BUSD ' + result.data.usdtRest);
							if (res.data.price > result.data.usdtRest) {
								$('.busd-tip').text('餘額不足');
							} else {
								$('.busd-tip').text('-' + res.data.price);
							}
							$('.busd-tip').show();

							walletType = result.data.walletType

						}
					}
				})
			}
		}
	});


	//
	$('.payment-btn-pc').on('click', function () {
		var status = $(this).data('status');
		// console.log(status)
		if (status == 0) {
			$.ajax({
				url: base_url + '/v2/user/account',
				success: function (res) {
					if (res.code == 0) {
						orderTakePc();
						// payment();
					} else {
						tips('未登錄，請登入');
					}
				}
			})
		}
	})


	$('.payment-close-pc').on('click', function () {
		paymentClose();
	})


	var mobile_width = $(window).width();
	if (mobile_width <= 992) {
		$('.details-right-btn').removeClass('payment-btn-pc');
		$('.details-right-btn').addClass('payment-btn-mobile');

		$('.payment-btn-mobile').on('click', function () {
			var status = $(this).data('status');
			// console.log(status)
			if (status == 0) {
				$.ajax({
					url: base_url + '/v2/user/account',
					success: function (res) {
						if (res.code == 0) {
							orderTakeMobile();
							$('video').addClass('video-hidden');
							$('.payment-page-left-img video').removeClass('video-hidden')
							// $('.payment').addClass('payment-active')
						} else {
							tips('未登錄，請登入');

						}
					}
				})
			}

			// $('.payment').addClass('payment-active')
		});

		$('.payment-close-mobile').on('click', function () {
			$('.payment').removeClass('payment-active');
			$('video').removeClass('video-hidden');
		})
	};

	$('.payment-page-right-balance').hide()
	$('.payment-page-right-pay span').on('click', function () {
		$('.payment-page-right-pay span').removeClass('cur');
		$(this).addClass('cur');
		var text = $(this).data('type');
		if (text == 0) {
			$('.payment-page-right-btn').hide();
			$('.payment-page-right-total').show();
			$('.order-price .order-price-hdk').show();
			$('.order-price .order-price-busd').hide();
			$('.payment-page-right-select').show();
			$('.payment-page-right-busd').hide();
			$('.payment-page-right-balance').hide()
			$('.payment-page-right-btn p').text('您的信用卡將立即授權這筆支付。');
			$('.payment-page-right-btn').hide();
			$('.wallet-payment-desc').hide();
			$('.payment-page-right-crypto').hide();
		};

		if (text == 1) {
			$('.payment-page-right-btn').show();
			$('.payment-page-right-balance').show()
			$('.payment-page-right-total').show();
			$('.payment-page-right-btn button').addClass('can');
			if ($('.busd-tip').text() == '餘額不足') {
				$('.payment-page-right-btn button').text('充值');
			} else {
				$('.payment-page-right-btn button').text('立即付款  >');
			}
			$('.order-price .order-price-hdk').hide();
			$('.order-price .order-price-busd').show();
			$('.payment-page-right-select').hide();
			$('.payment-page-right-busd').show();
			$('.wallet-payment-desc').hide();
			$('.payment-page-right-btn').show();
			$('.payment-page-right-crypto').hide();
		}
		if (text == 2) {
			if (getCookie('isConnect') != true) {
				$('#cryptoBtn').text('請先連接錢包 ->')
				$('#cryptoBtn').attr('disabled', false)
			} else {
				$('#cryptoBtn').text('立即付款  >')
				$('#cryptoBtn').attr('disabled', true)
			}
			$('.payment-page-right-btn').show();
			$('.payment-page-right-balance').hide()
			$('#cryptoBtn').text('錢包支付功能準備中...')
			$('#cryptoBtn').attr('disabled', true)
			$('.payment-page-right-crypto button').addClass('can');
			if ($('.busd-tip').text() == '餘額不足') {
				$('.payment-page-right-btn button').text('充值');
			} else {
				$('.payment-page-right-btn button').text('立即付款  >');
			}
			$('.payment-page-right-total').hide();
			$('.order-price .order-price-hdk').hide();
			$('.order-price .order-price-busd').show();
			$('.payment-page-right-select').hide();
			$('.payment-page-right-busd').hide();
			$('.wallet-payment-desc').show();
			$('.wallet-payment-desc').text('錢包直連支付功能準備中...');
			$('.payment-page-right-btn').hide();
			$('.payment-page-right-crypto').show();
		}
	});


	//Additional Infomation 
	$('.details-right-additional-show').click(function () {
		var status = $(this).data('status');
		if (status == 0) {
			$('.details-right-additional-more').slideDown('fast');
			$(this).children('span').text('-');
			$(this).data('status', '1');
		} else if (status == 1) {
			$('.details-right-additional-more').slideUp('fast');
			$(this).children('span').text('+');
			$(this).data('status', '0');
		}
	})


	//支付
	$('.payment-page-right-btn button').click(function () {
		var text = $('.payment-page-right-pay .cur').data('type');
		var value = $(this).text().trim().split(" ")[0];
		var orderNo = $('.order-number').text().trim().split('：')[1];
		var busd = $('.order-price .order-price-busd').text().trim();
		// console.log(text)
		if (text == 1) {
			if (value == '立即付款') {
				$.ajax({
					url: base_url + '/v2/order/order/pay/usdt',
					type: 'POST',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify({
						configCommodityId: id,
						buyCount: selectarr.length,
						connectStatus: getCookie('isConnect')
					}),
					success: function (res) {
						if (res.code == 0) {
							success('支付成功', 1800);
							setTimeout(function () {
								$('.order-number').text("訂單號：" + res.data);
								$('.payment-page-right-tit').text('完成');
								$('.payment-page-right-order').show();
								$('.payment-page-right-pay').hide();
								$('.payment-page-right-total').hide();
								$('.payment-page-right-busd').hide();
								$('.payment-page-right-balance').hide()
								$('.payment-page-right-btn button').text('去我的資產核對');
								$('.payment-page-right-order-je span').text(busd);
								$('.payment-page-right-order-by span').text('餘額支付');
							}, 1800);
						} else {
							error(res.message, 1800);
						}
					}
				})
			} else if (value == '充值') {
				window.open('mywallet.html');
			} else if (value == '去我的資產核對') {
				window.location.href = 'myassets.html';
			}
		}
	})

})

function changenum(e, type) {
	let str = '';
	if (type == 1) {
		if (selectarr.length < 2) {
			tips("至少選擇一件噢~");
		} else {
			selectarr.pop();
		}
	}
	if (type == 2) {
		if (selectarr[selectarr.length - 1] < maxbannum) {
			if (curUserOwned + selectarr.length >= oneUserCountLimit) {
				tips('已達到賬號購買數量限制');
				return;
			}
			if (selectarr.length >= onceCountLimit) {
				tips('已達到單次購買數量限制');
				return;
			}
			selectarr.push(selectarr[selectarr.length - 1] + 1);
		} else {
			if (selectarr.length == 1) {
				tips('當前剩餘只可選擇1個');
			} else {
				tips('已達到最大購買數量');
			}
		}
	}
	selectarr.forEach((item, index) => {
		if (index != 0) {
			str += '、';
		}
		str += item;
	})
	$('.hkdPrice').text('HK$ ' + moneyFormat(hkdPrice * selectarr.length));
	$('.busdPrice').text('BUSD ' + moneyFormat(busdPrice * selectarr.length));
	$(".purchase_num").text(selectarr.length);
	$('.selectarrnum').text(str);
	$('.busd-tip').text('-' + busdPrice * selectarr.length);
}
