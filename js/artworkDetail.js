
var param = window.location.search.substr(1);
parm = param.split('&');
var arr = [];
for (var key in parm){
	arr.push({
		key:parm[key].split('=')
	});
}

var id,prev,success_status;

$.each(arr,function(i,v){
	if(v.key[0]=='id'){
		id = v.key[1];
	}else if(v.key[0]=='prev'){
		prev = v.key[1];
	}else if(v.key[0]=='success'){
		success_status = v.key[1]
	}
})

// console.log(success);


// console.log(id);


//下单
function orderTakePc(){
	var data = {
		configCommodityId:id,
		buyCount:1
	};
	$.ajax({
		url:base_url+'/v2/order/order/take',
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data:JSON.stringify(data),
		success:function(res){
			// console.log(res);
			if(res.code==0){
				$('.order-number span').text(res.data.orderNo);
				payment();
			}else{
				tips(res.message);
			}
		}
		
	})
}

//下单
function orderTakeMobile(){
	var data = {
		configCommodityId:id,
		buyCount:1
	};
	$.ajax({
		url:base_url+'/v2/order/order/take',
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data:JSON.stringify(data),
		success:function(res){
			// console.log(res);
			if(res.code==0){
				$('.order-number span').text(res.data.orderNo);
				$('.payment').addClass('payment-active')
			}else{
				tips(res.message);
			}
		}
		
	})
}

// 播放视频
function playVideo(obj,e){
	e.stopPropagation();
	$(obj).siblings('video')[0].pause();
	var src = $(obj).siblings('video')[0].attr('src');
	$('.video-model video').attr('src',src);
	$('.video-model video')[0].play();
	$('.video-mask').fadeIn('fast');
	$('.video-model').fadeIn('fast');
}

function closeVideo(){
	$('.video-mask').hide();
	$('.video-model').hide();
	$('.details-left video')[0].play();
	$('.video-model video')[0].pause();
}


//询问弹窗
function confirm(){
	hsycms.confirm('confirm','去我的資產核對',
		function(res){            
			hsycms.success('success','確認');
			setTimeout(function(){
				window.location.href = 'myassets.html';
			},1500)
		},
		function(res){
			hsycms.error('error','取消');
		},
	)
};



$('html').click(function(){
	closeVideo();
})

$('.video-model video').click(function(e){
	e.stopPropagation();
})


//获取时间
function formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((mss % (1000 * 60)) / 1000);
    return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}


$(function(){
	
	if(prev=='1'){
		$('.pre-mask').show();
	}else{
		$('.pre-mask').hide();
	}
	
	if(success_status==1){
		success('支付成功',1800);
		setTimeout(function(){
			confirm();
		},1800)
		
	}else if(success_status==0){
		error('支付失敗',1800);
	}
	
	//商品详情业加载
	$.ajax({
		url:base_url+'/v2/commodity/info',
		data:{id:id,forceLang:'TC'},
		success:function(res){
			console.log(res);
			if(res.code==0){
				var content = res.data.content;
				var saleStartTimeMillis = res.data.saleStartTimeMillis;  //开始销售时间
				var saleEndTimeMillis = res.data.saleEndTimeMillis;  //销售结束时间
				var systemTime = res.data.systemTime;  //当前时间
				var geshi = res.data.primaryPic.substr(res.data.primaryPic.lastIndexOf('.')+1);   //onclick=playVideo(this,event)
				if(geshi=='mp4'){
					var html = `<video style="width:100%;" autoplay="autoplay" loop="loop" src="`+res.data.primaryPic+`" webkit-playsinline="true" muted="muted" ></video>
								<video class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" src="`+res.data.primaryPic+`" muted="muted"></video>`;
								
					$('.order-img').append(html);
				}else{
					var html = `<img class="bzy-e-list-img" src="`+res.data.primaryPic+`" >
								<img class="bzy-e-list-img mohu" src="`+res.data.primaryPic+`" >`;
					$('.order-img').append(html);
				}
				// $('.order-img img').attr('src',res.data.primaryPic);
				$('.order-title').text(res.data.name);
				$('.order-price-hdk').text('HK$ '+moneyFormat(res.data.hkdPrice)+' 港元');
				$('.order-price-busd').text(moneyFormat(res.data.price)+' BUSD');
				
				if(res.data.name=='徐冬冬 牛N.X潮玩 NFT限量版'){
					res.data.edition = 200;
				}
				
				$('.details-right-creator-edition').text('第'+res.data.edition+'版， 共'+res.data.storage+'版');
				$('.order-introduce').html(res.data.introduce==''?'暫無介紹':(res.data.introduce.replace(/;\|;/g,'<br>')));
				$('.order-content').html(res.data.content==''?'暫無更多資訊':(res.data.content.replace(/;\|;/g,'<br>')));
				
				
				
				if(res.data.storage - res.data.edition > 0){  //还有库存
					
					if(systemTime < saleStartTimeMillis){
						$('.details-right-btn').addClass('unclick');
						$('.details-right-btn').text('即將開售');
						$('.details-right-btn').data('status','1');
						// $('.details-right-btn').removeClass('payment-btn-pc');
						// $('.details-right-btn').removeClass('payment-btn-mobile');
						var msTime = saleStartTimeMillis - systemTime;
						var time = formatDuring(msTime);
						$('.details-right-time span:first-child').text('銷售開始於： ');
						$('.details-right-time-djs').text(time);
						
						setInterval(function(){
							var curTime = Date.now() + 1150;
							var msTime = saleStartTimeMillis - curTime;
							var time = formatDuring(msTime);
							$('.details-right-time-djs').text(time);
						},1000);
						
					}else if(systemTime >= saleStartTimeMillis && systemTime <= saleEndTimeMillis){
						
						var msTime = saleEndTimeMillis - systemTime;
						var time = formatDuring(msTime);
						console.log(time);
						let ycdjs = time.split('d')[0];
						if (ycdjs > 1825) {
							$(".details-right-time").hide();
						}
						$('.details-right-time span:first-child').text('銷售結束於：');
						$('.details-right-time-djs').text(time);

						setInterval(function(){
							var curTime = Date.now() + 1150;
							var msTime = saleEndTimeMillis - curTime;
							var time = formatDuring(msTime);
							$('.details-right-time-djs').text(time);
						},1000);
						
					}else if(systemTime > saleEndTimeMillis){
						
						$('.details-right-btn').addClass('unclick');
						$('.details-right-btn').text('銷售已結束');
						$('.details-right-btn').data('status','1');
						// $('.details-right-btn').removeClass('payment-btn-pc');
						// $('.details-right-btn').removeClass('payment-btn-mobile');
						
						$('.details-right-time span:first-child').css('opacity','0');
						$('.details-right-time-djs').text('銷售已結束');
						
					}
					
				}else{   //没有库存
				
					$('.details-right-btn').addClass('unclick');
					$('.details-right-btn').text('已售罄');
					$('.details-right-btn').data('status','1');
					
					$('.details-right-time span:first-child').css('opacity','0');
					$('.details-right-time-djs').text('已售罄'); 
					$('.details-right-time-djs').css('color','#cf3737');
					
				}
				
				
				// $('.order-name img').attr('src',res.data.secondPic);
				// $('.order-name span').text('@'+res.data.name);
				
				$.ajax({
					url:base_url+'/v2/user/wallet/info',
					success:function(result){
						if(result.code==0){
							$('.busd-ye').text(result.data.usdtRest+' BUSD');
							if(res.data.price > result.data.usdtRest){
								$('.busd-tip').text('餘額不足');
							}else{
								$('.busd-tip').text('-'+res.data.price);
							}
							$('.busd-tip').show();
						}
					}
				})
			}
		}
	});
	
	
	//
	$('.payment-btn-pc').on('click',function(){
		var status = $(this).data('status');
		// console.log(status)
		if(status==0){
			$.ajax({
				url:base_url+'/v2/user/account',
				success:function(res){
					if(res.code==0){
						orderTakePc();
						// payment();
					}else{
						tips('未登錄，請登入');
					}
				}
			})
		}
	})
	
	
	$('.payment-close-pc').on('click',function(){
		paymentClose();
	})
	
	
	var mobile_width = $(window).width();
	if(mobile_width<=992){
		$('.details-right-btn').removeClass('payment-btn-pc');
		$('.details-right-btn').addClass('payment-btn-mobile');
		
		$('.payment-btn-mobile').on('click',function(){
			var status = $(this).data('status');
			// console.log(status)
			if(status==0){
				$.ajax({
					url:base_url+'/v2/user/account',
					success:function(res){
						if(res.code==0){
							orderTakeMobile();
							$('video').addClass('video-hidden');
							$('.payment-page-left-img video').removeClass('video-hidden')
							// $('.payment').addClass('payment-active')
						}else{
							tips('未登錄，請登入');
							
						}
					}
				})
				}
				
			// $('.payment').addClass('payment-active')
		});
		
		$('.payment-close-mobile').on('click',function(){
			$('.payment').removeClass('payment-active');
			$('video').removeClass('video-hidden');
		})
	};
	
		
	$('.payment-page-right-pay span').on('click',function(){
		$('.payment-page-right-pay span').removeClass('cur');
		$(this).addClass('cur');
		var text = $(this).data('type');
		if(text==0){
			// $('.payment-page-right-btn button').removeClass('can');
			// $('.payment-page-right-btn button').text('立即付款');
			$('.payment-page-right-btn').hide();
			$('.order-price .order-price-hdk').show();
			$('.order-price .order-price-busd').hide();
			$('.payment-page-right-select').show();
			$('.payment-page-right-busd').hide();
			$('.payment-page-right-btn p').text('您的信用卡將立即授權這筆支付。');
		};
		
		if(text==1){
			$('.payment-page-right-btn').show();
			$('.payment-page-right-btn button').addClass('can');
			if($('.busd-tip').text()=='餘額不足'){
				$('.payment-page-right-btn button').text('充值');
			}else{
				$('.payment-page-right-btn button').text('立即付款');
			}
			$('.order-price .order-price-hdk').hide();
			$('.order-price .order-price-busd').show();
			$('.payment-page-right-select').hide();
			$('.payment-page-right-busd').show();
			$('.payment-page-right-btn p').text('您的錢包將立即授權這筆支付');
		}
	});
	
	
	//Additional Infomation 
	$('.details-right-additional-show').click(function(){
		var status = $(this).data('status');
		if(status==0){
			$('.details-right-additional-more').slideDown('fast');
			$(this).children('span').text('-');
			$(this).data('status','1');
		}else if(status==1){
			$('.details-right-additional-more').slideUp('fast');
			$(this).children('span').text('+');
			$(this).data('status','0');
		}
	})
	
	
	//支付
	$('.payment-page-right-btn button').click(function(){
		var text = $('.payment-page-right-pay .cur').data('type');
		var value = $(this).text().trim();
		var orderNo = $('.order-number').text().trim().split('：')[1];
		var busd = $('.order-price .order-price-busd').text().trim();
		// console.log(text)
		if(text==1){
			if(value=='立即付款'){
				$.ajax({
					url:base_url+'/v2/order/order/pay/usdt',
					type: 'POST',
					contentType: 'application/json',
					dataType: 'json',
					data:JSON.stringify({orderNo:orderNo}),
					success:function(res){
						console.log(res);
						if(res.code==0){
							success('支付成功',1800);
							setTimeout(function(){
								$('.payment-page-right-tit').text('完成');
								$('.payment-page-right-order').show();
								$('.payment-page-right-pay').hide();
								$('.payment-page-right-total').hide();
								$('.payment-page-right-busd').hide();
								$('.payment-page-right-btn button').text('去我的資產核對');
								$('.payment-page-right-order-je span').text(busd);
								$('.payment-page-right-order-by span').text('餘額支付');
							},1800);
						}
					}
				})
			}else if(value=='充值'){
				window.open('mywallet.html');
			}else if(value=='去我的資產核對'){
				window.location.href = 'myassets.html';
			}
		}
	})
	
})