var connectWalletText = chEnText.connectWallet[lang];
// link successful
function linksuccessful(walletId) {
	$('.modify-tit span').text(connectWalletText.logWtllet);
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="modify-ipt-tit">`+(walletId==null?connectWalletText.connectWallet:connectWalletText.walletAddress+walletId)+`</div>
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-tips').html(`<span class="modify-tips-content">${connectWalletText.tips01}</span>`);
	$('.modify-btn-tips').html(`<span class="modify-btn-tips-content">${connectWalletText.tips02}</span>`);
	$('.modify-btn-active').addClass('add');
	$('.modify-btn-active').removeClass('delete');
	$('.modify-btn-active').text(connectWalletText.know);
	$('.cancel').hide();
	$('.modify').fadeIn();
}


function connectInit(walletname) {
	CHAIN.WALLET.connect(walletname)
		.then(function (accounts) {
			if (accounts) {
				loading();
				if (CHAIN.WALLET.isConnected(walletname)) {
					// document.cookie = "isConnect=true";
					setCookie('isConnect',true);
					setCookie(CHAIN.WALLET.__wallet__, walletname);
				};
				var data = {
					address: accounts[0],
					walletType: walletname
				}
		
				$.ajax({
					url: base_url + '/v2/user/wallet/bind',
					type: 'POST',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(data),
					success: function (res) {
						if (res.code == 0) {
							loadingHide();
							linksuccessful(accounts[0]);
						} else if (res.code == 2001){
							loadingHide();
							window.alert(connectWalletText.changeWallet);
						} else if (res.code == 1011){
							loadingHide();
							window.alert(connectWalletText.emailErr);
						} else if (res.code == 1002){
							loadingHide();
							window.alert(connectWalletText.loginNot);
						} else {
							loadingHide();
							window.alert(connectWalletText.windowErr);
						}

					},
					error: function (res) {
						loadingHide();
						window.alert(connectWalletText.httpError);
					}
				});
			} else {
				window.alert(connectWalletText.unableGet);
			}
		})
		.catch(function (reason) {
		})
}


// 请求钱包授权，并得到当前使用的钱包地址，ES6
$(".metamask").click(function (e) {
	
	if (typeof window.ethereum !== 'undefined') {
		connectInit('MetaMask');
	} else {
		// 处理用户没安装的情况， 比如显示一个消息
		// 告诉他们要安装 MetaMask 来使用我们的应用
		alert(connectWalletText.alert);
	}
});

$("#walletColletBtn").click(function (e) {
	connectInit('WalletConnect');
});

$(".connectWalletpage .modify-btn-active,.connectWalletpage .modify-close").click(function(){
	window.location.href = 'index.html';
})