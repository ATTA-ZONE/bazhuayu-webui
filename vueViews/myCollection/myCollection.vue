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
              共{{ item.endEdition }}版
            </div>
          </div>
          <div class="details-right-des-tit">商品描述</div>
          <div class="details-right-des" v-html="getIntroduce(item, 'desc', '暫無介紹')"></div>
          <div class="details-right-additional">
            <p class="details-right-additional-show" @click="toggleMoreInfo(idx)" >
              更多信息 <span>{{ showMoreInfo == idx ? "-" : "+" }}</span>
              <!-- <img class="minus" src="./images/Plus.png"> -->
            </p>
            <p class="details-right-additional-more order-content" v-if="showMoreInfo == idx" v-html="getIntroduce(item, 'detail', '暫無更多資訊')"></p>
          </div>
          <div class="my-assets-right-price">
            <div class="flex my-assets-right-download">
              <a class="flex download" :download="item.attachment" :href="item.attachment">下載原始文件副本</a>
            </div>
            <p class="version-number">當前持有可鑄造版號：</p>
            <p class="version-number-list">
              <font style="color: #9567ff">17、18、19</font>版
            </p>
          </div>
          <div class="my-assets-right-btn flex">
            <div class="flex my-assets-claim-wrap">
              <a @click="conneAssetsctWallet(getNftStatus(item))" class="bsc-nft">鑄造BSC NFT</a>
            </div>
            <a class="flex eth">
              <div>鑄造ETH NFT</div>
              <div>(功能準備中)</div>
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
        <div>暫無藏品記錄</div>
      </li>
    </ul>
    <div class="bzy-e-more" v-if="assetsList.total > assetsList.length">
      <div class="flex assets-list-load" @click="getMoreList">
        <span class="language-tc">加载更多</span>
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
      <div class="hscysm-model-title nth-tit">您需要連接錢包</div>
      <div class="hsycms-model-content nth-con">
        <div class="nth-con-tip">為了接收您的NFT,您需要先連接錢包。</div>
        <div class="nth-con-tip" style="color: #9567ff">
          如果您不熟悉加密貨幣錢包,請單擊此處
        </div>
      </div>
      <div class="nth-btn">
        <button type="button" onclick="nftConnect()">立即連接</button>
      </div>
    </div>
    <!-- 铸造nft -->
    <div class="hsycms-model-mask" onclick="hsycms.closeAll()" id="mask-model3"></div>
    <div class="hsycms-model hsycms-model-model ntf" id="model3" style="width: 648px">
      <div class="ntf-close" onclick="hsycms.closeAll()">
        <img src="./images/Close.png" />
      </div>
      <div class="hscysm-model-title nth-tit" style="width: 90%; text-align: center">
        鑄造BSC NFT
      </div>
      <div class="hsycms-model-content nth-con" style="width: 550px">
        <table class="bsc-table">
          <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.15);padding-bottom: 10px;">
            <th class="first" style="padding-left: 17px">版號</th>
            <th class="">
              接收地址
              <font style="font-size: 12px" >(默認為當前連接的錢包地址，點擊修改)</font>
            </th>
          </tr>
          <tr v-for="(itm, index) in selectedList" class="selected-list" :key="index">
            <td style="font-size: 18px; padding-left: 17px" class="first">
              {{ itm.a }}
              <div>
                <input id="input" type="checkbox" v-model="itm.textCheck" />
                <label for="input">
                  <img v-show="itm.textCheck" src="./images/Vector.png" alt=""/>
                </label>
              </div>
            </td>
            <td class="" style="width: 426px">
              <input type="text" v-model="itm.b" />
            </td>
          </tr>
        </table>
        <div class="mint-wrap">
          <div class="flex mint-wrap-title">
            <span>版號</span>
            <span>接收地址<font style="font-size: 10px">(默認為當前連接的錢包地址，點擊修改)</font></span>
          </div>
          <div class="building-nft" v-for="(itm, index) in selectedList" :key="index">
            <div class="flex mint-wrap-edition">
              <span>{{ itm.a }}
                <div>
                  <input id="input" type="checkbox" v-model="itm.textCheck" />
                  <label for="input">
                    <img v-show="itm.textCheck" src="./images/Vector.png" alt=""/>
                  </label>
                </div>
              </span>
              <span><input type="text" v-model="itm.b" /></span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex bsc-btn" style="justify-content: center">
        <a @click="conneAssetsctWallet(getNftStatus(item))" class="bsc-nft">開始鑄造</a>
      </div>
    </div>
    <!-- foot -->
    <div class="footerpage2"></div>
    <div class="tips"></div>
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
      selectedList: [
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
        {
          a: 12,
          b: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
          textCheck: "",
        },
      ],
    };
  },
  created() {
    this.isConnect = getCookie("isConnect") == "false" ? false : true;
    this.getAccount();
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
    getNftStatus(item) {
      console.log(item);
      let finishNft = true;
      item.mintList.filter((data) => {
        if (data.status == 0 || data.status == 1) {
          finishNft = false;
        }
      });
      if (finishNft) {
        return "BSC NFT 鑄造結束";
      } else {
        if (this.isConnect) {
          return "BSC NFT鑄造中 ( 约7天完成 )";
        } else {
          return "等待自動鑄造BSC NFT中";
        }
      }
    },
    getBuildedBsc(list) {
      let arr = [];
      list.filter((item) => {
        if (item.status == 2) {
          arr.push(item);
        }
      });
      return arr;
    },
    getBuildingBsc(list) {
      let arr = [];
      list.filter((item) => {
        if (item.status == 1) {
          arr.push(item.edition);
        }
      });
      return arr;
    },
    getAllBsc(list) {
      let arr = [];
      list.filter((item) => {
        if (arr.indexOf(item.edition)) {
          arr.push(item.edition);
        }
      });
      return arr;
    },
    conneAssetsctWallet(str) {
      console.log(str);
      if (str == "BSC NFT 鑄造結束") {
        return false;
      } else {
        if (this.isConnect) {
          setTimeout(function () {
            hsycms.alert("model1");
          }, 50);
        } else {
          setTimeout(function () {
            hsycms.alert("model2");
          }, 50);
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
    formatDuring(mss) {
      var hours = parseInt(mss / (1000 * 60 * 60));
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = parseInt((mss % (1000 * 60)) / 1000);
      return hours + ":" + minutes + ":" + seconds;
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