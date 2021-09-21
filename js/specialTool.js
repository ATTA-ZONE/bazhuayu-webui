var app = new Vue({
	el: '#specialTool',
	data: function () {
		return {
			id: '',
			maskLists: [],
			saleItem: {selectarr:[1]},
			walletType: '',
			maxbannum: 5,
			selectarr: [1],
			accountBalance: 0,
			curUserOwned: 0,
			payTabs: ['錢包支付'],
			selectedPayMethod: 0,
			visiable: [],
			targetChainId: 0,
			auctionAddress: '',
			auctionContractInstance: null,
			userAddress: '',
			chainId: 0,
			imglist:[],
			// 中英文切换
			languageType: "",
			chEnTextHtml: {
				"TC": {
					home: '首頁',
					noConnectWallet: "未連接錢包",
					login: "登入/註冊",
					myaccount: "我的帳戶",
					myorders: "我的訂單",
					myassets: "我的資產",
					mywallet: "我的錢包",
					logOut: "登出",
					version: "第1版，共150版",
					selectText: "已選數量",
					versionTxt: "單地址限購5個",
					price: "单价：",
					purchaseNow: "立即購買 ->",
					details: "更多信息",
					pay: "支付",
					paySuc: "支付成功",
					payErr: "支付失敗",
					paid: "您的付款金額為",
					purchasing: "由於您購買的是數字作品，一經售出概不退換",
					payment: "立即付款",
					balance: "餘額",
					paymenttips: "注意：喚起錢包支付時，由Metamask的限制，價格顯示為0，但您實際支付的金額與售賣商品價格一致。",
					operationFailed: "操作失败",
					// js部分
					maximum: "已達到最大購買數量",
					purchaseSuc: "購買成功",
					seconds: "預計10秒內到賬",
					comSoon: "即將開售",
					balanceInsufficient: "餘額不足",
					least: "至少選擇一件噢",
					reached: "已達到賬號購買數量限制",
					limit: "已達到單次購買數量限制",
					moment: "當前剩餘只可選擇1個",
					quantity: "已達到最大購買數量",
					asset: "去我的資產核對",
					confirm: "確認",
					cancel: "取消",
					recharge: "充值",
					noLog: "未登入，請登入",
					number: "訂單號 #：",
					balancePayment: "餘額支付",
					accomplish: "完成",
					payment: "立即付款",
					switchNet: "請先切換網絡至",
					walletFirst: "請先連接錢包  ->",
					paymentComing: "錢包直連支付功能準備中...",
					metaTips: "注意：喚起錢包支付時，由Metamask的限制，價格顯示為0，但您實際支付的金額與售賣商品價格一致。",
					bannerBtn1: '參與投票',
					bannerBtn2: '了解「面具」'
				},
				"EN": {
					bannerBtn1: 'Vote Archive',
					bannerBtn2: 'Understand the "mask"',
					switchNet: "Please switch network first",
					metaTips: "Please note: Due to the limitation of Metamask, it is normal that the price will show 0 when you are using Metamask to process payment. But actually, you are paying the right price.",
					home: 'HOME',
					noConnectWallet: "Connect Wallet",
					login: "Login/Sign up",
					myaccount: "My Account",
					myorders: "My Orders",
					myassets: "My Assets",
					mywallet: "My Wallet",
					logOut: "Log out",
					version: "Edition 1 of 150",
					selectText: "Selected quantity",
					versionTxt: "Limit 5 purchases per address",
					price: "Price：",
					purchaseNow: "Purchase Now ->",
					details: "Details",
					pay: "Payment",
					paySuc: "Payment successful",
					payErr: "Payment failed",
					paid: "Your paid",
					purchasing: "Since you're purchasing a digital creation, all sales are final.",
					payment: "Pay now",
					balance: "Balance",
					paymenttips: "Please note: Due to the limitation of Metamask, it is normal that the price will show 0 when you are using Metamask to process payment. But actually, you are paying the right price.",
					operationFailed: "operation failed",
					// js部分
					maximum: "Maximum purchase quantity has been reached",
					purchaseSuc: "Successful purchase",
					seconds: "Expected to arrive within 10 seconds",
					comSoon: "Coming soon",
					start: "Sales start at：",
					balanceInsufficient: "Insufficient balance",
					least: "Choose at least one~",
					reached: "The account purchase limit has been reached",
					limit: "Reached the single purchase quantity limit",
					moment: "Only 1 can be selected at the moment",
					quantity: "Maximum purchase quantity has been reached",
					asset: "Go to my asset to check",
					confirm: "confirm",
					cancel: "cancel",
					recharge: "Add funds",
					noLog: "Not logged in, please log in",
					number: "Order #: ",
					balancePayment: "Paid by balance",
					accomplish: "complete",
					payment: "Pay now",
					walletFirst: "Please connect your wallet first  ->",
					paymentComing: "Function coming soon..."
				}
			}
		}
	},
	created() {
		let self = this;
		this.languageType = getCookie("lang") ? getCookie("lang") : 'TC';
		if (this.languageType == "TC") {
			document.title = "无限制电竞大会";
			this.payTabs = ['錢包支付'];
		} else {
			document.title = "Infinity Headset Genesis";
			this.payTabs = ['Crypto wallet'];
		}
		self.initMediaCss()

		self.getComditInfo()
		self.initAddress()
	},

	mounted() {
		$('.payment-page-right-crypto').show();
		if (getCookie('isConnect') != 'true') {
			$('#cryptoBtn').text(this.chEnTextHtml[this.languageType].walletFirst)
			$('#cryptoBtn').attr('disabled', false)
		} else {
			$('#cryptoBtn').text(this.chEnTextHtml[this.languageType].payment + '  ->')
			$('#cryptoBtn').attr('disabled', false)
		}
		$('.payment-page-right-crypto button').addClass('can');
		$('.order-price .order-price-busd').show();
	},
	methods: {
		closePay(){
			$('.payment').fadeOut();
			this.saleItem.selectarr = [1]
			this.$forceUpdate();
		},
		saleStatus(startTime, endTime) {
			return startTime < Date.now() && endTime > Date.now()
		},
		payCrypto() {
			let self = this
			if ($('#cryptoBtn').text() == '去我的資產核對' || $('#cryptoBtn').text() == 'Go to my asset to check') {
				setCookie('selectedTab', 1)
				window.location.href = 'myassets.html';
				return false
			}
			if ($('#cryptoBtn').text() == '請先連接錢包  ->' || $('#cryptoBtn').text() == 'Please connect your wallet first  ->') {
				window.open('connectWallet.html');
				return false
			}
			if ($('#cryptoBtn').text() == '立即付款  ->' || $('#cryptoBtn').text() == 'Pay now  ->') {
				CHAIN.WALLET.accounts().then(function (accounts) {
					self.getOnSellToken(accounts);
				});
			}
		},

		initAddress() {
			let self = this
			if (window.location.href.indexOf('bazhuayu.io') == -1) {
				self.targetChainId = 97;
			} else {
				self.targetChainId = 56;
			}
			CHAIN.WALLET.accounts()
				.then(function (accounts) {
					self.userAddress = accounts[0]
				})
		},
		saveHash(item, hash) {
			$.ajax({
				url: base_url + "/v2/activity/createOrder",
				type: "POST",
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify({
					buyCount: item.selectarr.length,
					id: item.id,
					txhash: hash || ""
				}),
			});
		},
		getDrawResult(hash) {
			let self = this
			$.ajax({
				url: base_url + "/v2/activity/getDrawResult",
				data: {txhash: hash || ""},
				success: function(res) {
					console.log(res);
					self.imglist = res.data
				}
			});
		},
		getOnSellToken(accounts) {
			if (accounts.length < 1) {
				return false;
			}
			var cwallet = ""; //收款钱包 地址

			if (this.targetChainId == 97) {
				cwallet = "0x5ea57A85e0f3C9085e13597a35BFd6a82Bbf7127";
			} else {
				cwallet = "0xC6F6fCce3026f08C668cA09bc5dFB58e596520f4";
			}
			if (this.saleItem.id == 70) {
				this.buyEth(accounts)
			} else {
				this.buyBusd(cwallet, accounts)
			}

		},
		async buyEth(accounts) {
			let self = this;
			let chainId = await CHAIN.WALLET.chainId()

			if (chainId != 1 && chainId != 4) {
				tips(self.chEnTextHtml[self.languageType].switchNet + ':ETH')
				return false
			}
			loading();
			var web3 = new Web3(CHAIN.WALLET.provider());
			var busdAddress = ethContractSetting["eth_ERC20"][chainId].address;
			var busdABI = ethContractSetting["eth_ERC20"]["abi"];
			busdContractInstance = new web3.eth.Contract(busdABI, busdAddress);
			var amount = $("#specialTool .payment .busdPrice")
				.text()
				.split("ETH ")[1];
			var num = web3.utils.toWei(amount, "ether");
			busdContractInstance.methods
				.draw(self.saleItem.selectarr.length)
				.send({
					//转账
					from: accounts[0],
					value: num
				})
				.on("transactionHash", function () {
					tips(self.chEnTextHtml[self.languageType].seconds)
					loading()
				})
				.then((result) => {
					loadingHide();
					self.getDrawResult(result.transactionHash)
					tips(self.chEnTextHtml[self.languageType].purchaseSuc)
					$('#cryptoBtn').html(self.chEnTextHtml[self.languageType].asset)
					$('#specialTool .payment-page-right-tit').html(self.chEnTextHtml[self.languageType].purchaseSuc)
					loadingHide();
				})
				.catch((err) => {
					loadingHide();
					tips(self.chEnTextHtml[self.languageType].payErr)
				});
		},

		async buyBusd(cwallet, accounts) {
			let self = this;
			let chainId = await CHAIN.WALLET.chainId()
			if (chainId != 56 && chainId != 97) {
				tips(self.chEnTextHtml[self.languageType].switchNet + ':BSC')
				return false
			}
			loading();
			var web3 = new Web3(CHAIN.WALLET.provider());
			var busdAddress = contractSetting["busd_ERC20"][chainId].address;
			var busdABI = contractSetting["busd_ERC20"]["abi"];
			busdContractInstance = new web3.eth.Contract(busdABI, busdAddress);
			var amount = $("#specialTool .payment .busdPrice")
				.text()
				.split("BUSD ")[1];
			var num = web3.utils.toWei(amount, "ether");
			busdContractInstance.methods
				.balanceOf(accounts[0])
				.call() //查询余额
				.then(function (res2) {
					if (Number(res2) >= Number(num)) {
						loadingHide();
						setTimeout(function () {
							busdContractInstance.methods
								.transfer(cwallet, num)
								.send({
									//转账
									from: accounts[0],
								})
								.on("transactionHash", function (hash) {
									tips(self.chEnTextHtml[self.languageType].seconds)
									loading()
									self.saveHash(self.saleItem, hash);
								})
								.then(() => {
									loadingHide();
									tips(self.chEnTextHtml[self.languageType].purchaseSuc)
									$('#cryptoBtn').html(self.chEnTextHtml[self.languageType].asset)
									loadingHide();
								})
								.catch((err) => {
									console.log(err);
									loadingHide();
								});
						}, 1000);
					} else {
						loadingHide();
						tips(self.chEnTextHtml[self.languageType].balanceInsufficient);
					}
				});
		},

		getComditInfo() {
			//商品详情业加载
			let self = this
			$.ajax({
				url: base_url + '/v2/commodity/list',
				data: {
					current: 1,
					pageSize: 9,
					name: '',
					typeId: '',
					channelId: 4
				},
				success: function (res) {
					if (res.code == 0) {
						self.maskLists = res.data.pageResult.records
						for (var i = 0; i < self.maskLists.length; i++) {
							self.maskLists[i].selectarr = [1]
						}
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
		changenum(type,item) {
			let self = this
			if (type == 1) {
				if (item.selectarr.length < 2) {
					tips(this.chEnTextHtml[this.languageType].least);
				} else {
					item.selectarr.pop();
				}
			}
			if (type == 2) {
				if (item && item.id == 70) {
					if (item.selectarr[item.selectarr.length - 1] < self.maxbannum) {
						item.selectarr.push(item.selectarr[item.selectarr.length - 1] + 1);
					} else {
						tips(this.chEnTextHtml[this.languageType].quantity);
					}
				} else {
					item.selectarr.push(item.selectarr[item.selectarr.length - 1] + 1);
				}
			}
			this.$forceUpdate();
		},

		toPay(item) {
			let self = this;
			self.saleItem = item;
			$.ajax({
				url: base_url + '/v2/user/account',
				success: function (res) {
					if (res.code == 0) {
						$('.payment').fadeIn();
						$('#specialTool .payment-page-right-tit').html(self.chEnTextHtml[self.languageType].pay)
						$('#cryptoBtn').text(self.chEnTextHtml[self.languageType].payment + '  ->')
						self.imglist = []
						$('.payment').addClass('payment-active')
						$('video').addClass('video-hidden');
						$('.payment-page-left-img video').removeClass('video-hidden')
					} else {
						tips(self.chEnTextHtml[self.languageType].noLog);
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
		}
	}
})

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