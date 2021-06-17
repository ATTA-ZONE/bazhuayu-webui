
//
var url = window.location.pathname;
url = url.substring(url.lastIndexOf('/')+1);
url = url.substring(0,url.indexOf('.'));
//var base_url = 'http://47.118.74.48:8081';
// var base_url = 'http://58.212.110.92:8866';
var base_url = '';
var islogin;
var walletId = '';
var targetChainId = '';

if (getCookie('islogin') != 'false') {
	islogin = true;
}else{
	islogin = false;
}

if (window.location.href.indexOf('bazhuayu.io') == -1) {
	base_url = 'http://localhost:8081';
	targetChainId = 97;
	if (window.location.href.indexOf('47.118.74.48:') > -1) {
		base_url = 'http://47.118.74.48:'+window.location.port;
		targetChainId = 56;
	}
}
var lang = getCookie("lang")?getCookie("lang"):'TC';
var commonText = chEnText.common[lang];
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
	hsycms.confirm('confirm',commonText.logOutMes,
		function(res){            
			hsycms.success('success',commonText.suc);
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
function closeBsc() {
	$('.bsc-tips').hide()
}

function changenetwork() {
		CHAIN.WALLET.switchRPCSettings(targetChainId).then(()=>{
			$('.bsc-tips').hide()
		})
}

$(function(){

	// 中英文切换
	$("body").on("click", ".language-change-en", function () {
		setCookie('lang','EN');
		window.location.href=window.location.href; 
	})
	$("body").on("click", ".language-change-ch", function () {
		setCookie('lang','TC');
		window.location.href=window.location.href;
	})
	
	if(lang == "TC"){
		$(".headerpage").load("header.html");
		$(".footerpage").load("footer.html");
		$(".tips").load("tips.html");
	}else{
		$(".headerpage").load("header2.html");
		$(".footerpage").load("footer2.html");
		$(".tips").load("tips2.html");
	}
	
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
			// $(".twitterUrl").attr("href",twitterUrl);
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

			CHAIN.WALLET.chainId()
				.then(function (res) {
					var targetChainId = '';
					if (window.location.href.indexOf('bazhuayu.io') == -1) {
						targetChainId = 97;
					} else {
						targetChainId = 56;
					}
					if (res != targetChainId) {
						$('.bsc-tips').show()
					}
				})
	$('body').append('<div class="bsc-tips" style="display:none;position:absolute;top:80px;left:50%;transform:translateX(-50%);z-index:9999;color:#fff;background: #9567FF;border-radius: 10px;white-space: nowrap;padding:10px 20px;">'+commonText.tips01+'<a onclick="changenetwork()">'+commonText.tips02+'</a><img onclick="closeBsc()" style="width: 20px;vertical-align: bottom;" src="./images/Close.png" /></div>')
	
	
	
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
								
								<span onclick="window.location.href = 'myaccount.html'">${commonText.myaccount}</span>
								<span onclick="window.location.href = 'myorders.html'">${commonText.myorders}</span>
								<span onclick="window.location.href = 'myassets.html'">${commonText.myassets}</span>
								<span onclick="window.location.href = 'mywallet.html'">${commonText.mywallet}</span>
								<span class="logout" onclick="logoutConfirm()">${commonText.logOut}</span>
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
				html += `<a class="header-right-login flex" href="login.html">${commonText.login}</a>`;
				
				// $('.menu-list-con-meail').hide();
				// $('.mobile-ydl').hide();
				// $('.mobile-login').show();
				// $('.mobile-logout').hide();
			}
			$('.header-dl').html(html);
		}
	});
	$.ajax({
		url:base_url + "/v2/commodity/channel/list",
		success : function (res) {
			if (res.code==0) {
				let data = res.data.types;
				let html = `<li class="${url == 'index' ? 'current' : ''}"><a class="language-tc" href="index.html">${commonText.home}</a></li>`;
				data.forEach(item => {
					html += `<li class="${window.location.search == '?id='+item.id ? 'current' : ''}"><a class="language-tc" href="artwork.html?id=`+item.id+`">${item.name}</a></li>`
				});
				html += `<li class="${url == 'auction' ? 'current' : ''}"><a class="language-tc" href="auction.html">${commonText.auction}</a></li>`;
				$('.nav-header').html(html);
				
				let html_h5 = `<li><a class="language-tc" href="index.html">${commonText.home}</a></li>`;
				data.forEach(item => {
					html_h5 += `<li><a class="language-tc" href="artwork.html?id=`+item.id+`">${item.name}</a></li>`;
				});
				html_h5 += `<li class="mobile-connect-wallet"><a class="language-tc" onclick="connectWallet()" href="javascript:void(0);">${commonText.noConnectWallet}</a></li>
							<li class="switchlanguage_mobile">
								<a class="language-change-en">EN</a>
								<span style="margin: 0 16px;">|</span>
								<a class="language-change-ch">繁</a>
							</li>`;
				$('.moblic_h5_navbox').html(html_h5);
			}

		}
	})
	updateWalletStatus();
})

function updateWalletStatus() {
	$('.header-right-wallet').html('<img src="./images/point-loading.gif" style="width:6px; margin-right:5px;"><span>'+commonText.wallet+'</span>');
	$('.mobile-connect-wallet').html('<img src="./images/point-loading.gif" style="width:6px; margin-right:5px; "/><a class="language-tc" style="width:calc(100% - 11px)" onclick="connectWallet()" href="javascript:void(0);">'+commonText.wallet+'</a>');
	$('.header-right-wallet').show();
	$('.mobile-connect-wallet').show();

	//查看钱包是否链接
	$.ajax({
		url:base_url+'/v2/user/wallet/info',
		success:function(res){
			if(res.code==0){
				walletId = res.data.address;
				CHAIN.WALLET.accounts()
					.then(function(account){
						if (walletId && account.length) {
							if (walletId == account[0]) {
								displayWalletStatus(0, account);
							} else {
								displayWalletStatus(1, account);
							}
						} else if (walletId) {
							displayWalletStatus(2, account);
						} else if (account.length) {
							displayWalletStatus(1, account);
						} else {
							displayWalletStatus(2, account);
						}
					})
			} else if (res.code==1002 && islogin) {
				setCookie('islogin',false);
				window.location.href = 'index.html';
			}else{
				$('.header-right-wallet').hide();
				$('.mobile-connect-wallet').hide();
				setCookie('isConnect',false);
			}
		}
	})
}
CHAIN.WALLET.accountsChangedAssign(updateWalletStatus);

function showwalletaddress(e){
	if ($('.header-right-wallet .modify-tc-pc').text() == commonText.noConnectWallet || $('.mobile-connect-wallet .modify-tc-pc').text() == commonText.noConnectWallet) {
		connectWallet();
	}else{
		window.location.href  = 'showwallet.html';
	}
}

function displayWalletStatus(status, account){
	if (status==0) {
		// 钱包与 绑定钱包 相同
		setCookie('isConnect',true);
		$('.header-right-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px;"><span class="modify-tc-pc tc-show">'+commonText.connectWallet+'</span><p class="walletIdshow">'+ account[0] +'</p>');
		$('.mobile-connect-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">'+commonText.connectWallet+'</a><p class="walletIdshow">'+ account[0] +'</p>');		
			$('.mobile-connect-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">'+commonText.connectWallet+'</a><p class="walletIdshow">'+ account[0] +'</p>');
		$('.mobile-connect-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">'+commonText.connectWallet+'</a><p class="walletIdshow">'+ account[0] +'</p>');		
		$('.mobile-connect-wallet,.header-right-wallet').click(function(){
			showwalletaddress();
		});
	} else if (status==1) {
		// 钱包与 绑定钱包 不同/未绑定
		setCookie('isConnect',true);
		$('.header-right-wallet').html('<img src="./images/point-yellow.png" style="width:6px; margin-right:5px;"><span class="modify-tc-pc tc-show">'+commonText.unBind+'</span><p class="walletIdshow">'+ account[0] +'</p>');
		$('.mobile-connect-wallet').html('<img src="./images/point-yellow.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">'+commonText.unBind+'</a><p class="walletIdshow">'+ account[0] +'</p>');
		$('.mobile-connect-wallet,.header-right-wallet').click(function(){
			showwalletaddress();
		});
	} else if (status==2) {
		// 钱包 未授权
		setCookie('isConnect', false);
		$('.header-right-wallet').html('<img src="./images/point-red.png" style="width:6px; margin-right:5px;"><span class="modify-tc-pc tc-show">'+commonText.noConnectWallet+'</span>');
		$('.mobile-connect-wallet').html('<img src="./images/point-red.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">'+commonText.noConnectWallet+'</a>');
		$('.mobile-connect-wallet,.header-right-wallet').click(function(){
			showwalletaddress();
		});
	}
}

