<template>
  <div class="history-container">
    <div class="filter-wrap">
      <div class="filter-control" @click="toggleFilters">
        <span>全部</span>
        <img :class="showFilters ? 'roate' : ''" src="./images/selectMore.png" />
      </div>
      <ul v-if="showFilters" class="filter-items">
        <li>鑄造記錄</li>
        <li>地址修改記錄</li>
        <li>轉移記錄</li>
      </ul>
    </div>
    <div class="history-items">
      <div class="history-item" v-for="(item, index) in historyData.mintRecords" :key="index">
        <div class="history-title">
          <div class="title-info">
            <span>LOG{{ index }}</span>
            <span class="title-info-name">{{ item.name }}</span>
          </div>
          <div class="title-time">{{ item.mintTime }}</div>
        </div>
        <div class="history-desc">
          <div class="desc-info">
            <span>{{ item.claimType }}</span>
            <span class="desc-info-edtion">{{ item.editions }}版</span>
          </div>
          <div class="desc-info">
            <div>接收地址由： 0xC2C747E0F7004F9E8817Db2ca4997657a7746928</div>
            <div>
              更改為：
              <span class="desc-info-address">0xf2102117f279d9c30ffa4149d6670d349cb721af</span>
            </div>
          </div>
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
    };
  },
  created() {
    this.getHistory();
  },
  mounted(){
    this.getNftHistory()
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
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
    getNftHistory() {
      let self = this
      var chainId = '';
      var targetChainId = '';
      var scansite_apiKey = '';
      var scansite_base_url = '';
      
      if (window.location.href.indexOf('bazhuayu.io') == -1) {
        targetChainId = 97;
        scansite_apiKey = ''
        scansite_base_url = 'https://api-testnet.bscscan.com'
      } else {
        targetChainId = 56;
        scansite_apiKey = '9GRF9Q9HT18PBCHQQD84N7U2MGC6I1NE27';
        scansite_base_url = 'https://api.bscscan.com'
      }
      console.log(window);
      var web3 = new Web3(window.CHAIN.WALLET.provider());
      window.CHAIN.WALLET.chainId().then(function(res) {
        chainId = web3.utils.hexToNumber(res);
        if (chainId != targetChainId) {
          window.CHAIN.WALLET.switchRPCSettings(targetChainId);
        }
        auctionAddress = contractSetting['atta_ERC721'][chainId].address;
        $.ajax({
          url: scansite_base_url + '/api?module=account&action=tokennfttx&contractaddress=' + auctionAddress + '&address=' + walletId + '&sort=asc'
        })
      })
    }
  },
};
</script>
<style>
.history-items {
  font-size: 16px;
}
.desc-info-address {
  color: #9567ff;
}
.history-title {
  display: flex;
  margin-top: 37px;
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
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: bottom;
}
.roate {
  transform: rotate(180deg);
}
.filter-wrap {
  font-size: 22px;
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}
.filter-items {
  font-size: 14px;
  position: absolute;
  top: 50px;
  left: 0;
  opacity: 0.8;
  cursor: pointer;
}
.filter-control {
  display: inline-block;
}
.filter-items li {
  margin-bottom: 10px !important;
}
</style>