var app = new Vue({
	el: '#artDetail',
	data: function () {
		return {
			id: '',
			prev: -1, 
			success_status: -1,
			walletType: '',
			maxbannum: 0,
			busdPrice: 0,
			selectarr: [],
			accountBalance: 0,
			hkdPrice: 0,
			curUserOwned: 0,
			oneUserCountLimit: 0,
			onceCountLimit: 0,
			payTabs: ['信用卡', '餘額支付', '錢包支付'],
			selectedPayMethod: 0
		}
	},
	created() {
		let self = this
		self.initMediaCss()
		var params = window.location.search.substr(1).split('&')
		var arr = [];
		for (var key in params) {
			arr.push({
				key: params[key].split('=')
			});
		}
		$.each(arr, function (i, v) {
			if (v.key[0] == 'id') {
				self.id = v.key[1];
			} else if (v.key[0] == 'prev') {
				self.prev = v.key[1];
			} else if (v.key[0] == 'success') {
				self.success_status = v.key[1]
			}
		})
		if (self.prev == '1') {
			$('.pre-mask').show();
		} else {
			$('.pre-mask').hide();
		}

		if (self.success_status == 1) {
			success('支付成功', 1800);
			setTimeout(function () {
				self.saveconfirm();
			}, 1800)
		} else if (self.success_status == 0) {
			error('支付失敗', 1800);
		}
		$('.payment-page-right-balance').hide()
		self.getComditInfo()
	},
	methods: {
		payCrypto() {
			if ($('#cryptoBtn').text() == '去我的資產核對') {
				window.location.href = 'myassets.html';
				return false
			}
			if ($('#cryptoBtn').text() == '請先連接錢包  ->') {
				window.open('mywallet.html');
				return false
			}
			if (this.walletType == 'wallectconnect') {
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

				if (isWalletConnect) {
					CHAIN.WALLET.WalletConnect.provider().enable()
						.then(function (res) {
							loading();

							$.ajax({
								url: base_url + '/v2/user/wallet/simpleInfo',
								success: function (response) {
									contract_p.methods.transfer(response.data.cwallet, num).send({ //转账
											from: response.data.address
										})
										.on('transactionHash', function (hash) {
											loadingHide();
											success('Top up successfully', 1800);
											setTimeout(function () {
												tips('預計在10秒內到帳');
												setTimeout(function () {
													window.location.reload();
												}, 1500)
											}, 1800);
										}).on('receipt', function (receipt) {
											loadingHide();
										}).on('error', function (err) {
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

			} else if (this.walletType == 'METAMASK') {
				var amount = self.busdPrice * this.selectarr.length;
				if (amount == '') {
					amount = '0';
				}
				var num = getWeb3().utils.toWei(amount, 'ether');
				if (typeof window.ethereum !== 'undefined') {
					$.ajax({
						url: base_url + '/v2/user/wallet/simpleInfo',
						success: function (res) {
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
		},
		getComditInfo() {
			//商品详情业加载
			let self = this
			$.ajax({
				url: base_url + '/v2/commodity/info',
				data: {
					id: self.id
				},
				success: function (res) {
					if (res.code == 0) {
						var content = res.data.content;
						var saleStartTimeMillis = res.data.saleStartTimeMillis; //开始销售时间
						var saleEndTimeMillis = res.data.saleEndTimeMillis; //销售结束时间
						var systemTime = res.data.systemTime; //当前时间
						var geshi = res.data.primaryPic.substr(res.data.primaryPic.lastIndexOf('.') + 1);
						self.selectarr.push(res.data.edition);
						window.$selectarr = self.selectarr;
						self.maxbannum = res.data.endEdition;
						self.hkdPrice = res.data.hkdPrice;
						self.busdPrice = res.data.price;
						self.curUserOwned = res.data.curUserOwned;
						self.oneUserCountLimit = res.data.oneUserCountLimit;
						self.onceCountLimit = res.data.onceCountLimit;
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
						$('.details-right-creator-edition').text('Edition ' + res.data.edition + ' of ' + res.data.endEdition);
						$('.selectarrnum').text(res.data.edition);
						$('.order-introduce').html(res.data.introduce == '' ? '暫無介紹' : (res.data.introduce.replace(/;\|;/g, '<br>')));
						$('.order-content').html(res.data.content == '' ? '暫無更多資訊' : (res.data.content.replace(/;\|;/g, '<br>')));
						if (res.data.endEdition - res.data.edition > 0) { //还有库存
							if (systemTime < saleStartTimeMillis) {
								$('.details-right-btn').addClass('unclick')
								$('.details-right-btn').text('即將開售')
								$('.details-right-btn').data('status', '1')
								var msTime = saleStartTimeMillis - systemTime;
								var time = self.formatDuring(msTime);
								$('.details-right-time span:first-child').text('銷售開始於： ');
								$('.details-right-time-djs').text(time);
								setInterval(function () {
									var curTime = Date.now() + 1150;
									var msTime = saleStartTimeMillis - curTime;
									var time = self.formatDuring(msTime);
									$('.details-right-time-djs').text(time);
								}, 1000);

							} else if (systemTime >= saleStartTimeMillis && systemTime <= saleEndTimeMillis) {
								var msTime = saleEndTimeMillis - systemTime;
								var time = self.formatDuring(msTime);
								console.log(time);
								let ycdjs = time.split('d')[0];
								if (ycdjs > 1825) {
									$(".details-right-time").hide();
								}
								$('.details-right-time span:first-child').text('銷售結束於：');
								$('.details-right-time-djs').text(time);

								setInterval(function () {
									var curTime = Date.now() + 1150;
									var msTime = saleEndTimeMillis - curTime;
									var time = self.formatDuring(msTime);
									$('.details-right-time-djs').text(time);
								}, 1000);
							} else if (systemTime > saleEndTimeMillis) {
								$('.details-right-btn').addClass('unclick');
								$('.details-right-btn').text('銷售已結束');
								$('.details-right-btn').data('status', '1')
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
						self.getAccountInfo(res)
					}
				}
			})
		},
		getAccountInfo(res) {
			let self = this
			$.ajax({
				url: base_url + '/v2/user/wallet/info',
				success: function (result) {
					if (result.code == 0) {
						$('.busd-ye').text('BUSD ' + result.data.usdtRest);
						self.accountBalance = result.data.usdtRest
						if (res.data.price > result.data.usdtRest) {
							$('.busd-tip').text('餘額不足');
						} else {
							$('.busd-tip').text('-' + res.data.price);
						}
						$('.busd-tip').show();
						self.walletType = result.data.walletType
					}
				}
			})
		},
		toggleVideo() {
			var voiceStatus = document.getElementsByTagName('video')[0].muted
			document.getElementsByTagName('video')[0].muted = !voiceStatus
			switch (voiceStatus) {
				case true:
					document.getElementsByClassName('voice')[0].src = './images/voice.png'
					break;
				case false:
					document.getElementsByClassName('voice')[0].src = './images/mute.png'
					break;
			}
		},
		FullScreen() {
			var ele = document.getElementsByTagName('video')[0];
			if (ele.requestFullscreen) {
				ele.requestFullscreen();
			} else if (ele.mozRequestFullScreen) {
				ele.mozRequestFullScreen();
			} else if (ele.webkitRequestFullScreen) {
				ele.webkitRequestFullScreen();
			}
		},
		changenum(e, type) {
			let self = this
			let str = '';
			if (type == 1) {
				if (self.selectarr.length < 2) {
					tips("至少選擇一件噢~");
				} else {
					self.selectarr.pop();
				}
			}
			if (type == 2) {
				if (self.selectarr[self.selectarr.length - 1] < self.maxbannum) {
					if (self.curUserOwned + self.selectarr.length >= self.oneUserCountLimit) {
						tips('已達到賬號購買數量限制');
						return;
					}
					if (self.selectarr.length >= self.onceCountLimit) {
						tips('已達到單次購買數量限制');
						return;
					}
					self.selectarr.push(self.selectarr[self.selectarr.length - 1] + 1);
				} else {
					if (self.selectarr.length == 1) {
						tips('當前剩餘只可選擇1個');
					} else {
						tips('已達到最大購買數量');
					}
				}
			}
			self.selectarr.forEach((item, index) => {
				if (index != 0) {
					str += '、';
				}
				str += item;
			})
			$('.hkdPrice').text('HK$ ' + moneyFormat(self.hkdPrice * self.selectarr.length));
			$('.busdPrice').text('BUSD ' + moneyFormat(self.busdPrice * self.selectarr.length));
			$(".purchase_num").text(self.selectarr.length);
			$('.selectarrnum').text(str);
			$('.busd-tip').text('-' + self.busdPrice * self.selectarr.length);
		},
		mangeWalletCharge(res, accounts) {
			if (res.data.address == accounts[0]) {
				var cwallet = res.data.cwallet; //收款钱包 地址
				var web3 = getEth();
				var contract = new web3.Contract(abi, address);
				var amount = this.busdPrice * this.selectarr.length;
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
										tips('預計在10秒內到帳');
										$('#cryptoBtn').text('去我的資產核對');
										$('.payment-page-right-balance').hide()
										$('.wallet-payment-desc').text('錢包: ' + hash)
									})
							}, 500)
						} else {
							tips('餘額不足');
						}
					});
			} else {
				tips('登錄帳號地址與綁定地址不一致，請切換帳號或重新綁定');
			}
		},
		//询问弹窗
		saveconfirm() {
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
		},
		toggleBalanceCheck() {
			var payButton = document.getElementById("balanceBtn");
			var cryButton = document.getElementById("cryptoBtn");
			if ($('#saveBalance').prop('checked')) {
				payButton.disabled = false;
				if (getCookie('isConnect') == 'true') {
					cryButton.disabled = false;
				}
			} else {
				cryButton.disabled = true;
				if ($('#balanceBtn').text() == '立即付款 >') {
					payButton.disabled = true;
				}
			}
		},
		//格式化时间
		formatDuring(mss) {
			var days = parseInt(mss / (1000 * 60 * 60 * 24));
			var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = parseInt((mss % (1000 * 60)) / 1000);
			return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
		},
		toPay() {
			if ($('.busd-tip').text() == '餘額不足' || this.accountBalance < this.busdPrice * this.selectarr.length) {
				$('.payment-page-right-btn button').text('充值');
				$('#balanceBtn').attr('disabled', false)
			}
			$.ajax({
				url: base_url + '/v2/user/account',
				success: function (res) {
					if (res.code == 0) {
						$('.payment').fadeIn();
						$('.payment').addClass('payment-active')
						$('video').addClass('video-hidden');
						$('.payment-page-left-img video').removeClass('video-hidden')
					} else {
						tips('未登錄，請登入');
					}
				}
			})
		},
		
		initMediaCss() {
			var mobile_width = $(window).width();
			if (mobile_width <= 992) {
				$('.details-right-btn').removeClass('payment-btn-pc');
				$('.details-right-btn').addClass('payment-btn-mobile');
				$('.payment-close-mobile').on('click', function () {
					$('.payment').removeClass('payment-active');
					$('video').removeClass('video-hidden');
				})
			}
		},
		//Additional Infomation 
		showDetailInfo () {
			var ele = $('.details-right-additional-show')
			var status = ele.data('status');
			if (status == 0) {
				$('.details-right-additional-more').slideDown('fast');
				ele.children('span').text('-');
				ele.data('status', '1');
			} else if (status == 1) {
				$('.details-right-additional-more').slideUp('fast');
				ele.children('span').text('+');
				ele.data('status', '0');
			}
		},
		//支付
		payBalance() {
			let self = this
			var value = $('#balanceBtn').text().trim();
			var busd = $('.order-price .order-price-busd').text().trim();
			if (self.selectedPayMethod == 1) {
				if (value == '立即付款 >') {
					$.ajax({
						url: base_url + '/v2/order/order/pay/usdt',
						type: 'POST',
						contentType: 'application/json',
						dataType: 'json',
						data: JSON.stringify({
							configCommodityId: self.id,
							buyCount: self.selectarr.length,
							connectStatus: getCookie('isConnect')
						}),
						success: function (res) {
							if (res.code == 0) {
								success('支付成功', 1800);
								setTimeout(function () {
									$('.order-number').text("訂單號 #：" + res.data);
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
		},
		togglePayMethod(text) {
			this.selectedPayMethod = text
			console.log(text);
			if (text == 0) {
				$('.payment-page-right-btn').hide();
				$('.order-price .order-price-hdk').show();
				$('.order-price .order-price-busd').hide();
				$('.payment-page-right-select').show();
				$('.payment-page-right-busd').hide();
				$('.payment-page-right-balance').hide()
				$('.payment-page-right-btn').hide();
				$('.wallet-payment-desc').hide();
				$('.payment-page-right-crypto').hide();
				$('.payment-page-right-total').show();
			};

			if (text == 1) {
				$('.payment-page-right-btn').show();
				$('.payment-page-right-crypto').hide();
				$('.payment-page-right-total').show();
				$('.payment-page-right-balance').show()
				$('.payment-page-right-btn button').addClass('can');
				if ($('.busd-tip').text() == '餘額不足' || this.accountBalance < this.busdPrice * this.selectarr.length) {
					$('.payment-page-right-btn button').text('充值');
					$('#balanceBtn').attr('disabled', false)
				} else {
					$('.payment-page-right-btn button').text('立即付款 >');
				}
				$('.order-price .order-price-hdk').hide();
				$('.order-price .order-price-busd').show();
				$('.payment-page-right-select').hide();
				$('.payment-page-right-busd').show();
				$('.wallet-payment-desc').hide();
			}
			if (text == 2) {
				$('.payment-page-right-btn').hide();
				$('.payment-page-right-crypto').show();
				if (getCookie('isConnect') != true) {
					$('#cryptoBtn').text('請先連接錢包  ->')
					$('#cryptoBtn').attr('disabled', false)
				} else {
					$('#cryptoBtn').text('立即付款  ->')
					$('#cryptoBtn').attr('disabled', true)
				}
				$('.payment-page-right-balance').hide()
				$('#cryptoBtn').text('錢包支付功能準備中...')
				$('#cryptoBtn').attr('disabled', true)
				$('.payment-page-right-crypto button').addClass('can');
				if ($('.busd-tip').text() == '餘額不足') {
					$('.payment-page-right-btn button').text('充值');
				} else {
					$('.payment-page-right-btn button').text('立即付款 >');
				}
				$('.payment-page-right-total').hide();
				$('.order-price .order-price-hdk').hide();
				$('.order-price .order-price-busd').show();
				$('.payment-page-right-select').hide();
				$('.payment-page-right-busd').hide();
				$('.wallet-payment-desc').show();
				$('.wallet-payment-desc').text('錢包直連支付功能準備中...');
			}
		}
	}
})

//下单
function orderTakePc() {
	payment();
	var data = {
		configCommodityId: this.id,
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

$('html').click(function () {
	closeVideo();
})

$('.video-model video').click(function (e) {
	e.stopPropagation();
})

function isNumber(value) {
	return typeof value === 'number' && !isNaN(value)
}