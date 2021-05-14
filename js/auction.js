//普通弹窗 
function alert(txt) {
	hsycms.alert('alert', txt, function () {
		hsycms.close('alert');
		// console.log("点击了确定");
		// window.open('https://metamask.io/');
	})
}

//日前转换格式
Date.prototype.toLocaleString = function () {
	return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + " " + (this.getHours() < 10 ? '0' + this.getHours() : this.getHours()) + ":" + (this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes()) + ":" + (this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds());
};

//获取时间
function formatDuring(mss) {
	var days = parseInt(mss / (1000 * 60 * 60 * 24));
	var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = parseInt((mss % (1000 * 60)) / 1000);
	return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}

function compare(property, desc) {
	return function (a, b) {
		var value1 = a[property];
		var value2 = b[property];
		if (desc == true) {
			// 升序排列
			return value1 - value2;
		} else {
			// 降序排列
			return value2 - value1;
		}
	}
}


//
function baojia(obj) {
	var status = $(obj).data('status');
	if (status == 0) {
		var value = $(obj).find('font').text().trim();
		var html = `<label>我的出價 BUSD</label> <input onblur="baojiaSure(this)" type="text">`;
		$(obj).html(html);
		$(obj).find('input').val('').focus().val(value);
		$(obj).data('status', '1');
	}
}

//
function baojiaSure(obj) {
	var val = $(obj).val().trim();
	var min_value = $(obj).parent('span').data('price').trim();
	var html = `我的出價 BUSD <font style="margin-left:3px;">` + val + `</font>`;
	if (Number(val) >= Number(min_value)) {
		$(obj).parent('span').data('status', '0');
		$(obj).parent('span').html(html);
	} else {
		tips('報價不能低於初始出價');
	}
}


// 播放视频
function playVideo(obj, e) {
	e.stopPropagation();
	$(obj)[0].pause();
	var src = $(obj).attr('src');
	$('.video-model video').attr('src', src);
	$('.video-model video')[0].play();
	$('.video-mask').fadeIn('fast');
	$('.video-model').fadeIn('fast');
}

function closeVideo() {
	$('.video-mask').hide();
	$('.video-model').hide();
	$('.bid-left video:nth-child(1)')[0].play();
	$('.video-model video')[0].pause();
}

$('html').click(function () {
	closeVideo();
})

$('.video-model video').click(function (e) {
	e.stopPropagation();
});

function changwWalletId(accounts) {
	if (accounts.length > 0) {
		user_address = accounts[0]
	}
}

function initialization() {
	var netVer = ethereum.networkVersion;
	console.log(netVer);
	// var netVer = netVers[0];
	if (netVer != targetChainId.toString()) {
		changeNetwork(targetChainId)
	}

	// var netVer = netVers[0];
	var auctionAddress = c_auction[netVer].address; // 监听 网络切换 会 让 用户 处于 正确的网络，这里 只负责 配置 当前网络下正确的 合约地址
	var auctionABI = c_auction['abi'];

	var web3 = getEth();
	auctionContractInstance = new web3.Contract(auctionABI, auctionAddress);
	console.log(auctionContractInstance);


	if (netVer == 97) {
		var tokenTypeId = 80000003; // 测试环境
	} else if (netVer == 56) {
		var tokenTypeId = 5010000; // 正式环境 见数据库 config_commodity_basic 对应的 commodity_type_id
	} else {
		var tokenTypeId = '';
	}


	//获取 tokenId 的 下一个 竞价的 至少 要大于 的 值
	auctionContractInstance.methods.getNextMinimalBid(tokenTypeId).call()
		.then(function (res) {
			// console.log(res);
			res = getWeb3().utils.fromWei(res, 'ether');
			$('.bid-right-btn span').data('price', res);
			$('.bid-right-btn span font').text(res);
		})


	//获取 拍卖的 详情，包括 时间参数，最高价     等设定
	auctionContractInstance.methods._auctions(tokenTypeId).call()
		.then(function (res) {
			// console.log(res);
			var tokenTopBid = getWeb3().utils.fromWei(res.tokenTopBid, 'ether');
			$('.bid-right-status-current span:nth-child(2)').text('BUSD ' + tokenTopBid);

			var currentTime = Date.now(); //当前时间  ms
			var startTime = parseInt(res.startTime) * 1000; //拍卖开始时间  ms
			var minLastPeriod = parseInt(res.minLastPeriod) * 1000; //拍卖持续时间  ms
			var tokenLastBidTime = parseInt(res.tokenLastBidTime) * 1000; //最高竞价者 的竞价时间 ms
			var callBackPeriod = parseInt(res.callBackPeriod) * 1000; //每有一次新竞价的 续命 时间 ms
			var endTime = startTime + minLastPeriod;
			var html = ``;

			auctionContractInstance.methods.auctionOpenBid(tokenTypeId).call()
				.then(function (key) {
					// console.log(res)
					// if(minLastPeriod - (tokenLastBidTime + callBackPeriod) < 0 && key){
					// 	endTime = endTime + callBackPeriod;
					// }

					if (currentTime < startTime) { //未开始
						$('#make_offer').data('sign', '3');
						var time = formatDuring(startTime - currentTime);
						html += `<span>拍賣開始時間：</span><span data-time="0">` + time + `</span>`;
						var ksTime = setInterval(function () {
							var js = formatDuring(startTime - Date.now());
							$('.bid-right-status-time span:nth-child(2)').text(js);
							if (startTime <= Date.now()) {
								clearInterval(ksTime);
							}
						}, 1000);

					} else if (currentTime >= startTime && currentTime <= endTime) {
						$('#make_offer').data('sign', '1');
						var time = formatDuring(endTime - currentTime);
						html += `<span>拍賣剩餘時間：</span><span data-time="1">` + time + `</span>`;

						var syTime = setInterval(function () {
							var js = formatDuring(endTime - Date.now());
							$('.bid-right-status-time span:nth-child(2)').text(js);
							if (endTime <= Date.now()) {
								clearInterval(syTime);
							}
						}, 1000);

					} else {
						html += `<span>拍賣剩餘時間：</span><span data-time="2">競標結束</span>`;
						$('.bid-right-btn span').hide();
						$('#make_offer').hide();

					}

					$('.bid-right-status-time').html(html);
					loadingHide();
				})

		});

	$.ajax({
		url: scansite_base_url + '/api?module=logs&action=getLogs&address=' + auctionAddress.toString() + '&topic0=0x19421268847f42dd61705778018ddfc43bcdce8517e7a630acb12f122c709481&apikey=' + scansite_apiKey,
		success: function (res) {
			var bidData = res.result;
			var html = ``;
			var newData = [];
			for (var i = 0; i < bidData.length; i++) {
				newData.unshift(bidData[i]);
			};

			$('.bids-list-tit font').text(bidData.length);

			$.each(newData, function (i, v) {
				var unixTimestamp = getWeb3().utils.hexToNumber(v.timeStamp) * 1000;
				unixTimestamp = new Date(unixTimestamp);
				unixTimestamp = unixTimestamp.toLocaleString();
				// console.log(unixTimestamp);
				var price = getWeb3().utils.fromWei(v.data, 'ether');

				var u_add = v.topics[1].split('000000000000000000000000').join('');
				html += `<li class="flex">
								<div class="bids-list-person flex">
									<div class="bids-list-person-name">By ` + u_add + `</div>
								</div>
								<div class="bids-list-time">` + unixTimestamp + `</div>
								<div class="bids-list-busd">$BUSD <span>` + price + `</span></div>
							</li>`;

			});

			$('.bids-list ul').html(html);

		}
	});


	//获取 tokenId 下  竞价 数量
	// contract.methods.getBidsLength(tokenTypeId).call()
	// .then(function(res){
	// 	// console.log(res);
	// 	$('.bids-list-tit span').val(res);
	// });

	userBidInfo();

}

function userBidInfo() {
	var user_address = ethereum.selectedAddress;
	//获取users 对于 所有 竞拍 下的 所有 竞价
	if (user_address != 0) {
		auctionContractInstance.methods.getUserBids(user_address).call()
			.then(function (res) {
				// console.log(res);
				var text = $('.bid-right-status-time span:nth-child(2)').data('time');
				var html = ``;
				var currentPrice = $('.bid-right-status-current span:nth-child(2)').text().trim().split(' ')[1];
				// console.log(currentPrice);
				if (res[0].price > 0) {
					if (text == 2) {
						// $('.bid-right-btn span').hide();
						// $('#make_offer').hide();

						if (res[0]['price'] >= currentPrice) { //当前用户为最高价
							html += `<span style="color:#9567FF;">恭喜！ 您是出價最高者！</span>`;
							$('.bid-right-btn span').hide();
							$('#make_offer').data('sign', '2');
							$('#make_offer').text('去我的資產查看');
						}
						// else{
						// 	$('.bid-right-btn span').hide();
						// 	$('#make_offer').hide();
						// }
					} else if (text == 0) {
						// $('#make_offer').data('sign','3');
						html += '';
					} else {

						// $('#make_offer').data('sign','1');

						if (res[0]['price'] >= currentPrice) { //当前用户为最高价
							var u_price = getWeb3().utils.fromWei(res[0]['price'], 'ether');
							html += `<span>您是當前最高出價者  (BUSD ` + u_price + `)</span>`;

						} else {
							var u_price = getWeb3().utils.fromWei(res[0]['price'], 'ether');
							html += `<span style="color:#CB5252;">您上次競標失敗  (BUSD ` + u_price + `)</span>`;
						}

					}

				}
				$('.bid-right-tip').html(html);
			});

	} else {
		$('.bid-right-tip').html('');
	}
}


$.ajax({
	url: '/v2/auction/list',
	success: function (res) {
		// console.log(res);
		if (res.code == 0) {
			var data = res.data.pageResult.records[0];
			var geshi = data.primaryPic.substr(data.primaryPic.lastIndexOf('.') + 1);
			if (geshi == 'mp4') {
				var html = `<video style="width:100%;" autoplay="autoplay" loop="loop" src="` + data.primaryPic + `" onclick="playVideo(this,event)" muted="muted"></video>
							<video class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" src="` + data.primaryPic + `" muted="muted"></video>`;

				$('.bid-left').html(html);
			} else {
				var html = `<img src="` + data.primaryPic + `" >
							<img class="mohu" src="` + data.primaryPic + `" >`;

				$('.bid-left').html(html);
			};

			$('.bid-right-tit').text(data.name);
			$('.bid-right-des').html(data.introduce.replace(/;\|;/g, '<br>'));
			// $('.details-right-creator-edition').text(`第`+data.edition+`版);
		}
	}
});

$('#make_offer').click(function () {
	var sign = $(this).data('sign');
	if (sign == 0) {
		tips('未登入，請登入');
	} else if (sign == 1) {
		var price = $('.bid-right-btn span font').text().trim();
		window.location.href = 'auctionPayment.html?bid=' + price;
	} else if (sign == 2) {
		window.location.href = 'myassets.html';
	} else if (sign == 3) {
		tips('拍賣未開始');
	} else if (sign == 4) {
		var html = `<div>請先安裝MetaMask，以保證拍賣功能的使用</div>
					<a style="font-size:16px; display:block; color:#9567FF; margin-top:5px;" href="https://metamask.io/">轉到MetaMask的網站</a>`;
		alert(html);
	}
});

//
$.ajax({
	url: '/v2/user/wallet/info',
	async: false,
	success: function (res) {
		// console.log(res)
		if (res.code == 0) {
			if (res.data.address == null || res.data.address == '') {
				$('.bid-right-tip').data('address', '0');
			} else {
				$('.bid-right-tip').data('address', res.data.address)
			}

			$('#make_offer').data('sign', 1);

		} else {
			$('.bid-right-tip').data('address', '0');
			$('#make_offer').data('sign', 0);
			// tips('未登入，請登入');
		}
	}
})

function networkChangedImplement() {
	initialization();
}


if (typeof window.ethereum !== 'undefined') {
	// $('#make_offer').data('sign','0');
	loading();
	setTimeout(function () {
		loadingHide();
	}, 1800);

	initialization()

	
	networkChangedAssign(networkChangedImplement);

	var user_address = ethereum.selectedAddress;

	function accountsChangedImplement(accounts) {
		if (accounts.length > 0) user_address = accounts[0];
		console.log(['accountsChanged', accounts]);
		userBidInfo();
	}

	accountsChangedAssign(accountsChangedImplement);

} else {
	$('#make_offer').data('sign', '4');
	var html = `<div>請先安裝MetaMask，以保證拍賣功能的使用</div>
				<a style="font-size:16px; display:block; color:#9567FF; margin-top:5px;" href="https://metamask.io/">轉到MetaMask的網站</a>`;
	alert(html);
}