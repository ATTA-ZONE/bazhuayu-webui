var app = new Vue({
	el: '#app',
	data: function () {
		return {
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
		this.isConnect = getCookie('isConnect') == 'false' ? false : true
	},
	mounted() {
		this.getAssetsList()
	},
	
	methods: {
		getNftStatus(item) {
			let finishNft = true
			item.mintList.filter(data=>{
				if (data.status == 0 || data.status == 1) {
					finishNft = false
				}
			})
			if (finishNft) {
				return 'BSC NFT 鑄造結束'
			} else {
				if (this.isConnect) {
					return 'BSC NFT鑄造中 ( 约7天完成 )'
				} else {
					return '等待自動鑄造BSC NFT中'
				}
			}
		},
		conneAssetsctWallet(str) {
			if (str == 'BSC NFT 鑄造結束') {
				return false
			} else {
				if (this.isConnect) {
					setTimeout(function () {
						hsycms.alert('model1')
					}, 50)
				} else {
					setTimeout(function () {
						hsycms.alert('model2');
					}, 50)
				}
			}
		},
		showSelectedNft(item){
			this.selectedNftName=item.name
			this.selectedNft= this.getBuildedBsc(item.mintList)  
			hsycms.alert('model3')
		},
		getBuildedBsc(list){
			let arr = []
			list.filter(item => {
				if (item.status == 2) {
					arr.push(item)
				}
			})
			return arr
		},
		getBuildingBsc(list){
			let arr = []
			list.filter(item => {
				if (item.status == 1) {
					arr.push(item.edition)
				}
			})
			return arr
		},
		getAllBsc(list){
			let arr = []
			list.filter(item => {
				if (arr.indexOf(item.edition)) {
					arr.push(item.edition)
				}
			})
			return arr
		},
		getIntroduce(item,content, str) {
			if (content === 'desc') {
				return item.introduce == '' ? str : item.introduce.replace(/;\|;/g, '<br/>')
			} else {
				return item.content == '' ? str : item.content.replace(/;\|;/g, '<br/>')
			}
		},
		toggleMoreInfo(idx) {
			if (this.showMoreInfo == idx) {
				this.showMoreInfo = -1
			} else {
				this.showMoreInfo = idx
			}
		},
		getMoreList() {
			this.current += 1
			this.getAssetsList()
			
		},
		getCookie(cookieName) {
			const strCookie = document.cookie
			const cookieList = strCookie.split('; ')
			var cookieValue = false;
			for (let i = 0; i < cookieList.length; i++) {
				const arr = cookieList[i].split('=')
				if (cookieName === arr[0]) {
					cookieValue = arr[1];
				}
			}

			return cookieValue;
		},
		getFormat(item) {
			return item.primaryPic.substr(item.primaryPic.lastIndexOf('.') + 1)
		},
		formatDuring(mss) {
			var hours = parseInt(mss / (1000 * 60 * 60));
			var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = parseInt((mss % (1000 * 60)) / 1000);
			return hours + ":" + minutes + ":" + seconds;
		},
		getAssetsList() {
			var self = this
			$.ajax({
				url: base_url + '/v2/user/commodity/list',
				data: {
					current: this.current,
					pageSize: this.pageSize
				},
				success: function (res) {
					if (res.code == 0) {
						self.assetsList = res.data.pageResult
					}
				}
			})
		}
	}
});
function nftConnect() {
	window.location.href = 'connectWallet.html';
}