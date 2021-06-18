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
                    'RPC_URL': "https://data-seed-prebsc-1-s2.binance.org:8545/",
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

var contractSetting = {
    'auction_contract': {
        'proxy': '',
        'interfaceType': '',
        'abi': c_auction_abi,
        97:  //  BSC 测试 网络
            {
                'address': '0x6A2E6042DF6FDCdA84A45531C892b644b095E2b4'
            },
        56:  //  BSC 正式 主网络
            {
                'address': '0x26455c075eAD85015cbA283731db78d5E80615fF',
            }
    },
    'busd_ERC20': {
        'proxy': '',
        'interfaceType': 'ERC20',
        'abi': c_ERC20_abi,
        97:  //  BSC 测试 网络
            {
                'symbol': 'BUSD',
                'decimals': 18,
                'address': '0x65aF2dcE9694393496EE7568eeE92660116D5ae6',
            },
        56:  //  BSC 正式 主网络
            {
                'symbol': 'BUSD',
                'decimals': 18,
                'address': '0xe9e7cea3dedca5984780bafc599bd69add087d56',
            }
    },
    'atta_ERC721': {
        'proxy': '',
        'abi': c_ERC721_abi,
        56:
            {
                'owner_id': 17,
                'address': '0x2400714597e7B850e31e09eC71f0A1e48780d4f2'
            },
        97:
            {
                'owner_id': 1,
                'address': '0x790575dcE4E68e5e3c4508DB0293EE2A9ab890a7'
            },
        
    },
    'vending_machine': {
        'proxy': '',
        'abi': c_vendingMachine_abi,
        56:
            {
                'owner_id': '',
                'address': ''
            },
        97:
            {
                'owner_id': 1,
                'address': '0x5dE6ed56ED3Eba9769e3768F31966634386F18B1'
            },
    },
    'atta_ERC1155_Airdrop' : {
        'proxy': None,
        'abi': c_atta_ERC1155_Airdrop_abi,
        56:
            {
                'owner_id': '',
                'address': ''
            },
        97:
            {
                'owner_id': 1,
                'address': '0xD752fc21081f154cC7d34f08aA57929A6f18B1Fe'
            }
    },
    
    'atta_ERC1155_Airdrop_MerkleProof' : {
        'proxy': None,
        'abi': c_atta_ERC1155_Airdrop_MerkleProof_abi,
        56:
            {
                'owner_id': '',
                'address': ''
            },
        97:
            {
                'owner_id': 1,
                'address': '0xFe27452f8639Ad0B41D99E919C80B601A42D6880'
            }
    }
}


