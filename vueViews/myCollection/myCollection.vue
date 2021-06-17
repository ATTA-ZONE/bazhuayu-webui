<template>
  <div class="my-assets center-80" id="myCollection" v-cloak>
    <ul v-if="assetsList.records && assetsList.records.length > 0">
      <li class="flex" v-for="(item, idx) in assetsList.records" :key="idx">
        <div class="my-assets-left" v-if="getFormat(item) == 'mp4'">
          <video style="width: 100%" autoplay="autoplay" loop="loop" :src="item.primaryPic" muted="muted"></video>
          <video class="mohu" style="width: 100%" autoplay="autoplay" loop="loop" :src="item.primaryPic" muted="muted"></video>
        </div>
        <div class="my-assets-left" v-else>
          <img :src="item.primaryPic" />
          <img class="mohu" :src="item.primaryPic" />
        </div>
        <div class="my-assets-right">
          <div class="my-assets-right-tit">{{ item.name }}</div>
          <div class="my-assets-right-creator flex">
            <div class="details-right-creator-img">
              <img src="./images/t8.png" />
            </div>
            <span>@ATTA</span>
            <div class="my-assets-right-creator-edition">
              {{chEnTextHtml[lang].common + item.endEdition + chEnTextHtml[lang].ban}}
            </div>
          </div>
          <div class="details-right-des-tit">{{chEnTextHtml[lang].productdescription}}</div>
          <div class="details-right-des" v-html="getIntroduce(item, 'desc', chEnTextHtml[lang].nointroduction)"></div>
          <div class="details-right-additional">
            <!-- <p class="details-right-additional-show" @click="toggleMoreInfo(idx)" >
              更多信息 <span>{{ showMoreInfo == idx ? "-" : "+" }}</span>
            </p> -->
            <p class="details-right-additional-more order-content" v-if="showMoreInfo == idx" v-html="getIntroduce(item, 'detail', chEnTextHtml[lang].noinformation)"></p>
          </div>
          <div class="my-assets-right-price">
            <div class="flex my-assets-right-download">
              <a class="flex download" :download="item.attachment" :href="item.attachment">{{chEnTextHtml[lang].down}}</a>
            </div>
            <p class="version-number">{{chEnTextHtml[lang].currentholdings}}</p>
            <p class="version-number-list" v-if="item.totalEditionList && item.totalEditionList.length">
              <font style="color: #9567ff">{{getAllBsc(item.totalEditionList).join(',')}}</font>{{chEnTextHtml[lang].ban2}}
            </p>
            <p class="version-number-list" v-else>{{chEnTextHtml[lang].notyet}}</p>
          </div>
          <div class="my-assets-right-btn flex">
            <div class="flex my-assets-claim-wrap">
              <a @click="conneAssetsctWallet(item,'start')" class="bsc-nft">{{chEnTextHtml[lang].mint}}BSC NFT</a>
            </div>
            <a class="flex eth">
              <div>{{chEnTextHtml[lang].mint}}ETH NFT</div>
              <div>{{chEnTextHtml[lang].inpreparation}}</div>
            </a>
          </div>
          <div class="my-assets-right-address flex">
            <div class="my-assets-right-addres-eth">
              <a target="_blank"></a>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul v-else style="padding-top: 100px">
      <li class="flex nothing">
        <div>{{chEnTextHtml[lang].norecord}}</div>
      </li>
    </ul>
    <div class="bzy-e-more" v-if="assetsList.total > assetsList.length">
      <div class="flex assets-list-load" @click="getMoreList">
        <span class="language-tc">{{chEnTextHtml[lang].more}}</span>
        <img src="./images/next.png" />
        <img src="./images/xiala2.png" />
      </div>
    </div>
    <!-- ntf 钱包未连接 -->
    <div class="hsycms-model-mask" onclick="hsycms.closeAll()" id="mask-model2"></div>
    <div class="hsycms-model hsycms-model-model ntf" id="model2">
      <div class="ntf-close" onclick="hsycms.closeAll()">
        <img src="./images/Close.png" />
      </div>
      <div class="hscysm-model-title nth-tit">{{chEnTextHtml[lang].linkwallet}}</div>
      <div class="hsycms-model-content nth-con">
        <div class="nth-con-tip">{{chEnTextHtml[lang].tips1}}</div>
        <div class="nth-con-tip" style="color: #9567ff">
          {{chEnTextHtml[lang].tips2}}
        </div>
      </div>
      <div class="nth-btn">
        <button type="button" @click="nftConnect()">{{chEnTextHtml[lang].connectnow}}</button>
      </div>
    </div>
    <!-- 铸造nft -->
    <div class="hsycms-model-mask" onclick="hsycms.closeAll()" id="mask-model3"></div>
    <div class="hsycms-model hsycms-model-model ntf" id="model3" style="width: 648px">
      <div class="ntf-close" onclick="hsycms.closeAll()">
        <img src="./images/Close.png" />
      </div>
      <div class="hscysm-model-title nth-tit" style="width: 90%; text-align: center">
        {{chEnTextHtml[lang].mint}}BSC NFT
      </div>
      <div class="hsycms-model-content nth-con" style="width: 550px">
        <table class="bsc-table">
          <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.15);padding-bottom: 10px;">
            <th class="first" style="padding-left: 17px">{{chEnTextHtml[lang].banhao}}</th>
            <th class="">
              {{chEnTextHtml[lang].jsaddress}}
              <font style="font-size: 12px" >{{chEnTextHtml[lang].editaddress}}</font>
            </th>
          </tr>
          <tr v-for="(itm, index) in selectedList" class="selected-list" :key="index">
            <td style="font-size: 18px; padding-left: 17px" class="first">
              <span>{{ itm.name }}</span>
              <div>
                <input :id="itm.name" type="checkbox" v-model="itm.checked" />
                <label :for="itm.name">
                  <img v-show="itm.checked" src="./images/Vector.png" alt=""/>
                </label>
              </div>
            </td>
            <td class="" style="width: 426px">
              <input type="text" v-model="itm.number" />
            </td>
          </tr>
        </table>
        <div class="mint-wrap">
          <div class="flex mint-wrap-title">
            <span>{{chEnTextHtml[lang].banhao2}}</span>
            <span>{{chEnTextHtml[lang].jsaddress2}}<font style="font-size: 10px">{{chEnTextHtml[lang].editaddress2}}</font></span>
          </div>
          <div class="building-nft" v-for="(itm, index) in selectedList" :key="index">
            <div class="flex mint-wrap-edition">
              <span>{{ itm.name }}
                <div>
                  <input :id="itm.name" type="checkbox" v-model="itm.checked" />
                  <label :for="itm.name">
                    <img v-show="itm.checked" src="./images/Vector.png" alt=""/>
                  </label>
                </div>
              </span>
              <span><input type="text" v-model="itm.number" /></span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex bsc-btn" style="justify-content: center">
        <a @click="conneAssetsctWallet('ajax')" class="bsc-nft madia-btn start-zz">{{chEnTextHtml[lang].startmint}}</a>
      </div>
    </div>
    <!-- foot -->
    <div class="footerpage"></div>
    <!--提示弹窗-->
    <div class="hsycms-model-mask" id="mask-tips"></div>
    <div class="hsycms-model hsycms-model-tips" id="tips">
      <div class="hsycms-model-text"></div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      assetsList: {},
      isConnect: false,
      current: 1,
      pageSize: 9,
      showMoreInfo: -1,
      selectedNftName: "",
      selectedNft: null,
      walletId: "",
      textCheck: "",
      selectedList: [],
      basicId:'',
      chEnTextHtml: {
				"TC":{
					common : "共",
          ban : "版",
          ban2 : "版",
          productdescription : "商品描述",
          nointroduction : "暫無介紹",
          noinformation : "暫無更多資訊",
          down : "下載原始文件副本",
          currentholdings : "當前持有可鑄造版號：",
          notyet : "暫無",
          mint : "鑄造",
          inpreparation : "(功能準備中)",
          norecord : "暫無藏品記錄",
          more : "加载更多",
          linkwallet : "您需要連接錢包",
          tips1 : "為了接收您的NFT,您需要先連接錢包。",
          tips2 : "如果您不熟悉加密貨幣錢包,請單擊此處。",
          connectnow : "立即連接",
          banhao : "版號",
          jsaddress : "接收地址",
          editaddress : "(默認為當前連接的錢包地址，點擊修改)",
          banhao2 : "版號",
          jsaddress2 : "接收地址",
          editaddress2 : "(默認為當前連接的錢包地址，點擊修改)",
          startmint : "開始鑄造",
          dqwmintbanhao : "當前無可鑄造版號",
          tipsjs1:"已提交鑄造申請，請在“我的NFT”頁面查看！",
				},
				"EN":{
          common : "Total editions ",
          ban : "",
          ban2 : "Edition",
          productdescription : "Description",
          nointroduction : "No Introduction",
          noinformation : "No more information",
          down : "Download the original copy",
          currentholdings : "Current mintable editions：",
          notyet : "Null",
          mint : "Mint ",
          inpreparation : "(function coming soon)",
          norecord : "There's nothing here.",
          more : "Load More",
          linkwallet : "Please connect your wallet",
          tips1 : "You need to connect your wallet first in order to receive NFTs",
          tips2 : "",
          connectnow : "Connect now",
          banhao : "Edition",
          jsaddress : "Receiving Address",
          editaddress : "(Click address to edit if need)",
          banhao2 : "Version Number",
          jsaddress2 : "Address",
          editaddress2 : "(The default is the currently connected wallet address, click to modify)",
          startmint : "Start to mint",
          dqwmintbanhao : "There are no minable editions now :",
          tipsjs1:'Your claims have been received, you can check the status on page “My NFTs”',
				}
			},
			lang:''
    };
  },
  created() {
    this.isConnect = getCookie("isConnect") == "false" ? false : true;
    this.getAccount();
		this.lang = getCookie("lang")?getCookie("lang"):'TC';
  },
  mounted() {
    this.getAssetsList();
  },

  methods: {
    getAccount() {
      let self = this;
      $.ajax({
        url: base_url + "/v2/user/wallet/info",
        success: function (res) {
          if (res.code == 0) {
            self.walletId = res.data.address;
          }
        },
      });
    },
    getAllBsc(list) {//去重
      let arr = _.uniq(list);
      return arr;
    },
		nftConnect() {
			window.location.href = 'connectWallet.html';
		},
    conneAssetsctWallet(data,str) {//可铸造，类型
      if (str == "start") {//开弹框
        this.selectedList = [];
        this.basicId = '';
        if (this.isConnect) {
          if(data.totalEditionList && data.totalEditionList.length){
            var selectedList = this.getAllBsc(data.totalEditionList);
            this.basicId = data.basicId;
            selectedList.forEach(item=>{
              var data = {
                checked:false,
                number:this.walletId,
                name:item
              }
              this.selectedList.push(data);
            })
            setTimeout(function () {
              hsycms.alert("model3");
            }, 50);
          }else{
            tips(this.chEnTextHtml[this.lang].dqwmintbanhao);
            return;
          }
        } else {
          setTimeout(function () {
            hsycms.alert("model2");
          }, 50);
        }
      } else {//调接口
				loading();
        var checkData = [];
        this.selectedList.forEach(item=>{
          if(item.checked){
            checkData.push({
              edition:item.name,
              address:item.number
            })
          }
        })
        if(checkData && checkData.length){
          $.ajax({
						type:"POST",
						url:"/v2/mint/mint/batchClaim",
						contentType: 'application/json',
						dataType: 'json',
						data:JSON.stringify({
							mintList:checkData,
              basicId:this.basicId
						}),
						success:function(res){
							loadingHide();
              if(res.code == 0){
                setTimeout(()=>{
                  tips(this.chEnTextHtml[this.lang].tipsjs1);
                },500)
							  setTimeout(()=>{
                  window.location.reload()
                },1500)
              }else{
                tips(res.message);
                return;
              }
						}
					})
        }else{
					loadingHide();
          // tips('請勾選需要鑄造的版號！');
          return;
        }
      }
    },
    getIntroduce(item, content, str) {
      if (content === "desc") {
        return item.introduce == ""
          ? str
          : item.introduce.replace(/;\|;/g, "<br/>");
      } else {
        return item.content == ""
          ? str
          : item.content.replace(/;\|;/g, "<br/>");
      }
    },
    toggleMoreInfo(idx) {
      if (this.showMoreInfo == idx) {
        this.showMoreInfo = -1;
      } else {
        this.showMoreInfo = idx;
      }
    },
    getMoreList() {
      this.current += 1;
      this.getAssetsList();
    },
    getCookie(cookieName) {
      const strCookie = document.cookie;
      const cookieList = strCookie.split("; ");
      var cookieValue = false;
      for (let i = 0; i < cookieList.length; i++) {
        const arr = cookieList[i].split("=");
        if (cookieName === arr[0]) {
          cookieValue = arr[1];
        }
      }

      return cookieValue;
    },
    getFormat(item) {
      return item.primaryPic.substr(item.primaryPic.lastIndexOf(".") + 1);
    },
    getAssetsList() {
      var self = this;
      $.ajax({
        url: base_url + "/v2/user/commodity/list",
        data: {
          current: this.current,
          pageSize: this.pageSize,
        },
        success: function (res) {
          if (res.code == 0) {
            self.assetsList = res.data.pageResult; 
          }
        },
      });
    },
  },
};
</script>