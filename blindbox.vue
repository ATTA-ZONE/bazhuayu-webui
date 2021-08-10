<template>
  <div class="blindbox_box">
    <img class="bannerbox" :src="bannerurl" />
    <div class="anchorintroduction">
      <h1 class="title">{{ acName }}</h1>
      <p class="subtitle">{{ acDescription }}</p>
      <div class="introducebox flex">
        <div class="tvbox" v-for="(item, index) in series" :key="index">
          <img :src="item.seImage" />
          <div class="wordbox">
            <h5>{{ item.seName }}</h5>
            <p>{{ item.seDescription }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="luckdrawintroduce flex">
      <img class="luckdraw_left" :src="activityImg" />
      <div class="luckdraw_right">
        <img src="./images/Asset3.png" />
        <h3>{{ activityTitle }}</h3>
        <p>{{ activityDetail }}</p>
        <div class="luckdraw_btns">
          <button class="cjbtn">
            {{ chEnTextHtml[lang].luckdrawintroduce_btn1 }}
          </button>
          <button class="cjbtn">
            {{ chEnTextHtml[lang].luckdrawintroduce_btn2 }}
          </button>
        </div>
      </div>
    </div>
    <div class="cardsbox">
      <div class="cardslist flex">
        <div
          class="cardsevery"
          v-for="(item, index) in cards1"
          :key="index + Math.random()"
        >
          <img :src="item.primaryPic" />
          <div class="mask">
            <p>{{ item.introduce }}</p>
            <p>{{ item.rateDes }}</p>
          </div>
        </div>
        <h3 class="tips">{{ series[0].seTitle }}</h3>
        <div
          class="cardsevery"
          v-for="(item, index) in cards2"
          :key="index + Math.random()"
        >
          <img :src="item.primaryPic" />
          <div class="mask">
            <p>{{ item.introduce }}</p>
            <p>{{ item.rateDes }}</p>
          </div>
        </div>
        <h3 class="tips">{{ series[1].seTitle }}</h3>
        <div
          class="cardsevery"
          v-for="(item, index) in cards3"
          :key="index + Math.random()"
        >
          <img :src="item.primaryPic" />
          <div class="mask">
            <p>{{ item.introduce }}</p>
            <p>{{ item.rateDes }}</p>
          </div>
        </div>
        <h3 class="tips">{{ series[2].seTitle }}</h3>
      </div>
      <div class="purchasebox">
        <div class="between flex">
          <span>{{
            chEnTextHtml[lang].purchase1 + leftAmount + " / " + storge
          }}</span>
          <p class="between flex">
            <span>{{
              chEnTextHtml[lang].purchase7 + leftFreeCount.leftFreeCount2
            }}</span>
            <img class="question" src="./images/question.png" />
            <button
              class="cjbtn"
              @click="cqblindboxbtn(2, leftFreeCount.leftFreeCount2)"
            >
              {{ chEnTextHtml[lang].purchase5 }}
            </button>
          </p>
        </div>
        <div class="between flex">
          <span>{{ chEnTextHtml[lang].purchase3 }}</span>
          <p class="between flex">
            <span>{{
              chEnTextHtml[lang].purchase4 + leftFreeCount.leftFreeCount1
            }}</span>
            <img class="question" src="./images/question.png" />
            <button
              class="cjbtn"
              @click="cqblindboxbtn(1, leftFreeCount.leftFreeCount1)"
            >
              {{ chEnTextHtml[lang].purchase5 }}
            </button>
          </p>
        </div>
        <div class="tips1">
          <span>{{ chEnTextHtml[lang].purchase2 }}</span>
        </div>
      </div>
      <div class="zscjbox between flex">
        <span>{{
          chEnTextHtml[lang].purchase6 +
          "HK$ " +
          hdkDrawPrice +
          " / BUSD " +
          drawPrice
        }}</span>
        <button @click="toPay(1)" class="cjbtn">
          {{ chEnTextHtml[lang].luckdrawintroduce_btn1 }}
        </button>
        <button @click="toPay(10)" class="cjbtn">
          {{ chEnTextHtml[lang].luckdrawintroduce_btn2 }}
        </button>
      </div>
      <div class="bottombtn">
        <button>Go Staking</button>
      </div>
    </div>
    <!-- modify -->
    <div class="modify none">
      <div class="modify-container flex">
        <div class="modify-form">
          <div class="modify-tit flex" data-type="name">
            <span>title</span
            ><img
              class="none"
              onclick="cancelMobile()"
              src="./images/Close.png"
            />
          </div>
          <div class="modify-ipt"></div>
          <div class="modify-tips"></div>
          <div class="modify-btn flex">
            <button
              class="add modify-btn-active"
              type="button"
              @click="editzyclick($event)"
            ></button>
            <button class="cancel" type="button" onclick="cancel()">
              {{ chEnTextHtml[lang].cancel }}
            </button>
            <button
              class="cancel cancel-mobile none"
              type="button"
              onclick="cancelMobile()"
            >
              {{ chEnTextHtml[lang].cancel }}
            </button>
          </div>
          <div class="modify-close" onclick="cancel()">
            <img src="./images/Close.png" />
          </div>
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
  name: "blindbox",
  data: function () {
    return {
      series: [
        {
          seImage: "./images/tv1.png",
          seName: "Rita 英雄聯盟官方解說",
          seDescription:
            "英雄联盟官方解说冯雨，艺名：Rita小雨桑，曾经是一名《英雄联盟》职业选手，随后转型为比赛解说，英雄联盟赛事职业解说。冯雨毕业于中央戏剧学院，曾以女子战队队员身份参加比赛，在2016年正式转型为比赛解说，在2017年荣获年度最佳新秀赛事解说。",
        },
        {
          seImage: "./images/tv2.png",
          seName: "Rita 英雄聯盟官方解說",
          seDescription:
            "英雄联盟官方解说冯雨，艺名：Rita小雨桑，曾经是一名《英雄联盟》职业选手，随后转型为比赛解说，英雄联盟赛事职业解说。冯雨毕业于中央戏剧学院，曾以女子战队队员身份参加比赛，在2016年正式转型为比赛解说，在2017年荣获年度最佳新秀赛事解说。",
        },
        {
          seImage: "./images/tv3.png",
          seName: "Rita 英雄聯盟官方解說",
          seDescription:
            "英雄联盟官方解说冯雨，艺名：Rita小雨桑，曾经是一名《英雄联盟》职业选手，随后转型为比赛解说，英雄联盟赛事职业解说。冯雨毕业于中央戏剧学院，曾以女子战队队员身份参加比赛，在2016年正式转型为比赛解说，在2017年荣获年度最佳新秀赛事解说。",
        },
      ],
      cards1: [
        {
          primaryPic: "./images/tv5.png",
          introduce:
            "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",
          rateDes: "2%",
        },
        {
          primaryPic: "./images/tv5.png",
          introduce:
            "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",
          rateDes: "2%",
        },
        {
          primaryPic: "./images/tv5.png",
          introduce:
            "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",
          rateDes: "2%",
        },
        {
          primaryPic: "./images/tv5.png",
          introduce:
            "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",
          rateDes: "2%",
        },
      ],
      cards2: [
        {
          primaryPic: "./images/tv5.png",
          introduce:
            "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",
          rateDes: "2%",
        },
        {
          primaryPic: "./images/tv5.png",
          introduce:
            "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",
          rateDes: "2%",
        },
        {
          primaryPic: "./images/tv5.png",
          introduce:
            "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",
          rateDes: "2%",
        },
        {
          primaryPic: "./images/tv5.png",
          introduce:
            "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",
          rateDes: "2%",
        },
      ],
      cards3: [
        {
          primaryPic: "./images/tv5.png",
          introduce:
            "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",
          rateDes: "2%",
        },
        {
          primaryPic: "./images/tv5.png",
          introduce:
            "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",
          rateDes: "2%",
        },
        {
          primaryPic: "./images/tv5.png",
          introduce:
            "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",
          rateDes: "2%",
        },
        {
          primaryPic: "./images/tv5.png",
          introduce:
            "童曦小姐姐化身色拉芬妮，粉粉的头发，海克斯配色的服饰。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰更加凸显高贵。",
          rateDes: "2%",
        },
      ],
      chEnTextHtml: {
        TC: {
          luckdrawintroduce_con:
            "这张曦小姐姐是根据色拉芬妮的原型来创作的，采用了她粉色头发和服饰上的许多元素，包括海克斯的配色参考。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰凸显高贵。这张曦小姐姐是根据色拉芬妮的原型来创作的，采用了她粉色头发和服饰上的许多元素，包括海克斯的配色参考。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰凸显高贵。",
          luckdrawintroduce_btn1: "單抽",
          luckdrawintroduce_btn2: "十連抽",
          probability: "本张卡概率：",
          gathertogether1: "集齊RIta系列NFT即可能獲得開黑機會~",
          gathertogether2: "集齊爱萝莉系列NFT即可能獲得開黑機會~",
          gathertogether3: "集齊瞳夕系列NFT即可能獲得開黑機會~",
          purchase1: "盲盒剩餘：",
          purchase2: "白名單用戶每購買4次，可獲贈一次抽取機會",
          purchase3: "當前Staking獎勵池： BUSD 227,665",
          purchase4: "我的白名單獲贈抽取機會 ：",
          purchase5: "現在使用",
          purchase6: "盲盒價格：",
          purchase7: "空投獲贈抽取機會 ：",
          edit: "修改",
          clickedit: "點擊修改地址",
          transfer: "轉移",
          cancel: "取消",
          home: "首頁",
          auction: "拍賣",
          noConnectWallet: "未連接錢包",
          login: "登入/註冊",
          myaccount: "我的帳戶",
          myorders: "我的訂單",
          myassets: "我的資產",
          mywallet: "我的錢包",
          logOut: "登出",
          version: "第1版，共150版",
          select: "已選第",
          versionTxt: "版",
          price: "单价：",
          purchaseNow: "立即購買 ->",
          saleEnds: "銷售結束於：",
          details: "更多信息",
          pay: "支付",
          paySuc: "支付成功",
          payErr: "支付失敗",
          paid: "您的付款金額為",
          byCreditCard: "信用卡支付",
          pendingPayment: "這是待付款，您的付款金額為：",
          saveFor: "保存以備將來購買",
          purchasing: "由於您購買的是數字作品，一經售出概不退換",
          payment: "立即付款",
          currentUsing: "正在使用",
          balance: "餘額",
          notStore:
            "我們不會儲存您的錢包密鑰，未經您的授權，也無法使用您電子錢包中的貨幣。",
          regSuc: "注册成功",
          operationFailed: "操作失败",
          // js部分
          maximum: "已達到最大購買數量",
          purchaseSuc: "购买成功",
          seconds: "預計10秒內到賬",
          comSoon: "即將開售",
          start: "銷售開始於：",
          end: "銷售結束於：",
          salesClosed: "銷售已結束",
          sellOut: "已售罄",
          balanceInsufficient: "餘額不足",
          least: "至少選擇一件噢",
          reached: "已達到賬號購買數量限制",
          limit: "已達到單次購買數量限制",
          moment: "當前剩餘只可選擇1個",
          quantity: "已達到最大購買數量",
          asset: "去我的資產核對",
          confirm: "確認",
          cancel: "取消",
          recharge: "充值",
          noLog: "未登錄，請登入",
          number: "訂單號 #：",
          balancePayment: "餘額支付",
          accomplish: "完成",
          payment: "立即付款",
          walletFirst: "請先連接錢包  ->",
          paymentComing: "錢包直連支付功能準備中...",
        },
        EN: {
          luckdrawintroduce_con: "",
          luckdrawintroduce_btn1: "單抽enen",
          luckdrawintroduce_btn2: "十連抽enen",
          probability: "本张卡概率：",
          gathertogether1: "集齊RIta系列NFT即可能獲得開黑機會~",
          gathertogether2: "集齊爱萝莉系列NFT即可能獲得開黑機會~",
          gathertogether3: "集齊瞳夕系列NFT即可能獲得開黑機會~",
          purchase1: "盲盒剩餘：",
          purchase2: "白名單用戶每購買4次，可獲贈一次抽取機會",
          purchase3: "當前Staking獎勵池： BUSD 227,665",
          purchase4: "我的白名單獲贈抽取機會:",
          purchase5: "現在使用",
          purchase6: "盲盒價格：",
          purchase7: "空投獲贈抽取機會:",
          edit: "Edit",
          clickedit: "Click to edit",
          transfer: "Transfer",
          cancel: "cancel",
          home: "HOME",
          auction: "AUCTION",
          noConnectWallet: "Connect Wallet",
          login: "Login/Sign up",
          myaccount: "My Account",
          myorders: "My Orders",
          myassets: "My Assets",
          mywallet: "My Wallet",
          logOut: "Log out",
          version: "Edition 1 of 150",
          select: "Selected",
          versionTxt: "th edition",
          price: "Price：",
          purchaseNow: "Purchase Now ->",
          saleEnds: "Sale ends at：",
          details: "Details",
          pay: "Payment",
          paySuc: "Payment successful",
          payErr: "Payment failed",
          paid: "Your paid",
          byCreditCard: "By credit card",
          pendingPayment: "Your pending payment is：",
          saveFor: "Save for future purchase",
          purchasing:
            "Since you're purchasing a digital creation, all sales are final.",
          currentUsing: "Current using",
          payment: "Pay now",
          balance: "Balance",
          notStore:
            "We will not store your wallet key, nor can we use the currency in your wallet without your authorization.",
          regSuc: "registration success",
          operationFailed: "operation failed",
          // js部分
          maximum: "Maximum purchase quantity has been reached",
          purchaseSuc: "Successful purchase",
          seconds: "Expected to arrive within 10 seconds",
          comSoon: "Coming soon",
          start: "Sales start at：",
          end: "Sale ends at：",
          salesClosed: "Sold out",
          sellOut: "Sold out",
          balanceInsufficient: "Insufficient balance",
          least: "Choose at least one~",
          reached: "The account purchase limit has been reached",
          limit: "Reached the single purchase quantity limit",
          moment: "Only 1 can be selected at the moment",
          quantity: "Maximum purchase quantity has been reached",
          asset: "Go to my asset to check",
          confirm: "confirm",
          cancel: "cancel",
          recharge: "Add funds",
          noLog: "Not logged in, please log in",
          number: "Order #: ",
          balancePayment: "Paid by balance",
          accomplish: "complete",
          payment: "Pay now",
          walletFirst: "Please connect your wallet first  ->",
          paymentComing: "Function coming soon...",
        },
      },
      lang: "",
      bannerurl: "./images/Banner.png",
      acDescription: "火爆來襲，更有LPL季後賽賽事staking大獎，等你來拿~",
      acName: "LPL明星解說系列盲盒",
      activityTitle: "明星解说盲盒介绍",
      activityImg: "./images/tv4.png",
      activityDetail:
        "这张曦小姐姐是根据色拉芬妮的原型来创作的，采用了她粉色头发和服饰上的许多元素，包括海克斯的配色参考。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰凸显高贵。这张曦小姐姐是根据色拉芬妮的原型来创作的，采用了她粉色头发和服饰上的许多元素，包括海克斯的配色参考。腰上的花同样采用了海克斯科技的概念，金属的玫瑰加上镶嵌的蓝色的宝石，配上华丽丽的服饰凸显高贵。",
      drawPrice: 50,
      hdkDrawPrice: 388,
      leftAmount: 624,
      storge: 1000,
      address: "",
      leftFreeCount: {
        leftFreeCount1: 0,
        type1: 1,
        leftFreeCount2: 0,
        type1: 2,
      },
      id: "",
      prev: -1,
      success_status: -1,
      walletType: "",
      maxbannum: 0,
      busdPrice: 0,
      selectarr: [],
      accountBalance: 0,
      hkdPrice: 0,
      curUserOwned: 0,
      oneUserCountLimit: 0,
      onceCountLimit: 0,
      payTabs: ["信用卡", "餘額支付", "錢包支付"],
      selectedPayMethod: 0,
      basicId: 0,
      visiable: [],
      auctionAddress: "",
      auctionContractInstance: null,
      userAddress: "",
      tokenLimits: [],
      chainId: "",
      activityId: 1,
    };
  },

  created() {
    this.isConnect = getCookie("isConnect") == "false" ? false : true;
    this.lang = getCookie("lang") ? getCookie("lang") : "TC";
    if (this.lang == "TC") {
      document.title = "明星藏品詳情";
      this.payTabs = ["信用卡", "餘額支付"];
    } else {
      document.title = "collection detail";
      this.payTabs = ["Credit card", "Balance"];
    }

    $(".payment-page-right-balance").hide();
  },
  mounted() {
    // window.tips("1111");
    this.getAssetsList();
  },

  methods: {
    getAssetsList() {
      var self = this;
      CHAIN.WALLET.accounts().then(function (account) {
        if (account.length && getCookie("islogin") != "false") {
          self.address = account[0];
          self.getdata();
        } else {
          self.getdata();
        }
      });
    },
    getdata() {
      var self = this;
      $.ajax({
        url: base_url + "/v2/activity/activity_detail",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          id: self.activityId,
          lang: self.lang,
          address: self.address,
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
            res.data.rewardCount.forEach((item) => {
              if (item.type == 1) {
                self.leftFreeCount.leftFreeCount1 = item.leftFreeCount;
              }
              if (item.type == 2) {
                self.leftFreeCount.leftFreeCount2 = item.leftFreeCount;
              }
            });
          }
        },
      });
    },
    toPay(str) {
      var self = this;
      $.ajax({
        url: base_url + "/v2/user/account",
        success: function (res) {
          if (res.code == 0) {
            window.blindNum = str
            $(".payment").fadeIn();
            $(".payment").addClass("payment-active");
            $("video").addClass("video-hidden");
            $(".payment-page-left-img video").removeClass("video-hidden");
          } else {
            window.tips(self.chEnTextHtml[self.lang].noLog);
          }
        },
      });
    },

    cqblindboxbtn(type, val) {
      var self = this;
      if (getCookie("islogin") == "false" || getCookie("islogin") == false) {
        window.tips(self.chEnTextHtml[self.lang].noLog);
        setTimeout(() => {
          window.location.href = "./login.html";
        }, 700);
        return;
      }
      if (val <= 0) {
        window.tips("次数不够");
        return;
      }
      $.ajax({
        url: base_url + "/v2/activity/freeDraw",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          type: type,
          activityId: self.activityId,
          address: self.address,
        }),
        success: function (res) {
          if (res.code == 0) {
            window.tips("抽取成功");
            self.getdata();
          }
        },
      });
    },
  },
};
</script>

<style>
.between {
  justify-content: space-between;
  align-items: center;
}

.blindbox_box {
  min-height: calc(100vh - 338px);
}

.bannerbox {
  width: 100%;
  background-size: 100% auto;
}

.anchorintroduction {
  padding: 146px 14.93%;
  text-align: center;
  color: #ffffff;
  font-style: normal;
  font-weight: 500;
}

.anchorintroduction .title {
  font-size: 96px;
  line-height: 100%;
  margin: 0;
}

.anchorintroduction .subtitle {
  font-size: 32px;
  line-height: 150%;
  margin: 80px 0;
}

.anchorintroduction .introducebox .tvbox:nth-child(2) {
  margin: 0 35px;
}

.anchorintroduction .introducebox .tvbox img {
  width: 100%;
}

.anchorintroduction .introducebox .tvbox .wordbox h5 {
  font-size: 28px;
  line-height: 150%;
  margin: 30px 0;
}

.anchorintroduction .introducebox .tvbox .wordbox p {
  font-size: 18px;
  line-height: 150%;
  letter-spacing: -0.035em;
  text-align: left;
  opacity: 0.8;
}

.luckdrawintroduce {
  padding: 0 14.93%;
  justify-content: space-between;
  position: relative;
}

.luckdrawintroduce .luckdraw_left {
  width: 50.48%;
  border-radius: 5px;
}

.luckdrawintroduce .luckdraw_right {
  width: 43%;
}

.luckdrawintroduce .luckdraw_right img {
  width: 60.5px;
  background-size: 100% auto;
}

.luckdrawintroduce .luckdraw_right h3 {
  margin: 48px 0;
  font-size: 48px;
  line-height: 110%;
  color: #ffffff;
}

.luckdrawintroduce .luckdraw_right p {
  font-size: 18px;
  line-height: 150%;
  font-weight: 300;
  letter-spacing: -0.035em;
  color: rgba(255, 255, 255, 0.7);
}

.luckdrawintroduce .luckdraw_right .luckdraw_btns {
  position: absolute;
  bottom: 0;
}

.luckdrawintroduce .luckdraw_right .luckdraw_btns button {
  color: #ffffff;
  margin-right: 100px;
}

.cjbtn {
  border: none;
  background: #9567ff;
  font-size: 14px;
  padding: 13px 50px;
  border-radius: 2px;
}

.cardsbox {
  padding: 81px 14.93%;
}

.cardsbox .cardslist {
  flex-wrap: wrap;
  justify-content: space-between;
}

.cardsbox .cardslist .tips {
  width: 100%;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 20px;
  font-size: 24px;
  color: #ffffff;
}

.cardsbox .cardslist .cardsevery {
  position: relative;
  width: 24%;
  margin-bottom: 20px;
}

.cardsbox .cardslist .cardsevery img {
  width: 100%;
  background-size: 100% auto;
}

.cardsbox .cardslist .cardsevery .mask {
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

.cardsbox .cardslist .cardsevery:hover .mask {
  opacity: 0.6;
}

.cardsbox .cardslist .cardsevery .mask p {
  font-size: 18px;
  line-height: 150%;
}

.cardsbox .cardslist .cardsevery .mask p:nth-child(2) {
  margin-top: 20px;
}

.cardsbox .purchasebox {
  margin-top: 52px;
  color: #ffffff;
  font-size: 24px;
}

.cardsbox .purchasebox .tips1 {
  text-align: right;
  font-size: 20px;
  margin-top: 32px;
}

.cardsbox .purchasebox button {
  margin-left: 80px;
}

.cardsbox .purchasebox > .between:nth-child(2) {
  margin-top: 16px;
}

.cardsbox .purchasebox .between .question {
  margin-left: 9.5px;
  cursor: pointer;
}

.zscjbox {
  text-align: center;
  margin-top: 80px;
  font-size: 36px;
  color: #8a5cff;
  font-weight: 600;
  justify-content: center;
}

.zscjbox button {
  color: #fff;
  margin-left: 60px;
}

.bottombtn {
  text-align: center;
  margin-top: 80px;
}

.bottombtn button {
  padding: 16px 128px;
  background: transparent;
  border: 1px solid #9567ff;
  font-size: 32px;
  line-height: 150%;
  color: #9567ff;
}

@media only screen and (max-width: 992px) {
}
</style>