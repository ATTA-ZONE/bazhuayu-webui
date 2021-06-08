function backAuction() {
	window.location.href = 'auction.html';
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
						hintMessage = "您的賬戶未綁定地址，點擊確定會為您自動綁定當前錢包地址\n基於區塊鏈的獨立性，即使不綁定您仍然可以參與競拍\n當前錢包地址: " + targetAddress + " \n賬戶綁定地址: null";
					} else {
						hintMessage = "您的賬戶綁定地址與當前錢包地址不符，點擊確定會為您重新綁定當前錢包地址\n基於區塊鏈的獨立性，即使不綁定您仍然可以參與競拍\n當前錢包地址: " + targetAddress + " \n賬戶綁定地址: " + res.data.address;
					}

					if (window.confirm(hintMessage)) {
						var data = {
							address: targetAddress,
							walletType: 'METAMASK'
						};

						$.ajax({
							url: base_url + '/v2/user/wallet/bind',
							type: 'POST',
							contentType: 'application/json',
							dataType: 'json',
							data: JSON.stringify(data),
							success: function (res) {
								if (res.code == 0) {
									success('綁定成功！', 1800);
								} else {
									error('綁定失敗！', 1800);
								}
							}
						});
					}
				}
			} else {
				window.alert("您尚未登錄，無法綁定錢包，但基於區塊鏈的獨立性，您仍然可以參與競拍\n當前錢包地址: " + targetAddress);
			}
		}
	});
}

$.ajax({
	url: '/v2/auction/list',
	success: function (res) {
		if (res.code == 0) {
			var data = res.data.pageResult.records[0];
			var geshi = data.primaryPic.substr(data.primaryPic.lastIndexOf('.') + 1);
			if (geshi == 'mp4') {
				var html = `<video style="width:100%;" autoplay="autoplay" loop="loop" src="` + data.primaryPic + `" muted="muted"></video>
							<video class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" src="` + data.primaryPic + `" muted="muted"></video>`;

				$('.bid-payment-img').html(html);
			} else {
				var html = `<img src="` + data.primaryPic + `" >
							<img class="mohu" src="` + data.primaryPic + `" >`;

				$('.bid-payment-img').html(html);
			}

			$('.auction-name').text(data.name);
			// $('.auction-edition').text(`第`+data.edition+`版，共`+data.storage+`版`);
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
			auctionAddress = contractSetting['auction_contract'][chainId].address; // 监听 网络切换 会 让 用户 处于 正确的网络，这里 只负责 配置 当前网络下正确的 合约地址
			var auctionABI = contractSetting['auction_contract']['abi'];

			auctionContractInstance = new web3.eth.Contract(auctionABI, auctionAddress);
			// busdAddress 供外界使用
			var busdAddress = contractSetting['busd_ERC20'][chainId].address;
			var busdABI = contractSetting['busd_ERC20']['abi'];

			busdContractInstance = new web3.eth.Contract(busdABI, busdAddress);
			userBidInfo();
			tokenTypeId = '';
			if (window.location.href.indexOf('bazhuayu.io') == -1) {
				tokenTypeId = 80000003;
			} else {
				tokenTypeId = 5010000;
			}

			//获取 拍卖的 详情，包括 时间参数，最高价 等设定
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
				//检测用户绑定钱包 是否 与系统内记录的一致，并且提供快速 替换绑定的 方法
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



var walletType = getCookie(CHAIN.WALLET.__wallet__);

//是否连接钱包
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
	window.confirm('錢包連接已失效，請重新連接錢包');
}


//连接钱包
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

//获取 tokenId 的 下一个 竞价的 至少 要大于 的 值
// contract.methods.getNextMinimalBid(tokenTypeId).call()
// .then(function(res){
// 	// $('.bid-right-btn span font').text(res);
// 	res = getWeb3().utils.fromWei(res,'ether');
// 	$('.info-your-busd span').text(Number(res)+1);
// })

//用户初始报价
var userPrice = window.location.search.split('=')[1];
$('.info-your-busd span').text(userPrice);

//拍卖
$('#pay_now').click(function () {
	var status = $(this).data('status');

	if (status == 1) { //已连接
		var price = $('.bid-payment-right-info .info-your-busd span').text().trim();
		// price = getWeb3().utils.toWei(price,'wei');
		price = getWeb3().utils.toWei(price, 'ether');
		var self_address = $('.address-info').text().trim(); // 自己地址

		//余额
		// contract_sq.methods.balanceOf(self_address).call()
		// .then(function(res){
		// if(Number(price) <= Number(res)){

		//是否授权
		busdContractInstance.methods.allowance(self_address, auctionAddress).call()
			.then(function (res) {
				var web3 = new Web3(CHAIN.WALLET.provider())
				if (res < Number(price)) {
					var num = web3.utils.toWei('999999999999999', 'ether');
					//发起授权
					loading();
					busdContractInstance.methods.approve(address, num).send({
							from: self_address
						})
						.then(function (res) {
							//发起者 对tokenId 下注 price
							auctionContractInstance.methods.bidToken(tokenTypeId, price).send({
									from: self_address
								})
								.then(function (res) {
									var price = web3.utils.fromWei(res.events.Bid.returnValues.price, 'ether');
									loadingHide();
									success('競價成功', 1800);
									setTimeout(function () {
										$('.bid-payment-mobile-tit span').text('完成');
										$('.bid-payment-right-tit').text('完成');
										$('.bid-payment-right-tip').text('您的競標成功。');
										$('.info-tit').text('訂單號：');
										$('.info-your-busd').hide();
										$('.info-busd').text('您的競標價格為 BUSD ' + price);
										$('.address-tit').text('付費地址：');
										$('.bid-payment-right-btn button').hide();
									}, 1800)
								})
								.catch(function (error) {
									loadingHide();
									error('競價失敗！', 1800);
								})
						});
				} else {
					//发起者 对tokenId 下注 price
					loading();
					auctionContractInstance.methods.bidToken(tokenTypeId, price).send({
							from: self_address
						})
						.then(function (res) {
							var price = web3.utils.fromWei(res.events.Bid.returnValues.price, 'ether');
							loadingHide();
							success('競價成功', 1800);
							setTimeout(function () {
								$('.bid-payment-mobile-tit span').text('完成');
								$('.bid-payment-right-tit').text('完成');
								$('.bid-payment-right-tip').text('您的競標成功。');
								$('.info-tit').text('訂單號：');
								$('.info-your-busd').hide();
								$('.info-busd').text('您的競標價格為 BUSD ' + price);
								$('.address-tit').text('付費地址：');
								$('.bid-payment-right-btn button').hide();
							}, 1800)
						})
						.catch(function (err) {
							loadingHide();
							error('競價失敗！', 1800);
						})
				}

			});

		// }else{
		// 	tips('餘額不足');
		// }

		// });

	}

})