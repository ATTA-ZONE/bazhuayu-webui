<template>
  <div class="blindbox_box">
	  <img class="bannerbox" :src="bannerurl" alt="">
	  <div class="anchorintroduction">
		  <h1 class="title">{{acName}}</h1>
		  <p class="subtitle">{{acDescription}}</p>
		  <div class="introducebox flex">
			  <div class="tvbox" v-for="(item,index) in series" :key="index">
				  <img :src="item.seImage" alt="">
				  <div class="wordbox">
					  <h5>{{item.seName}}</h5>
					  <p>{{item.seDescription}}</p>
				  </div>
			  </div>
		  </div>
	  </div>
	  <div class="luckdrawintroduce flex">
		  <img class="luckdraw_left" :src="activityImg" alt="">
		  <div class="luckdraw_right">
			  <img src="./images/Asset3.png" alt="">
			  <h3>{{activityTitle}}</h3>
			  <p>{{activityDetail}}</p>
			  <div class="luckdraw_btns">
				  <button class="cjbtn">{{chEnTextHtml[lang].luckdrawintroduce_btn1}}</button>
				  <button class="cjbtn">{{chEnTextHtml[lang].luckdrawintroduce_btn2}}</button>
			  </div>
		  </div>
	  </div>
	  <div class="cardsbox">
		  <div class="cardslist flex">
			  <div class="cardsevery" v-for="(item,index) in cards1" :key="index">
				  <img :src="item.primaryPic" alt="">
				  <div class="mask">
					  <p>{{item.introduce}}</p>
					  <p>{{item.rateDes}}</p>
				  </div>
			  </div>
			  <h3 class="tips">{{series[0].seTitle}}</h3>
			  <div class="cardsevery" v-for="(item,index) in cards2" :key="index">
				  <img :src="item.primaryPic" alt="">
				  <div class="mask">
					  <p>{{item.introduce}}</p>
					  <p>{{item.rateDes}}</p>
				  </div>
			  </div>
			  <h3 class="tips">{{series[1].seTitle}}</h3>
			  <div class="cardsevery" v-for="(item,index) in cards3" :key="index">
				  <img :src="item.primaryPic" alt="">
				  <div class="mask">
					  <p>{{item.introduce}}</p>
					  <p>{{item.rateDes}}</p>
				  </div>
			  </div>
			  <h3 class="tips">{{series[2].seTitle}}</h3>
		  </div>
		  <div class="purchasebox">
			  <div class="between flex">
				  <span>{{chEnTextHtml[lang].purchase1 + leftAmount + " / " + storge}}</span>
				  <span>{{chEnTextHtml[lang].purchase2}}</span>
				  <p class="between flex">
					<span>{{chEnTextHtml[lang].purchase7 + leftFreeCount.leftFreeCount2}}</span>
					<button class="cjbtn">{{chEnTextHtml[lang].purchase5}}</button>
				  </p>
			  </div>
			  <div class="between flex">
				  <span>{{chEnTextHtml[lang].purchase3}}</span>
				  <p class="between flex">
					<span>{{chEnTextHtml[lang].purchase4 + leftFreeCount.leftFreeCount1}}</span>
					<button class="cjbtn">{{chEnTextHtml[lang].purchase5}}</button>
				  </p>
			  </div>
		  </div>
		  <div class="zscjbox between flex">
				<span>{{chEnTextHtml[lang].purchase6 + "HK$ " + hdkDrawPrice + " / BUSD " + drawPrice}}</span>
				<button class="cjbtn">{{chEnTextHtml[lang].luckdrawintroduce_btn1}}</button>
				<button class="cjbtn">{{chEnTextHtml[lang].luckdrawintroduce_btn2}}</button>
		  </div>
		  <div class="bottombtn">
			  <button>Go Staking</button>
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
						<button class="cancel" type="button" onclick="cancel()">{{chEnTextHtml[lang].cancel}}</button>
						<button class="cancel cancel-mobile none" type="button" onclick="cancelMobile()">{{chEnTextHtml[lang].cancel}}</button>
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
		
  </div>
</template>

<script>

module.exports = {
  name: 'blindbox',
  data: function () {
		return {
			series : [
				{seImage : "./images/tv1.png",seName : "Rita 英雄聯盟官方解說",seDescription : "英雄联盟官方解说冯雨，艺名：Rita小雨桑，曾经是一名《英雄联盟》职业选手，随后转型为比赛解说，英雄联盟赛事职业解说。冯雨毕业于中央戏剧学院，曾以女子战队队员身份参加比赛，在2016年正式转型为比赛解说，在2017年荣获年度最佳新秀赛事解说。"},
				{seImage : "./images/tv2.png",seName : "Rita 英雄聯盟官方解說",seDescription : "英雄联盟官方解说冯雨，艺名：Rita小雨桑，曾经是一名《英雄联盟》职业选手，随后转型为比赛解说，英雄联盟赛事职业解说。冯雨毕业于中央戏剧学院，曾以女子战队队员身份参加比赛，在2016年正式转型为比赛解说，在2017年荣获年度最佳新秀赛事解说。"},
				{seImage : "./images/tv3.png",seName : "Rita 英雄聯盟官方解說",seDescription : "英雄联盟官方解说冯雨，艺名：Rita小雨桑，曾经是一名《英雄联盟》职业选手，随后转型为比赛解说，英雄联盟赛事职业解说。冯雨毕业于中央戏剧学院，曾以女子战队队员身份参加比赛，在2016年正式转型为比赛解说，在2017年荣获年度最佳新秀赛事解说。"},
			],
			cards1:[
				{primaryPic : "./images/tv5.png",introduce : "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",rateDes : "2%"},
				{primaryPic : "./images/tv5.png",introduce : "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",rateDes : "2%"},
				{primaryPic : "./images/tv5.png",introduce : "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",rateDes : "2%"},
				{primaryPic : "./images/tv5.png",introduce : "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",rateDes : "2%"},
			],
			cards2:[
				{primaryPic : "./images/tv5.png",introduce : "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",rateDes : "2%"},
				{primaryPic : "./images/tv5.png",introduce : "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",rateDes : "2%"},
				{primaryPic : "./images/tv5.png",introduce : "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",rateDes : "2%"},
				{primaryPic : "./images/tv5.png",introduce : "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",rateDes : "2%"},
			],
			cards3:[
				{primaryPic : "./images/tv5.png",introduce : "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",rateDes : "2%"},
				{primaryPic : "./images/tv5.png",introduce : "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",rateDes : "2%"},
				{primaryPic : "./images/tv5.png",introduce : "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",rateDes : "2%"},
				{primaryPic : "./images/tv5.png",introduce : "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",rateDes : "2%"},
			],
			chEnTextHtml: {
				"TC":{
						luckdrawintroduce_con : "这张曦小姐姐是根据色拉芬妮的原型来创作的，采用了她粉色头发和服饰上的许多元素，包括海克斯的配色参考。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰凸显高贵。这张曦小姐姐是根据色拉芬妮的原型来创作的，采用了她粉色头发和服饰上的许多元素，包括海克斯的配色参考。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰凸显高贵。",
						luckdrawintroduce_btn1 : "單抽",
						luckdrawintroduce_btn2 : "十連抽",
						probability : "本张卡概率：",
						gathertogether1 : "集齊RIta系列NFT即可能獲得開黑機會~",
						gathertogether2 : "集齊爱萝莉系列NFT即可能獲得開黑機會~",
						gathertogether3 : "集齊瞳夕系列NFT即可能獲得開黑機會~",
						purchase1 : "盲盒剩餘：",
						purchase2 : "白名單用戶每購買4次，可獲贈一次抽取機會",
						purchase3 : "當前Staking獎勵池： BUSD 227,665",
						purchase4 : "我的白名單獲贈抽取機會:",
						purchase5 : "現在使用",
						purchase6 : "盲盒價格：",
						purchase7 : "空投獲贈抽取機會:",
						edit:"修改",
						clickedit:"點擊修改地址",
						transfer:"轉移",
						cancel:"取消",
					},
					"EN":{
						luckdrawintroduce_con : "",
						luckdrawintroduce_btn1 : "單抽",
						luckdrawintroduce_btn2 : "十連抽",
						probability : "本张卡概率：",
						gathertogether1 : "集齊RIta系列NFT即可能獲得開黑機會~",
						gathertogether2 : "集齊爱萝莉系列NFT即可能獲得開黑機會~",
						gathertogether3 : "集齊瞳夕系列NFT即可能獲得開黑機會~",
						purchase1 : "盲盒剩餘：",
						purchase2 : "白名單用戶每購買4次，可獲贈一次抽取機會",
						purchase3 : "當前Staking獎勵池： BUSD 227,665",
						purchase4 : "我的白名單獲贈抽取機會:",
						purchase5 : "現在使用",
						purchase6 : "盲盒價格：",
						purchase7 : "空投獲贈抽取機會:",
						edit:"Edit",
						clickedit:"Click to edit",
						transfer:"Transfer",
						cancel:"cancel",
				}
			},
			lang:'',
			bannerurl : "./images/Banner.png",
			acDescription : "火爆來襲，更有LPL季後賽賽事staking大獎，等你來拿~",
			acName : "LPL明星解說系列盲盒",
			activityTitle: "明星解说盲盒介绍",
			activityImg: "./images/tv4.png",
			activityDetail: "这张曦小姐姐是根据色拉芬妮的原型来创作的，采用了她粉色头发和服饰上的许多元素，包括海克斯的配色参考。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰凸显高贵。这张曦小姐姐是根据色拉芬妮的原型来创作的，采用了她粉色头发和服饰上的许多元素，包括海克斯的配色参考。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰凸显高贵。",
			drawPrice: 50,
			hdkDrawPrice: 388,
			leftAmount: 624,
			storge: 1000,
			address : '',
			leftFreeCount : {leftFreeCount1: 0,type1: 1,leftFreeCount2: 0,type1: 2},
		}
	},
	
	created() {
		this.isConnect = getCookie('isConnect') == 'false' ? false : true
		this.lang = getCookie("lang")?getCookie("lang"):'TC';
	},
	mounted() {
		this.getAssetsList();
	},
	
	methods: {
		getAssetsList() {
			var self = this;
			CHAIN.WALLET.accounts()
			.then(function(account){
				if (account.length && getCookie('islogin') != 'false') {
					self.address = account[0];
					self.getdata(account[0]);
				}else{
					self.getdata("");
				}
			})
			
		},
		getdata(address){
			var self = this
			$.ajax({
				url: base_url + '/v2/activity/activity_detail',
				type: 'POST',
				contentType: 'application/json',
				dataType: 'json',
				data:JSON.stringify({
					id : 1,
					lang : self.lang,
					address : address,
				}),
				success: function (res) {
					if (res.code == 0) {
						self.bannerurl = res.data.acBanner;
						self.acDescription = res.data.acDescription;
						self.acName = res.data.acName;
						self.activityDetail = res.data.activityDetail;
						self.activityImg = res.data.activityImg;
						self.activityTitle = res.data.activityTitle;
						self.drawPrice = res.data.drawPrice;
						self.hdkDrawPrice = res.data.hdkDrawPrice;
						self.leftAmount = res.data.leftAmount;
						self.storge = res.data.storge;
						self.series = res.data.series;
						self.cards1 = res.data.series[0].commodities;
						self.cards2 = res.data.series[1].commodities;
						self.cards3 = res.data.series[2].commodities;
						res.data.rewardCount.forEach(item=>{
							if (item.type == 1) {
								self.leftFreeCount.leftFreeCount1 = item.leftFreeCount;
							}
							if (item.type == 2) {
								self.leftFreeCount.leftFreeCount2 = item.leftFreeCount;
							}
						})
					}
				}
			})

		}
	}
}
</script>

<style>
.between{
	justify-content: space-between;
	align-items: center;
}
.blindbox_box{
	min-height: calc(100vh - 338px);
}
.bannerbox{
	width: 100%;
	background-size: 100% auto;
}
.anchorintroduction{
	padding: 146px 14.93%;
	text-align: center;
	color: #FFFFFF;
	font-style: normal;
	font-weight: 500;
}
.anchorintroduction .title{
	font-size: 96px;
	line-height: 100%;
	margin: 0;
}
.anchorintroduction .subtitle{
	font-size: 32px;
	line-height: 150%;
	margin: 80px 0;
}
.anchorintroduction .introducebox .tvbox:nth-child(2){
	margin: 0 35px;
}
.anchorintroduction .introducebox .tvbox img{
	width: 100%;
}
.anchorintroduction .introducebox .tvbox .wordbox h5{
	font-size: 28px;
	line-height: 150%;
	margin: 30px 0;
}
.anchorintroduction .introducebox .tvbox .wordbox p{
	font-size: 18px;
	line-height: 150%;
	letter-spacing: -0.035em;
	text-align: left;
	opacity: 0.8;
}
.luckdrawintroduce{
	padding: 0 14.93%;
	justify-content: space-between;
	position: relative;
}
.luckdrawintroduce .luckdraw_left{
	width: 50.48%;
	border-radius: 5px;
}
.luckdrawintroduce .luckdraw_right{
	width: 43%;
}
.luckdrawintroduce .luckdraw_right img{
	width: 60.5px;
	background-size: 100% auto;
}
.luckdrawintroduce .luckdraw_right h3{
	margin: 48px 0;
	font-size: 48px;
	line-height: 110%;
	color: #FFFFFF;
}
.luckdrawintroduce .luckdraw_right p{
	font-size: 18px;
	line-height: 150%;
	font-weight: 300;
	letter-spacing: -0.035em;
	color: rgba(255, 255, 255, 0.7);
}
.luckdrawintroduce .luckdraw_right .luckdraw_btns{
	position: absolute;
	bottom: 0;
}
.luckdrawintroduce .luckdraw_right .luckdraw_btns button{
	color: #FFFFFF;
	margin-right: 100px;
}
.cjbtn{
	border: none;
	background: #9567FF;
	font-size: 14px;
	padding: 13px 50px;
	border-radius: 2px;
}
.cardsbox{
	padding: 81px 14.93%;
}
.cardsbox .cardslist{
	flex-wrap: wrap;
	justify-content: space-between;
}
.cardsbox .cardslist .tips{
	width: 100%;
	text-align: center;
	margin-top: 8px;
	margin-bottom: 20px;
	font-size: 24px;
	color: #FFFFFF;
}
.cardsbox .cardslist .cardsevery{
	position: relative;
	width: 24%;
	margin-bottom: 20px;
}
.cardsbox .cardslist .cardsevery img{
	width: 100%;
	background-size: 100% auto;
}
.cardsbox .cardslist .cardsevery .mask{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #000000;
	opacity: 0;
	color: #fff;
	padding: 43px 20px;
	transition: 0.5s all;
}
.cardsbox .cardslist .cardsevery:hover .mask{
	opacity: 0.6;
}
.cardsbox .cardslist .cardsevery .mask p{
	font-size: 18px;
	line-height: 150%;
}
.cardsbox .cardslist .cardsevery .mask p:nth-child(2){
	margin-top: 20px;
}
.cardsbox .purchasebox{
	margin-top: 52px;
	color: #FFFFFF;
	font-size: 24px;
}
.cardsbox .purchasebox button{
	margin-left: 36px;
}
.cardsbox .purchasebox>.between:nth-child(2){
	margin-top: 16px;
}
.zscjbox{
	text-align: center;
	margin-top: 80px;
	font-size: 36px;
	color: #8A5CFF;
	font-weight: 600;
	justify-content: center;
}
.zscjbox button{
	color: #fff;
	margin-left: 60px;
}
.bottombtn {
	text-align: center;
	margin-top: 80px;
}
.bottombtn button{
	padding: 16px 128px;
	background:transparent;
	border: 1px solid #9567FF;
	font-size: 32px;
	line-height: 150%;
	color: #9567FF;
}
@media only screen and (max-width: 992px){
	
}

</style>