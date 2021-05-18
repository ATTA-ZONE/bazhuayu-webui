var app = new Vue({
	el: '#app',
	data: {
		assetsList: {},
		isConnect: false
	},
	created() {
		var current = 1;
		this.getAssetsList(current, 9);
		var isConnect = getCookie('isConnect')

		$('.assets-list-load').click(function () {
			current++;
			getAssetsList(current, 9);
			setTimeout(function () {
				this.getTime(current - 1);
			}, 100)
		});

		
			this.getTime(0)
		
	},
	computed: {
		
	},
	methods: {
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
		getAssetsList(current, pageSize) {
			$.ajax({
				url: base_url + '/v2/user/commodity/list',
				data: {
					current,
					pageSize
				},
				success: function (res) {
					if (res.code == 0) {
						this.assetsList = res.data.pageResult
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
		getTime(current) {
			$.each($('.my-assets ul li'), function (i, v) {
				var index = parseInt($(v).index()) + 1;
				// console.log(index + current*9);
				if (index >= current * 9 + 1 && index <= current * 9 + 9) {
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






