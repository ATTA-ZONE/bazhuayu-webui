
//获取时间
function formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((mss % (1000 * 60)) / 1000);
    return minutes + " : " + seconds;
}

function getOrderList(current,pageSize){
	$.ajax({
		url:base_url+'/v2/order/list',
		data:{current:current,pageSize:pageSize},
		success:function(res){
			console.log(res);
			
			if(res.code==0){
				var data = res.data.pageResult.records;
				var html = ``;
				if(res.data.pageResult.total>9 && data.length==9){
					$('.bzy-e-more').show();
				}else{
					$('.bzy-e-more').hide();
				};
				// var curTime = Date.now();
				if(data.length==0){
					html += `<li class="flex nothing">
					<div>暫無搜索結果</div></li>`;
					$('.my-assets ul').css('padding-top','100px');
				}else{
					
					$.each(data,function(i,v){
						var shengyu = new Date(v.expireTime).getTime() - Date.now();
						var time = formatDuring(shengyu);
						var geshi = v.primaryPic.substr(v.primaryPic.lastIndexOf('.')+1);
						// setInterval(function(){
						// 	var tTime = new Date(v.expireTime).getTime() - Date.now();
						// 	$('.time-'+i).text(formatDuring(tTime));
						// },1000);
						
						html += 
						`<li class="flex" data-storage="`+v.storage+`" data-edition="`+v.edition+`">
							<div class="my-orders-head none">
								<div class="my-orders-number-mb">訂單號 # `+v.orderNo+`</div>
								<div class="my-orders-tit-mb">`+v.name+`</div>
								<div class="my-orders-time-mb flex"><span>`+v.orderTime.split(' ')[0]+`</span><span>`+v.orderTime.split(' ')[1]+`</span></div>
							</div>
							<div class="my-orders-body flex">
								<div class="my-orders-left">`;
								
						if(geshi=='mp4'){
							html+=`<video style="width:100%;" autoplay="autoplay" loop="loop" src="`+v.primaryPic+`" muted="muted"></video>
									<video class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" src="`+v.primaryPic+`" muted="muted"></video>`;
						}else{
							html+=`<img src="`+v.primaryPic+`" >
									<img class="mohu" src="`+v.primaryPic+`" >`;
						}
						
						html+=	`</div>
								<div class="my-orders-right">
									<div class="my-orders-time flex"><span>`+v.orderTime.split(' ')[0]+`</span><span>`+v.orderTime.split(' ')[1]+`</span></div>
									<div class="my-orders-order">
										<div class="my-orders-order-number">訂單號 # `+v.orderNo+`</div>
										<div class="my-orders-order-tit">`+v.name+`</div>
									</div>
									<div class="my-orders-status">
										<div class="my-orders-status-status">
											<div class="status-tit">狀態</div>`;
											
						if(v.status==1){
							
							html += `		<div class="status-des">待支付</div>
											<div class="status-due">截至 `+v.expireTime.split(' ')[1]+`</div>
										</div>
										<div class="my-orders-status-payment">
											<div class="payment-tit">付款金額</div>
											<div class="payment-price"><span data-price="`+v.payPriceHkd+`">HK$ `+moneyFormat(v.payPriceHkd)+` 港元</span><span data-price="`+v.payPriceUsdt+`">`+moneyFormat(v.payPriceUsdt)+` BUSD</span></div>
										</div>
									</div>
									<div class="my-orders-btn flex">
										<a class="flex my-orders-btn-paynow payment-btn-pc" onclick="payNow(this)" href="javascript:void(0);">立即付款</a>
										<div class="my-orders-btn-time flex">
											<img src="./images/image13.png" >
											<span>`+time+`</span>
										</div>
									</div>`;
						}else if(v.status==2){
							html += `		<div class="status-des">支付成功</div>
										</div>`
										
							if(v.payMethod==1){
										
								html +=	`<div class="my-orders-status-payment">
											<div class="payment-tit">付款金額</div>
											<div class="payment-price">`+moneyFormat(v.payPriceUsdt)+` BUSD</div>
										</div>
									</div>`;
							}else{
								html +=	`<div class="my-orders-status-card">
											<div class="card-tit">信用卡賬號</div>
											<div class="card-number">----</div>
										</div>
										<div class="my-orders-status-payment">
											<div class="payment-tit">付款金額</div>
											<div class="payment-price">HK$ `+moneyFormat(v.payPriceHkd)+` 港元</div>
										</div>
									</div>`;
							};
							
							
							
						}else{
							html += `		<div class="status-des">已關閉</div>
										</div>
									</div>`;
						}
											
						html +=	`		
								</div>
							</div>
						</li>`;
						
					});
					
					$('.my-assets ul').css('padding-top','0');
				}
				
				$('.my-orders ul').append(html);
				
				
			}
		} 
	})
}

//添加倒计时
function f(){
	setTimeout(function(){
		$.each($('.my-assets ul li'),function(i,v){
			if($(v).find('.my-orders-btn-time span').length!=0){
				
				var text = $(v).find('.my-orders-btn-time span').text().split(':');
				var t = setInterval(function(){
					text[1]--;
					
					
					if(text[1]<0){
						text[0]--;
						text[1] = 59;
						if(text[0]<0){
							clearInterval(t);
						}
					}
					$(v).find('.my-orders-btn-time span').text(text[0]+':'+(text[1]<10?'0'+text[1]:text[1]));
				},1000)
				
			}
			
		})
		
	},500);
};



function payNow(obj){
	
	var mobile_width = $(window).width();
	
	var img = $(obj).closest('.my-orders-body').find('.my-orders-left').html();
	var name = $(obj).closest('.my-orders-right').find('.my-orders-order-tit').text();
	var orderNo = $(obj).closest('.my-orders-right').find('.my-orders-order-number').text();
	var storage = $(obj).closest('li').data('storage');
	var edition = $(obj).closest('li').data('edition');
	var payPriceHkd = $(obj).closest('.my-orders-btn').prev('.my-orders-status').find('.payment-price span:first-child').data('price');
	var payPriceUsdt = $(obj).closest('.my-orders-btn').prev('.my-orders-status').find('.payment-price span:last-child').data('price');
	
	$('.order-title').text(name);
	$('.order-img').html(img);
	$('.details-right-creator-edition').text('Edition '+edition+' of '+storage);
	$('.order-price-hdk').text('HK$ '+moneyFormat(payPriceHkd)+' 港元');
	$('.order-price-busd').text(moneyFormat(payPriceUsdt)+' BUSD');
	$('.order-number').text(orderNo);
	$('.payment-page-right-order-je span').text(moneyFormat(payPriceUsdt)+' BUSD');
	
	$.ajax({
		url:base_url+'/v2/user/wallet/info',
		success:function(result){
			if(result.code==0){
				$('.busd-ye').text(moneyFormat(result.data.usdtRest)+' BUSD');
				if(Number(payPriceUsdt) > Number(result.data.usdtRest)){
					$('.busd-tip').text('餘額不足');
				}else{
					$('.busd-tip').text('-'+moneyFormat(payPriceUsdt));
				}
				$('.busd-tip').show();
			}
		}
	});
	
	if(mobile_width<=992){
		$('.my-orders-btn-paynow').removeClass('payment-btn-pc');
		$('.my-orders-btn-paynow').addClass('payment-btn-mobile');
		
		$('.payment-btn-mobile').on('click',function(){
			// var status = $(this).data('status');
			// console.log(status)
			$('.payment').addClass('payment-active')
			$('video').addClass('video-hidden');
			$('.payment-page-left-img video').removeClass('video-hidden');
			// if(status==0){
			// 	$.ajax({
			// 		url:base_url+'/v2/user/account',
			// 		success:function(res){
			// 			if(res.code==0){
			// 				// orderTakeMobile();
			// 				$('.payment').addClass('payment-active')
			// 			}else{
			// 				tips('未登錄，請登入');
			// 			}
			// 		}
			// 	})
			// }
				
		});
		
		$('.payment-close-mobile').on('click',function(){
			$('.payment').removeClass('payment-active');
			$('video').removeClass('video-hidden');
		})
	}else{
		payment();
		
	};
	
	$('.payment-close-pc').on('click',function(){
		paymentClose();
	});
	
	
	
}







$(function(){
	
	var current = 1;
	getOrderList(current,9);
	
	$('.order-list-load').click(function(){
		current ++;
		getOrderList(current,9);
		
		f();
	});
	
	
	setTimeout(function(){

		$.each($('.my-assets ul li'),function(i,v){
			var text = $(v).find('.my-orders-btn-time span').text().split(':');
			var t = setInterval(function(){
				text[1]--;
				
				
				if(text[1]<0){
					text[0]--;
					text[1] = 59;
					if(text[0]<0){
						clearInterval(t);
					}
				}
				$(v).find('.my-orders-btn-time span').text(text[0]+' : '+(text[1]<10?'0'+text[1]:text[1]));
			},1000)
			
		});
		
	},500);
	


	
	$('.payment-page-right-pay span').on('click',function(){
		$('.payment-page-right-pay span').removeClass('cur');
		$(this).addClass('cur');
		var text = $(this).data('type');
		if(text==0){
			$('.payment-page-right-btn button').removeClass('can');
			$('.payment-page-right-btn button').text('立即付款');
			$('.order-price .order-price-hdk').show();
			$('.order-price .order-price-busd').hide();
			$('.payment-page-right-select').show();
			$('.payment-page-right-busd').hide();
			$('.payment-page-right-btn p').text('您的信用卡將被立即授權');
		};
		
		if(text==1){
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
			$('.payment-page-right-btn p').text('您的錢包將立即得到授權');
		}
	});
	
	//支付
	$('.payment-page-right-btn button').click(function(){
		var text = $('.payment-page-right-pay .cur').text().trim();
		var value = $(this).text().trim();
		var orderNo = $('.order-number').text().trim().split(' ')[2];
		var busd = $('.order-price .order-price-busd').text().trim();
		console.log(text)
		if(text=='CRYPTO'){
			if(value=='Pay Now'){
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
	});
	
	
})