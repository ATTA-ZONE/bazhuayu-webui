var app = new Vue({
	el: '#app',
	data: function () {
		return {
			wallettitle  : "當前錢包地址如下：",
			isshowicon : false,
			address:address,
			tipscon:"當前購買的所有NFT資產將會發送至以上錢包地址",
			btn1name:"更換",
			btn2name:"刪除",
			btn3name:"取消",
			status : 1,
			assetsList: {},
			isConnect: false,
			current: 1,
			pageSize: 9,
			showMoreInfo: -1,
			selectedNftName:'',
			selectedNft: null
		}
	},
	created() {
		this.isConnect = getCookie('isConnect') == 'false' ? false : true;
	},
	mounted() {
		this.getwallettype();
		this.address = window.address;
	},
	
	methods: {
		closebtn() {
			window.location.href = document.referrer;
			cancel();
		},
		getwallettype(){
			$.ajax({
				url:base_url+'/v2/user/wallet/info',
				async:false,
				success:function(res){
					if(res.code==0){
						if(res.data.walletType=="TOKEN POCKET"){
							this.isshowicon = true;
						}else if (res.data.walletType=="METAMASK") {
							this.isshowicon = false;
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
			var that = this;
			$.ajax({
				url: base_url + '/v2/user/wallet/delete',
				type: 'POST',
				dataType: 'json',
				success: function (res) {
					if (res.code == 0) {
						success('删除成功', 1800);
						document.cookie = "isConnect=false";
						setTimeout(function () {
							that.closebtn();
						}, 1800)
					}
				}
			});
		}
	}
});