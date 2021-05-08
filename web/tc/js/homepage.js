$(function(){
	$.ajax({
		url:base_url+'/v2/index/index',
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		success:function(res){
			console.log(res)
			if(res.code == 0){
				let data = res.data;
				let banners = data.banners;
				let html = '';
				var html_mobile = ``;
				let bannerTitle = '';
				$.each(banners,function(i,v){
					var geshi = v.pic.substr(v.pic.lastIndexOf('.')+1);
					
					html += `<li onclick="progressToggle(this)">
								<a href="`+v.outHrefUrl+`">`
					if(geshi=='mp4'){
						html += `	<video x5-playsinline="true" x5-video-player-type="h5" webkit-playsinline="true" class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" src="`+v.pic+`" muted="muted"></video>`;
					}else{
						html += `	<img src="`+v.pic+`" alt="">`
					}
						html +=	`</a>
								<div class="banner-right-tit flex none"><span>`+(i+1)+`</span><span>`+v.name+`</span></div>
							</li>`;
							
					html_mobile += `<div class="swiper-slide">
										<a href="`+v.outHrefUrl+`">`
					if(geshi=='mp4'){
						html_mobile += `	<video x5-playsinline="true" x5-video-player-type="h5" webkit-playsinline="true" class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" src="`+v.pic+`" muted="muted"></video>`;
					}else{
						html_mobile += `	<img src="`+v.pic+`" alt="">`
					}
						html_mobile	+= `	<p>`+(i+1)+` `+v.name+`</p>
										</a>
									</div>`
							
				});
				
				
				
				$(".index-banner").html(html);
				$(".banner-m .swiper-wrapper").html(html_mobile);
				swiper.init();
				
				$.each(banners,function(i,v){
					bannerTitle += `<li onclick="toggleBanner(this)">
										<span>`+(i+1)+`</span><span>`+v.name+`</span>
									</li>`;
				})
				$(".banner-title").html(bannerTitle);
				
				
				stackedCardSlide.init();
				setTimeout(function(){
					$('.stacked-cards li:first-child').click();
				});
				
				$('.banner-left-progress div:first').addClass('progress-active');
				
			} else {
				console.log(data.message)
			}
		},
		error:function(err){
			console.log(res.message)
		}
	})
		
	// 图片
	var acount = 0;
	// $('.bzy-a-rigt img:nth-child(1)').addClass('active');
	// setTimeout(function(){
	// 	$('.bzy-a-right img:nth-child('+acount+')').removeClass('active');
	// });
	
	// setInterval(function(){
	// 	acount ++;
	// 	// console.log(acount)
	// 	$('.bzy-a-right img:nth-child('+acount+')').addClass('active');
		
		
	// 	if(acount==5){
	// 		acount = 0;
	// 	}
	// },1000);
	
	// setTimeout(function(){
	// 	setInterval(function(){
	// 		acount ++;
	// 		// console.log(acount)
	// 		$('.bzy-a-right img:nth-child('+acount+')').removeClass('active');
	// 		if(acount==5){
	// 			acount = 0;
	// 		}
	// 	},500)
		
	// },2000)
	
	
	
	
	
	
	
	
	
	
})