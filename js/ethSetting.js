var ethContractSetting = {
    'eth_ERC20': {
        'proxy': '',
        'interfaceType': 'ERC20',
        'abi': eth_abi,
        4: //  ETH 测试 网络
        {
            'symbol': 'ETH',
            'decimals': 1,
            'address': '0xb1df7f386fee2f014c805dd52429146adf77b614',
        },
        1: //  ETH 正式 主网络
        {
            'symbol': 'ETH',
            'decimals': 11,
            'address': '0x38a964dcc43e828faed37eff1960197ebe273205',
        }
    },
    'eth_NFT': {
        'proxy': '',
        'interfaceType': 'ERC20',
        'abi': eth_abi,
        4: //  ETH 测试 网络
        {
            'symbol': 'ETH',
            'decimals': 1,
            'address': '0x68BDC2fE82a1569163a382BFB8cdCD31eceC6fD2',
        },
        1: //  ETH 正式 主网络
        {
            'symbol': 'ETH',
            'decimals': 11,
            'address': '0x102F272aFA9b5f79429f4BAf9AdFB4087D78c1DC',
        }
    }
}