
//
var url = window.location.pathname;
url = url.substring(url.lastIndexOf('/')+1);
url = url.substring(0,url.indexOf('.'));

//var base_url = 'http://47.118.74.48:8081';
// var base_url = 'http://58.212.110.92:8866';
var base_url = '';
var islogin;
var walletId = ''

if (getCookie('islogin') != 'false') {
	islogin = true;
}else{
	islogin = false;
}
if (window.location.href.indexOf('bazhuayu.io') == -1) {
	base_url = 'http://localhost:8081';
	if (window.location.href.indexOf('47.118.74.48:') > -1) {
		base_url = 'http://47.118.74.48:'+window.location.port;
	}
}
var lang = 'TC';
$.ajax({
	url:base_url+'/v2/user/lang/select',
	type:'POST',
	dataType:'json',
	data:{lang:lang},
	success:function(res){
	}
});

//询问弹窗
function logoutConfirm(){
	hsycms.confirm('confirm','你確定要登出嗎',
		function(res){            
			hsycms.success('success','成功');
			setTimeout(function(){
				$.ajax({
					url:base_url+'/logout',
					type:"POST",
					dataType:'json',
					success:function(res){
						if(res.code==0){
							// window.location.reload();
							window.location.href = 'index.html';
						}
					}
				})
			},1500)
		},
		function(){},
	)
};


function headIconShow(){
	$('.menu-list2').addClass('menu-list-show');
	$('video').addClass('video-hidden');
}
function headIconHide(){
	$('.menu-list2').removeClass('menu-list-show');
	$('video').removeClass('video-hidden');
}
function walletaddressreplace(){
	window.location.href = 'connectWallet.html';
}
function walletaddressdelete(){
	$('.modify-btn-active').removeClass('walletaddress-replace');
	$('.cancel').removeClass('walletaddress-delete');
	$('.cancel').text('取消');
	$('.modify-tips').hide();
	deleteWallet();
}

$(function(){
	$(".headerpage").load("header.html");
	// $(".headerpage2").load("header2.html");
	$(".footerpage").load("footer.html");
	$(".footerpage2").load("footer2.html");
	$(".tips").load("tips.html");
	
	//底部配置信息
	$.ajax({
		url:'/sys/concat',
		success:function(res){
			var weiboUrl =res.data.weiboUrl;
			var twitterUrl=res.data.twitterUrl;
			var telegramUrl=res.data.telegramUrl;
			var qrPath1=res.data.qrPath;
			var qrPath = JSON.parse(qrPath1)[0];			
			$(".weiboUrl").attr("href",weiboUrl);
			$(".twitterUrl").attr("href",twitterUrl);
			$(".telegramUrl").attr("href",telegramUrl);
			$(".code-pic").attr("src",qrPath);
		},
		
	})	
	//
	$('.bzy-d-head-right input').on('focus',function(){
		$(this).parent().css('border','1px solid #9567FF');
	}).on('blur',function(){
		$(this).parent().css('border','1px solid #141414');
	})
	
	
	//
	$('.modify-tc-pc').on('click',function(){
		$('.modify').fadeIn();
	})
	
	//
	var mobile_width = $(window).width();
	if(mobile_width<=992){
		$('.tc-show').removeClass('modify-tc-pc');
		$('.tc-show').addClass('modify-tc-mobile');
		
		$('.accountclass.modify-tc-mobile').on('click',function(){
			$('.modify').addClass('modify-tc-active')
		})
	}
	
	
	
	// 用户信息
	$.ajax({
		url:base_url+'/v2/user/account',
		success:function(res){
			var html = ``;
			if(res.code==0){
				
				html += `<a class="header-right-yidl" href="javascript:void(0);">`;
				html += `	<div class="header-right-yidl-info flex">`;
				if(res.data.headIcon==null||res.data.headIcon==''){
					html += `	<div><img src="./images/Ellipse 93.png" ></div>
								<p>
									<span class="ellipsis">`+res.data.name+`</span>
									<span class="my-email">`+res.data.email+`</span>
								</p>`;
				}else{
					html += `	<div><img src="`+base_url+res.data.headIcon+`" ></div>
								<p>
									<span class="ellipsis">`+res.data.name+`</span>
									<span class="my-email">`+res.data.email+`</span>
								</p>`;
					$('.mobile-head-icon img').attr('src',res.data.headIcon);
				};
				html += `	</div>`;
				
				html += `	<div class="header-right-yidl-my none">
								
								<span onclick="window.location.href = 'myaccount.html'">我的帳戶</span>
								<span onclick="window.location.href = 'myorders.html'">我的訂單</span>
								<span onclick="window.location.href = 'myassets.html'">我的藏品</span>
								<span onclick="window.location.href = 'mywallet.html'">我的錢包</span>
								<span class="logout" onclick="logoutConfirm()">登出</span>
							</div>`;
				
				html += `</a>`;
				
				$('.menu-list-con-meail').text(res.data.email);
				// $('.menu-list-con-meail').show();
				// $('.mobile-ydl').show();
				// $('.mobile-login').hide();
				// $('.mobile-logout').show();
				var mobile_width = $(window).width();
				if(mobile_width<=992){
					$('.mobile-head-icon').show();
					$('.mobile-login').hide();
				}
			}else{
				$('.mobile-head-icon').hide();
				$('.mobile-login').show();
				// $('.header-right-yidl').hide();
				// $('.header-right-login').show();
				html += `<a class="header-right-login flex" href="login.html">登入/註冊</a>`;
				
				// $('.menu-list-con-meail').hide();
				// $('.mobile-ydl').hide();
				// $('.mobile-login').show();
				// $('.mobile-logout').hide();
			}
			$('.header-dl').html(html);
		}
	});
	
	
	//查看钱包是否链接
	$.ajax({
		url:base_url+'/v2/user/wallet/info',
		success:function(res){
			if(res.code==0){
				walletId = res.data.address;
				$('.header-right-wallet').show();
				$('.mobile-connect-wallet').show();
			}else if (res.code==1002 && islogin) {
				setCookie('islogin',false);
				window.location.href = 'index.html';
			}else{
				$('.header-right-wallet').hide();
				$('.mobile-connect-wallet').hide();
				setCookie('isConnect',false);
			}
		}
	})

	if (window.ethereum) {
		window.ethereum.request({ method: 'eth_accounts'}).then(function(res){
			if (walletId == res[0]) {
				setTimeout(() => {
					setCookie('isConnect',true)
					$('.header-right-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px;"><span class="modify-tc-pc tc-show">已連接錢包</span><p class="walletIdshow">'+ walletId +'</p>');
					$('.mobile-connect-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">已連接錢包</a><p class="walletIdshow">'+ walletId +'</p>');
					
					$('.mobile-connect-wallet,.header-right-wallet').click(function(){
						window.location.href  = 'showwallet.html';
					});
				}, 300);
			}
		})
	}

	window.ethereum.request({ method: 'eth_accounts'}).then(function(res){
		if (res.length>0 && walletId == res[0]) {
			setTimeout(() => {
				setCookie('isConnect',true)
				$('.header-right-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px;"><span class="modify-tc-pc tc-show">已連接錢包</span><p class="walletIdshow">'+ walletId +'</p>');
				$('.mobile-connect-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">已連接錢包</a><p class="walletIdshow">'+ walletId +'</p>');
				
				$('.mobile-connect-wallet,.header-right-wallet').click(function(){
					window.location.href  = 'showwallet.html';
				});
			}, 300);
		}
	})
	
	
	if(getCookie('isConnect')=='true'){
		setTimeout(function(){
			$('.header-right-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px;"><span class="modify-tc-pc tc-show">已連接錢包</span><p class="walletIdshow">'+ walletId +'</p>');
			$('.mobile-connect-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">已連接錢包</a><p class="walletIdshow">'+ walletId +'</p>');
		},200)
		$('.mobile-connect-wallet,.header-right-wallet').click(function(){
			window.location.href  = 'showwallet.html';
		})
	}else{
		setTimeout(function(){
			$('.header-right-wallet').html('<img src="./images/point-red.png" style="width:6px; margin-right:5px;"><span>未連接錢包</span>');
			$('.mobile-connect-wallet').html('<img src="./images/point-red.png" style="width:6px; margin-right:5px; "/><a class="language-tc" style="width:calc(100% - 11px)" onclick="connectWallet()" href="javascript:void(0);">未連接錢包</a>');
		},200)
	
	}
	
	
	
	$.ajax({
		url:base_url+'/v2/user/wallet/info',
		async:false,
		success:function(res){
			if(res.code==0){
				if(res.data.walletType=="TOKEN POCKET"){
					CHAIN.WALLET.WalletConnect.events();
					var t = setInterval(function(){
						var walletconnect = localStorage.getItem('walletconnect');
						var cookie = getCookie('isConnect');
						if(walletconnect==null){
							clearInterval(t);
							isWalletConnect = false;
							$('.header-right-wallet').html('<img src="./images/point-red.png" style="width:6px; margin-right:5px;"><span>未連接錢包</span>');
							$('.mobile-connect-wallet').html('<img src="./images/point-red.png" style="width:6px; margin-right:5px; "/><a class="language-tc" style="width:calc(100% - 11px)" onclick="connectWallet()" href="javascript:void(0);">未連接錢包</a>');
						}
					},200)
				}
			}
			
		}
	})

	$('.header-right-wallet').click(function(e){
		if (e.target.textContent == "已連接錢包") {
			window.location.href  = 'showwallet.html';
		}
	})

	

})
function showwalletaddress(e){
	if ($('.header-right-wallet .modify-tc-pc').text() == "已連接錢包" || $('.mobile-connect-wallet .modify-tc-pc').text() == "已連接錢包") {
		window.location.href  = 'showwallet.html';
	}else{
		connectWallet();
	}
}