if (window.location.href.indexOf('bazhuayu.io') == -1) {
    var targetChainId = 97
} else {
    var targetChainId = 56
}

function getWeb3() {
	return new Web3(window.ethereum); // web3js就是你需要的web3实例
}

function getEth() {
	return getWeb3().eth;
}

// 监听账户变更事件
function accountsChanged(fnc) {
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
      rpcUrls: RPCSetting[status].RPC_URL,
      blockExplorerUrls: RPCSetting[status].ETHERSCAN_URL
    }]
  });
}

// 监听网络变更事件
ethereum.autoRefreshOnNetworkChange = false;

ethereum.on('networkChanged', function (netVer) {
    if (netVer != targetChainId.toString()) {
      changeNetwork(targetChainId)
    }
}

});