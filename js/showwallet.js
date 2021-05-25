var app = new Vue({
	el: '#app',
	data: function () {
		return {
			wallettitle  : "當前錢包地址如下：",
			isshowicon : false,
			walletIdvue:'',
			tipscon:"當前購買的所有NFT資產將會發送至以上錢包地址",
			btn1name:"更換",
			btn2name:"刪除",
			btn3name:"取消",
			status : 1,
		}
	},
	created() {
		this.getwallettype();
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
						if(res.data.walletType=="TOKEN POCKET"){
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
				$('.cancel-mobile').text('取消');
			}, 300);
		},
		clickdelete2(){
			$.ajax({
				url: base_url + '/v2/user/wallet/delete',
				type: 'POST',
				dataType: 'json',
				success: function (res) {
					if (res.code == 0) {
						success('删除成功', 1800);
						document.cookie = "isConnect=false";
						setTimeout(function () {
							window.location.href = 'index.html';
						}, 1800)
					}
				}
			});
		}
	}
});