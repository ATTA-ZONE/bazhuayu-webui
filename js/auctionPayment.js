function getWeb3() {
	return new Web3(window.ethereum); // web3js就是你需要的web3实例
}

function getEth() {
	return getWeb3().eth;
}

function backAuction() {
	window.location.href = 'auction.html';
}

$.ajax({
	url: '/v2/auction/list',
	success: function (res) {
		console.log(res);
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
			};

			$('.auction-name').text(data.name);
			// $('.auction-edition').text(`第`+data.edition+`版，共`+data.storage+`版`);
		}
	}
});


//是否连接钱包
// console.log(document.cookie);

if (getCookie('auction_wallet_connect') == 'true') {
	$('.no-connect-wallet').hide();
	$('.address-tit').show();
	$('.address-info').text(getCookie('address'));
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
// if(document.cookie.split('=')[1]=='true'){
// 	setTimeout(function(){
// 		$('.header-right-wallet').text('已連接錢包');
// 		$('.mobile-connect-wallet').text('已連接錢包');
// 	},50)

// }else{
// 	setTimeout(function(){
// 		$('.header-right-wallet').text('連接錢包');
// 		$('.mobile-connect-wallet').text('連接錢包');
// 	},50)

// }


var walletId = ethereum.selectedAddress;
var netVer = window.ethereum.networkVersion;
var address = ''
var address_sq = ''
if (location.host !== 'bazhuayu.io') {
	address_sq = '0x65aF2dcE9694393496EE7568eeE92660116D5ae6'
	address = '0x6A2E6042DF6FDCdA84A45531C892b644b095E2b4'; //拍卖地址测试
} else {
	address = '0x26455c075eAD85015cbA283731db78d5E80615fF'
	address_sq = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'; //busd地址  //正式
}


// 监听账户变更事件
ethereum.on('accountsChanged', function (accounts) {
	if (accounts.length > 0) walletId = accounts[0];
	console.log(['accountsChanged', accounts]);

});

// 监听网络变更事件
ethereum.autoRefreshOnNetworkChange = false;
ethereum.on('networkChanged', function (netVer) {
	console.log(['networkChanged', netVer]);

	if (location.host !== 'bazhuayu.io') {
		if (netVer != '97') {
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
			});
		}
	} else {
		if (netVer != '56') {
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

		}
	}

});


//连接钱包
$('#connectWallet').click(function () {

	window.ethereum.enable().then(function (accounts) {

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
			success: function (res) {
				if (res.code == 0) {
					success('連接成功', 1800);

				} else {
					// error('連接失敗',1800);
				}
				// console.log(res);
			}
		});

		if (window.ethereum && window.ethereum.isConnected()) {
			document.cookie = "auction_wallet_connect=true";
			document.cookie = "isConnect=true";
		};

		// console.log(accounts);

		$('.no-connect-wallet').hide();
		$('.address-tit').show();
		$('.address-info').text(accounts[0]);
		$('.address-info').show();
		$('#pay_now').removeClass('grey');
		$('#pay_now').data('status', '1');
		document.cookie = "address=" + accounts[0];

		if (location.host !== 'bazhuayu.io') {
			if (netVer != '97') {
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
				});
			}
		} else {
			if (netVer != '56') {
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

			}
		}

	});


});



var web3 = getEth();
var contract = new web3.Contract(abi, address); //拍卖合约实例
var contract_sq = new web3.Contract(abi_sq, address_sq); //busd合约实例
// var tokenTypeId = 80000003;
var tokenTypeId = 5010000;

console.log(contract);
console.log(contract_sq);

//获取 tokenId 的 下一个 竞价的 至少 要大于 的 值
// contract.methods.getNextMinimalBid(tokenTypeId).call()
// .then(function(res){
// 	// $('.bid-right-btn span font').text(res);
// 	res = getWeb3().utils.fromWei(res,'ether');
// 	$('.info-your-busd span').text(Number(res)+1);
// })

//用户报价
var userPrice = window.location.search.split('=')[1];
$('.info-your-busd span').text(userPrice);

//获取 拍卖的 详情，包括 时间参数，最高价     等设定
contract.methods._auctions(tokenTypeId).call()
	.then(function (res) {
		// console.log(res);
		var tokenTopBid = getWeb3().utils.fromWei(res.tokenTopBid, 'ether');
		$('.info-busd span').text(tokenTopBid);
	});


//拍卖
$('#pay_now').click(function () {
	var status = $(this).data('status');
	// console.log(status);

	if (status == 1) { //已连接
		var price = $('.bid-payment-right-info .info-your-busd span').text().trim();
		// price = getWeb3().utils.toWei(price,'wei');
		price = getWeb3().utils.toWei(price, 'ether');
		var self_address = $('.address-info').text().trim(); // 自己地址

		//余额
		// contract_sq.methods.balanceOf(self_address).call()
		// .then(function(res){
		// console.log(res)
		// console.log(price)
		// if(Number(price) <= Number(res)){

		//是否授权
		contract_sq.methods.allowance(self_address, address).call()
			.then(function (res) {

				if (res == 0) {
					var num = getWeb3().utils.toWei('999999999999999', 'ether');
					//发起授权
					loading();
					contract_sq.methods.approve(address, num).send({
							from: self_address
						})
						.then(function (res) {
							//发起者 对tokenId 下注 price
							contract.methods.bidToken(tokenTypeId, price).send({
									from: self_address
								})
								.then(function (res) {
									// console.log(res);
									var price = getWeb3().utils.fromWei(res.events.Bid.returnValues.price, 'ether');
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

						});
				} else {
					//发起者 对tokenId 下注 price
					loading();
					contract.methods.bidToken(tokenTypeId, price).send({
							from: self_address
						})
						.then(function (res) {
							// console.log(res);
							var price = getWeb3().utils.fromWei(res.events.Bid.returnValues.price, 'ether');
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
				}

			});

		// }else{
		// 	tips('餘額不足');
		// }

		// });

	}

})