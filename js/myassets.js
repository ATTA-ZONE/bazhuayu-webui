var app = new Vue({
	el: '#app',
	components: {
		'hello': httpVueLoader('hello.vue'),
		'history': httpVueLoader('history.vue')
	},
	data(){
		return {
			tabs: ['我的藏品','我的NFT','NFT操作記錄'],
			selectedTab: 0
		}
	},
	methods: {
		toggleTab(item,idx) {
			this.selectedTab = idx
		}
	}
});
