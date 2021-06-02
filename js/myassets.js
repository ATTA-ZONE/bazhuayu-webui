var app = new Vue({
	el: '#app',
	components: {
		'hello': httpVueLoader('hello.vue'),
		'mynft': httpVueLoader('mynft.vue'),
		'history': httpVueLoader('history.vue'),
		'myCollection': httpVueLoader('./vueViews/myCollection/myCollection.vue')
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
