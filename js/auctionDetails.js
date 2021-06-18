var auctionText = chEnText.auction[lang];
var urlid = window.location.search.split("=")[1];
//普通弹窗 
function alert(txt) {
	hsycms.alert('alert', txt, function () {
		hsycms.close('alert');
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
		var html = `<label>${auctionText.haveBid} BUSD</label> <input onblur="baojiaSure(this)" type="text">`;
		$(obj).html(html);
		$(obj).find('input').val('').focus().val(value);
		$(obj).data('status', '1');
	}
}

//
function baojiaSure(obj) {
	var val = $(obj).val().trim();
	var min_value = $(obj).parent('span').data('price').trim();
	var html = `${auctionText.haveBid} BUSD <font style="margin-left:3px;">` + val + `</font>`;
	if (Number(val) >= Number(min_value)) {
		$(obj).parent('span').data('status', '0');
		$(obj).parent('span').html(html);
	} else {
		tips(auctionText.bid);
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
	$('.bid-left video')[0].play();
	$('.video-model video')[0].pause();
}

$('html').click(function () {
	closeVideo();
});

$('.video-model video').click(function (e) {
	e.stopPropagation();
});

function changwWalletId(accounts) {
	if (accounts.length > 0) {
		user_address = accounts[0];
	}
}

function initialization() {
	if (walletType) {
    	var web3 = new Web3(CHAIN.WALLET.provider());
	} else if (window.ethereum) {
		var web3 = new Web3(window.ethereum);
	}
    var chainId = '';
    CHAIN.WALLET.chainId()
        .then(function (res) {
            chainId = web3.utils.hexToNumber(res);

            if (chainId != targetChainId) {
                CHAIN.WALLET.switchRPCSettings(targetChainId);
				// 建议替换成 导航栏 内 切换网络提示
            }
        
            var auctionAddress = contractSetting['auction_contract'][chainId].address;
            // 监听 网络切换 会 让 用户 处于 正确的网络，这里 只负责 配置 当前网络下正确的 合约地址
        	var auctionABI = contractSetting['auction_contract']['abi'];
        
        	auctionContractInstance = new web3.eth.Contract(auctionABI, auctionAddress);
        
            
            // var tokenTypeId = 0;
        	// if (chainId == 97) {
        	// 	tokenTypeId = 80000003; // 测试环境
        	// } else if (chainId == 56) {
        	// 	tokenTypeId = 5010000; // 正式环境 见数据库 config_commodity_basic 对应的 commodity_type_id
        	// } else {
        	// 	tokenTypeId = 0;
        	// }
        
        
        	//获取 tokenId 的 下一个 竞价的 至少 要大于 的 值
        	auctionContractInstance.methods.getNextMinimalBid(tokenTypeId).call()
        		.then(function (res) {
        			res =web3.utils.fromWei(res, 'ether');
        			$('.bid-right-btn span').data('price', res);
        			$('.bid-right-btn span font').text(res);
        		});
        
        
        	//获取 拍卖的 详情，包括 时间参数，最高价     等设定
        	auctionContractInstance.methods._auctions(tokenTypeId).call()
        		.then(function (res) {
        			var tokenTopBid = web3.utils.fromWei(res.tokenTopBid, 'ether');
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
        					if(minLastPeriod - (tokenLastBidTime + callBackPeriod) < 0 && key){
        						endTime = endTime + callBackPeriod;
        					}
        
        					if (currentTime < startTime) { //未开始
        						$('#make_offer').data('status', '0');
        						var time = formatDuring(startTime - currentTime);
        						html += `<span>${auctionText.endPrice}</span><span data-time="0">` + time + `</span>`;
        						var ksTime = setInterval(function () {
        							var js = formatDuring(startTime - Date.now());
        							$('.bid-right-status-time span:nth-child(2)').text(js);
        							if (startTime <= Date.now()) {
        								clearInterval(ksTime);
        							}
        						}, 1000);
        
        					} else if (currentTime >= startTime && currentTime <= endTime) {
        						$('#make_offer').data('status', '1');
        						var time = formatDuring(endTime - currentTime);
        						html += `<span>${auctionText.endPrice}</span><span data-time="1">` + time + `</span>`;
        
        						var syTime = setInterval(function () {
        							var js = formatDuring(endTime - Date.now());
        							$('.bid-right-status-time span:nth-child(2)').text(js);
        							if (endTime <= Date.now()) {
        								clearInterval(syTime);
        							}
        						}, 1000);
        
        					} else {
        						html += `<span>${auctionText.endPrice}</span><span data-time="2">${auctionText.auctionEnd}</span>`;
        						$('.bid-right-btn span').hide();
        						$('#make_offer').hide();
        
        					}
        
        					$('.bid-right-status-time').html(html);
        					//loadingHide();
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
        				var unixTimestamp = web3.utils.hexToNumber(v.timeStamp) * 1000;
        				unixTimestamp = new Date(unixTimestamp);
        				unixTimestamp = unixTimestamp.toLocaleString();
        				var price = web3.utils.fromWei(v.data, 'ether');
        
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
        	// 	$('.bids-list-tit span').val(res);
        	// });
        
        	userBidInfo();
        });
}

function userBidInfo() {
    var userAddress = '';
	CHAIN.WALLET.accounts()
        .then(function (res) {
            if (res.length > 0) {
                userAddress = res[0];
            }
	
        	//获取users 对于 所有 竞拍 下的 所有 竞价
        	if (userAddress != '') {
        		auctionContractInstance.methods.getUserBids(userAddress).call()
        			.then(function (res) {
        				if (!res || res.length < 1) {
        					return false
        				}
        				var text = $('.bid-right-status-time span:nth-child(2)').data('time');
        				var html = ``;
        				var currentPrice = $('.bid-right-status-current span:nth-child(2)').text().trim().split(' ')[1];
        				if (res[0].price > 0) {
        					if (text == 2) {
        						// $('.bid-right-btn span').hide();
        						// $('#make_offer').hide();
        
        						if (res[0]['price'] >= currentPrice) { //当前用户为最高价
        							html += `<span style="color:#9567FF;">${auctionText.topPrice}</span>`;
        							$('.bid-right-btn span').hide();
        							$('#make_offer').data('status', '2');
        							$('#make_offer').text(auctionText.assetLook);
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
        							var u_price = web3.utils.fromWei(res[0]['price'], 'ether');
        							html += `<span>${auctionText.maxmonery}  (BUSD ` + u_price + `)</span>`;
        
        						} else {
        							var u_price = web3.utils.fromWei(res[0]['price'], 'ether');
        							html += `<span style="color:#CB5252;">${auctionText.bidFailure}  (BUSD ` + u_price + `)</span>`;
        						}
        
        					}
        
        				}
        				$('.bid-right-tip').html(html);
        			});
        
        	} else {
        		$('.bid-right-tip').html('');
				$('.bid-right-tip').data('address', '0');
				$('#make_offer').data('sign', 0);
				//window.confirm('錢包連接已失效，請重新連接錢包');
        	}
        });
}


$.ajax({
	url: '/v2/auction/detail?id='+urlid,
	success: function (res) {
		if (res.code == 0) {
			tokenTypeId = res.data.tokenTypeId;
			// var data = res.data.pageResult.records[0];
			var geshi = res.data.primaryPic.substr(res.data.primaryPic.lastIndexOf('.') + 1);
			if (geshi == 'mp4') {
				$('.detail-media').css('display', 'block')
				var html = `<video style="width:100%;" autoplay="autoplay" loop="loop" src="` + res.data.primaryPic + `" onclick="playVideo(this,event)" muted="muted"></video>
							<video class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" src="` + res.data.primaryPic + `" muted="muted"></video>`;

				$('.bid-left').append(html);
			} else {
				var html = `<img src="` + res.data.primaryPic + `" >
							<img class="mohu" src="` + res.data.primaryPic + `" >`;

				$('.bid-left').html(html);
			};

			$('.bid-right-tit').text(res.data.name);
			$('.bid-right-des').html(res.data.introduce.replace(/;\|;/g, '<br>'));
			// $('.details-right-creator-edition').text(`第`+data.edition+`版);
		}
	}
});

$('#make_offer').click(function () {
	var sign = $(this).data('sign');
	var status = $(this).data('status');
	if (sign == 0) {
		window.alert(auctionText.lose);
	} else {
		if (status == 1) {
			var price = $('.bid-right-btn span font').text().trim();
			window.location.href = 'auctionPayment.html?bid=' + price+"&id="+urlid+"&tokenTypeId="+tokenTypeId;
		} else if (status == 2) {
			window.location.href = 'myassets.html';
		} else if (status == 0) {
			window.alert(auctionText.notBegun);
		} else if (sign == 4) {
			let bool = false;
			if (bool) {
				var html = `<div>${auctionText.msg01}</div>
							<a style="font-size:16px; display:block; color:#9567FF; margin-top:5px;" href="https://metamask.io/">${auctionText.msg02}</a>`;
				alert(html);
			}
		}
	}
});

//
$.ajax({
	url: '/v2/user/wallet/info',
	async: false,
	success: function (res) {
		var userAddress = '';
		CHAIN.WALLET.accounts()
        	.then(function (accounts) {
            	if (accounts.length > 0) {
                	userAddress = accounts[0];
					$('.bid-right-tip').data('address', userAddress);	
					if (res.code == 0) {  //1002
						if (res.data.address == null || res.data.address == '') {
							$.ajax({
								url:'/v2/user/wallet/bind',
								type:'POST',
								contentType:'application/json',
								dataType:'json',
								data:JSON.stringify({
									address:userAddress,
									walletType:'TOKEN POCKET'
								}),
								success:function(res){
									if(res.code==0){
										// document.cookie="isConnect=true";
										setCookie('isConnect',true)
										if (c) {
											c();
										}else{
											window.location.href = document.referrer;
										}
									}else{
										tips(res.message)
									}
								}
							});
						} else if (userAddress != res.data.address){
							window.alert(auctionText.msg01 + res.data.address+"\n"+auctionText.msg02);
						};

						$('#make_offer').data('sign', 1);
					} else {
						$('#make_offer').data('sign', 0);
					}
				} else {
					$('.bid-right-tip').data('address', '0');
					$('#make_offer').data('sign', 0);
					// tips('未登入，請登入');
				}
			})
	}
});

var walletType = getCookie(CHAIN.WALLET.__wallet__);


if (walletType || window.ethereum) {
	loading();
    initialization()
    loadingHide()
    function networkChangedImplement() {
	    initialization();
    }
	
	CHAIN.WALLET.networkChangedAssign(networkChangedImplement);

	function accountsChangedImplement(accounts) {
		userBidInfo();
	}

	CHAIN.WALLET.accountsChangedAssign(accountsChangedImplement);

} else { 
	$('#make_offer').data('sign', 0);
	window.alert(auctionText.walletLose);
}
