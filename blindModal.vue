<template>
  <div>
    <div>
      <div class="payment none">
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
              <div class="payment-page-left-tit order-title">
                單抽-LPL明星解說系列盲盒
              </div>
              <div class="payment-page-left-creator flex">
                <div class="details-right-creator-img">
                  <img src="./images/t8.png" />
                </div>
                <span>@ATTA</span>
                <div class="details-right-creator-edition">
                  {{ chEnTextHtml[lang].version }}
                </div>
              </div>
              <div class="payment-page-left-img order-img">
                <img src="./images/paymentImg.png" />
              </div>
            </div>

            <div class="payment-page-right">
              <div class="payment-page-right-tit">
                {{ chEnTextHtml[lang].pay }}
              </div>
              <div
                class="
                  payment-page-left-tit
                  none
                  payment-page-left-tit-mobile
                  order-title
                "
              >
                ----
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
                <div class="details-right-creator-edition">
                  {{ chEnTextHtml[lang].version }}
                </div>
              </div>

              <div class="payment-page-right-order none">
                <p class="order-number">Order #：<span>----</span></p>
                <p class="payment-page-right-order-tit">
                  {{ chEnTextHtml[lang].paid }}
                </p>
                <p class="payment-page-right-order-je"><span>----</span></p>
                <p class="payment-page-right-order-by">
                  <span>{{ chEnTextHtml[lang].byCreditCard }}</span>
                </p>
                <p class="payment-page-right-order-card none">----</p>
              </div>
              <div class="payment-page-right-pay flex">
                <span
                  v-for="(item, index) in payTabs"
                  :key="index"
                  :class="selectedPayMethod == index ? 'cur' : ''"
                  @click="togglePayMethod(index)"
                  >{{ item }}</span
                >
              </div>
              <div class="payment-page-right-total">
                <p>{{ chEnTextHtml[lang].pendingPayment }}</p>
                <p class="order-price">
                  <span class="order-price-hdk hkdPrice">HK$388 </span
                  ><span class="order-price-busd none busdPrice">BUSD 50 </span>
                </p>
              </div>

              <div class="payment-page-right-select modify-ipt-fream">
                <form
                  id="payment-form"
                  method="POST"
                  action="https://merchant.com/charge-card"
                >
                  <div class="payment-form-ipt">
                    <div
                      class="input-container card-number"
                      style="margin-bottom: 20px !important"
                    >
                      <div class="icon-container">
                        <img
                          id="icon-card-number"
                          src="images/card-icons/card.svg"
                          alt="PAN"
                        />
                      </div>
                      <div class="card-number-frame"></div>
                      <div class="icon-container payment-method">
                        <img id="logo-payment-method" />
                      </div>
                      <div class="icon-container">
                        <img
                          id="icon-card-number-error"
                          src="images/card-icons/error.svg"
                        />
                      </div>
                    </div>

                    <div class="date-and-code">
                      <div>
                        <div class="input-container expiry-date">
                          <div class="icon-container">
                            <img
                              id="icon-expiry-date"
                              src="images/card-icons/exp-date.svg"
                              alt="Expiry date"
                            />
                          </div>
                          <div class="expiry-date-frame"></div>
                          <div class="icon-container">
                            <img
                              id="icon-expiry-date-error"
                              src="images/card-icons/error.svg"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <div class="input-container cvv">
                          <div class="icon-container">
                            <img
                              id="icon-cvv"
                              src="images/card-icons/cvv.svg"
                              alt="CVV"
                            />
                          </div>
                          <div class="cvv-frame"></div>
                          <div class="icon-container">
                            <img
                              id="icon-cvv-error"
                              src="images/card-icons/error.svg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="flex pay-save">
                    <input id="save" type="checkbox" /><label for="save">{{
                      chEnTextHtml[lang].saveFor
                    }}</label>
                  </p>
                  <div
                    style="
                      color: #ff1313;
                      display: flex;
                      align-items: center;
                      margin-top: 10px;
                    "
                  >
                    <input
                      id="savetips"
                      @click="enablePay"
                      type="checkbox"
                    /><span>{{ chEnTextHtml[lang].purchasing }}</span>
                  </div>

                  <div>
                    <div class="pay-button">
                      <button id="pay-button" @click="creditPay">
                        {{ chEnTextHtml[lang].payment }} >
                      </button>
                    </div>
                    <span
                      class="error-message error-message__card-number"
                    ></span>
                    <span
                      class="error-message error-message__expiry-date"
                    ></span>
                    <span class="error-message error-message__cvv"></span>
                  </div>
                </form>
              </div>

              <div class="wallet-payment-desc none">
                {{ chEnTextHtml[lang].notStore }}
              </div>
              <div
                class="payment-page-right-balance"
                style="
                  color: #ff1313;
                  display: flex;
                  align-items: center;
                  margin-top: 10px;
                "
              >
                <input
                  id="saveBalance"
                  @click="toggleBalanceCheck"
                  type="checkbox"
                />
                <span>{{ chEnTextHtml[lang].purchasing }}</span>
              </div>
              <div
                class="payment-page-right-btn none"
                style="border-bottom: none !important"
              >
                <button
                  id="balanceBtn"
                  @click="payBalance"
                  disabled=""
                  type="button"
                >
                  {{ chEnTextHtml[lang].payment }} >
                </button>
              </div>
              <div class="payment-page-right-crypto none">
                <button
                  id="cryptoBtn"
                  @click="payCrypto"
                  disabled=""
                  type="button"
                >
                  {{ chEnTextHtml[lang].payment }} >
                </button>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pre-mask none"></div>
    </div>
    <!-- 播放视频 -->
    <div class="video-mask none"></div>
    <div class="video-model none">
      <div class="video-model-container flex">
        <div>
          <video src="" muted></video>
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
              <div class="payment-page-left-tit order-title">
                單抽-LPL明星解說系列盲盒
              </div>
              <div class="payment-page-left-creator flex">
                <div class="details-right-creator-img">
                  <img src="./images/t8.png" />
                </div>
                <span>@ATTA</span>
                <div class="details-right-creator-edition">
                  {{ chEnTextHtml[lang].version }}
                </div>
              </div>
              <div class="user-result-imgs">
                <img v-for="(item, idx) in blindBoxData" :key="idx" :src="item.primaryPic" />
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
                單抽-LPL明星解說系列盲盒
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
                <div class="details-right-creator-edition">
                  {{ chEnTextHtml[lang].version }}
                </div>
              </div>
              <div class="payment-page-right-total">
                <h3>{{ chEnTextHtml[lang].paid }}</h3>
                <h3>
                  <span class="order-price-hdk hkdPrice">HK$388 </span
                  ><span class="order-price-busd none busdPrice">BUSD 50 </span>
                </h3>
                <h4 class="info-desc">您抽中的NFT將在短時間內發送至您的默認錢包。可在我的資產-我的NFT下可查看。</h4>
                <h4 class="user-address user-address-title">
                  钱包支付
                </h4>
                <h4 class="user-address">{{userAddress}}</h4>
              </div>

              <div class="payment-page-right-select modify-ipt-fream">
                <div class="pay-button">
                      <button id="pay-button" @click="window.location.href = 'myassets.html'">
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
  name: "blindmodal",
  data: function () {
    return {
      chEnTextHtml: {
        TC: {
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
          version: "第1版，共1版",
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
          version: "Edition 1 of 1",
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
      orderNo: "",
      blindBoxData: [],
      address: "",
      id: "",
      busdPrice: 0,
      selectarr: [],
      accountBalance: 0,
      hkdPrice: 0,
      curUserOwned: 0,
      oneUserCountLimit: 0,
      onceCountLimit: 0,
      payTabs: ["信用卡", "錢包支付"],
      selectedPayMethod: 0,
      basicId: 0,
      visiable: [],
      auctionAddress: "",
      auctionContractInstance: null,
      userAddress: "",
      tokenLimits: [],
      chainId: "",
      activityId: 1,
      success_status: -1
    };
  },

  created() {
    this.isConnect = getCookie("isConnect") == "false" ? false : true;
    this.lang = getCookie("lang") ? getCookie("lang") : "TC";
    if (this.lang == "TC") {
      this.payTabs = ["信用卡", "錢包支付"];
    } else {
      this.payTabs = ["Credit card", "Balance"];
    }
  },

  mounted() {
    let self = this;
    $.getScript("./js/framesv2.min.js");
    $.getScript("./js/blindFrame.js");
    $(".payment-page-right-balance").hide();
    this.initAddress();
    this.getCreditInfo();
  },

  methods: {
    playVideo() {
      var src = "";
      if (window.getCookie('blindNum') < 2) {
        src="/upload/other/one_draw.mp4"
      } else {
        src="/upload/other/ten_draw.mp4"
      }
      $(".payment").fadeOut("fast");
      $(".video-model video").attr("src", src);
      $(".video-mask").fadeIn("fast");
      $(".video-model").fadeIn("fast");
      $(".video-model video")[0].play();
      $(".video-model video")[0].addEventListener(
        "ended",
        function () {
          $(".video-mask").fadeOut("fast");
          $(".video-model").fadeOut("fast");
          $(".payment-result-modal").fadeIn("fast");
        },
        false
      );
    },
    enablePay() {
      if ($("#savetips").prop("checked")) {
        $("#pay-button").attr("disabled", false);
      } else {
        $("#pay-button").attr("disabled", true);
      }
    },
    creditPay() {
      loading();
    },
    getQueryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      }
      return null;
    },
    getCreditInfo() {
      let self = this;
      self.success_status = self.getQueryString("success");
      self.orderNo = window.getCookie("orderNo");
      if (self.success_status == 1 && self.orderNo) {
        success(this.chEnTextHtml[this.lang].paySuc, 1800);
        setTimeout(function () {
          self.playVideo();
          CHAIN.WALLET.accounts().then(function (accounts) {
            self.drawSku(accounts, "", 2);
          });
        }, 1800);
      } else if (self.success_status == 0) {
        self.cancelSku();
        error(this.chEnTextHtml[this.lang].payErr, 1800);
      }
    },
    payCrypto() {
      let self = this;
      $.ajax({
        url: base_url + "/v2/commodity/tokenLimit",
        data: {
          basicId: self.basicId,
        },
        success: function (res) {
          loading();
          $("#cryptoBtn").attr("disabled", true);
          self.tokenLimits = res.data.tokenLimit;
          self.authUser();
        },
      });
    },
    authUser() {
      let self = this;
      var web3 = new Web3(CHAIN.WALLET.provider());
      var busdAddress = contractSetting["busd_ERC20"][self.chainId].address;
      var busdABI = contractSetting["busd_ERC20"]["abi"];
      var busdContractInstance = new web3.eth.Contract(busdABI, busdAddress);
      busdContractInstance.methods
        .allowance(self.userAddress, self.auctionAddress)
        .call()
        .then(function (res) {
          loadingHide();
          if (res < Number(self.busdPrice)) {
            var num = web3.utils.toWei("999999999999999", "ether");
            //发起授权
            busdContractInstance.methods
              .approve(self.auctionAddress, num)
              .send({
                from: self.userAddress,
              })
              .then(function () {
                self.getOnSellToken();
              });
          } else {
            self.getOnSellToken();
          }
        });
    },
    initAddress() {
      let self = this;
      var targetChainId = "";
      if (window.location.href.indexOf("bazhuayu.io") == -1) {
        targetChainId = 97;
      } else {
        targetChainId = 56;
      }
      var web3 = new Web3(CHAIN.WALLET.provider());
      CHAIN.WALLET.accounts().then(function (accounts) {
        self.userAddress = accounts[0];
      });
      CHAIN.WALLET.chainId().then(function (res) {
        let id = "";
        self.chainId = web3.utils.hexToNumber(res);
        id = web3.utils.hexToNumber(res);
        if (id == targetChainId) {
          self.auctionAddress = contractSetting["vending_machine"][id].address; //网络切换
        }
        var auctionABI = contractSetting["vending_machine"]["abi"];
        self.auctionContractInstance = new web3.eth.Contract(
          auctionABI,
          self.auctionAddress
        );
      });
    },
    getOnSellToken() {
      let self = this;
      if (!self.tokenLimits) {
        return false;
      }
      self.auctionContractInstance.methods
        .getOnSellToken()
        .call()
        .then((arr) => {
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < self.tokenLimits.length; j++) {
              if (
                arr[i] >= self.tokenLimits[j].startTokenId &&
                arr[i] <= self.tokenLimits[j].endTokenId
              ) {
                self.visiable.push(arr[i]);
              }
            }
          }
          if (self.selectarr.length > self.visiable.length) {
            tips(this.chEnTextHtml[this.lang].maximum);
            $("#cryptoBtn").attr("disabled", false);
            return false;
          }
          CHAIN.WALLET.accounts().then(function (accounts) {
            self.auctionContractInstance.methods
              .safeBatchBuyToken(self.visiable.slice(0, self.selectarr.length))
              .send({
                from: accounts[0],
              })
              .on("transactionHash", function (hash) {
                success(this.chEnTextHtml[this.lang].purchaseSuc, 1800);
                setTimeout(function () {
                  tips(this.chEnTextHtml[this.lang].seconds);
                  $("#cryptoBtn").attr("disabled", false);
                  setTimeout(function () {
                    window.location.reload();
                  }, 1500);
                }, 1800);
              });
          });
        });
    },

    //询问弹窗
    saveconfirm() {
      hsycms.confirm(
        "confirm",
        this.chEnTextHtml[this.lang].asset,
        function (res) {
          hsycms.success("success", this.chEnTextHtml[this.lang].confirm);
          setTimeout(function () {
            window.location.href = "myassets.html";
          }, 1500);
        },
        function (res) {
          hsycms.error("error", this.chEnTextHtml[this.lang].cancel);
        }
      );
    },
    toggleBalanceCheck() {
      var payButton = document.getElementById("balanceBtn");
      var cryButton = document.getElementById("cryptoBtn");
      if ($("#saveBalance").prop("checked")) {
        payButton.disabled = false;
        if (getCookie("isConnect") == "true") {
          cryButton.disabled = false;
        }
      } else {
        cryButton.disabled = true;
        if (
          $("#balanceBtn").text() == "立即付款 >" ||
          $("#balanceBtn").text() == "Pay now >"
        ) {
          payButton.disabled = true;
        }
      }
    },
    //格式化时间
    formatDuring(mss) {
      var days = parseInt(mss / (1000 * 60 * 60 * 24));
      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = parseInt((mss % (1000 * 60)) / 1000);
      return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    },
    preSku() {
      let self = this;
      return new Promise((resolve, reject) => {
        $.ajax({
          url: base_url + "/v2/activity/preOrder",
          type: "POST",
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify({
            activityId: 1,
            count: window.blindNum,
          }),
          success: function (res) {
            if (res.data) {
              self.orderNo = res.data;
              resolve(res.data);
            } else {
              tips(res.message);
            }
          },
          error: function (err) {
            reject(err);
            setTimeout(function () {
              loadingHide();
            }, 1000);
          },
        });
      });
    },
    drawSku(accounts, hash, type) {
      let self = this;
      if (self.orderNo) {
        $.ajax({
          url: base_url + "/v2/activity/draw",
          type: "POST",
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify({
            activityId: 1,
            address: accounts[0],
            orderNo: self.orderNo,
            txhash: hash || "",
            type: type,
          }),
          success: function (resu) {
            self.blindBoxData = resu.data;
            if (resu.data.length > 1) {
              $('.user-result-imgs img').addClass('ten-imgs')
            } else {
              $('.user-result-imgs img').addClass('one-imgs')
            }
            if (type == 2) {
              window.setCookie('orderNo','')
            }
          },
        });
      }
    },
    cancelSku() {
      let self = this;
      $.ajax({
        url: base_url + "/v2/activity/cancelOrder",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          orderNo: self.orderNo,
        }),
      });
    },
    //支付
    async payBalance() {
      let self = this;
      let res = await self.preSku();
      if (!res) {
        return false;
      }
      if (self.selectedPayMethod == 1) {
        CHAIN.WALLET.accounts().then(function (accounts) {
          self.safeCharge(accounts);
          loading();
        });
      }
    },

    safeCharge(accounts) {
      let self = this;
      if (accounts.length < 1) {
        return false;
      }
      var cwallet = "0xccbc6228c6030C605973468F6F5cbD16819A1D8B"; //收款钱包 地址
      var web3 = new Web3(CHAIN.WALLET.provider());

      var chainId = "";
      CHAIN.WALLET.chainId().then(function (res) {
        chainId = web3.utils.hexToNumber(res);

        // busdAddress 供外界使用
        var busdAddress = contractSetting["busd_ERC20"][chainId].address;
        var busdABI = contractSetting["busd_ERC20"]["abi"];

        busdContractInstance = new web3.eth.Contract(busdABI, busdAddress);
        var amount = $(".order-price-busd").text().split("BUSD ")[1];

        var num = web3.utils.toWei(amount, "ether");
        busdContractInstance.methods
          .balanceOf(accounts[0])
          .call() //查询余额
          .then(function (res2) {
            if (Number(res2) >= Number(num)) {
              setTimeout(function () {
                busdContractInstance.methods
                  .transfer(cwallet, num)
                  .send({
                    //转账
                    from: accounts[0],
                  })
                  .then((result) => {
                    $(".payment").fadeOut();
                    self.playVideo();
                    self.drawSku(accounts, result.blockHash, 3);
                    loadingHide();
                  })
                  .catch(() => {
                    self.cancelSku();
                    loadingHide();
                  });
              }, 500);
            }
          });
      });
    },
    togglePayMethod(text) {
      this.selectedPayMethod = text;
      if (text == 0) {
        $(".payment-page-right-btn").hide();
        $(".order-price .order-price-hdk").show();
        $(".order-price .order-price-busd").hide();
        $(".payment-page-right-select").show();
        $(".payment-page-right-busd").hide();
        $(".payment-page-right-balance").hide();
        $(".payment-page-right-btn").hide();
        $(".wallet-payment-desc").hide();
        $(".payment-page-right-crypto").hide();
        $(".payment-page-right-total").show();
      }

      if (text == 1) {
        $(".payment-page-right-btn").show();
        $(".payment-page-right-crypto").hide();
        $(".payment-page-right-total").show();
        $(".payment-page-right-balance").show();
        $(".payment-page-right-btn button").addClass("can");
        if (
          $(".busd-tip").text() == "餘額不足" ||
          $(".busd-tip").text() == "Insufficient balance" ||
          this.accountBalance < this.busdPrice * this.selectarr.length
        ) {
          $(".payment-page-right-btn button").text(
            this.chEnTextHtml[this.lang].recharge
          );
          $("#balanceBtn").attr("disabled", false);
        } else {
          $(".payment-page-right-btn button").text(
            this.chEnTextHtml[this.lang].payment + " >"
          );
        }
        $(".order-price .order-price-hdk").hide();
        $(".order-price .order-price-busd").show();
        $(".payment-page-right-select").hide();
        $(".payment-page-right-busd").show();
        $(".wallet-payment-desc").hide();
      }
      if (text == 2) {
        $(".payment-page-right-btn").hide();
        //$('.payment-page-right-crypto').show();
        if (getCookie("isConnect") != "true") {
          $("#cryptoBtn").text(this.chEnTextHtml[this.lang].walletFirst);
          $("#cryptoBtn").attr("disabled", false);
        } else {
          $("#cryptoBtn").text(this.chEnTextHtml[this.lang].payment + "  ->");
          $("#cryptoBtn").attr("disabled", false);
        }
        $(".payment-page-right-balance").hide();
        $(".payment-page-right-crypto button").addClass("can");
        if (
          $(".busd-tip").text() == "餘額不足" ||
          $(".busd-tip").text() == "Insufficient balance"
        ) {
          $(".payment-page-right-btn button").text(
            this.chEnTextHtml[this.lang].recharge
          );
        } else {
          $(".payment-page-right-btn button").text(
            this.chEnTextHtml[this.lang].payment + " >"
          );
        }

        $(".payment-page-right-total").hide();
        $(".payment-page-right-total .order-price").hide();
        $(".order-price .order-price-hdk").hide();
        $(".order-price .order-price-busd").show();
        $(".payment-page-right-select").hide();
        $(".payment-page-right-busd").hide();
        $(".wallet-payment-desc").text(
          this.chEnTextHtml[this.lang].paymentComing
        );
        $(".wallet-payment-desc").show();
        $("#cryptoBtn").attr("disabled", true);
      }
    },
  },
};
</script>