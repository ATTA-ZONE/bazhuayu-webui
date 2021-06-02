<template>
  <div>
    <ul v-if="assetsList.records && assetsList.records.length > 0">
			<li v-for="(item,idx) in assetsList.records" :key="idx">
				<div class="flex between mobilflex">
					<div class="my-assets-left" v-if="getFormat(item) == 'mp4'">
						<video style="width:100%;" autoplay="autoplay" loop="loop" :src=" item.primaryPic" muted="muted"></video>
						<video class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" :src="item.primaryPic"
							muted="muted"></video>
					</div>
					<div class="my-assets-left" v-else>
						<img :src="item.primaryPic" />
						<img class="mohu" :src="item.primaryPic" />
					</div>
					<div class="my-assets-right">
						<div class="my-assets-right-tit">{{item.name}}</div>
						<div class="my-assets-right-creator flex">
							<div class="details-right-creator-img"><img src="./images/t8.png"></div>
							<span>@ATTA</span>
							<div class="my-assets-right-creator-edition">當前持有第<font style="color:#9567FF">
									{{getAllBsc(item.mintList).join(',')}}</font>版，共{{item.endEdition}}版</div>
						</div>
						<div class="details-right-des-tit">商品描述</div>
						<div class="details-right-des" v-html="getIntroduce(item,'desc','暫無介紹')">
						</div>
						<div class="details-right-additional">
							<p class="details-right-additional-show" @click="toggleMoreInfo(idx)">更多信息 <span>+</span>
							</p>
							<p class="details-right-additional-more order-content" v-if="showMoreInfo==idx"
								v-html="getIntroduce(item,'detail','暫無更多資訊')">
							</p>
						</div>
						<div class="my-assets-right-price">
							<div class="flex my-assets-right-download"><a class="flex download" :download="item.attachment"
									:href="item.attachment">下載原始文件副本</a></div>
						</div>
						
					</div>
				</div>
				<div class="tablistbox">
					<p class="titlebox flex between">
						<span>當前持有({{listdata.length}}):</span>
						<img src="./images/arrow.png" alt="">
					</p>
					<div class="listbox">
						<div class="everydatabox" v-for="(item,index) in listdata" :key="index">
							<p class="tit">
								<span>Token ID :  {{item.id}}  of {{item.num}}</span>
								<span style="margin-left: 50px;">區塊鏈： {{item.qkl}}</span>
							</p>
							<div class="inputbox flex between">
								<div class="srkbox">
									<input type="text" readonly :value="item.status == 1 ? '接收地址: '+item.address : '當前所在錢包: '+item.address">
									<button v-if="item.status == 1" onclick="editnftaddress()">修改</button>
									<span v-if="item.status == 1" class="clickedit" onclick="editnftaddress()">點擊修改地址</span>
								</div>
								<button class="ntfbtn kxbor" v-if="item.status == 1">鑄造中</button>
								<button class="ntfbtn" v-if="item.status == 2" onclick="zhuanyiaddress()">轉移</button>
							</div>
							<div class="horizontalline"></div>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<ul v-else style="padding-top: 100px;">
			<li class="flex nothing">
				<div>暫無藏品記錄</div>
			</li>
		</ul>
		<div class="bzy-e-more" v-if="assetsList.total > 9">
			<div class="flex assets-list-load" @click="getMoreList">
				<span class="language-tc">加载更多</span>
				<img src="./images/next.png">
				<img src="./images/xiala2.png">
			</div>
		</div>

		<!-- modify -->
		<div class="modify none">
			<div class="modify-container flex">
				<div class="modify-form">
					<div class="modify-tit flex" data-type="name"><span>title</span><img class="none" onclick="cancelMobile()" src="./images/Close.png" ></div>
					<div class="modify-ipt"></div>
					<div class="modify-btn flex">
						<button class="add modify-btn-active" type="button"></button>
						<button class="cancel" type="button" onclick="cancel()">取消</button>
						<button class="cancel cancel-mobile none" type="button" onclick="cancelMobile()">取消</button>
					</div>
					<div class="modify-close" onclick="cancel()"><img src="./images/Close.png" ></div>
				</div>
			</div>
		</div>
		<!-- foot -->
		<div class="footerpage2"></div>

		<div class="tips"></div>
  </div>
</template>

<script>
module.exports = {
  name: 'mynft',
  data: function () {
		return {
			assetsList: {},
			isConnect: false,
			current: 1,
			pageSize: 9,
			showMoreInfo: -1,
			selectedNftName:'',
			selectedNft: null,
			walletId: '',
			listdata : [
				{id : "13",num : "150",qkl : "Binance",status : '1',address : "0xC2C747E0F7004F9E8817Db2ca4997657a7746928"},
				{id : "14",num : "150",qkl : "Binance",status : '2',address : "0xC2C747E0F7004F9E8817Db2ca4997657a7746928"},
				{id : "15",num : "150",qkl : "Binance",status : '2',address : "0xC2C747E0F7004F9E8817Db2ca4997657a7746928"},
			]
		}
	},
	
	created() {
		this.isConnect = getCookie('isConnect') == 'false' ? false : true
		this.getAccount()
	},
	mounted() {
		this.getAssetsList()
	},
	
	methods: {
		getAccount(){
			let self = this
			$.ajax({
				url:base_url+'/v2/user/wallet/info',
				success:function(res){
					if(res.code==0){
						self.walletId = res.data.address;
					}
				}
			})
		},
		// getNftStatus(item) {
		// 	let finishNft = true
		// 	item.mintList.filter(data=>{
		// 		if (data.status == 0 || data.status == 1) {
		// 			finishNft = false
		// 		}
		// 	})
		// 	if (finishNft) {
		// 		return 'BSC NFT 鑄造結束'
		// 	} else {
		// 		if (this.isConnect) {
		// 			return 'BSC NFT鑄造中 ( 约7天完成 )'
		// 		} else {
		// 			return '等待自動鑄造BSC NFT中'
		// 		}
		// 	}
		// },
		// showSelectedNft(item){
		// 	this.selectedNftName=item.name
		// 	this.selectedNft= this.getBuildedBsc(item.mintList)  
		// 	hsycms.alert('model3')
		// },
		// getBuildedBsc(list){
		// 	let arr = []
		// 	list.filter(item => {
		// 		if (item.status == 2) {
		// 			arr.push(item)
		// 		}
		// 	})
		// 	return arr
		// },
		// getBuildingBsc(list){
		// 	let arr = []
		// 	list.filter(item => {
		// 		if (item.status == 1) {
		// 			arr.push(item.edition)
		// 		}
		// 	})
		// 	return arr
		// },
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
		// formatDuring(mss) {
		// 	var hours = parseInt(mss / (1000 * 60 * 60));
		// 	var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
		// 	var seconds = parseInt((mss % (1000 * 60)) / 1000);
		// 	return hours + ":" + minutes + ":" + seconds;
		// },
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
    nftConnect() {
      window.location.href = 'connectWallet.html';
    }
	}
}
</script>

<style>
.hello {
  background-color: #ffe;
}
.between{
	justify-content: space-between;
	align-items: flex-start;
}
.titlebox{
	font-weight: bold;
	font-size: 24px;
	color: rgba(255, 255, 255, 0.9);
	margin-bottom: 15px;
}
.titlebox img{
	cursor: pointer;
}
.listbox{
	padding: 26px 0;
	border: 1px solid rgba(255, 255, 255, 0.15);
	border-left: none;
	border-right: none;
}
.everydatabox{
	margin-bottom: 30px;
	font-weight: normal;
	font-size: 20px;
	color: rgba(255, 255, 255, 0.8);
}
.inputbox{
	margin-top: 10px;
	height: 59px;
}
.srkbox{
	width: 80%;
	position: relative;
	height: 100%;
}
.srkbox input{
	width: 100%;
	height: 100%;
	background: #222222;
	border-radius: 4px;
	font-size: 20px;
	color: rgba(255, 255, 255, 0.8);
	border: none;
	padding-left: 14px;
}
.srkbox button{
	position: absolute;
	right: 23px;
	top: 10px;
	width: 73px;
	height: 40px;
	font-size: 16px;
	background: #4E4E4E;
	border-radius: 4px;
	border:none;
}
.srkbox .clickedit{
	color: #9567FF;
	position: absolute;
	right: 0;
	top: 43px;
	display: none;
	cursor: pointer;
}
.ntfbtn{
	width: 17.6%;
	height: 100%;
	border-radius: 2px;
	font-weight: 600;
	font-size: 14px;
	color: #FFFFFF;
	background: #9567FF;
	border: none;
}
.kxbor{
	border: 1px solid #606060;
	background: transparent;
}
.modify-form{
	width: 700px;
}
.modify-tips{
	text-align: center;
}
.modify-tips-content{
	color: rgba(255, 255, 255, 0.7);
}
.dqaddress{
	font-size: 16px;
}
.dqaddress span{
	font-size: 14px;
}
.newaddress{
	font-size: 18px;
}
.newaddress input{
	width: 75%;
	text-indent: 12px;
}
.newaddress2 input{
	width: 83%;
	text-indent: 12px;
}
.horizontalline{
	width: 122px;
	height: 0px;
	text-align: center;
	opacity: 0.15;
	position: absolute;
	bottom: -15px;
	left: 0;
	right: 0;
	margin: auto;
	border: 1px solid #FFFFFF;
	display: none;
}
@media only screen and (max-width: 992px){
	.mobilflex{
		flex-direction: column;
		margin-bottom: 50px;
	}
	.titlebox{
		font-size: 16px;
	}
	.titlebox img{
		width: 18px;
		height: 18px;
	}
	.everydatabox{
		font-size: 10px;
		position: relative;
	}
	.inputbox{
		height: auto;
		flex-wrap: wrap;
	}
	.srkbox{
		width: 100%;
		height: 40px;
		font-size: 10px;
	}
	.srkbox input{
		font-size: 10px;
		padding-left: 0;
		text-align: center;
	}
	.srkbox button{
		display: none;
	}
	.srkbox .clickedit,.horizontalline{
		display: inline-block;
	}
	.ntfbtn{
		width: 100%;
		height: 40px;
		margin-top: 12px;
	}
	.kxbor{
		margin-top: 28px;
	}
	.newaddress input,.newaddress2 input{
		text-indent: 12px !important;
	}
}
@media only screen and (max-width:768px){
	.mobilflex{
		flex-direction: column;
		margin-bottom: 50px;
	}
	.titlebox{
		font-size: 16px;
	}
	.titlebox img{
		width: 18px;
		height: 18px;
	}
	.everydatabox{
		font-size: 10px;
		position: relative;
	}
	.inputbox{
		height: auto;
		flex-wrap: wrap;
	}
	.srkbox{
		width: 100%;
		height: 40px;
		font-size: 10px;
	}
	.srkbox input{
		font-size: 10px;
		padding-left: 0;
		text-align: center;
	}
	.srkbox button{
		display: none;
	}
	.srkbox .clickedit,.horizontalline{
		display: inline-block;
	}
	.ntfbtn{
		width: 100%;
		height: 40px;
		margin-top: 12px;
	}
	.kxbor{
		margin-top: 28px;
	}
	.newaddress input,.newaddress2 input{
		text-indent: 12px !important;
	}
}
</style>