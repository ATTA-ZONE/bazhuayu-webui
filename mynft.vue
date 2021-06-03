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
							<div class="my-assets-right-creator-edition">共{{item.endEdition}}版</div>
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
				<div class="tablistbox" v-if="item.mintList && item.mintList.length">
					<p class="titlebox flex between">
						<span>當前持有({{item.mintList.length}}):</span>
						<img src="./images/arrow.png" alt="" :class="item.ishide ? 'ishide' : ''" @click="changeishide(item.ishide,idx)">
					</p>
					<div class="listbox" v-if="!item.ishide">
						<div class="everydatabox" v-for="(json,index) in item.mintList" :key="index">
							<p class="tit">
								<span>Token ID :  {{json.edition}}  of {{item.endEdition}}</span>
								<span style="margin-left: 50px;">區塊鏈： Binance</span>
							</p>
							<div class="inputbox flex between">
								<div class="srkbox">
									<input type="text" readonly :value="json.status == 1 ? '接收地址: '+ (json.receiver ? json.receiver : '暫無接收地址') : '當前所在錢包: '+walletId">
									<button v-if="json.status == 1" :data-json="JSON.stringify(json)" onclick="editnftaddress(event)">修改</button>
									<span v-if="json.status == 1" :data-json="JSON.stringify(json)" class="clickedit" onclick="editnftaddress(event)">點擊修改地址</span>
								</div>
								<button class="ntfbtn kxbor" v-if="json.status == 1">鑄造中</button>
								<button class="ntfbtn" v-if="json.status == 2" :data-endedition="item.endEdition" :data-json="JSON.stringify(json)" onclick="zhuanyiaddress(event)">轉移</button>
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
					<div class="modify-tips"></div>
					<div class="modify-btn flex">
						<button class="add modify-btn-active" type="button" @click="editzyclick($event)"></button>
						<button class="cancel" type="button" onclick="cancel()">取消</button>
						<button class="cancel cancel-mobile none" type="button" onclick="cancelMobile()">取消</button>
					</div>
					<div class="modify-close" onclick="cancel()"><img src="./images/Close.png" ></div>
				</div>
			</div>
		</div>
		<!--提示弹窗-->
		<div class="hsycms-model-mask" id="mask-tips"></div>
			<div class="hsycms-model hsycms-model-tips" id="tips">
			<div class="hsycms-model-text">这里是提示内容</div>
		</div>
		<!-- foot -->
		<div class="footerpage2"></div>

		<!-- <div class="tips"></div> -->
		
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
			tokenarr : []
		}
	},
	
	created() {
		this.isConnect = getCookie('isConnect') == 'false' ? false : true
		// this.getAccount()
	},
	mounted() {
		this.getAccount()
		// this.geteveryqkl();
	},
	
	methods: {
		getAccount(){
			let self = this;
			CHAIN.WALLET.enable()
			.then(res=>{
				if (res && res.length) {
					self.walletId = res[0];
					self.geteveryqkl();
				}else{
					self.getAssetsList([]);
				}
			})
		},
		geteveryqkl(){
			let self = this
			var targetChainId = '';
			var scansite_base_url = '';
			
			if (window.location.href.indexOf('bazhuayu.io') == -1) {
				targetChainId = 97;
				scansite_base_url = 'https://api-testnet.bscscan.com'
			} else {
				targetChainId = 56;
				scansite_base_url = 'https://api.bscscan.com'
			}
			auctionAddress = contractSetting['atta_ERC721'][targetChainId].address;
			$.ajax({
				url: scansite_base_url + '/api?module=account&action=tokennfttx&contractaddress=' + auctionAddress + '&address=' + this.walletId + '&sort=asc',
				success: function(res) {
					let nftData = res.result;
					let obj = {},arr = [],tokenarr = [];
					console.log(nftData);
					for (let i = 0; i < nftData.length; i++) {
						if (!obj[nftData[i].tokenID]) {
							obj[nftData[i].tokenID] = true;
							arr.push({tokenID : nftData[i].tokenID,listdata :  [nftData[i]],tojia : 0,fromjian : 0});
						}else{
							arr.forEach(item => {
								if (item.tokenID == nftData[i].tokenID) {
									item.listdata.push(nftData[i]);
								}
							});
						}
					}
					arr.forEach(item => {
						item.listdata.forEach(json => {
							if (json.to.toUpperCase() == window.walletId.toUpperCase()) {
								item.tojia += 1 ;
							}
							if (json.from.toUpperCase() == window.walletId.toUpperCase()) {
								item.fromjian -= 1 ;
							}
						});
						item.jsnum = item.tojia + item.fromjian;
						if (item.jsnum == 1) {
							tokenarr.push(item.tokenID)
						}
					});
					console.log(arr);
					console.log(tokenarr);
					self.tokenarr = tokenarr;
					self.getAssetsList(tokenarr);
				}
			})
		},
		getAllBsc(list){
			let arr = []
			if (list && list.length) {
				list.filter(item => {
					if (arr.indexOf(item.edition)) {
						arr.push(item.edition)
					}
				})
			}
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
			this.getAssetsList(this.tokenarr);
			
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
		getAssetsList(arr) {
			var self = this
			$.ajax({
				url: base_url + '/v2/user/nft/list',
				type: 'POST',
				contentType: 'application/json',
				dataType: 'json',
				data:JSON.stringify({
					current: self.current,
					pageSize: self.pageSize,
					tokenIds : arr
				}),
				success: function (res) {
					if (res.code == 0) {
						self.assetsList = res.data.pageResult
					}
				}
			})
		},
		changeishide(bool,index){
			let obj = this.assetsList.records[index];
			obj.ishide = !bool;
			this.$set(this.assetsList.records,index,obj);
		},
		nftConnect() {
			window.location.href = 'connectWallet.html';
		},
		editzyclick(e){
			let newaddress = $('.newaddress input').val();
			let newaddress2 = $('.newaddress2 input').val();
			let web3 = new Web3(CHAIN.WALLET.provider());
			let obj = JSON.parse(e.target.dataset.type);
			console.log(e.target.dataset.type,!newaddress);
			if (!newaddress && obj.status == 1 || !newaddress2 && obj.status == 2) {
				tips("不可以為空~");
				return;
			}
			if (!web3.utils.isAddress(newaddress) || !web3.utils.isAddress(newaddress2)) {
				tips("请输入合法地址");
				return;
			}
			if (obj.status == 1) {
				// 确认修改
				this.editajax(newaddress,obj);
			}
			if (obj.status == 2) {
				// 确认转移
				this.zyajax(newaddress2,obj);
			}
		},
		editajax(newaddress,obj){
			var self = this
			$.ajax({
				url: base_url + '/v2/mint/mint/updateAddress',
				type: 'POST',
				contentType: 'application/json',
				dataType: 'json',
				data:JSON.stringify({
					instanceId:obj.instanceId,
					currentAddress: obj.receiver,
					newAddress : newaddress
				}),
				success: function (res) {
					if (res.code == 0) {
						tips("修改成功");
						setTimeout(function(){
							cancelMobile();
							self.geteveryqkl();
						},1800);
						
					}
				}
			})
		},
		zyajax(newaddress,obj){
			var self = this
			var web3 = new Web3(CHAIN.WALLET.provider());
			console.log(obj);
			var chainId = '';
			CHAIN.WALLET.chainId()
				.then(function (res) {
					chainId = web3.utils.hexToNumber(res);  
					if (chainId != targetChainId) {
						CHAIN.WALLET.switchRPCSettings(targetChainId);
					}
					// var netVer = netVers[0];
					ERC721Address = contractSetting['atta_ERC721'][chainId].address; // 监听 网络切换 会 让 用户 处于 正确的网络，这里 只负责 配置 当前网络下正确的 合约地址
					var ERC721ABI = contractSetting['atta_ERC721']['abi'];
					
					ERC721ContractInstance = new web3.eth.Contract(ERC721ABI, ERC721Address);        
					// busdAddress 供外界使用
					
					ERC721ContractInstance.methods.safeTransferFrom(this.walletId,newaddress,obj.tokenId).send({ 
						from: this.walletId
					})
					.then(function (res) {
						console.log(res);
						tips("轉移操作已完成~");
						self.geteveryqkl();
					});
					setTimeout(() => {
						tips("您的NFT轉移操作已完成，請到相應錢包內確認噢~");
						setTimeout(function(){
							cancelMobile();
						},1800);
					}, 1000);
				});    

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
.ishide{
	transform: rotate(180deg);
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
/* @media only screen and (max-width:768px){
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
} */
</style>