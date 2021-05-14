var targetChainId = ''

if (window.location.href.indexOf('bazhuayu.io') == -1) {
    var targetChainId = 97;
    var scansite_apiKey = ''
    var scansite_base_url = 'https://api-testnet.bscscan.com'
} else {
    var targetChainId = 56;
    var scansite_apiKey = '9GRF9Q9HT18PBCHQQD84N7U2MGC6I1NE27';
    var scansite_base_url = 'https://api.bscscan.com'
}


function getWeb3() {
	return new Web3(window.ethereum); // web3js就是你需要的web3实例
}

function getEth() {
	return getWeb3().eth;
}

// 监听账户变更事件
function accountsChangedAssign(fnc) {
  ethereum.on('accountsChanged', function (accounts) {
    fnc(accounts)
  });
}

function changeNetwork(status) {
    window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: RPCSetting[status].CHAIN_ID_HEX,
        chainName: RPCSetting[status].CHAIN_NAME,
        nativeCurrency: {
          name: RPCSetting[status].SYMBOL,
          symbol: RPCSetting[status].SYMBOL,
          decimals: 18
        },
        rpcUrls: [RPCSetting[status].RPC_URL],
        blockExplorerUrls: [RPCSetting[status].ETHERSCAN_URL]
      }]
    });
}

// 监听网络变更事件
<<<<<<< HEAD
ethereum.autoRefreshOnNetworkChange = false;

ethereum.on('networkChanged', function (netVer) {
    if (netVer != String(targetChainId)) {
      changeNetwork(targetChainId)
    }
})
=======
ethereum.autoRefreshOnNetworkChange = false; 
//只有 这个属性为false，networkChanged 才会被使用
function networkChangedAssign(fnc) {
    ethereum.on('networkChanged', function (netVer) {
        fnc(netVer)
    })
};
>>>>>>> wangminqi/atta-web-ui-patch-1
