<template>
  <div class="blindbox_box" v-cloak>
    <img class="bannerbox" :src="bannerurl" />
    <div class="anchorintroduction">
      <h1 class="title">{{ acName }}</h1>
      <p class="subtitle">{{ acDescription }}</p>
      <div class="introducebox flex">
        <div class="tvbox" v-for="(item, index) in series" :key="index">
          <img :src="item.seImage" />
          <div class="wordbox">
            <h5>{{ item.seName }}</h5>
            <p v-html="item.seDescription"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="luckdrawintroduce flex">
      <img class="luckdraw_left" :src="activityImg" />
      <div class="luckdraw_right">
        <img src="./images/Asset3.png" />
        <h3>{{ activityTitle }}</h3>
        <p>{{ activityDetail }}</p>
        <div class="luckdraw_btns">
          <button
            class="cjbtn"
            onClick="window.scrollTo(0,document.body.clientHeight); "
          >
            Coming soon
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
          <img :src="item.secondPic ? item.secondPic : './images/tv6.png'" />
          <div class="mask" v-if="item.secondPic">
            <p v-html="item.introduce"></p>
          </div>
          <div class="noimgword" v-else>
            {{ chEnTextHtml[lang].noimgword }}
          </div>
        </div>
        <h3 class="tips" v-if="series[0]">{{ series[0].seTitle }}</h3>
        <div
          class="cardsevery"
          v-for="(item, index) in cards2"
          :key="index + Math.random()"
        >
          <img :src="item.secondPic ? item.secondPic : './images/tv6.png'" />
          <div class="mask" v-if="item.secondPic">
            <p v-html="item.introduce"></p>
          </div>
          <div class="noimgword" v-else>
            {{ chEnTextHtml[lang].noimgword }}
          </div>
        </div>
        <h3 class="tips" v-if="series[1]">{{ series[1].seTitle }}</h3>
        <div
          class="cardsevery"
          v-for="(item, index) in cards3"
          :key="index + Math.random()"
        >
          <img :src="item.secondPic ? item.secondPic : './images/tv6.png'" />
          <div class="mask" v-if="item.secondPic">
            <p v-html="item.introduce"></p>
          </div>
          <div class="noimgword" v-else>
            {{ chEnTextHtml[lang].noimgword }}
          </div>
        </div>
        <h3 class="tips" v-if="series[2]">{{ series[2].seTitle }}</h3>
      </div>
      <div class="line"></div>
      <div class="purchasebox">
        <div class="between flex">
          <span>{{
            chEnTextHtml[lang].purchase1 + leftAmount + " / " + storge
          }}</span>
          <p class="between flex">
            <span>{{
              chEnTextHtml[lang].purchase7 + leftFreeCount.leftFreeCount2
            }}</span>
            <img
              class="question"
              src="./images/question.png"
              @click="tktips(1)"
            />
            <button
              class="cjbtn"
              @click="cqblindboxbtn(2, leftFreeCount.leftFreeCount2)"
            >
              {{ chEnTextHtml[lang].purchase5 }}
            </button>
          </p>
        </div>
        <div class="between flex">
          <span>{{ chEnTextHtml[lang].purchase3 + stakingPool }}</span>
          <p class="between flex">
            <span>{{
              chEnTextHtml[lang].purchase4 + leftFreeCount.leftFreeCount1
            }}</span>
            <img
              class="question"
              src="./images/question.png"
              @click="tktips(2)"
            />
            <button
              class="cjbtn"
              @click="cqblindboxbtn(1, leftFreeCount.leftFreeCount1)"
            >
              {{ chEnTextHtml[lang].purchase5 }}
            </button>
          </p>
        </div>
        <div class="dbcqword">
          <p class="cq">
            {{ chEnTextHtml[lang].purchase1 + leftAmount + " / " + storge }}
          </p>
          <p class="cq">{{ chEnTextHtml[lang].purchase3 + stakingPool }}</p>
          <p class="flex numbox">
            <span>{{
              chEnTextHtml[lang].purchase7 + leftFreeCount.leftFreeCount2
            }}</span>
            <img
              class="question"
              src="./images/question.png"
              @click="tktips(1)"
            />
          </p>
          <button
            class="cjbtn"
            @click="playVideo(2, leftFreeCount.leftFreeCount2)"
          >
            {{ chEnTextHtml[lang].purchase5 }}
          </button>
          <p class="flex numbox">
            <span>{{
              chEnTextHtml[lang].purchase4 + leftFreeCount.leftFreeCount1
            }}</span>
            <img
              class="question"
              src="./images/question.png"
              @click="tktips(2)"
            />
          </p>
          <button
            class="cjbtn"
            @click="playVideo(1, leftFreeCount.leftFreeCount1)"
          >
            {{ chEnTextHtml[lang].purchase5 }}
          </button>
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
        <button @click="jumppage()">Go Voting</button>
      </div>
    </div>
    <!-- modify -->
    <div class="modify none">
      <div class="modify-container flex">
        <div class="modify-form">
          <div class="modify-tit flex" data-type="name">
            <span>{{
              istkshow == 1
                ? chEnTextHtml[lang].tips0
                : chEnTextHtml[lang].tips01
            }}</span>
            <img
              class="none"
              onclick="cancelMobile()"
              src="./images/Close.png"
            />
          </div>
          <div class="modify-ipt">
            <p>
              {{
                istkshow == 1
                  ? chEnTextHtml[lang].tips1
                  : chEnTextHtml[lang].tips5
              }}
            </p>
            <p>{{ chEnTextHtml[lang].tips2 }}</p>
            <p>{{ chEnTextHtml[lang].tips3 }}</p>
            <p>{{ chEnTextHtml[lang].tips4 }}</p>
          </div>
          <!-- <div class="modify-tips"></div> -->
          <div class="modify-btn flex">
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
    <!-- 播放视频 -->
    <div class="video-mask none"></div>
    <div class="video-model none">
      <div class="video-model-container flex">
        <div>
          <video webkit-playsinline="true" src="http://47.118.74.48:8081/upload/other/one_draw.mp4" autoplay muted></video>
        </div>
      </div>
    </div>
    <div class="payment-result-modal none">
      <div class="payment-container flex">
        <div class="payment-page flex">
          <div
            class="payment-page-close payment-close-pc"
            onclick="paymentClose()"
          >
            <img src="./images/Close.png" />
          </div>
          <div class="payment-page-top none flex">
            <div class="payment-page-right-tit">
              {{ chEnTextHtml[lang].pay }}
            </div>
            <div class="payment-close-mobile">
              <img src="./images/Close.png" />
            </div>
          </div>
          <div class="payment-page-left">
            <div class="payment-page-left-tit order-title success-titl">
              {{ blindBoxData.list && blindBoxData.list.length > 0 ? blindBoxData.list[0].name : chEnTextHtml[lang].orderTit}}
            </div>
            <div class="payment-page-left-creator flex">
              <div class="details-right-creator-img">
                <img src="./images/t8.png" />
              </div>
              <span>@ATTA</span>
            </div>
            <div class="user-result-imgs">
              <img
                v-for="(item, idx) in blindBoxData.list"
                :key="idx"
                :src="'http://47.118.74.48:8081'+item.primaryPic"
              />
            </div>
          </div>

          <div class="payment-page-right">
            <div class="payment-page-right-tit">
              {{ chEnTextHtml[lang].accomplish }}
            </div>
            <div
              class="
                payment-page-left-tit
                none
                payment-page-left-tit-mobile
                order-title
              "
            >
              {{ blindBoxData.list && blindBoxData.list.length > 0 ? blindBoxData.list[0].name : chEnTextHtml[lang].orderTit}}
            </div>
            <div
              class="
                payment-page-left-creator
                none
                payment-page-left-creator-mobile
                flex
              "
            >
              <div class="details-right-creator-img">
                <img src="./images/t8.png" />
              </div>
              <span>@ATTA</span>
            </div>
            <div class="payment-page-right-total">
              <p class="ordernum">{{chEnTextHtml[lang].idno + blindBoxData.orderNo}}</p>
              <h3>{{ chEnTextHtml[lang].paid }}</h3>
              <h3>
                <span class="order-price-hdk hkdPrice">{{chEnTextHtml[lang].free}}</span
                ><span class="order-price-busd none busdPrice">{{chEnTextHtml[lang].free}}</span>
              </h3>
              <h4 class="info-desc">
                {{ chEnTextHtml[lang].payTip}}
              </h4>
              <h4 class="user-address user-address-title">{{chEnTextHtml[lang].walletPay}}</h4>
              <h4 class="user-address">{{ blindBoxData.address }}</h4>
            </div>

            <div class="payment-page-right-select modify-ipt-fream">
              <div class="pay-button">
                <button
                  class="jumpzcbtn"
                  onClick="window.location.href = './myassets.html'"
                >
                  {{ chEnTextHtml[lang].asset }} >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "blindbox",
  data: function () {
    return {
      series: [],
      cards1: [],
      cards2: [],
      cards3: [],
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
          noimgword: "敬请期待",
          purchase1: "盲盒剩餘：",
          purchase2: "白名單用戶每購買4次，可獲贈一次抽取機會",
          purchase3: "當前投票獎勵池： BUSD ",
          purchase4: "我的白名單獲贈抽取機會 ：",
          purchase5: "現在使用",
          purchase6: "盲盒價格：",
          purchase7: "空投獲贈抽取機會 ：",
          tips0: "領取規則（空投）",
          tips01: "領取規則（白名單）",
          tips1: "參與盲盒空投活動且獲取到空投資格的用戶",
          tips5: "參與买四赠一白名单活動且獲取到白名单資格的用戶",
          tips2: "抽取時間：8月19號20點~20號12點",
          tips3: "過期將不支持抽取盲盒",
          tips4: "*了解更多信息，請聯系ATTA客服：atta_official",
          edit: "修改",
          clickedit: "點擊修改地址",
          transfer: "轉移",
          cancel: "知道啦",
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
          idno: "訂單號：",
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
          cancel: "知道了",
          recharge: "充值",
          noLog: "未登錄，請登入",
          number: "訂單號 #：",
          balancePayment: "餘額支付",
          accomplish: "完成",
          payment: "立即付款",
          walletFirst: "請先連接錢包  ->",
          paymentComing: "錢包直連支付功能準備中...",
          orderTit: "ATTA x 英雄联盟主播系列NFT盲盒",
          orderInfo: " - Rita系列S卡",
          walletPay: '錢包支付',
          payTip: '您抽中的NFT將在短時間內發送至您的默認錢包。可在我的資產-我的NFT下可查看。',
          free: '免费',
        },
        EN: {
          free: 'free',
          walletPay: 'Wallet payment',
          payTip: 'The NFT you have drawn will be sent to your default wallet within a short period of time. It can be viewed under My Assets - My NFTs.',
          orderTit: "ATTA x LOL Streamer NFT Collection",
          orderInfo: " - Rita series S card",
          luckdrawintroduce_con: "",
          luckdrawintroduce_btn1: "Single Draw",
          luckdrawintroduce_btn2: " 10 Consecutive Draws",
          probability: "本张卡概率：",
          gathertogether1: "集齊RIta系列NFT即可能獲得開黑機會~",
          gathertogether2: "集齊爱萝莉系列NFT即可能獲得開黑機會~",
          gathertogether3: "集齊瞳夕系列NFT即可能獲得開黑機會~",
          noimgword: "Coming soon",
          purchase1: "Mystery Box remaining: ",
          purchase2:
            "Whitelisted Users can enjoy the “Buy 4 get 1 free” Discount",
          purchase3: "Current voting reward pool: BUSD ",
          purchase4: "Available Whitelist Drawing Chances:",
          purchase5: "Use Now",
          purchase6: "Price: ",
          purchase7: "Available Airdrop Drawing Chances:",
          tips0: "Rules for Mystery Box Draw (Airdrop)",
          tips01: "Rules for Mystery Box Draw (Whitelist)",
          tips1: "For users who are eligible to receive the Mystery Box airdop",
          tips5: 'For users who are whitelisted and can enjoy the "Buy 4 Get 1 Free" discount',
          tips2: "Draw Time: August 19th, 20:00PM ~ August 20th 12:00PM (UTC+8)",
          tips3: "After the deadline, drawing of Mystery Box will be closed",
          tips4: "*For more information, please contact ATTA customer service at Telegram: https://t.me/attaofficialeng1",
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
          idno: "Order number:",
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
      account_address: "",
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
      stakingPool: 0,
      istkshow: 1,
      blindBoxData : {}
    };
  },

  created() {
    this.isConnect = getCookie("isConnect") == "false" ? false : true;
    this.lang = getCookie("lang") ? getCookie("lang") : "TC";
    if (this.lang == "TC") {
      document.title = "盲盒";
    } else {
      document.title = "Mystery Box";
    }
    $(".payment-page-right-balance").hide();
    this.getAssetsList();
  },
  mounted() {
    CHAIN.WALLET.accountsChangedAssign(this.getAssetsList);
  },

  methods: {
    getAssetsList() {
      var self = this;
      if (getCookie("islogin") != "false") {
        CHAIN.WALLET.accounts().then(function (accounts) {
          self.account_address = accounts.length > 0 ? accounts[0] : "";
          self.getdata();
        });
      } else {
        self.getdata();
      }
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
          address: self.account_address,
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
            self.stakingPool = res.data.stakingPool ? res.data.stakingPool : 0;
            self.series = res.data.series;
            self.cards1 = res.data.series[0].commodities;
            self.cards2 = res.data.series[1].commodities;
            self.cards3 = res.data.series[2].commodities;
            if (res.data.rewardCount.length) {
              res.data.rewardCount.forEach((item) => {
                if (item.type == 1) {
                  self.leftFreeCount.leftFreeCount1 = item.leftFreeCount;
                }
                if (item.type == 2) {
                  self.leftFreeCount.leftFreeCount2 = item.leftFreeCount;
                }
              });
            } else {
              self.leftFreeCount = {
                leftFreeCount1: 0,
                type1: 1,
                leftFreeCount2: 0,
                type1: 2,
              };
            }
          }
        },
      });
    },
    toPay(str) {
      var self = this;
      window.blindNum = str;
      window.setCookie('blindNum',str)
      $.ajax({
        url: base_url + "/v2/user/account",
        success: function (res) {
          if (res.code == 0) {
            $(".order-price-hdk").text("HK$ " + self.hdkDrawPrice * str);
            $(".order-price-busd").text("BUSD " + self.drawPrice * str);
            if (Number(str) == 10) {
              $(".success-titl").text(self.chEnTextHtml[self.lang].orderTit);
            }
            $(".payment").fadeIn();
            $(".payment").addClass("payment-active");
            $("video").addClass("video-hidden");
            $(".payment-page-left-img video").removeClass("video-hidden");
          } else {
            window.tips(self.chEnTextHtml[self.lang].noLog);
            setTimeout(() => {
              window.location.href = "./login.html";
            }, 700);
            return;
          }
        },
      });
    },
    playVideo(type, val) {
      $(".blindbox_box video").removeClass("video-hidden");
      $(".blindbox_box .video-model video")[0].play();
      $(".blindbox_box .video-mask").fadeIn("fast");
      $(".blindbox_box .video-model").fadeIn("fast");

      $(".video-model video")[0].addEventListener(
        "ended",
        function () {
          $(".blindbox_box .video-mask").fadeOut("fast");
          $(".blindbox_box .video-model").fadeOut("fast");
          this.cqblindboxbtn(type, val);
        },
        false
      );
    },
    cqblindboxbtn(type, val) {
      var self = this;
      var now = new Date();
      var startnow = new Date('2021/8/12 20:00');
      // var startnow = new Date('2021/8/19 20:00');
      var endDate = new Date("2021/8/20 12:00");
      if (getCookie("islogin") == "false" || getCookie("islogin") == false) {
        window.tips(self.chEnTextHtml[self.lang].noLog);
        setTimeout(() => {
          window.location.href = "./login.html";
        }, 700);
        return;
      }
      if (!self.account_address) {
        window.location.href = "./connectWallet.html";
        return;
      }
      if (startnow.getTime() > now.getTime()) {
        tips('活动还未开始');
        return;
      }
      if (endDate.getTime() < now.getTime()) {
        tips('活动已结束');
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
          address: self.account_address,
        }),
        success: function (res) {
          if (res.code == 0) {
            self.blindBoxData = res.data;
            console.log(self.blindBoxData);
            $(".blindbox_box .payment-result-modal").fadeIn("fast");
            self.getdata();
          }
        },
      });
    },
    jumppage() {
      window.open("https://www.atta.zone/loading");
    },
    tktips(type) {
      let dom = document.querySelector(".modify");
      dom.style.display = "block";
      this.istkshow = type;
    }
  },
};
</script>

<style>
.modify {
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}
.modify .modify-form .modify-tit {
  justify-content: center;
}
.modify .modify-form .modify-ipt {
  font-size: 18px;
  line-height: 150%;
}
.modify .modify-form .modify-btn .cancel {
  background: #a8deee;
  border: none;
  color: #fff;
}
.modify .modify-form .modify-ipt p:nth-last-child(1) {
  margin-top: 20px;
}
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
  font-size: 70px;
  line-height: 100%;
  margin: 0;
}

.anchorintroduction .subtitle {
  font-size: 32px;
  line-height: 150%;
  margin: 80px 0;
}
.anchorintroduction .introducebox {
  justify-content: space-between;
}
.anchorintroduction .introducebox .tvbox {
  width: 32%;
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
  text-align: justify;
  opacity: 0.8;
}

.luckdrawintroduce {
  padding: 0 14.93%;
  justify-content: space-between;
  position: relative;
}

.luckdrawintroduce .luckdraw_left {
  width: 50.48%;
  border-radius: 7px;
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
  text-align: justify;
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
  padding: 43px 30px;
  transition: 0.5s all;
  background-image: url(./images/tv6.png);
  background-size: 100% auto;
  border-radius: 22px;
}
.cardsbox .cardslist .cardsevery .noimgword {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.32);
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cardsbox .cardslist .cardsevery:hover .mask {
  opacity: 0.6;
}

.cardsbox .cardslist .cardsevery .mask p {
  font-size: 16px;
  line-height: 150%;
  text-align: justify;
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
.line {
  width: calc(100% - 66px);
  height: 1px;
  background: #9567ff;
  margin: 0 auto;
  display: none;
}
.cardsbox .purchasebox .dbcqword {
  display: none;
}
.ordernum{
  font-size: 14px !important;
  opacity: 0.4 !important;
}
.jumpzcbtn{
  border: none;
  border-radius: 2px;
  color: #fff;
  font-weight: bold;
  height: 48px;
  width: 100%;
  background-color: #9567FF;
  /* box-shadow: 0 1px 3px 0 rgb(19 57 94 / 40%); */
  font-size: 14px;
}
@media only screen and (max-width: 992px) {
  .modify .modify-form .modify-tit {
    justify-content: space-between;
    align-items: center;
  }
  .line,
  .cardsbox .purchasebox .dbcqword {
    display: block;
  }
  .blindbox_box {
    margin-top: 60px;
  }
  .anchorintroduction {
    padding: 32px 10px;
    text-align: left;
  }
  .anchorintroduction .title {
    font-size: 22px;
  }
  .anchorintroduction .subtitle {
    margin: 5px 0 21px 0;
    font-size: 16px;
  }
  .introducebox {
    flex-direction: column;
    padding: 0 23px;
  }
  .anchorintroduction .introducebox .tvbox .wordbox h5 {
    text-align: center;
    margin: 7px 0 8px 0;
  }
  .anchorintroduction .introducebox .tvbox .wordbox p,
  .luckdrawintroduce .luckdraw_right p {
    font-size: 16px;
  }
  .anchorintroduction .introducebox .tvbox {
    width: 100%;
  }
  .luckdrawintroduce {
    flex-direction: column;
    padding: 28px 33px 0 33px;
  }
  .luckdrawintroduce .luckdraw_left,
  .luckdrawintroduce .luckdraw_right {
    width: 100%;
  }
  .luckdrawintroduce .luckdraw_right img {
    width: 27px;
  }
  .luckdrawintroduce .luckdraw_right h3 {
    font-size: 24px;
    margin: 9.5px 0 20px 0;
  }
  .luckdrawintroduce .luckdraw_right .luckdraw_btns {
    position: relative;
    text-align: center;
    margin-top: 35px;
  }
  .luckdrawintroduce .luckdraw_right .luckdraw_btns button {
    margin-right: 0;
  }
  .cardsbox {
    padding: 35px 31px 0 31px;
  }
  .cardsbox .cardslist {
    margin-bottom: 29px;
  }
  .cardsbox .line {
    width: 100%;
  }
  .cardsbox .cardslist .cardsevery {
    width: 49%;
    margin-bottom: 8px;
  }
  .cardsbox .cardslist .cardsevery:focus .mask {
    opacity: 0.6;
  }
  .cardsbox .cardslist .cardsevery .mask {
    padding: 29px 16px;
  }
  .cardsbox .cardslist .cardsevery .mask p {
    font-size: 12px;
  }
  .cardsbox .cardslist .tips {
    font-size: 16px;
    margin: 7px 0 15px 0;
  }
  .cardsbox .purchasebox {
    margin-top: 31px;
    font-size: 16px;
  }
  .cardsbox .purchasebox .between {
    display: none;
  }
  .cardsbox .purchasebox .dbcqword {
    width: 100%;
  }
  .cardsbox .purchasebox .dbcqword p {
    margin: 0;
  }
  .cardsbox .purchasebox .dbcqword .cq {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 9px;
  }
  .cardsbox .purchasebox .dbcqword .numbox {
    margin-top: 10px;
    align-items: center;
    margin-bottom: 15px;
  }
  .cardsbox .purchasebox .dbcqword .numbox img {
    margin-left: 9px;
    width: 17px;
    height: 17px;
  }
  .cjbtn {
    font-size: 12px;
    padding: 5px 18px;
  }
  .cardsbox .purchasebox button {
    margin-left: calc((100% - 83px) / 2);
  }
  .cardsbox .purchasebox .tips1 {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    margin-top: 9px;
  }
  .zscjbox {
    margin-top: 19px;
    flex-wrap: wrap;
    font-size: 20px;
    justify-content: space-evenly;
  }
  .zscjbox span {
    width: 100%;
    display: inline-block;
  }
  .zscjbox button {
    margin-top: 19px;
    margin-left: 0;
    padding: 5px 12px;
  }
  .bottombtn {
    margin-top: 35px;
  }
  .bottombtn button {
    font-size: 20px;
    padding: 10px 52px;
  }
}
</style>