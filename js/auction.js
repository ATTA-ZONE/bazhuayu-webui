var channelId = window.location.search.split("=")[1];
var artworkText = chEnText.artwork[lang];
//获取时间
function formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((mss % (1000 * 60)) / 1000);
	if(days==0){
		return (hours<10?'0'+hours:hours) + " hours " + (minutes<10?'0'+minutes:minutes) + " m " + (seconds<10?'0'+seconds:seconds) + " s ";
	}else{
		return days + "days " + hours + ":" + minutes + ":" + seconds
	}
}

function getArtworkList(current,pageSize,name,typeId){
	var data = {
		current,
		pageSize,
		name,
		// typeId,
		// channelId
	};
	
	
	$.ajax({
		url:base_url+'/v2/auction/pageList',
		data:data,
		success: function (res) {
			if (res.code == 0) {
				let records = res.data.pageResult.records;
				let html = '';
				var systemTime = res.data.systemTime;
				
				if(res.data.pageResult.total>9 && data.length==9){
					$('.bzy-e-more').show();
				}else{
					$('.bzy-e-more').hide();
				};
				
				if(records.length<=3){
					$('.bzy-e-list').addClass('bzy-e-list-flex');
				}else{
					$('.bzy-e-list').removeClass('bzy-e-list-flex');
				};
				
				if(records.length==0){
					html += `<li class="nothing-artwork">
					<div>暫無搜索結果</div></li>`;
					$('.bzy-e-list').css('padding-top','100px');
				}else{
					 
					$.each(records,function(i,v){
						var timeStatus;
						var geshi = v.primaryPic.substr(v.primaryPic.lastIndexOf('.')+1);
						
						if(v.name==artworkText.xdd){
							v.edition = 200;
						}
						
						if(v.endEdition - v.edition > 0){   //有库存
							
							if(systemTime < v.saleStartTimeMillis){
								timeStatus = 1;    //未到销售时间
							}else if(systemTime >= v.saleStartTimeMillis && systemTime <=  v.saleEndTimeMillis){
								timeStatus = 2;  //在销售时间内
							}else{
								timeStatus = 3;   //过了销售时间
							};
							
						}else{
							timeStatus = 0;    //没有库存
						}
						
						html += 
						`<li style="width:100%;margin-right:0">
							<a class="artwork-mask pcstyle" href="auctionDetails.html?id=`+v.id+`"><div class="artwork-mask-wrap"></div>`;
						
						if(geshi=='mp4'){
							
						  html+=`<video x5-video-player-type="h5" x5-video-player-fullscreen="true" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" style="width:100%;z-index=10" autoplay="autoplay" loop="loop" src="`+v.primaryPic+`" muted="muted"></video>`;
							
						}else{
							
						  html+=`<img class="bzy-e-list-img" src="`+v.primaryPic+`" >`;
						  
						}
						
									
						if(timeStatus==0){
							
						html +=	`<div class="bzy-e-list-info pcstyle2">
									<div class="bzy-e-list-info-tit">`+v.name+`</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="./images/t8.png"></div>
										<span>@ATTA</span>
										<span style="margin-left:32px">${artworkText.ban + v.edition + artworkText.ban2}</span>
									</div>
									<div class="bid-right-des">${v.introduce.replace(/;\|;/g, '<br>')}</div>`;
							
							html +=`<div class="bid-right-status">
										<div class="bid-right-status-current flex bid-right-status-current${v.tokenTypeId}"><span>${artworkText.bidding}</span><span>BUSD 0</span></div>
										<div class="bid-right-status-time flex bid-right-status-time${v.tokenTypeId}"><span>${artworkText.endtime}</span><span>00 : 00 : 00</span></div>
									</div></div></a></li>`;
							
						}else if(timeStatus==1){
						
						html +=	`<div class="bzy-e-list-info pcstyle2">
									<div class="bzy-e-list-info-tit">`+v.name+`</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="./images/t8.png"></div>
										<span>@ATTA</span>
										<span style="margin-left:32px">${artworkText.ban + v.edition + artworkText.ban2}</span>
									</div>
									<div class="bid-right-des">${v.introduce.replace(/;\|;/g, '<br>')}</div>`;
							html +=`<div class="bid-right-status">
										<div class="bid-right-status-current flex bid-right-status-current${v.tokenTypeId}"><span>${artworkText.bidding}</span><span>BUSD 0</span></div>
										<div class="bid-right-status-time flex bid-right-status-time${v.tokenTypeId}"><span>${artworkText.endtime}</span><span>00 : 00 : 00</span></div>
									</div></div></a></li>`;
						
						}else if(timeStatus==2){
						html +=	`<div class="bzy-e-list-info pcstyle2">
									<div class="bzy-e-list-info-tit">`+v.name+`</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="./images/t8.png"></div>
										<span>@ATTA</span>
										<span style="margin-left:32px">${artworkText.ban + v.edition + artworkText.ban2}</span>
									</div>
									<div class="bid-right-des">${v.introduce.replace(/;\|;/g, '<br>')}</div>`;
									
							html +=`<div class="bid-right-status">
										<div class="bid-right-status-current flex bid-right-status-current${v.tokenTypeId}"><span>${artworkText.bidding}</span><span>BUSD 0</span></div>
										<div class="bid-right-status-time flex bid-right-status-time${v.tokenTypeId}"><span>${artworkText.endtime}</span><span>00 : 00 : 00</span></div>
									</div></div></a></li>`;
						}else if(timeStatus==3){
						html +=	`<div class="bzy-e-list-info pcstyle2">
									<div class="bzy-e-list-info-tit">`+v.name+`</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="./images/t8.png"></div>
										<span>@ATTA</span>
										<span style="margin-left:32px">${artworkText.ban + v.edition + artworkText.ban2}</span>
									</div>
									<div class="bid-right-des">${v.introduce.replace(/;\|;/g, '<br>')}</div>`;
							html +=`<div class="bid-right-status">
										<div class="bid-right-status-current flex bid-right-status-current${v.tokenTypeId}"><span>${artworkText.bidding}</span><span>BUSD 0</span></div>
										<div class="bid-right-status-time flex bid-right-status-time${v.tokenTypeId}"><span>${artworkText.endtime}</span><span>00 : 00 : 00</span></div>
									</div></div></a></li>`;
						};   
					});
					
					$('.bzy-e-list').css('padding-top','0');
				}
				$('.bzy-e-list').append(html);	
				$.each(records,function(i,v){
					initialization(v.tokenTypeId);	
				})
				
			} else {
			}
		},
		error: function (err) {
		}
	})
	
}

function initialization(tokenTypeId) {
	var walletType = getCookie(CHAIN.WALLET.__wallet__);
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
        
        
        	// //获取 tokenId 的 下一个 竞价的 至少 要大于 的 值
        	// auctionContractInstance.methods.getNextMinimalBid(tokenTypeId).call()
        	// 	.then(function (res) {
        	// 		res =web3.utils.fromWei(res, 'ether');
        	// 		$('.bid-right-btn span').data('price', res);
        	// 		$('.bid-right-btn span font').text(res);
        	// 	});
        
        
        	//获取 拍卖的 详情，包括 时间参数，最高价     等设定
			let classname1 = '.bid-right-status-current' + tokenTypeId + ' span:nth-child(2)';
			let classname2 = '.bid-right-status-time' + tokenTypeId + ' span:nth-child(2)';
			let classname3 = '.bid-right-status-time' + tokenTypeId;
        	auctionContractInstance.methods._auctions(tokenTypeId).call()
        		.then(function (res) {
        			var tokenTopBid = web3.utils.fromWei(res.tokenTopBid, 'ether');
        			$(classname1).text('BUSD ' + tokenTopBid);
        
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
        						var time = formatDuring(startTime - currentTime);
        						html += `<span>${artworkText.starttime}</span><span data-time="0">` + time + `</span>`;
        						var ksTime = setInterval(function () {
        							var js = formatDuring(startTime - Date.now());
        							$(classname2).text(js);
        							if (startTime <= Date.now()) {
        								clearInterval(ksTime);
        							}
        						}, 1000);
        
        					} else if (currentTime >= startTime && currentTime <= endTime) {
        						var time = formatDuring(endTime - currentTime);
        						html += `<span>${artworkText.endtime}</span><span data-time="1">` + time + `</span>`;
        
        						var syTime = setInterval(function () {
        							var js = formatDuring(endTime - Date.now());
        							$(classname2).text(js);
        							if (endTime <= Date.now()) {
        								clearInterval(syTime);
        							}
        						}, 1000);
        
        					} else {
        						html += `<span>${artworkText.endtime}</span><span data-time="2">${artworkText.auctionEnd}</span>`;
        
        					}
        
        					$(classname3).html(html);
        					//loadingHide();
        				})
        
        		});
        
        });
}



// 获取类型
function getTypeList(){
	$.ajax({
		url:base_url+`/v2/commodity/type/list?channelId=${channelId}`,
		success:function(res){
			if(res.code==0){
				var html_pc = ``;
				var html_mobile = ``;
				$.each(res.data.types,function(i,v){
					html_pc += `<span data-type="`+v.id+`" onclick=typeToggle(this)>`+v.name+`</span>`;
					html_mobile += `<li data-type="`+v.id+`">`+v.name+`</li>`;
				});
				
				$('.bzy-d-head-left').append(html_pc);
				$('.bzy-d-head-left-mobile-list ul').append(html_mobile);
			}
		}
	})	
}


function typeToggle(obj){
	$('.bzy-d-head-left span').removeClass('current');
	$(obj).addClass('current');
	var typeId = $(obj).data('type');
	$('.artwork-list-load').data('type',typeId);
	if(typeId==-1){
		typeId = null;
	}
	$('.bzy-e-list').html('');
	getArtworkList(1,9,'',typeId);
}

$(function(){
	var current = 1;
	getArtworkList(current,9,'',null);
	getTypeList();
	$('.artwork-list-load').click(function(){
		current ++;
		var typeId = $(this).data('type');
		var name = $(this).data('name');
		typeId == -1?typeId = null:typeId = typeId;
		getArtworkList(current,9,name,typeId);

	});
	
	$('.bzy-d-head-left-mobile-show').click(function(e){
		e.stopPropagation();
		if($(this).data('status')=='0'){
			$('.bzy-d-head-left-mobile-list').slideDown('fast');
			$(this).data('status','1');
		}else if($(this).data('status')=='1'){
			$('.bzy-d-head-left-mobile-list').slideUp('fast');
			$(this).data('status','0');
		}
	});
	
	$('body').click(function(){
		$('.bzy-d-head-left-mobile-list').slideUp('fast');
		$('.bzy-d-head-left-mobile-show').data('status','0');
	})
	
	setTimeout(function(){
		$('.bzy-d-head-left-mobile-list ul li').on('click',function(e){
			e.stopPropagation();
			var text = $(this).text().trim();
			$('.bzy-d-head-left-mobile-show span').text(text);
			$('.bzy-d-head-left-mobile-list').slideUp('fast');
			$('.bzy-d-head-left-mobile-show').data('status','0');
			
			var typeId = $(this).data('type');
			$('.artwork-list-load').data('type',typeId);
			if(typeId==-1){
				typeId = null;
			}
			$('.bzy-e-list').html('');
			getArtworkList(1,9,'',typeId);
			// getArtworkList(1,9);
		});
	},200)
	
	
	
	// 搜索
	$('.bzy-search input').on('keypress',function(e){
		var name = $(this).val().trim();
		$('.artwork-list-load').data('name',name);
		if(e.keyCode==13){
			$('.bzy-e-list').html('');
			getArtworkList(1,9,name,null);
			$(this).val('')
		}
	})
	
	
	var mobile_width = $(window).width();
	if(mobile_width<=992){
		$('.bzy-d-head-right img').click(function(){

			$('.bzy-d-head-right').css('width','200px');
			$('.bzy-d-head-right img').css('margin-right','15px');
			$('.bzy-d-head-right input').css('width','100%')
			$(this).data('status','1');

		});
		
		$('.bzy-search input').on('blur',function(e){
			$('.bzy-d-head-right').css('width','24px');
			$('.bzy-d-head-right img').css('margin-right','0');
			$('.bzy-d-head-right input').css('width','0')
			$(this).data('status','0');
			
		})
		
		
		$('.bzy-search input').on('input',function(e){
			var name = $(this).val().trim();
			$('.artwork-list-load').data('name',name);
			// if(e.keyCode==13){
			$('.bzy-e-list').html('');
			getArtworkList(1,9,name,null);
			// $(this).val('');
			// }
		})
		
	};
})