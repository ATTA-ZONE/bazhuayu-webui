function requestWeb3(){
  if (window.location.href.indexOf('bazhuayu.io') == -1) {
    if(netVer!='97'){
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x61',
            chainName: 'bsctestnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18
            },
            rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"],
            blockExplorerUrls: ['https://testnet.bscscan.com']
          }
        ]
      });	
    }
  } else {
    if(netVer!='56'){
      window.ethereum.request({
        method:'wallet_addEthereumChain',
        params:[
          {
                  chainId:'0x38',chainName:'Binance Smart Chain Mainnet',     //如果是切换测试网 就 填 测试网 的RPC配置
                  nativeCurrency:{name:'BNB',symbol:'bnb',decimals:18},
                  rpcUrls:["https://bsc-dataseed1.ninicoin.io","https://bsc-dataseed1.defibit.io","https://bsc-dataseed.binance.org"],
            blockExplorerUrls:['https://bscscan.com/']
          }
        ]
      })
      
    }
  }
}