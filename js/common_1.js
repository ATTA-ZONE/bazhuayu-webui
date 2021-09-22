//
var url = window.location.pathname;
url = url.substring(url.lastIndexOf('/') + 1);
url = url.substring(0, url.indexOf('.'));
//var base_url = 'http://47.118.74.48:8081';
// var base_url = 'http://58.212.110.92:8866';
var base_url = '';
var islogin;
var walletId = '';
var targetChainId = 56;
var walletType = getCookie(CHAIN.WALLET.__wallet__)

if (getCookie('islogin') != 'false') {
	islogin = true;
} else {
	islogin = false;
}

$('.toggleNetWork').on('click', function () {
	window.confirm()
})

if (window.location.href.indexOf('bazhuayu.io') == -1) {
	base_url = 'http://localhost:8081';
	if (window.location.href.indexOf('47.118.74.48:') > -1) {
		base_url = 'http://47.118.74.48:' + window.location.port;
	}
	targetChainId = 97;
}
var lang = getCookie("lang") ? getCookie("lang") : 'TC';
var commonText = chEnText.common[lang];
$.ajax({
	url: base_url + '/v2/user/lang/select',
	type: 'POST',
	dataType: 'json',
	data: {
		lang: lang
	},
	success: function (res) {}
});

//询问弹窗
function logoutConfirm() {
	hsycms.confirm('confirm', commonText.logOutMes,
		function (res) {
			hsycms.success('success', commonText.suc);
			setTimeout(function () {
				$.ajax({
					url: base_url + '/logout',
					type: "POST",
					dataType: 'json',
					success: function (res) {
						if (res.code == 0) {
							// window.location.reload();
							window.location.href = 'index.html';
						}
					}
				})
			}, 1500)
		},
		function () {},
	)
};


function headIconShow() {
	$('.menu-list2').addClass('menu-list-show');
	$('video').addClass('video-hidden');
}

function headIconHide() {
	$('.menu-list2').removeClass('menu-list-show');
	$('video').removeClass('video-hidden');
}

function walletaddressreplace() {
	window.location.href = 'connectWallet.html';
}

function walletaddressdelete() {
	$('.modify-btn-active').removeClass('walletaddress-replace');
	$('.cancel').removeClass('walletaddress-delete');
	$('.cancel').text('取消');
	$('.modify-tips').hide();
	deleteWallet();
}

function closeBsc() {
	$('.bsc-tips').hide()
}

function RPCSwitchHint(res) {
	if (res && res != targetChainId && getCookie('isConnect') == 'true') {
		$('.rpcname').text(commonText.tips01 + RPCSetting[res]['CHAIN_NAME'] + commonText.tips02);
		$('.target-rpcname').text(RPCSetting[targetChainId]['CHAIN_NAME']);
		if (location.pathname != '/mobile/tc/specialitem.html' && location.pathname != '/mobile/tc/myassets.html') {
			$('.bsc-tips').show()
		}
	} else {
		$('.bsc-tips').hide()
	}
}

function changenetwork() {
	CHAIN.WALLET.switchRPCSettings(targetChainId).then(() => {
		$('.bsc-tips').hide()
	})
}

$(function () {

	// 中英文切换
	$("body").on("click", ".language-change-en", function () {
		setCookie('lang', 'EN');
		window.location.href = window.location.href;
	})
	$("body").on("click", ".language-change-ch", function () {
		setCookie('lang', 'TC');
		window.location.href = window.location.href;
	})

	if (lang == "TC") {
		$(".headerpage").load("header.html");
		$(".footerpage").load("footer.html");
		$(".tips").load("tips.html");
	} else {
		$(".headerpage").load("header2.html");
		$(".footerpage").load("footer2.html");
		$(".tips").load("tips2.html");
	}

	//底部配置信息
	$.ajax({
		url: '/sys/concat',
		success: function (res) {
			var weiboUrl = res.data.weiboUrl;
			var twitterUrl = res.data.twitterUrl;
			var telegramUrl = res.data.telegramUrl;
			var qrPath1 = res.data.qrPath;
			var qrPath = JSON.parse(qrPath1)[0];
			$(".weiboUrl").attr("href", weiboUrl);
			// $(".twitterUrl").attr("href",twitterUrl);
			$(".telegramUrl").attr("href", telegramUrl);
			$(".code-pic").attr("src", qrPath);
		},

	})
	//
	$('.bzy-d-head-right input').on('focus', function () {
		$(this).parent().css('border', '1px solid #9567FF');
	}).on('blur', function () {
		$(this).parent().css('border', '1px solid #141414');
	})


	//
	$('.modify-tc-pc').on('click', function () {
		$('.modify').fadeIn();
	})

	//
	var mobile_width = $(window).width();
	if (mobile_width <= 992) {
		$('.tc-show').removeClass('modify-tc-pc');
		$('.tc-show').addClass('modify-tc-mobile');

		$('.accountclass.modify-tc-mobile').on('click', function () {
			$('.modify').addClass('modify-tc-active')
		})
	}

	$('body').append('<div class="bsc-tips" style="display:none;position:absolute;top:80px;left:50%;transform:translateX(-50%);z-index:9999;color:#fff;background: #9567FF;border-radius: 10px;white-space: nowrap;padding:10px 20px;"><span class="rpcname">' + commonText.tips01 + commonText.tips02 + '</span><a onclick="changenetwork()" class="target-rpcname">' + commonText.tips02 + '</a><img onclick="closeBsc()" style="width: 20px;vertical-align: bottom;" src="./images/Close.png" /></div>')
	$('.bsc-tips').hide()
	if (islogin) {
		CHAIN.WALLET.chainId()
			.then(function (res) {
				RPCSwitchHint(res)
			})
	} else {
		$('.header-right-net').hide()
	}


	// 用户信息
	$.ajax({
		url: base_url + '/v2/user/account',
		success: function (res) {
			var html = ``;
			if (res.code == 0) {

				html += `<a class="header-right-yidl" href="javascript:void(0);">`;
				html += `	<div class="header-right-yidl-info flex">`;
				if (res.data.headIcon == null || res.data.headIcon == '') {
					html += `	<div><img src="./images/Ellipse 93.png" ></div>
								<p>
									<span class="ellipsis">` + res.data.name + `</span>
									<span class="my-email">` + res.data.email + `</span>
								</p>`;
				} else {
					html += `	<div><img src="` + base_url + res.data.headIcon + `" ></div>
								<p>
									<span class="ellipsis">` + res.data.name + `</span>
									<span class="my-email">` + res.data.email + `</span>
								</p>`;
					$('.mobile-head-icon img').attr('src', res.data.headIcon);
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
				var mobile_width = $(window).width();
				if (mobile_width <= 992) {
					$('.mobile-head-icon').show();
					$('.mobile-login').hide();
				}
			} else {
				$('.mobile-head-icon').hide();
				$('.mobile-login').show();
				html += `<a class="header-right-login flex" href="login.html">${commonText.login}</a>`;
			}
			$('.header-dl').html(html);
		}
	});
	$.ajax({
		url: base_url + "/v2/commodity/channel/list",
		success: function (res) {
			if (res.code == 0) {
				let data = res.data.types;
				let html = `<li class="${url == 'index' ? 'current' : ''}"><a class="language-tc" href="index.html">${commonText.home}</a></li>`;
				html += `<li class="${url == 'blindbox' ? 'current' : ''}"><a class="language-tc" href="blindbox.html">${commonText.blindbox}</a></li>`;
				data.forEach(item => {
					html += `<li class="${window.location.search == '?id='+item.id ? 'current' : ''}"><a class="language-tc" href="artwork.html?id=` + item.id + `">${item.name}</a></li>`
				});
				html += `<li class="${url == 'auctionDetails' ? 'current' : ''}"><a class="language-tc" href="auctionDetails.html?id=5">${commonText.auction}</a></li>`;
				html += `<li class="${url == 'specialitem' ? 'current' : ''}"><a class="language-tc" href="specialitem.html">${commonText.specialTool}</a></li>`;
				$('.nav-header').html(html);

				let html_h5 = `<li><a class="language-tc" href="index.html">${commonText.home}</a></li>`;
				html_h5 += `<li><a class="language-tc" href="blindbox.html">${commonText.blindbox}</a></li>`;
				html_h5 += `<li><a class="language-tc" href="specialitem.html">${commonText.specialTool}</a></li>`;
				data.forEach(item => {
					html_h5 += `<li><a class="language-tc" href="artwork.html?id=` + item.id + `">${item.name}</a></li>`;
				});
				html_h5 += `<li class="mobile-connect-wallet"><a class="language-tc" onclick="connectWallet()" href="javascript:void(0);">${commonText.noConnectWallet}</a></li><li><a class="language-tc">${commonText.netVer}<span class="networkVersion"></span><span class="toggleNetWork" style="display: inline-block;margin-left: 6px;padding: 0 10px;border-radius: 4px;cursor: pointer;border: 1px solid #9567FF">${commonText.switchNetVision}</span></a></li>
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

	window.ethereum.on("networkChanged", function(accounts) {
		location.reload();
	});
	window.CHAIN.WALLET.chainId().then((res) => {
		switch (res) {
			case 1:
				$('.networkVersion').html('ETH')
				break;
			case 4:
				$('.networkVersion').html('Rinkeby')
				break;
			case 56:
				$('.networkVersion').html('BSC')
				break;
			case 97:
				$('.networkVersion').html('bsc-test')
				break;
		}
	})
	// 百度统计代码
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?9bd005a002797de8867dca5fca16ee90";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
})

function updateWalletStatus() {
	$('.header-right-wallet').html('<img src="./images/point-loading.gif" style="width:6px; margin-right:5px;"><span>' + commonText.wallet + '</span>');
	$('.mobile-connect-wallet').html('<img src="./images/point-loading.gif" style="width:6px; margin-right:5px; "/><a class="language-tc" style="width:calc(100% - 11px)" onclick="connectWallet()" href="javascript:void(0);">' + commonText.wallet + '</a>');
	$('.header-right-wallet').show();
	$('.mobile-connect-wallet').show();

	//查看钱包是否链接
	if (islogin) {
		$('.header-right-wallet').show();
		$.ajax({
			url: base_url + '/v2/user/wallet/info',
			success: function (res) {
				if (res.code == 0) {
					walletId = res.data.address;
					walletType = res.data.walletType || 'MetaMask'
					setCookie('_wallet_', walletType);
					CHAIN.WALLET.accounts()
						.then(function (account) {
							setCookie('isConnect', false);
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
				} else if (res.code == 1002 && islogin) {
					setCookie('islogin', false);
					window.location.href = 'index.html';
				} else {
					$('.header-right-wallet').hide();
					$('.mobile-connect-wallet').hide();
					setCookie('isConnect', false);
				}
			}
		})
	} else {
		$('.header-right-wallet').hide();
	}
}
if (islogin) {
	CHAIN.WALLET.accountsChangedAssign(updateWalletStatus);
	CHAIN.WALLET.networkChangedAssign(RPCSwitchHint);
}

function showwalletaddress(e) {
	if ($('.header-right-wallet .modify-tc-pc').text() == commonText.noConnectWallet || $('.mobile-connect-wallet .modify-tc-pc').text() == commonText.noConnectWallet) {
		connectWallet();
	} else {
		window.location.href = 'showwallet.html';
	}
}

function displayWalletStatus(status, account) {
	if (status == 0) {
		// 钱包与 绑定钱包 相同
		setCookie('isConnect', true);
		$('.header-right-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px;"><span class="modify-tc-pc tc-show">' + commonText.connectWallet + '</span><p class="walletIdshow">' + account[0] + '</p>');
		$('.mobile-connect-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">' + commonText.connectWallet + '</a><p class="walletIdshow">' + account[0] + '</p>');
		$('.mobile-connect-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">' + commonText.connectWallet + '</a><p class="walletIdshow">' + account[0] + '</p>');
		$('.mobile-connect-wallet').html('<img src="./images/point.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">' + commonText.connectWallet + '</a><p class="walletIdshow">' + account[0] + '</p>');
		$('.mobile-connect-wallet,.header-right-wallet').click(function () {
			showwalletaddress();
		});
	} else if (status == 1) {
		// 钱包与 绑定钱包 不同/未绑定
		//setCookie('isConnect',true);
		$('.header-right-wallet').html('<img src="./images/point-yellow.png" style="width:6px; margin-right:5px;"><span class="modify-tc-pc tc-show">' + commonText.unBind + '</span><p class="walletIdshow">' + account[0] + '</p>');
		$('.mobile-connect-wallet').html('<img src="./images/point-yellow.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">' + commonText.unBind + '</a><p class="walletIdshow">' + account[0] + '</p>');
		$('.mobile-connect-wallet,.header-right-wallet').click(function () {
			showwalletaddress();
		});
	} else if (status == 2) {
		// 钱包 未授权
		$('.header-right-wallet').html('<img src="./images/point-red.png" style="width:6px; margin-right:5px;"><span class="modify-tc-pc tc-show">' + commonText.noConnectWallet + '</span>');
		$('.mobile-connect-wallet').html('<img src="./images/point-red.png" style="width:6px; margin-right:5px; "/><a class="language-tc modify-tc-pc tc-show" style="width:calc(100% - 11px)" href="javascript:void(0);">' + commonText.noConnectWallet + '</a>');
		$('.mobile-connect-wallet,.header-right-wallet').click(function () {
			showwalletaddress();
		});
	}
}