var app = new Vue({
	el: '#app',
	data: {
		assetsList: {},
	},
	created() {
		var current = 1;
		this.getAssetsList(current, 9);

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
						var data = res.data.pageResult.records;
						var html = ``;
						if (res.data.pageResult.total > 9 && data.length == 9) {
							$('.bzy-e-more').show();
						} else {
							$('.bzy-e-more').hide();
						};
						if (data.length == 0) {
							html += `<li class="flex nothing">
							<div>暫無藏品記錄</div></li>`;
							$('.my-assets ul').css('padding-top', '100px');
						} else {
							$.each(data, function (i, v) {
								var geshi = v.primaryPic.substr(v.primaryPic.lastIndexOf('.') + 1);
								var time = this.formatDuring(v.restTime * 1000);
		
								html +=
									`<li class="flex">
									<div class="my-assets-left">`;
		
								if (geshi == 'mp4') {
		
									html += `<video style="width:100%;" autoplay="autoplay" loop="loop" src="` + v.primaryPic + `" muted="muted"></video>
										<video class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" src="` + v.primaryPic + `" muted="muted"></video>`;
		
								} else {
		
									html += `<img src="` + v.primaryPic + `" >
										<img class="mohu" src="` + v.primaryPic + `" >`;
		
								}
		
								html += `</div>
									<div class="my-assets-right">
										<div class="my-assets-right-tit">` + v.name + `</div>
										<div class="my-assets-right-creator flex">
											<div class="details-right-creator-img"><img src="./images/t8.png" ></div>
											<span>@ATTA</span>
											<div class="my-assets-right-creator-edition">第` + v.edition + `版，共` + v.endEdition + `版</div>
										</div>
										<div class="details-right-des-tit">商品描述</div>
										<div class="details-right-des">` + (v.introduce == '' ? '暫無介紹' : v.introduce.replace(/;\|;/g, '<br>')) + `</div>
										<div class="details-right-additional">
											<p class="details-right-additional-show" data-status="0" onclick="informationShow(this)">更多信息 <span>+</span></p>
											<p class="details-right-additional-more none order-content">` + (v.content == '' ? '暫無更多資訊' : v.content.replace(/;\|;/g, '<br>')) + `</p>
										</div>
										<div class="my-assets-right-price">
											
											<div class="flex my-assets-right-download"><a class="flex download" target="_blank" href="` + v.attachment + `">下載原始文件副本</a></div>
										</div>
										<div class="my-assets-right-btn flex">`;
								if (getCookie('isConnect') != 'true') {
									html += `<div class="flex my-assets-claim-wrap"><a class="claim" data-status="` + v.status + `" data-instanceId="` + v.instanceId + `" href="javascript:void(0);">等待自動鑄造BSC NFT中</a><div class="claim-tip">(請先連接您的錢包)</div></div>`;
								} else if (v.status == 1) {
									html += `<div class="flex my-assets-claim-wrap"><a class="claim claim-miting" data-time="` + v.restTime + `" data-status="` + v.status + `" data-instanceId="` + v.instanceId + `" href="javascript:void(0);">BSC NFT鑄造時間 (<font>` + time + `</font>)</a><div class="claim-tip">當前正在鑄造：第6版</div></div>`;
								} else if (v.status == 2) {
									html += `<div class="flex my-assets-claim-wrap"><a class="claim claim-miting" data-status="` + v.status + `" data-instanceId="` + v.instanceId + `" href="javascript:void(0);">BSC NFT 鑄造結束</a><div class="claim-tip">查看已鑄造NFT(1)</div></div>`;
								}
								html += `<a class="flex eth" href="javascript:void(0);"><div>鑄造ETH NFT</div><div>(功能準備中)</div></a>
										</div>
										<div class="my-assets-right-address flex">`;
		
								if (v.transactionHash != null && v.transactionHash != '') {
									html += `<div class="my-assets-right-addres-bsc"><a target="_blank" href="` + v.transactionHash + `">` + v.transactionHash + `</a></div>`
								}
		
								html += `<div class="my-assets-right-addres-eth"><a target="_blank" href=""></a></div>
										</div>
									</div>
								</li>`;
							});
		
							$('.my-assets ul').css('padding-top', '0');
						}
						$('.my-assets ul').append(html);
						$('.claim').click(function () {
							if (getCookie('isConnect') != 'true') {
								setTimeout(function () {
									hsycms.alert('model2');
								}, 50)
							}
						})
		
					}
				}
			})
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






