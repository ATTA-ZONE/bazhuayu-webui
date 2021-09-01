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
var ajaxList;
function getArtworkList(current,pageSize,name,typeId){
	var data = {
		current,
		pageSize,
		name,
		typeId,
		channelId
	};
	
	
	$.ajax({
		url:base_url+'/v2/commodity/list',
		data:data,
		success: function (res) {
			if (res.code == 0) {
				let records = res.data.pageResult.records;
				ajaxList = res.data.pageResult.records;
				let html = '';
				var systemTime = res.data.systemTime;
				if(res.data.pageResult.total>9 && res.data.pageResult.pages > current){
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
						// 徐冬冬特殊处理
						// if(v.name==artworkText.xdd){
						// 	v.edition = 200;
						// }
						
						if(v.endEdition - v.edition >= 0){   //有库存
							
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
						
						if(geshi=='mp4'){
							// if(v.secondPic){
							// 	html +=  `<li><a class="artwork-mask" href="${v.releaseType == 2 ? 'auctionDetails.html?id='+v.id : 'artworkDetails.html?id='+v.id}"><div class="artwork-mask-wrap"></div>`;
							// 	html+=`<img class="bzy-e-list-img" src="`+v.secondPic+`" >`;
							// }else{
								html +=  '<li><i onclick="openVideo(' + i + ')"></i>';
								html +=  `<a class="artwork-mask videoPlay" href="${v.releaseType == 2 ? 'auctionDetails.html?id='+v.id : 'artworkDetails.html?id='+v.id}"><div class="artwork-mask-wrap"></div>`;
								
								html+=`<img class="bzy-e-list-img" src="`+v.secondPic+`" >`;
								// html+=`<video x5-video-player-type="h5" x5-video-player-fullscreen="true" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" style="width:100%;z-index=10" loop="loop" poster="`+v.secondPic+`" src="`+v.primaryPic+`" muted="muted"></video>`;
							// }
						}else{
							html +=  `<li><a class="artwork-mask" href="${v.releaseType == 2 ? 'auctionDetails.html?id='+v.id : 'artworkDetails.html?id='+v.id}"><div class="artwork-mask-wrap"></div>`;
						  html+=`<img class="bzy-e-list-img" src="`+(v.secondPic?v.secondPic:v.primaryPic)+`" >`;
						}
						
									
						if(timeStatus==0){
						html +=	`<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+v.name+`</div>
									<div class="bzy-e-list-info-price flex">
										<span>HK$ `+moneyFormat(v.hkdPrice)+` </span>
										<span>BUSD `+moneyFormat(v.price)+` </span>
									</div>`;
							
							html +=`<div class="bzy-e-list-info-sale flex">
										<span style="color:#CF3737;">${artworkText.sellOut}</span>
									</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="./images/t8.png"></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText.purchaseNow}  -></span>`;
										if (v.releaseType == 2) {
											html += `<span class="pmstatus">${artworkText.auction}</span>`;
										}
								html += `</div></div></a></li>`;
							
						}else if(timeStatus==1){
						
						html +=	`<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+v.name+`</div>
									<div class="bzy-e-list-info-price flex">
										<span>HK$ `+moneyFormat(v.hkdPrice)+` </span>
										<span>BUSD `+moneyFormat(v.price)+` </span>
									</div>`;
							html +=`<div class="bzy-e-list-info-sale flex">
										<span>${artworkText.preSale}</span>
									</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="./images/t8.png" ></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText.purchaseNow}  -></span>`;
									if (v.releaseType == 2) {
										html += `<span class="pmstatus">${artworkText.auction}</span>`;
									}
							html += `</div></div></a></li>`;
						
						// html += `<div class="bzy-e-list-yushou flex"><span>發售預告</span><span>`+v.name+`</span></div>`;
						
						// html += `</a></li>`;
						
						}else if(timeStatus==2){
						html +=	`<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+v.name+`</div>
									<div class="bzy-e-list-info-price flex">
										<span>HK$ `+moneyFormat(v.hkdPrice)+` </span>
										<span>BUSD `+moneyFormat(v.price)+` </span>
									</div>`;
									
							html +=`
									<div class="bzy-e-list-info-creator flex">
										<div><img src="./images/t8.png" ></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText.purchaseNow}  -></span>`;
										if (v.releaseType == 2) {
											html += `<span class="pmstatus">${artworkText.auction}</span>`;
										}
							html += `</div></div></a></li>`;
						}else if(timeStatus==3){
							if(v.releaseType == 2){
								html +=	`<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+v.name+`</div>
									<div class="bzy-e-list-info-price flex">
										<span>BUSD `+(v.id==5?moneyFormat(22000):moneyFormat(v.price))+` </span>
									</div>`;
							html +=`<div class="bzy-e-list-info-sale flex">
										<span>${artworkText.auctionClosed}</span>
									</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="./images/t8.png" ></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText.purchaseNow}  -></span>`;
										if (v.releaseType == 2) {
											html += `<span class="pmstatus">${artworkText.auction}</span>`;
										}
										html += `</div></div></a></li>`;
							}else{
								html +=	`<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+v.name+`</div>
									<div class="bzy-e-list-info-price flex">
										<span>HK$ `+moneyFormat(v.hkdPrice)+` </span>
										<span>BUSD `+moneyFormat(v.price)+` </span>
									</div>`;
							html +=`<div class="bzy-e-list-info-sale flex">
										<span>${artworkText.salesClosed}</span>
									</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="./images/t8.png" ></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText.purchaseNow}  -></span>`;
										if (v.releaseType == 2) {
											html += `<span class="pmstatus">${artworkText.auction}</span>`;
										}
										html += `</div></div></a></li>`;
							}
						};   
					});
					
					$('.bzy-e-list').css('padding-top','0');
				}
				$('.bzy-e-list').append(html);	
					
				
			} else {
			}
			
		throttle(resizehandler,window);
		},
		error: function (err) {
		}
	})
	
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

	$(window).resize(function(){
		throttle(resizehandler,window);
 	});
	
})

// 当前点击的第几个数据
function openVideo(e){
	let nowData = $('.bzy-e-list').children()[e];//获取当前的li标签
	let nowImgVideo = $(nowData).children()[1];//获取当前a标签
	let imgVideo = $(nowImgVideo).children();//获取a标签下所有子节点
	if(!nowData.className){//当前节点未打开视频
		$($(nowData).children()[0]).addClass('unplay');
		$(nowData).addClass('openVideo');//添加类名，标识此节点视频是否打开
		imgVideo[1].remove();//删除img标签
		$(imgVideo[0]).after(`<video x5-video-player-type="h5" x5-video-player-fullscreen="true" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" style="width:100%;z-index=10" loop="loop" autoPlay="autoplay" poster="`+ajaxList[e].secondPic+`" src="`+ajaxList[e].primaryPic+`" muted="muted"></video>`);//插入节点
	}else{
		$($(nowData).children()[0]).removeClass('unplay');
		$(nowData).removeClass('openVideo');//添加类名，标识此节点视频是否打开
		imgVideo[1].remove();//删除video标签
		$(imgVideo[0]).after(`<img class="bzy-e-list-img" src="`+ajaxList[e].secondPic+`" >`)
		$(imgVideo[1]).height($(nowData).width());
	}
	setTimeout(function(){
		nowData = $('.bzy-e-list').children()[e];//获取当前的li标签
		nowImgVideo = $(nowData).children()[1];//获取当前a标签
		imgVideo = $(nowImgVideo).children();//获取a标签下所有子节点
		$(imgVideo[1]).height($(nowData).width());
		console.log(imgVideo);
	})
}
// 函数节流
function throttle(method,context){
	clearTimeout(method.tId);
	method.tId=setTimeout(function(){
			method.call(context);
	},500);
}

// 图片尺寸变为正方形
function resizehandler(){
	let nowData = $('.bzy-e-list').children();//获取当前的li标签
	if(nowData.length > 0){//首次加载dom节点可能未加载
		for(let i=0;i<nowData.length;i++){
			let nowImgVideo = $($('.bzy-e-list').children()).children()[i];//获取当前a标签
			let imgVideo = $(nowImgVideo).children();//获取a标签下所有子节点
			$(imgVideo[1]).height($(nowData[i]).width());
			console.log(imgVideo);
		}
	}
}