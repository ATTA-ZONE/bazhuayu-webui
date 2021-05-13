var RPCSetting = 
        {
            1:     // 以太坊 正式 主网络
                {
                    'CHAIN_NAME': 'ETH_MAINNET',
                    'RPC_URL': "https://mainnet.infura.io/v3/675a2550ac6f4006b7e60def6ad44923",
                    'CHAIN_ID': 1,
                    'CHAIN_ID_HEX': '0x1',
                    'SYMBOL': 'ETH',
                    'ETHERSCAN_URL': 'https://etherscan.io'
                },
            3:     //  以太坊 ROPSTEN 测试 网络
                {
                    'CHAIN_NAME': 'ETH_ROPSTEN',
                    'RPC_URL': "https://ropsten.infura.io/v3/675a2550ac6f4006b7e60def6ad44923",
                    'CHAIN_ID': 3,
                    'CHAIN_ID_HEX': '0x3',
                    'SYMBOL': 'ETH',
                    'ETHERSCAN_URL': 'https://ropsten.etherscan.io'
                },
            4:     //  以太坊 RINKEBY 测试 网络
                {
                    'CHAIN_NAME': 'ETH_RINKEBY',
                    'RPC_URL': "https://rinkeby.infura.io/v3/675a2550ac6f4006b7e60def6ad44923",
                    'CHAIN_ID': 4,
                    'CHAIN_ID_HEX': '0x4',
                    'SYMBOL': 'ETH',
                    'ETHERSCAN_URL': 'https://rinkeby.etherscan.io'
                },
            56:     //  BSC 正式 主网络
                {
                    'CHAIN_NAME': 'BSC_MAINNET',
                    'RPC_URL': "https://bsc-dataseed1.ninicoin.io",
                    'CHAIN_ID': 56,
                    'CHAIN_ID_HEX': '0x38',
                    'SYMBOL': 'BNB',
                    'ETHERSCAN_URL': 'https://bscscan.com'
                },
            97:     //  BSC 测试 网络
                {
                    'CHAIN_NAME': 'BSC_TESTNET',
                    'RPC_URL': "https://data-seed-prebsc-2-s3.binance.org:8545",
                    'CHAIN_ID': 97,
                    'CHAIN_ID_HEX': '0x61',
                    'SYMBOL': 'BNB',
                    'ETHERSCAN_URL': 'https://testnet.bscscan.com'
                },
            128:    //  火币HECO 正式 网络
                {
                    'CHAIN_NAME': 'HECO_MAINNET',
                    'RPC_URL': "https://http-mainnet-node.huobichain.com",
                    'CHAIN_ID': 128,
                    'CHAIN_ID_HEX': '0x80',
                    'SYMBOL': 'HT',
                    'ETHERSCAN_URL': 'https://scan.hecochain.com'
                },
            256:    //  火币HECO 测试 网络
                {
                    'CHAIN_NAME': 'HECO_TESTNET',
                    'RPC_URL': "https://http-testnet.hecochain.com",
                    'CHAIN_ID': 256,
                    'CHAIN_ID_HEX': '0x100',
                    'SYMBOL': 'HT',
                    'ETHERSCAN_URL': 'https://scan-testnet.hecochain.com'
                },

        }



apiKey = '9GRF9Q9HT18PBCHQQD84N7U2MGC6I1NE27'

c_auction = {
    'proxy': '',
    'abi': c_auction_abi,
    97:  //  BSC 测试 网络
        {
            'address': '0x6A2E6042DF6FDCdA84A45531C892b644b095E2b4'
        },
    56:  //  BSC 正式 主网络
        {
            'address': '0x26455c075eAD85015cbA283731db78d5E80615fF',
        }
};

c_ERC20_BUSD = {
    'proxy': '',
    'abi': c_ERC20_abi,
    97:  //  BSC 测试 网络
        {
            'decimals': 18,
            'address': '0x65aF2dcE9694393496EE7568eeE92660116D5ae6',
        },
    56:  //  BSC 正式 主网络
        {
            'decimals': 18,
            'address': '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        }
};


