var app = new Vue({
	el: '#blindbox',
	components: {
		'blindbox': httpVueLoader('blindbox.vue')
	},
	data: function () {
		return {
			chEnTextHtml: {
				"TC": {
					luckdrawintroduce_con: "这张曦小姐姐是根据色拉芬妮的原型来创作的，采用了她粉色头发和服饰上的许多元素，包括海克斯的配色参考。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰凸显高贵。这张曦小姐姐是根据色拉芬妮的原型来创作的，采用了她粉色头发和服饰上的许多元素，包括海克斯的配色参考。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰凸显高贵。",
					luckdrawintroduce_btn1: "單抽",
					luckdrawintroduce_btn2: "十連抽",
					probability: "本张卡概率：",
					gathertogether1: "集齊RIta系列NFT即可能獲得開黑機會~",
					gathertogether2: "集齊爱萝莉系列NFT即可能獲得開黑機會~",
					gathertogether3: "集齊瞳夕系列NFT即可能獲得開黑機會~",
					purchase1: "盲盒剩餘：",
					purchase2: "白名單用戶每購買4次，可獲贈一次抽取機會",
					purchase3: "當前Staking獎勵池： BUSD 227,665",
					purchase4: "我的白名單獲贈抽取機會:",
					purchase5: "現在使用",
					purchase6: "盲盒價格：",
					purchase7: "空投獲贈抽取機會:",
					edit: "修改",
					clickedit: "點擊修改地址",
					transfer: "轉移",
					cancel: "取消",
					home: '首頁',
					auction: '拍賣',
					noConnectWallet: "未連接錢包",
					login: "登入/註冊",
					myaccount: "我的帳戶",
					myorders: "我的訂單",
					myassets: "我的資產",
					mywallet: "我的錢包",
					logOut: "登出",
					version: "第1版，共150版",
					select: "已選第",
					versionTxt: "版",
					price: "单价：",
					purchaseNow: "立即購買 ->",
					saleEnds: "銷售結束於：",
					details: "更多信息",
					pay: "支付",
					paySuc: "支付成功",
					payErr: "支付失敗",
					paid: "您的付款金額為",
					byCreditCard: "信用卡支付",
					pendingPayment: "這是待付款，您的付款金額為：",
					saveFor: "保存以備將來購買",
					purchasing: "由於您購買的是數字作品，一經售出概不退換",
					payment: "立即付款",
					currentUsing: "正在使用",
					balance: "餘額",
					notStore: "我們不會儲存您的錢包密鑰，未經您的授權，也無法使用您電子錢包中的貨幣。",
					regSuc: "注册成功",
					operationFailed: "操作失败",
					// js部分
					maximum: "已達到最大購買數量",
					purchaseSuc: "购买成功",
					seconds: "預計10秒內到賬",
					comSoon: "即將開售",
					start: "銷售開始於：",
					end: "銷售結束於：",
					salesClosed: "銷售已結束",
					sellOut: "已售罄",
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
					noLog: "未登錄，請登入",
					number: "訂單號 #：",
					balancePayment: "餘額支付",
					accomplish: "完成",
					payment: "立即付款",
					walletFirst: "請先連接錢包  ->",
					paymentComing: "錢包直連支付功能準備中..."
				},
				"EN": {
					luckdrawintroduce_con: "",
					luckdrawintroduce_btn1: "單抽enen",
					luckdrawintroduce_btn2: "十連抽enen",
					probability: "本张卡概率：",
					gathertogether1: "集齊RIta系列NFT即可能獲得開黑機會~",
					gathertogether2: "集齊爱萝莉系列NFT即可能獲得開黑機會~",
					gathertogether3: "集齊瞳夕系列NFT即可能獲得開黑機會~",
					purchase1: "盲盒剩餘：",
					purchase2: "白名單用戶每購買4次，可獲贈一次抽取機會",
					purchase3: "當前Staking獎勵池： BUSD 227,665",
					purchase4: "我的白名單獲贈抽取機會:",
					purchase5: "現在使用",
					purchase6: "盲盒價格：",
					purchase7: "空投獲贈抽取機會:",
					edit: "Edit",
					clickedit: "Click to edit",
					transfer: "Transfer",
					cancel: "cancel",
					home: 'HOME',
					auction: 'AUCTION',
					noConnectWallet: "Connect Wallet",
					login: "Login/Sign up",
					myaccount: "My Account",
					myorders: "My Orders",
					myassets: "My Assets",
					mywallet: "My Wallet",
					logOut: "Log out",
					version: "Edition 1 of 150",
					select: "Selected",
					versionTxt: "th edition",
					price: "Price：",
					purchaseNow: "Purchase Now ->",
					saleEnds: "Sale ends at：",
					details: "Details",
					pay: "Payment",
					paySuc: "Payment successful",
					payErr: "Payment failed",
					paid: "Your paid",
					byCreditCard: "By credit card",
					pendingPayment: "Your pending payment is：",
					saveFor: "Save for future purchase",
					purchasing: "Since you're purchasing a digital creation, all sales are final.",
					currentUsing: "Current using",
					payment: "Pay now",
					balance: "Balance",
					notStore: "We will not store your wallet key, nor can we use the currency in your wallet without your authorization.",
					regSuc: "registration success",
					operationFailed: "operation failed",
					// js部分
					maximum: "Maximum purchase quantity has been reached",
					purchaseSuc: "Successful purchase",
					seconds: "Expected to arrive within 10 seconds",
					comSoon: "Coming soon",
					start: "Sales start at：",
					end: "Sale ends at：",
					salesClosed: "Sold out",
					sellOut: "Sold out",
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
			},
			lang: '',
			bannerurl: "./images/Banner.png",
			acDescription: "火爆來襲，更有LPL季後賽賽事staking大獎，等你來拿~",
			acName: "LPL明星解說系列盲盒",
			activityTitle: "明星解说盲盒介绍",
			activityImg: "./images/tv4.png",
			activityDetail: "这张曦小姐姐是根据色拉芬妮的原型来创作的，采用了她粉色头发和服饰上的许多元素，包括海克斯的配色参考。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰凸显高贵。这张曦小姐姐是根据色拉芬妮的原型来创作的，采用了她粉色头发和服饰上的许多元素，包括海克斯的配色参考。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰凸显高贵。",
			drawPrice: 50,
			hdkDrawPrice: 388,
			leftAmount: 624,
			storge: 1000,
			address: '',
			leftFreeCount: {
				leftFreeCount1: 0,
				type1: 1,
				leftFreeCount2: 0,
				type1: 2
			},
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
			payTabs: ['信用卡', '餘額支付'],
			selectedPayMethod: 0,
			basicId: 0,
			visiable: [],
			auctionAddress: '',
			auctionContractInstance: null,
			userAddress: '',
			tokenLimits: [],
			chainId: '',
			activityId: 1
		}
	},

	created() {
		this.isConnect = getCookie('isConnect') == 'false' ? false : true
		this.lang = getCookie("lang") ? getCookie("lang") : 'TC';
		if (this.lang == "TC") {
			document.title = "明星藏品詳情";
			this.payTabs = ['信用卡', '餘額支付'];
		} else {
			document.title = "collection detail";
			this.payTabs = ['Credit card', 'Balance'];
		}

		$('.payment-page-right-balance').hide()
		this.initAddress()
	},

	methods: {
		payCrypto() {
			let self = this
			$.ajax({
				url: base_url + '/v2/commodity/tokenLimit',
				data: {
					basicId: self.basicId
				},
				success: function (res) {
					loading();
					$('#cryptoBtn').attr('disabled', true)
					self.tokenLimits = res.data.tokenLimit
					self.authUser()
				}
			})
		},
		authUser() {
			let self = this
			var web3 = new Web3(CHAIN.WALLET.provider());
			var busdAddress = contractSetting['busd_ERC20'][self.chainId].address;
			var busdABI = contractSetting['busd_ERC20']['abi'];
			var busdContractInstance = new web3.eth.Contract(busdABI, busdAddress);
			busdContractInstance.methods.allowance(self.userAddress, self.auctionAddress).call()
				.then(function (res) {
					loadingHide()
					if (res < Number(self.busdPrice)) {
						var num = web3.utils.toWei('999999999999999', 'ether');
						//发起授权
						busdContractInstance.methods.approve(self.auctionAddress, num).send({
								from: self.userAddress
							})
							.then(function () {
								self.getOnSellToken()
							});
					} else {
						self.getOnSellToken()
					}
				})
		},
		initAddress() {
			let self = this
			var targetChainId = '';
			if (window.location.href.indexOf('bazhuayu.io') == -1) {
				targetChainId = 97;
			} else {
				targetChainId = 56;
			}
			var web3 = new Web3(CHAIN.WALLET.provider());
			CHAIN.WALLET.accounts()
				.then(function (accounts) {
					self.userAddress = accounts[0]
				})
			CHAIN.WALLET.chainId()
				.then(function (res) {
					let id = ''
					self.chainId = web3.utils.hexToNumber(res);
					id = web3.utils.hexToNumber(res);
					if (id == targetChainId) {
						self.auctionAddress = contractSetting['vending_machine'][id].address; //网络切换
					}
					var auctionABI = contractSetting['vending_machine']['abi'];
					self.auctionContractInstance = new web3.eth.Contract(auctionABI, self.auctionAddress);
				})
		},
		getOnSellToken() {
			let self = this
			if (!self.tokenLimits) {
				return false
			}
			self.auctionContractInstance.methods.getOnSellToken().call().then(arr => {
				for (let i = 0; i < arr.length; i++) {
					for (let j = 0; j < self.tokenLimits.length; j++) {
						if (arr[i] >= self.tokenLimits[j].startTokenId && arr[i] <= self.tokenLimits[j].endTokenId) {
							self.visiable.push(arr[i])
						}
					}
				}
				if (self.selectarr.length > self.visiable.length) {
					tips(this.chEnTextHtml[this.lang].maximum);
					$('#cryptoBtn').attr('disabled', false)
					return false
				}
				CHAIN.WALLET.accounts()
					.then(function (accounts) {
						self.auctionContractInstance.methods.safeBatchBuyToken(self.visiable.slice(0, self.selectarr
							.length)).send({
							from: accounts[0]
						}).on('transactionHash', function (hash) {
							success(this.chEnTextHtml[this.lang].purchaseSuc, 1800);
							setTimeout(function () {
								tips(this.chEnTextHtml[this.lang].seconds);
								$('#cryptoBtn').attr('disabled', false)
								setTimeout(function () {
									window.location.reload();
								}, 1500)
							}, 1800);
						})
					})
			})
		},

		//询问弹窗
		saveconfirm() {
			hsycms.confirm('confirm', this.chEnTextHtml[this.lang].asset,
				function (res) {
					hsycms.success('success', this.chEnTextHtml[this.lang].confirm);
					setTimeout(function () {
						window.location.href = 'myassets.html';
					}, 1500)
				},
				function (res) {
					hsycms.error('error', this.chEnTextHtml[this.lang].cancel);
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
				if ($('#balanceBtn').text() == '立即付款 >' || $('#balanceBtn').text() == 'Pay now >') {
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
								success(self.chEnTextHtml[self.lang].paySuc, 1800);
								setTimeout(function () {
									$('.order-number').text(self.chEnTextHtml[self.lang].number + res.data);
									$('.payment-page-right-tit').text(self.chEnTextHtml[self.lang].accomplish);
									$('.payment-page-right-order').show();
									$('.payment-page-right-pay').hide();
									$('.payment-page-right-total').hide();
									$('.payment-page-right-busd').hide();
									$('.payment-page-right-balance').hide()
									$('.payment-page-right-btn button').text(self.chEnTextHtml[self.lang].asset);
									$('.payment-page-right-order-je span').text(busd);
									$('.payment-page-right-order-by span').text(self.chEnTextHtml[self.lang]
										.balancePayment);
								}, 1800);
							} else {
								error(res.message, 1800);
							}
						}
					})
				}
			}
		},
		togglePayMethod(text) {
			this.selectedPayMethod = text
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
				if (($('.busd-tip').text() == '餘額不足' || $('.busd-tip').text() == 'Insufficient balance') || this
					.accountBalance < this.busdPrice * this.selectarr.length) {
					$('.payment-page-right-btn button').text(this.chEnTextHtml[this.lang].recharge);
					$('#balanceBtn').attr('disabled', false)
				} else {
					$('.payment-page-right-btn button').text(this.chEnTextHtml[this.lang].payment + ' >');
				}
				$('.order-price .order-price-hdk').hide();
				$('.order-price .order-price-busd').show();
				$('.payment-page-right-select').hide();
				$('.payment-page-right-busd').show();
				$('.wallet-payment-desc').hide();
			}
			if (text == 2) {
				$('.payment-page-right-btn').hide();
				//$('.payment-page-right-crypto').show();
				if (getCookie('isConnect') != 'true') {
					$('#cryptoBtn').text(this.chEnTextHtml[this.lang].walletFirst)
					$('#cryptoBtn').attr('disabled', false)
				} else {
					$('#cryptoBtn').text(this.chEnTextHtml[this.lang].payment + '  ->')
					$('#cryptoBtn').attr('disabled', false)
				}
				$('.payment-page-right-balance').hide()
				$('.payment-page-right-crypto button').addClass('can');
				if ($('.busd-tip').text() == '餘額不足' || $('.busd-tip').text() == 'Insufficient balance') {
					$('.payment-page-right-btn button').text(this.chEnTextHtml[this.lang].recharge);
				} else {
					$('.payment-page-right-btn button').text(this.chEnTextHtml[this.lang].payment + ' >');
				}

				$('.payment-page-right-total').hide();
				$('.payment-page-right-total .order-price').hide()
				$('.order-price .order-price-hdk').hide();
				$('.order-price .order-price-busd').show();
				$('.payment-page-right-select').hide();
				$('.payment-page-right-busd').hide();
				$('.wallet-payment-desc').text(this.chEnTextHtml[this.lang].paymentComing);
				$('.wallet-payment-desc').show();
				$('#cryptoBtn').attr('disabled', true)
			}
		}
	}
})