var app = new Vue({
	el: '#app',
	data: function (){
		return {
			assetsList: {records:[]},
			isConnect: false,
			current: 1,
			pageSize: 9
		}
	},
	created() {
		this.isConnect = getCookie('isConnect')
		this.getTime(0)
	},
	mounted() {
		this.getAssetsList()
	},
	methods: {
		getMoreList(){
			this.current+=1
			this.getAssetsList()
			setTimeout(function () {
				this.getTime(this.current - 1);
			}, 100)
		},
		 getCookie(cookieName) {
			const strCookie = document.cookie
			const cookieList = strCookie.split('; ')
			var cookieValue = false;
			for(let i = 0; i < cookieList.length; i++) {
				const arr = cookieList[i].split('=')
				if (cookieName === arr[0]) {
					cookieValue = arr[1];
				}
			}
		
			return cookieValue;
		},
		getFormat(item){
			return item.primaryPic.substr(v.primaryPic.lastIndexOf('.') + 1)
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
					current:this.current,
					pageSize: this.pageSize
				},
				success: function (res) {
					if (res.code == 0) {
						self.assetsList = res.data.pageResult
						}
					}
			})
		},
		alertModel(){
			if (getCookie('isConnect') != 'true') {
				setTimeout(function () {
					hsycms.alert('model2');
				}, 50)
			}
		},
		getTime() {
			$.each($('.my-assets ul li'), function (i, v) {
				var index = parseInt($(v).index()) + 1;
				// console.log(index + current*9);
				if (index >= this.current * 9 + 1 && index <= this.current * 9 + 9) {
					var status = $(v).find('.claim').data('status');
					// console.log(status);
					if (status == 1) {
						var time = $(v).find('.claim').data('time') * 1000;
						var nt = setInterval(function () {
							time = time - 1000;
							if (time < 0) {
								// console.log(1);
								clearInterval(nt);
								// return;
								time = 0;
							}
							var js = this.formatDuring(time);
							$(v).find('.claim font').text(js);
						}, 1000)
						// console.log(js);
					}
				}
			});
		},
		informationShow(obj) {
			var status = $(obj).data('status');
			if (status == 0) {
				$('.details-right-additional-more').slideDown('fast');
				$(obj).children('span').text('-');
				$(obj).data('status', '1');
			} else if (status == 1) {
				$('.details-right-additional-more').slideUp('fast');
				$(obj).children('span').text('+');
				$(obj).data('status', '0');
			}
		},
		nftConnect() {
			window.location.href = 'connectWallet.html';
		},
		getNft() {
			success('確認', 1800);
			setTimeout(function () {
				window.location.reload();
			}, 1800);
		}
	}
});






