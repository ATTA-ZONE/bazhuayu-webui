<template>
  <div>
    <ul v-if="assetsList.records && assetsList.records.length > 0">
			<li class="flex" v-for="(item,idx) in assetsList.records" :key="idx">
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
					<div class="my-assets-right-btn flex">
						<div class="flex my-assets-claim-wrap">
							<a @click="conneAssetsctWallet(getNftStatus(item))"
								:class="['claim', getNftStatus(item) != '等待自動鑄造BSC NFT中'? 'finish-nft':'']">{{getNftStatus(item)}}
							</a>
							<div class="claim-tip" v-if="!isConnect && getNftStatus(item) != 'BSC NFT 鑄造結束'">(請先連接您的錢包)
							</div>
							<div class="claim-tip" v-if="isConnect && getBuildingBsc(item.mintList).length > 0">
								當前正在鑄造：第{{getBuildingBsc(item.mintList).join('、')}} 版
							</div>
							<div class="claim-tip" v-if="isConnect && getBuildingBsc(item.mintList).length > 0">当前NFT接收地址:
								{{walletId}}</div>
							<div class="claim-tip" @click="showSelectedNft(item)" v-if="getBuildedBsc(item.mintList).length > 0">
								查看已鑄造NFT({{getBuildedBsc(item.mintList).length}})
							</div>
						</div>

						<a class="flex eth">
							<div>鑄造ETH NFT</div>
							<div>(功能準備中)</div>
						</a>
					</div>
					<div class="my-assets-right-address flex">
						<div class="my-assets-right-addres-eth"><a target="_blank"></a></div>
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


		<!-- nft 钱包已连接-->
		<div class="hsycms-model-mask" onclick="hsycms.closeAll()" id="mask-model1"></div>
		<div class="hsycms-model hsycms-model-model ntf" id="model1">
			<div class="ntf-close" onclick="hsycms.closeAll()"><img src="./images/Close.png"></div>
			<div class="hsycms-model-content nth-con model-style">
				<div class="nth-con-tip">您的NFT正在鑄造中<br />請耐心等待</div>
				<div class="nth-con-tip">当前NFT接收地址: {{walletId}}</div>
			</div>
			<div class="nth-btn"><button type="button" onclick="hsycms.closeAll()">確認</button></div>
		</div>
		<!-- ntf 钱包未连接 -->
		<div class="hsycms-model-mask" onclick="hsycms.closeAll()" id="mask-model2"></div>
		<div class="hsycms-model hsycms-model-model ntf" id="model2">
			<div class="ntf-close" onclick="hsycms.closeAll()"><img src="./images/Close.png"></div>
			<div class="hscysm-model-title nth-tit">您需要連接錢包</div>
			<div class="hsycms-model-content nth-con">
				<div class="nth-con-tip">為了接收您的NFT,您需要先連接錢包。</div>
				<div class="nth-con-tip" style="color: #9567FF;">如果您不熟悉加密貨幣錢包,請單擊此處</div>
			</div>
			<div class="nth-btn"><button type="button" @click="nftConnect">立即連接</button></div>
		</div>
		<!-- 已铸造nft -->
		<div class="hsycms-model-mask" onclick="hsycms.closeAll()" id="mask-model3"></div>
		<div class="hsycms-model hsycms-model-model ntf" id="model3" style="width: 800px;">
			<div class="ntf-close" onclick="hsycms.closeAll()"><img src="./images/Close.png"></div>
			<div class="hscysm-model-title nth-tit" style="width: 90%; text-align: center;">已鑄造NFT</div>
			<div class="hsycms-model-content nth-con" style="width: 90%;">
				<table class="bsc-table">
					<tr>
						<th class="first">商品名稱</th>
						<th class="second">版數</th>
						<th class="third">NFT接收地址</th>
						<th class="fourth">鑄造憑證</th>
					</tr>
					<tr v-for="(itm,index) in selectedNft" :key="index">
						<td class="first">{{selectedNftName}}</td>
						<td class="second">{{itm.edition}}</td>
						<td class="third">{{walletId}}</td>
						<td class="fourth">{{itm.transactionHash}}</td>
					</tr>
				</table>
				<div class="mint-wrap">
					<div class="flex mint-wrap-title">
						<span>商品名稱</span>
						<span>版數</span>
					</div>
					<div class="building-nft" v-for="(itm,index) in selectedNft" :key="index">
						<div class="flex mint-wrap-edition">
							<span>{{selectedNftName}}</span>
							<span>{{itm.edition}}</span>
						</div>
						<div class="address-wrap">
							<div class="min-address">NFT接收地址: {{walletId}}</div>
							<div>鑄造憑證: {{itm.transactionHash}}</div>
						</div>
						<div class="mint-line"></div>
					</div>
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
  name: 'hello',
  data: function () {
		return {
			assetsList: {},
			isConnect: false,
			current: 1,
			pageSize: 9,
			showMoreInfo: -1,
			selectedNftName:'',
			selectedNft: null,
			walletId: ''
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
</style>