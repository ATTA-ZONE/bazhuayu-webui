<template>
  <div class="history-container">
    <div class="filter-wrap">
      <div class="filter-control" @click="toggleFilters">
        <span>全部</span>
        <img :class="showFilters ? 'roate' : ''" src="./images/selectMore.png" />
      </div>
      <ul v-if="showFilters" class="filter-items">
        <li
          @click="setFilter(idx)"
          :class="selectedFilterTag == idx ? 'selected-tag' : ''"
          v-for="(itm,idx) in filTags"
          :key="'#' + idx"
        >{{ itm }}</li>
      </ul>
    </div>
    <div class="history-items">
      <div v-if="showFilter.indexOf('2') > -1">
        <div class="history-item" v-for="(item, index) in historyData.editRecords" :key="index">
          <div class="history-title">
            <div class="title-info">
              <span class="title-info-name">{{ item.name }}</span>
            </div>
            <div class="title-time">{{ item.createTime }}</div>
          </div>
          <div class="history-desc">
            <div class="desc-info">
              <span>{{ item.claimType }}</span>
              <span class="desc-info-edtion">{{ item.edition }}版</span>
            </div>
            <div class="desc-address">
              <div>接收地址由：{{ item.fromAddress }}</div>
              <div>
                更改為：
                <span class="desc-info-address">{{ item.toAddress }}</span>
              </div>
            </div>
          </div>
          <div class="history-line"></div>
        </div>
      </div>
      <div v-if="showFilter.indexOf('1') > -1">
        <div class="history-item" v-for="(item, index) in historyData.mintRecords" :key="index">
          <div class="history-title">
            <div class="title-info">
              <span class="title-info-name">{{ item.name }}</span>
            </div>
            <div class="title-time">{{ item.mintTime }}</div>
          </div>
          <div class="history-desc">
            <div class="desc-info">
              <span>{{ item.claimType }}</span>
              <span class="desc-info-edtion">{{ item.editions }}版</span>
            </div>
            <div class="desc-address" v-if="item.status == 1">
              <div>
                開始鑄造
                <a @click="cancelNft(item.mintFlow)" class="recoverRequest">[撤回鑄造申請]</a>
              </div>
            </div>
            <div class="desc-address" v-if="item.status == 2">
              <div>鑄造完畢，請在“我的NFT”頁面查看</div>
              <div>
                Transaction hash：
                <span class="desc-info-address">{{ item.transactionHash }}</span>
              </div>
            </div>
          </div>
          <div class="history-line"></div>
        </div>
      </div>
      <div v-if="showFilter.indexOf('3') > -1">
        <div class="history-item" v-for="(item, index) in nftData" :key="'_' + index">
          <div class="history-title">
            <div class="title-info">
              <span class="title-info-name">{{ item.name }}</span>
            </div>
            <div class="title-time">{{ timeFormat(item.timeStamp) }}</div>
          </div>
          <div class="history-desc">
            <div class="desc-info">
              <span>{{ item.claimType || 'BSC' }}</span>
              <span class="desc-info-edtion">{{ item.edition }}版</span>
            </div>
            <div class="desc-address">
              <div>原地址：{{ item.from }}</div>
              <div>
                已轉移至地址：
                <span class="desc-info-address">{{ item.to }}</span>
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
      historyData: {},
      nftData: [],
      showFilter: ['1', '2', '3'],
      filTags: ['鑄造記錄',
        '地址修改記錄',
        '轉移記錄'],
      selectedFilterTag: -1
    };
  },
  created() {
    let self = this
    self.getHistory();
    self.getNftHistory()
    self.resizeWindow()
    window.onresize = function() {
      self.resizeWindow()
    }
  },

  methods: {
    cancelNftRequest(id) {
      if (id) {
        let self = this
        $.ajax({
          url: base_url + '/v2/mint/mint/cancelMintingRequest',
          type: 'POST',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({
            mintFlow: id
          }),
          success: function(res) {
            if (res.code == 0) {
              self.getHistory();
              hsycms.success('success', '撤回成功');
            }
          }
        })
      }
    },
    cancelNft(id) {
      let self = this
      hsycms.confirm('confirm', '你確定要[撤回鑄造申請]嗎？',
        function(res) {
          hsycms.success('success', '確認');
          setTimeout(function() {
            self.cancelNftRequest(id)
          }, 1500)
        },
        function(res) {
          hsycms.error('error', '取消');
        },
      )
    },
    setFilter(idx) {
      this.showFilter = [String(idx + 1)]
      this.selectedFilterTag = idx
    },
    toggleFilters() {
      this.showFilter = ['1', '2', '3']
      this.selectedFilterTag = -1
      this.showFilters = !this.showFilters;
    },
    resizeWindow() {
      if ($('body').width() < 992) {
        this.showFilters = true
      } else {
        this.showFilters = false
      }
    },
    getHistory() {
      let self = this;
      $.ajax({
        url: base_url + "/v2/user/nft/records",
        success: function(res) {
          if (res.code == 0) {
            self.historyData = res.data;
          }
        },
      });
    },
    timeFormat(str) {
      var date = new Date(str * 1000);
      Y = date.getFullYear() + '-';
      M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      D = date.getDate() + ' ';
      h = date.getHours() + ':';
      m = date.getMinutes() + ':';
      s = date.getSeconds();
      return (Y + M + D + h + m + s);
    },
    getNftHistory() {
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
        url: scansite_base_url + '/api?module=account&action=tokennfttx&contractaddress=' + auctionAddress + '&address=' + window.walletId + '&sort=desc',
        success: function(res) {
          if (res.status == '1') {
            self.nftData = res.result
            for (let i = 0; i < self.nftData.length; i++) {
              $.ajax({
                url: base_url + '/v2/commodity/edition_basic_id',
                data: { tokenTypeId: self.nftData[i].tokenID },
                success: function(itm) {
                  self.$set(self.nftData[i], 'name', itm.data.name)
                  self.$set(self.nftData[i], 'edition', itm.data.edition)
                }
              })
            }
          }
        }
      })
    }
  }
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
  width: 500px;
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