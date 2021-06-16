<template>
  <div class="history-container" v-cloak>
    <div class="filter-wrap">
      <div class="filter-control" @click="toggleFilters">
        <span>{{chEnTextHtml[lang].title}}</span>
        <img :class="showFilters ? 'roate' : ''" src="./images/selectMore.png" />
      </div>
      <ul v-if="showFilters" class="filter-items">
        <li
          @click="setFilter(idx)"
          :class="selectedFilterTag == idx ? 'selected-tag' : ''"
          v-for="(itm, idx) in chEnTextHtml[lang].filTags"
          :key="'#' + idx"
        >{{ itm }}</li>
      </ul>
    </div>
    <div class="history-items">
      <div>
        <div class="history-item" v-for="(item, index) in computedData" :key="index">
          <div class="history-title">
            <div class="title-info">
              <span class="title-info-name">{{ item.name }}</span>
            </div>
            <div
              class="title-time"
              v-if="showFilter.indexOf('2') > -1 && item.createTime"
            >{{ timeFormat(item.createTime) }}</div>
            <div
              class="title-time"
              v-if="showFilter.indexOf('1') > -1 && item.mintTime"
            >{{ timeFormat(item.mintTime) }}</div>
            <div
              class="title-time"
              v-if="showFilter.indexOf('3') > -1 && item.blockHash"
            >{{ timeFormat(item.timeStamp) }}</div>
          </div>
          <div class="history-desc">
            <div class="desc-info">
              <span>{{ item.claimType }}</span>
              <span class="desc-info-edtion">{{ item.edition || item.editions }}{{chEnTextHtml[lang].ban}}</span>
            </div>
            <div
              class="desc-address"
              v-if="
                item.status == 1 &&
                showFilter.indexOf('1') > -1 &&
                item.mintTime
              "
            >
              <div>
                {{chEnTextHtml[lang].startmint}}
                <a @click="cancelNft(item.mintFlow)" class="recoverRequest">{{chEnTextHtml[lang].nomint}}</a>
              </div>
            </div>
            <div
              class="desc-address"
              v-if="
                item.status == 2 &&
                showFilter.indexOf('1') > -1 &&
                item.mintTime
              "
            >
              <div>{{chEnTextHtml[lang].tips1}}</div>
              <div>
                Transaction hash：
                <span class="desc-info-address">
                  {{
                    item.transactionHash
                  }}
                </span>
              </div>
            </div>
            <div class="desc-address" v-if="showFilter.indexOf('2') > -1 && item.toAddress">
              <div>{{chEnTextHtml[lang].jsaddress + item.fromAddress }}</div>
              <div>
                {{chEnTextHtml[lang].change}}
                <span class="desc-info-address">{{ item.toAddress }}</span>
              </div>
            </div>
            <div class="desc-address" v-if="showFilter.indexOf('3') > -1 && item.blockHash">
              <div>{{chEnTextHtml[lang].oldaddress + item.from }}</div>
              <div>
                {{chEnTextHtml[lang].changeaddress}}
                <span class="desc-info-address">{{ item.to }}</span>
              </div>
              <div>
                Transaction hash：
                <span class="desc-info-address">{{ item.hash }}</span>
              </div>
            </div>
          </div>
          <div class="history-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      showFilters: false,
      historyData: {
        nftData: [],
        editRecords: [],
        mintRecords: [],
      },
      showFilter: ["1", "2", "3"],
      selectedFilterTag: -1,
      dataList: [],
      chEnTextHtml: {
				"TC":{
						title : "全部",
						ban : "版",
						startmint : "開始鑄造",
						nomint : "[撤回鑄造申請]",
						tips1 : "鑄造完畢，請在“我的NFT”頁面查看",
            jsaddress : "接收地址由：",
            change : "更改為：",
            oldaddress : "原地址：",
            changeaddress : "已轉移至地址：",
            filTags: ["鑄造記錄", "地址修改記錄", "轉移記錄"],
            nosuc : "撤回成功",
            tips2 : "你確定要[撤回鑄造申請]嗎？",
            tips3 : "確認",
            tips4 : "取消",
					},
					"EN":{
						title : "All",
            ban : "Edition",
						startmint : "Start casting",
            nomint : "[Withdrawal of casting application]",
            tips1 : 'After casting, please check on the "My NFT" page',
            jsaddress : "The receiving address is from：",
            change : "change to：",
            oldaddress : "Original address：",
            changeaddress : "Transferred to address：",
            filTags: ['Casting record','Address modification record','Transfer record'],
            nosuc : "Withdraw successfully",
            tips2 : 'Are you sure you want to [Withdrawal of casting application]？',
            tips3 : 'Confirm',
            tips4 : "Cancel",
          }
			},
			lang:''
    };
  },
  created() {
    let self = this;
    self.getHistory();
    self.getNftHistory();
    self.resizeWindow();
    window.onresize = function() {
      self.resizeWindow();
    };
    self.lang = getCookie("lang")?getCookie("lang"):'TC';
  },
  computed: {
    computedData() {
      if (this.showFilter.length == 3) {
        return this.dataList;
      } else {
        if (this.showFilter.indexOf("3") > -1) {
          return this.dataList.filter((item) => {
            return item.blockHash;
          });
        }
        if (this.showFilter.indexOf("2") > -1) {
          return this.dataList.filter((item) => {
            return item.toAddress;
          });
        }
        if (this.showFilter.indexOf("1") > -1) {
          return this.dataList.filter((item) => {
            return item.basicId;
          });
        }
      }
    },
  },

  methods: {
    cancelNftRequest(id) {
      if (id) {
        let self = this;
        $.ajax({
          url: base_url + "/v2/mint/mint/cancelMintingRequest",
          type: "POST",
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify({
            mintFlow: id,
          }),
          success: function(res) {
            if (res.code == 0) {
              self.getHistory();
              hsycms.success("success", this.chEnTextHtml[this.lang].nosuc);
            }
          },
        });
      }
    },
    cancelNft(id) {
      let self = this;
      hsycms.confirm(
        "confirm",
        this.chEnTextHtml[this.lang].tips2,
        function(res) {
          hsycms.success("success", this.chEnTextHtml[this.lang].tips3);
          setTimeout(function() {
            self.cancelNftRequest(id);
          }, 1500);
        },
        function(res) {
          hsycms.error("error", this.chEnTextHtml[this.lang].tips4);
        }
      );
    },
    setFilter(idx) {
      this.showFilter = [String(idx + 1)];
      this.selectedFilterTag = idx;
    },
    toggleFilters() {
      this.showFilter = ["1", "2", "3"];
      this.selectedFilterTag = -1;
      this.showFilters = !this.showFilters;
    },
    resizeWindow() {
      if ($("body").width() < 992) {
        this.showFilters = true;
      } else {
        this.showFilters = false;
      }
    },
    getHistory() {
      let self = this;
      $.ajax({
        url: base_url + "/v2/user/nft/records",
        success: function(res) {
          if (res.code == 0) {
            res.data.editRecords.forEach((item) => {
              item.createTime = new Date(item.createTime).getTime();
              item.timeStamp = item.createTime;
            });
            res.data.mintRecords.forEach((item) => {
              item.mintTime = new Date(item.mintTime).getTime();
              item.timeStamp = item.mintTime;
            });
            self.dataList.push(
              ...res.data.editRecords,
              ...res.data.mintRecords
            );
            self.dataList.sort(function(a, b) {
              return b.timeStamp - a.timeStamp;
            });
          }
        },
      });
    },
    timeFormat(str) {
      var date = new Date(str);
      Y = date.getFullYear() + "-";
      M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      D = date.getDate() + " ";
      h = date.getHours() + ":";
      m = date.getMinutes() + ":";
      s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getNftHistory() {
      let self = this;
      var targetChainId = "";
      var scansite_base_url = "";

      if (window.location.href.indexOf("bazhuayu.io") == -1) {
        targetChainId = 97;
        scansite_base_url = "https://api-testnet.bscscan.com";
      } else {
        targetChainId = 56;
        scansite_base_url = "https://api.bscscan.com";
      }
      auctionAddress = contractSetting["atta_ERC721"][targetChainId].address;
      $.ajax({
        url:
          scansite_base_url +
          "/api?module=account&action=tokennfttx&contractaddress=" +
          auctionAddress +
          "&address=" +
          window.walletId +
          "&sort=desc",
        success: function(res) {
          if (res.status == "1") {
            for (let i = 0; i < res.result.length; i++) {
              res.result[i].timeStamp *= 1000;
              $.ajax({
                url: base_url + "/v2/commodity/edition_basic_id",
                data: { tokenTypeId: res.result[i].tokenID },
                success: function(itm) {
                  self.$set(res.result[i], "name", itm.data.name);
                  self.$set(res.result[i], "edition", itm.data.edition);
                },
              });
            }
            self.dataList.push(...res.result);
            self.dataList.sort(function(a, b) {
              return b.timeStamp - a.timeStamp;
            });
          }
        },
      });
    },
  },
};
</script>
<style>
@media only screen and (max-width: 992px) {
  .history-items {
    font-size: 12px !important;
  }

  .filter-items,
  .filter-items li {
    display: inline-block;
  }
  .filter-items {
    font-size: 14px;
    opacity: 0.8;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 18%;
    line-height: 1;
    display: inline-flex;
    flex: 1;
    justify-content: space-between;
  }
  .filter-wrap {
    font-size: 16px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .filter-control {
    display: inline-block;
  }
  .filter-control img {
    display: none;
  }
  .history-desc {
    display: block !important;
  }
  .desc-info {
    justify-content: space-between;
  }
  .desc-address {
    margin-top: 6px;
  }
  .desc-info-edtion {
    max-width: 36% !important;
  }
}

.desc-info {
  display: flex;
  align-items: center;
}

.history-line {
  width: 60%;
  height: 1px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  margin: 20px auto;
}

.recoverRequest,
.recoverRequest:hover {
  color: #ff1313;
  cursor: pointer;
}

.history-items {
  font-size: 16px;
}
.desc-address {
  width: 550px;
}
.desc-info-address {
  color: #9567ff;
}
.selected-tag {
  color: #9567ff !important;
}
.history-title {
  display: flex;
  margin-top: 10px;
  padding: 0 20px;
  justify-content: space-between;
}
.title-info-name {
  margin-left: 15px;
}
.history-desc {
  background-color: #222;
  padding: 20px;
  margin-top: 8px;
  display: flex;
  align-content: center;
  justify-content: space-between;
}
.desc-info-edtion {
  margin-left: 40px;
  width: 290px;
  display: inline-block;
  vertical-align: middle;
}
.roate {
  transform: rotate(180deg);
}
.filter-wrap {
  font-size: 22px;
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.filter-items {
  font-size: 14px;
  opacity: 0.8;
  cursor: pointer;
  margin-top: 10px;
  line-height: 1;
}
.filter-control {
  display: inline-block;
}
.filter-items li {
  margin-bottom: 10px !important;
}
</style>