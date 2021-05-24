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
		mangeStatus(list) {
			let status = 0
			list.filter(item => {
				if (item.status > status) {
					status = item.status
				}
			})
			return status
		},
		getIntroduce(item, str) {
			if (content === 'desc') {
				return item.introduce == '' ? str : item.introduce.replace(/;\|;/g, '<br/>')
			} else {
				return item.content == '' ? str : item.introduce.replace(/;\|;/g, '<br/>')
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
		},
		
		conneAssetsctWallet(item) {
			if (item) {
				item.mintList.filter(itm => {
					if (itm.status == 0) {
						hsycms.alert('model2');
					}
				})
			} else {
				if (getCookie('isConnect') == 'true') {
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
		nftConnect() {
			window.location.href = 'connectWallet.html';
		}
	}
});