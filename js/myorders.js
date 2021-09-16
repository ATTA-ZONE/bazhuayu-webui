var myordersText = chEnText.myOrders[lang];

var param = window.location.search.substr(1);
parm = param.split('&');
var arr = [];
for (var key in parm){
	arr.push({
		key:parm[key].split('=')
	});
}

var success_status;

$.each(arr,function(i,v){
	if(v.key[0]=='success'){
		success_status = v.key[1]
	}
});

//询问弹窗
function zfconfirm(){
	hsycms.confirm('confirm',myordersText.myWallt,
		function(res){            
			hsycms.success('success',myordersText.confirm);
			setTimeout(function(){
				window.location.href = 'myassets.html';
			},1500)
		},
		function(res){
			hsycms.error('error',myordersText.cancel);
		},
	)
};


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
					<div>${myordersText.noResults}</div></li>`;
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
								<div class="my-orders-time-mb flex newstyle-date"><span>${myordersText.buyDate}</span><span>`+v.orderTime.split(' ')[0]+`</span><span>`+v.orderTime.split(' ')[1]+`</span></div>
								<div class="my-orders-number-mb newstyle-id">${myordersText.number}`+v.orderNo+`</div>
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
						const edt = v.edition? v.edition.split(',').join('、') : ''
						html+=	`</div>
								<div class="my-orders-right">
									<div class="my-orders-time flex"><span>${myordersText.buyDate}</span><span>`+v.orderTime.split(' ')[0]+`</span><span>`+v.orderTime.split(' ')[1]+`</span></div>
									<div class="my-orders-order">
										<div class="my-orders-order-number">${myordersText.number}`+v.orderNo+`</div>
										<div class="my-orders-order-tit">`+v.name+`</div>
									</div>
									<div class="my-orders-tit-mb newstyle-name">`+v.name+`</div>
									<div class="flex" style="flex-wrap: wrap;color:#fff;align-items: center;padding-bottom: 15px;">
										<div class="details-right-creator-img"><img src="./images/t8.png" ></div>
										<span style="margin-right:10px;">@ATTA</span>
										<p class="details-right-creator-edition" style="margin:0px;">${myordersText.purchased}<span style="color: #9567FF;">`+ edt +`</span>${myordersText.version01}<span>`+v.endEdition+`</span>${myordersText.version02}</p>
									</div>
									<div class="my-orders-status">
									`;
										
						if(v.status==1){
							
							// html += `		<div class="status-des">待支付</div>
							// 				<div class="status-due">截至 `+v.expireTime.split(' ')[1]+`</div>
							// 			</div>
							// 			<div class="my-orders-status-payment">
							// 				<div class="payment-tit">付款金額</div>
							// 				<div class="payment-price"><span data-price="`+v.payPriceHkd+`">HK$ `+moneyFormat(v.payPriceHkd)+` </span><span data-price="`+v.payPriceUsdt+`">`+' BUSD'+moneyFormat(v.payPriceUsdt)+` </span></div>
							// 			</div>
							// 		</div>
							// 		<div class="my-orders-btn flex">
							// 			<a class="flex my-orders-btn-paynow payment-btn-pc" onclick="payNow(this)" href="javascript:void(0);">立即付款</a>
							// 			<div class="my-orders-btn-time flex">
							// 				<img src="./images/image13.png" >
							// 				<span>`+time+`</span>
							// 			</div>
							// 		</div>`;
						}else if(v.status==2){
							// html += `		<div class="status-des">支付成功</div>
							// 			</div>`
										
							if(v.payMethod==1){
										
								// html +=	`<div class="my-orders-status-payment">
								// 			<div class="payment-tit">付款金額</div>
								// 			<div class="payment-price">`+' BUSD'+moneyFormat(v.payPriceUsdt)`</div>
								// 		</div>
								// 	</div>`;
							}else{
								// html +=	`<div class="my-orders-status-card">
								// 			<div class="card-tit">信用卡賬號</div>
								// 			<div class="card-number">`+v.cardNo+`</div>
								// 		</div>
								// 		<div class="my-orders-status-payment">
								// 			<div class="payment-tit">付款金額</div>
								// 			<div class="payment-price">HK$ `+moneyFormat(v.payPriceHkd)+` </div>
								// 		</div>
								// 	</div>`;
							};
							
							
							
						}else{
							// html += `		<div class="status-des">已關閉</div>
							// 			</div>
							// 		</div>`;
						}
						if (v.payMethod == 1) {
							html +=`<div class="paymenttypebox">${myordersText.paymentMethod}<span>${myordersText.cryptocurrencies}</span></div>
									<div class="countmoneybox">
									<p class="moneryridebox">
									${myordersText.price}
										<span class="order-price-busd">BUSD `+moneyFormat(v.unitPriceUsdt)+` </span>
									</p>
									<p class="countetcbox">
										<img src="./images/multiply.png" alt="">
										<span class="purchase_num">`+(v.edition.split(',')).length+`</span>
										=
									</p>
								</div>
								<p class="purchaseprice">${myordersText.purchasePrice}BUSD `+moneyFormat(v.payPriceUsdt)+` </p>`
						}
						if (v.payMethod == 2) {
							html +=`<div class="paymenttypebox">${myordersText.paymentMethod}<span>${myordersText.bankCard}</span></div>
									<div class="countmoneybox">
									<p class="moneryridebox">
									${myordersText.price}
										<span class="cur order-price-hdk">HK$`+moneyFormat(v.unitPriceHkd)+` </span>
									</p>
									<p class="countetcbox">
										<img src="./images/multiply.png" alt="">
										<span class="purchase_num">`+(v.edition.split(',')).length+`</span>
										=
									</p>
								</div>
								<p class="purchaseprice">${myordersText.purchasePrice}HK$ `+moneyFormat(v.payPriceHkd)+`  </p>`
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
	$('.order-price-hdk').text('HK$ '+moneyFormat(payPriceHkd)+' ');
	$('.order-price-busd').text('BUSD '+moneyFormat(payPriceUsdt));
	$('.order-number span').text(orderNo.split(' ')[2]);
	$('.payment-page-right-order-je span').text('BUSD '+moneyFormat(payPriceUsdt));
	
	$.ajax({
		url:base_url+'/v2/user/wallet/info',
		success:function(result){
			if(result.code==0){
				$('.busd-ye').text('BUSD '+moneyFormat(result.data.usdtRest));
				if(Number(payPriceUsdt) > Number(result.data.usdtRest)){
					$('.busd-tip').text(myordersText.balanceInsufficient);
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
	
	if(success_status==1){
		success(myordersText.paySuc,1800);
		setTimeout(function(){
			zfconfirm();
		},1800)
		
	}else if(success_status==0){
		error(myordersText.payErr,1800);
	}
	
	
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
						return;
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
			// $('.payment-page-right-btn button').removeClass('can');
			// $('.payment-page-right-btn button').text('立即付款');
			$('.payment-page-right-btn').hide();
			$('.order-price .order-price-hdk').show();
			$('.order-price .order-price-busd').hide();
			$('.payment-page-right-select').show();
			$('.payment-page-right-busd').hide();
			$('.payment-page-right-btn p').text(myordersText.cardAuthorization);
		};
		
		if(text==1){
			$('.payment-page-right-btn').show();
			$('.payment-page-right-btn button').addClass('can');
			if($('.busd-tip').text()==myordersText.balanceInsufficient){
				$('.payment-page-right-btn button').text(myordersText.recharge);
			}else{
				$('.payment-page-right-btn button').text(myordersText.payment);
			}
			$('.order-price .order-price-hdk').hide();
			$('.order-price .order-price-busd').show();
			$('.payment-page-right-select').hide();
			$('.payment-page-right-busd').show();
			$('.payment-page-right-btn p').text(myordersText.walletImpower);
		}
	});
	
	//支付
	$('.payment-page-right-btn button').click(function(){
		var text = $('.payment-page-right-pay .cur').text().trim();
		var value = $(this).text().trim();
		var orderNo = $('.order-number').text().trim().split(' ')[2];
		var busd = $('.order-price .order-price-busd').text().trim();
		if(text=='CRYPTO'){
			if(value=='Pay Now'){
				$.ajax({
					url:base_url+'/v2/order/order/pay/usdt',
					type: 'POST',
					contentType: 'application/json',
					dataType: 'json',
					data:JSON.stringify({orderNo:orderNo}),
					success:function(res){
						if(res.code==0){
							success(myordersText.paySuc,1800);
							setTimeout(function(){
								$('.payment-page-right-tit').text(myordersText.accomplis);
								$('.payment-page-right-order').show();
								$('.payment-page-right-pay').hide();
								$('.payment-page-right-total').hide();
								$('.payment-page-right-busd').hide();
								$('.payment-page-right-btn button').text(myordersText.toAssets);
								$('.payment-page-right-order-je span').text(busd);
								$('.payment-page-right-order-by span').text(myordersText.balancePayment);
							},1800);
						}
					}
				})
			}else if(value=='充值'){
				window.open('mywallet.html');
			}else if(value==myordersText.toAssets){
				window.location.href = 'myassets.html';
			}
		}
	});
	
	
})