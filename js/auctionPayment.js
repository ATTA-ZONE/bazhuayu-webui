var auctionPaymentText = chEnText.artwork[lang];
var urlauctionPayment = window.location.search.split('=');
var userPrice = urlauctionPayment[1].split("&id")[0];
var urlid = urlauctionPayment[2].split("&tokenTypeId")[0];
var tokenTypeId = urlauctionPayment[urlauctionPayment.length - 1];
var walletType = getCookie(CHAIN.WALLET.__wallet__);
function backAuction() {
	window.location.href = 'auctionDetails.html?id=5';
}
function bindWallet(targetAddress) {
	$.ajax({
		url: '/v2/user/wallet/info',
		async: false,
		success: function (res) {
			if (res.code == 0) {
				var hintMessage = '';
				if (res.data.address != targetAddress) {
					if (res.data.address == null || res.data.address == '') {
						hintMessage = auctionPaymentText.hintMessage0101 + targetAddress + auctionPaymentText.hintMessage0102;
					} else {
						hintMessage = auctionPaymentText.hintMessage0201 + targetAddress + auctionPaymentText.hintMessage0202 + res.data.address;
					}

					if (window.confirm(hintMessage)) {
						var data = {
							address: targetAddress,
							walletType: walletType
						};

						$.ajax({
							url: base_url + '/v2/user/wallet/bind',
							type: 'POST',
							contentType: 'application/json',
							dataType: 'json',
							data: JSON.stringify(data),
							success: function (res) {
								if (res.code == 0) {
									success(auctionPaymentText.bindSuc, 1800);
								} else {
									error(auctionPaymentText.bindErr, 1800);
								}
							}
						});
					}
				}
			} else {
				window.alert(auctionPaymentText.noLogin + targetAddress);
			}
		}
	});
}

$.ajax({
	url: '/v2/auction/detail?id='+urlid,
	success: function (res) {
		if (res.code == 0) {
			var geshi = res.data.primaryPic.substr(res.data.primaryPic.lastIndexOf('.') + 1);
			if (geshi == 'mp4') {
				var html = `<video style="width:100%;" autoplay="autoplay" loop="loop" src="` + res.data.primaryPic + `" muted="muted"></video>
							<video class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" src="` + res.data.primaryPic + `" muted="muted"></video>`;

				$('.bid-payment-img').html(html);
			} else {
				var html = `<img src="` + res.data.primaryPic + `" >
							<img class="mohu" src="` + res.data.primaryPic + `" >`;

				$('.bid-payment-img').html(html);
			}

			$('.auction-name').text(res.data.name);
			// $('.auction-edition').text(`???`+data.edition+`?????????`+data.storage+`???`);
		}
	}
});


function initialization() {
	var web3 = new Web3(CHAIN.WALLET.provider());
	var chainId = '';
	CHAIN.WALLET.chainId()
		.then(function (res) {
			chainId = web3.utils.hexToNumber(res);
			// var netVer = netVers[0];
			if (chainId != targetChainId) {
				CHAIN.WALLET.switchRPCSettings(targetChainId);
			}
			// var netVer = netVers[0];
			auctionAddress = contractSetting['auction_contract'][chainId].address; // ?????? ???????????? ??? ??? ?????? ?????? ???????????????????????? ????????? ?????? ???????????????????????? ????????????
			var auctionABI = contractSetting['auction_contract']['abi'];

			auctionContractInstance = new web3.eth.Contract(auctionABI, auctionAddress);
			// busdAddress ???????????????
			var busdAddress = contractSetting['busd_ERC20'][chainId].address;
			var busdABI = contractSetting['busd_ERC20']['abi'];

			busdContractInstance = new web3.eth.Contract(busdABI, busdAddress);
			userBidInfo();
			// tokenTypeId = '';
			// if (window.location.href.indexOf('bazhuayu.io') == -1) {
			// 	tokenTypeId = 80000003;
			// } else {
			// 	tokenTypeId = 5010000;
			// }

			//?????? ????????? ??????????????? ???????????????????????? ?????????
			auctionContractInstance.methods._auctions(tokenTypeId).call()
				.then(function (res) {
					var tokenTopBid = web3.utils.fromWei(res.tokenTopBid, 'ether');
					$('.info-busd span').text(tokenTopBid);
				});
		});
}

function userBidInfo() {
	var userAddress = '';
	CHAIN.WALLET.accounts()
		.then(function (res) {
			if (res.length > 0) {
				userAddress = res[0];
			}


			if (userAddress != '') {
				//???????????????????????? ?????? ???????????????????????????????????????????????? ??????????????? ??????
				bindWallet(userAddress);

				$('.no-connect-wallet').hide();
				$('.address-tit').show();
				$('.address-info').text(userAddress);
				$('.address-info').show();
				$('#pay_now').removeClass('grey');
				$('#pay_now').data('status', '1');
				$('.btn-tip').show();
			} else {
				$('.no-connect-wallet').show();
				$('.address-tit').hide();
				$('.address-info').hide();
				$('#pay_now').addClass('grey');
				$('#pay_now').data('status', '0');
				$('.btn-tip').hide();
			}
		});
}

//??????????????????
if (walletType || window.ethereum) {
	// $('#make_offer').data('sign','0');
	initialization();

	function networkChangedImplement() {
		initialization();
	}

	CHAIN.WALLET.networkChangedAssign(networkChangedImplement);

	// 	var userAddress = '';
	// 	ethereum.request({ method: 'eth_accounts' })
	//         .then(function (res) {
	//             userAddress = res[0];
	//         })

	function accountsChangedImplement(accounts) {
		// 		if (accounts.length > 0) userAddress = accounts[0];
		userBidInfo();
	}

	CHAIN.WALLET.accountsChangedAssign(accountsChangedImplement);
} else {
	window.confirm(auctionPaymentText.walletLose);
}


//????????????
$('#connectWallet').click(function () {
	CHAIN.WALLET.enable().then(function (accounts) {
		var userAddress = '';
		if (accounts.length > 0) {
			userAddress = accounts[0];
			bindWallet(userAddress);

			$('.no-connect-wallet').hide();
			$('.address-tit').show();
			$('.address-info').text(userAddress);
			$('.address-info').show();
			$('#pay_now').removeClass('grey');
			$('#pay_now').data('status', '1');
			$('.btn-tip').show();
		} else {
			$('.no-connect-wallet').show();
			$('.address-tit').hide();
			$('.address-info').hide();
			$('#pay_now').addClass('grey');
			$('#pay_now').data('status', '0');
			$('.btn-tip').hide();
		}
	});
});

//?????? tokenId ??? ????????? ????????? ?????? ????????? ??? ???
// contract.methods.getNextMinimalBid(tokenTypeId).call()
// .then(function(res){
// 	// $('.bid-right-btn span font').text(res);
// 	res = getWeb3().utils.fromWei(res,'ether');
// 	$('.info-your-busd span').text(Number(res)+1);
// })

//??????????????????
$('.info-your-busd span').text(userPrice);

//??????
$('#pay_now').click(function () {
	var status = $(this).data('status');

	if (status == 1) { //?????????
		var price = $('.bid-payment-right-info .info-your-busd span').text().trim();
		// price = getWeb3().utils.toWei(price,'wei');
		price = getWeb3().utils.toWei(price, 'ether');
		var self_address = $('.address-info').text().trim(); // ????????????

		//??????
		// contract_sq.methods.balanceOf(self_address).call()
		// .then(function(res){
		// if(Number(price) <= Number(res)){

		//????????????
		busdContractInstance.methods.allowance(self_address, auctionAddress).call()
			.then(function (res) {
				var web3 = new Web3(CHAIN.WALLET.provider())
				if (res < Number(price)) {
					var num = web3.utils.toWei('999999999999999', 'ether');
					//????????????
					loading();
					busdContractInstance.methods.approve(auctionAddress, num).send({
							from: self_address
						})
						.then(function (res) {
							//????????? ???tokenId ?????? price
							auctionContractInstance.methods.bidToken(tokenTypeId, price).send({
									from: self_address
								})
								.then(function (res) {
									var price = web3.utils.fromWei(res.events.Bid.returnValues.price, 'ether');
									loadingHide();
									success(auctionPaymentText.priceSuc, 1800);
									setTimeout(function () {
										$('.bid-payment-mobile-tit span').text(auctionPaymentText.accomplish);
										$('.bid-payment-right-tit').text(auctionPaymentText.accomplis);
										$('.bid-payment-right-tip').text(auctionPaymentText.youPriceSuc);
										$('.info-tit').text(auctionPaymentText.number);
										$('.info-your-busd').hide();
										$('.info-busd').text(auctionPaymentText.youPrice + ' BUSD ' + price);
										$('.address-tit').text(auctionPaymentText.payAddress);
										$('.bid-payment-right-btn button').hide();
									}, 1800)
								})
								.catch(function (err) {
									loadingHide();
									error(auctionPaymentText.priceErr, 1800);
								})
						});
				} else {
					//????????? ???tokenId ?????? price
					loading();
					auctionContractInstance.methods.bidToken(tokenTypeId, price).send({
							from: self_address
						})
						.then(function (res) {
							var price = web3.utils.fromWei(res.events.Bid.returnValues.price, 'ether');
							loadingHide();
							success(auctionPaymentText.priceSuc, 1800);
							setTimeout(function () {
								$('.bid-payment-mobile-tit span').text(auctionPaymentText.accomplish);
								$('.bid-payment-right-tit').text(auctionPaymentText.accomplish);
								$('.bid-payment-right-tip').text(auctionPaymentText.youPriceSuc);
								$('.info-tit').text(auctionPaymentText.number);
								$('.info-your-busd').hide();
								$('.info-busd').text(auctionPaymentText.youPrice + ' BUSD ' + price);
								$('.address-tit').text(auctionPaymentText.payAddress);
								$('.bid-payment-right-btn button').hide();
							}, 1800)
						})
						.catch(function (err) {
							loadingHide();
							error(auctionPaymentText.priceErr, 1800);
						})
				}

			});

		// }else{
		// 	tips('????????????');
		// }

		// });

	}

})