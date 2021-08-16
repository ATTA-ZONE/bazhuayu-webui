var app = new Vue({
	el: '#myassets',
	components: {
		'mynft': httpVueLoader('mynft.vue'),
		'history': httpVueLoader('history.vue'),
		'myCollection': httpVueLoader('./vueViews/myCollection/myCollection.vue')
	},
	data(){
		return {
			selectedTab: 0,
			chEnTextHtml: {
				"TC":{
					title : "我的資產",
					emil :"電子信箱地址*",
					psw : "密碼*",
					wjpsw : "忘記密碼？",
					nozh : "還沒有帳號？",
					zczh : "註冊新賬號",
					tabs: ['我的藏品','我的NFT','NFT操作記錄']
				},
				"EN":{
					title : "My Assets",
					tabs: ["My Collection","My NFT","NFT Logs"]
				}
			},
			lang:''
		}
	},
	mounted(){
		if (getCookie('selectedTab') && getCookie('selectedTab') != 'null') {
			this.selectedTab = getCookie('selectedTab');
		}
	},
	methods: {
		toggleTab(item,idx) {
			window.setCookie('selectedTab',null);
			this.selectedTab = idx;
		}
	},
	created() {
		let self = this;
		this.lang = getCookie("lang")?getCookie("lang"):'TC';	
		if(this.lang == 'TC'){
			document.title = '我的資產';
		}else{
			document.title = 'My Assets';
		}
	}
});
