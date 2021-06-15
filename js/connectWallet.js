// link successful
function linksuccessful(walletId) {
	$('.modify-tit span').text('您成功登記了一個錢包');
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="modify-ipt-tit">`+(walletId==null?'請連接錢包':'錢包地址：'+walletId)+`</div>
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-tips').html(`<span class="modify-tips-content">請註意：您購買的NFT資產只會發放至當前登記的錢包</span>`);
	$('.modify-btn-tips').html(`<span class="modify-btn-tips-content">（ 如果您想使用其他錢包，請點擊右上角“已連接錢包”進行更換 ）</span>`);
	$('.modify-btn-active').addClass('add');
	$('.modify-btn-active').removeClass('delete');
	$('.modify-btn-active').text('知道了');
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
				};
				var data = {
					address: accounts[0],
					walletType: 'METAMASK'
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
							window.alert('該錢包已被綁定占有, 請更換錢包');
						} else if (res.code == 1011){
							loadingHide();
							window.alert('郵箱未驗證');
						} else if (res.code == 1002){
							loadingHide();
							window.alert('登錄已失效，請重新登錄');
						} else {
							loadingHide();
							window.alert('系統錯誤');
						}

					},
					error: function (res) {
						loadingHide();
						window.alert('網絡錯誤，無法獲取賬戶信息');
					}
				});
			} else {
				window.alert('無法獲取錢包信息');
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
		alert('請使用任意錢包Dapp中自帶的瀏覽器訪問 bazhuayu.io，則可成功連接錢包。或請使用電腦，通過瀏覽器的錢包插件連接錢包。');
	}
});

$("#walletColletBtn").click(function (e) {
	connectInit('WalletConnect');
});

$(".connectWalletpage .modify-btn-active,.connectWalletpage .modify-close").click(function(){
	window.location.href = 'index.html';
})