var app = new Vue({
	el: '#app',
	data: function () {
		return {
			wallettitle:"當前默認錢包地址如下：",
			isshowicon : false,
			walletIdvue:'',
			tipscon:"請注意：您購買的NFT資產只會發放至當前的默認錢包地址",
			btn1name:"更換",
			btn2name:"刪除",
			btn3name:"取消",
			deleteSuc:"删除成功",
			status : 1,
			lang:""
		}
	},
	created() {
		this.getwallettype();
		this.lang = getCookie("lang")?getCookie("lang"):'TC';
		if(this.lang == 'EN'){
			this.wallettitle = "Current default wallet address：";
			this.tipscon = "Note: The NFT assets you purchased will be sent to the current default wallet only!";
			this.btn1name = "Change";
			this.btn2name = "Delete";
			this.btn3name = "Cancel";
			this.deleteSuc = "delete sucessful";
		}
	},
	mounted() {
	},
	
	methods: {
		closebtn() {
			window.location.href = document.referrer;
			cancel();
		},
		getwallettype(){
			var that = this;
			$.ajax({
				url:base_url+'/v2/user/wallet/info',
				async:false,
				success:function(res){
					if(res.code==0){
						that.walletIdvue = res.data.address;
						if(res.data.walletType=="WalletConnect"){
							that.isshowicon = true;
						}else if (res.data.walletType=="METAMASK") {
							that.isshowicon = false;
						}
					}
					
				}
			})
		},
		clickdelete(){
			this.status = 2;
			deleteWallet();
			setTimeout(() => {
				$('.cancel-mobile').text(this.btn3name);
			}, 300);
		},
		clickdelete2(){
			let that = this;
			$.ajax({
				url: base_url + '/v2/user/wallet/delete',
				type: 'POST',
				dataType: 'json',
				success: function (res) {
					if (res.code == 0) {
						success(that.deleteSuc, 1800);
						// document.cookie = "isConnect=false";
						setCookie("isConnect",false);
						setTimeout(function () {
							window.location.href = 'index.html';
						}, 1800)
					}
				}
			});
		}
	}
});