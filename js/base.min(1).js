!function(W){
	W.isFunction=function(a){return "function"===typeof(a)};
	W.isArray=Array.isArray;
	// W.conf={'dev':top.location.origin,'test':'https://test.wah.art','prod':'https://fmg.art',1:'https://fmg.art',56:'https://bsc.fmg.art'};
	// W.conf={'dev':top.location.origin,'test':'http://superguy021.vicp.cc:8866','prod':'http://superguy021.vicp.cc:8866',1:'http://superguy021.vicp.cc:8866',56:'http://superguy021.vicp.cc:8866',97:'http://superguy021.vicp.cc:8866'};  //测试
	W.conf={'dev':top.location.origin,'test':'https://www.bazhuayu.io','prod':'https://www.bazhuayu.io',1:'https://www.bazhuayu.io',56:'https://www.bazhuayu.io',97:'http://47.118.74.48:8081'};
	
	W.production=document.getElementById('base-min').getAttribute('data-mode');
	W.debug=true;//(production==='dev');
	W.BASE_URL=window.conf[production];
	W.location.params=function(){var q=location.search,p={};if(q.length>0){q=q.substring(1).split('&');for(var i=0;i<q.length;i++){var a=q[i],b=a.indexOf('='),k=a.substring(0,b);p[k]=a.substring(b+1)}}return p};location.query=function(a,d){var c=W.location.search.substr(1),b=c.match(new RegExp("(^|&)"+a+"=([^&]*)(&|$)"));if(d){return(b==null?null:b[2])}else{return(b==null?null:unescape(b[2]))}};
	W.loadJS=function(url,cb){if(!url){cb&&cb();return}var js=document.createElement('script');js.type='text/javascript';if(js.readyState){js.onreadystatechange=function(){if(js.readyState=='loaded'||js.readyState=='complete'){js.onreadystatechange=null,cb&&cb()}}}else{js.onload=cb}js.src=url;document.getElementsByTagName('head')[0].appendChild(js)};
	W.cookie=function(k,v,o,path,domain,secure){if(typeof(v)=='undefined'&&typeof(o)=='undefined'){var a=k+"=";if(document.cookie.length>0){offset=document.cookie.indexOf(a);if(offset>-1){offset+=a.length;end=document.cookie.indexOf(";",offset);if(end==-1){end=document.cookie.length}return unescape(document.cookie.substring(offset,end))}}return''}if(v==null||v.length==0||v==0){var exp=new Date();exp.setTime(exp.getTime()-1000);document.cookie=[k,'=; expires=',exp.toGMTString()].join('');return}var os=(typeof(o)=='object'?o:({expires:o})),df={expires:'',path:path,domain:domain,secure:secure},c=[k,'=',escape(v)];for(var k in df)if(!os[k])os[k]=df[k];if(os.expires){var date=new Date();if(typeof(os.expires)=='number'){date.setTime(date.getTime()+(os.expires*24*60*60*1000))}else if(typeof(os.expires)=='object'){if(os.expires.year)date.setFullYear(date.getFullYear()+os.expires.year);if(os.expires.month)date.setMonth(date.getMonth()+os.expires.month+1);if(os.expires.day)date.setDate(date.getDate()+os.expires.day);if(os.expires.hour)date.setHours(date.getHours()+os.expires.hour)}c.push(';expires='+date.toGMTString())}if(os.path)c.push('; path='+os.path);if(os.domain)c.push('; domain='+os.domain);if(os.secure)c.push('; secure');document.cookie=c.join('')};
	W.CHAIN={
		VERSION:'20210406',
		WALLET:{
			// ETH
			1:'0x46DC38E5d685b092f88242a01b5e747311b8801f', //这里是 以太网正式网 的收款地址， chainId 1
			// BSC
			56:'0x4e1bdef49312651d2ccbddd23fb9169771ef285e', //这里是 BSC正式网的收款地址, chainId 56,
			97:'0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',  //测试
			__wallet__:"__wallet__",
			walletAddress:function(){
				var th=this,t=cookie(th.__wallet__),wallet=th[t];
				return localStorage.getItem(this.__wallet__)||wallet.accounts()
			},
			init:function(){
				var th=this,t=cookie(th.__wallet__),wallet=th[t];
				if(wallet){
					wallet.events();
					if(window.Web3) window.web3=new Web3(wallet.provider())
				}
			},
			auth:function(c,f){
				var th=this,t=cookie(th.__wallet__),wallet=th[t];
				if(wallet){
					if(wallet.isConnected()&&wallet.isUnlocked()){
						// 已连接需要怎么处理
						c&&c(wallet.provider(),th.walletAddress())
					}else{
						// 未连接需要怎么处理
						wallet.connect(c)
					}
				}else{
					if(!f&&top.location.pathname!=='/wallet.html')
						top.location.href='/wallet.html'
				}
			},
			connect:function(t,c){
				var th=this,wallet=th[t];
				if(wallet){
					wallet.connect(c)
				}else{
				}
			},
			disconnect:function(f){
				var r=this.__wallet__;
				localStorage.removeItem(r),cookie(r,null),cookie('TOKEN',null),localStorage.removeItem('walletconnect');
				if(f)top.location.reload();
			},
			handleAccountsChanged:function(accounts,c){
				walletId = accounts;
				var addr=accounts[0].toLocaleLowerCase();
				localStorage.setItem(this.__wallet__,addr);
				window.setTimeout(function(){
					//绑定钱包
					$.ajax({
						url:'/v2/user/wallet/bind',
						type:'POST',
						contentType:'application/json',
						dataType:'json',
						data:JSON.stringify({
							address:addr,
							walletType:'TOKEN POCKET'
						}),
						success:function(res){
							if(res.code==0){
								// document.cookie="isConnect=true";
								setCookie('isConnect',true)
								if (c) {
									c();
								}else{
									window.location.href = document.referrer;
								}
							}else{
								tips(res.message)
							}
						}
					});
					// axios.get(['/api/user/loginByWallet/', addr, '?coin=0'].join('')).then(function(data) {
					// 	if(data.message=='OK'&&data.errCode=='OK'){
					// 		if(top.location.pathname==='/wallet.html'){
					// 			top.location.href='/'
					// 		}else{
					// 			top.location.reload()
					// 		}
					// 	}else{
					// 		alert(data.message)
					// 	}
			  //   	});
			  
					
					
				},500);
			},
			handleChainChanged:function(chainId,c){
				if(typeof(chainId)==='number')chainId=chainId.toFixed(0);
				var code=chainId,address=CHAIN.WALLET.walletAddress();
				if(chainId.indexOf('0x')>=0)code=parseInt(chainId.substring(2),16);
				if (!address || address.length == 0) {
					alert('Failed to query wallet address, please try again.')
					return;
				}
				if(production==='prod'){
				    var url = window.conf[code];
				    // if(url == top.location.origin){
						// if(top.location.pathname==='/wallet.html'){
						// 	CHAIN.WALLET.handleAccountsChanged([address])
						// }else{
						// 	top.location.reload()
						// }
						if(top.location.pathname==='/mobile/tc/connectWallet.html'){
							CHAIN.WALLET.handleAccountsChanged([address],c)
						}else{
							top.location.reload()
						}
				    // }else{
					//     // top.location.href=[url,'/jump/',address].join('')
					//     // top.location.href=[url,'/jump/',address].join('')
				    // }
				}else{
					// top.location.href=[window.BASE_URL,'/jump/',address].join('')
				}
			},
			// MetaMask:{
			// 	name:'MetaMask',
			// 	isConnected:function(){
			// 		return window.ethereum&&window.ethereum.isConnected()
			// 	},
			// 	isUnlocked:function(){
			// 		return window.ethereum&&window.ethereum.selectedAddress;
			// 	},
			// 	provider:function(){
			// 		return window.ethereum
			// 	},
			// 	events:function(){
			// 		var p=this.provider();
			// 		p.autoRefreshOnNetworkChange=false;
			// 		p.on('accountsChanged', CHAIN.WALLET.handleAccountsChanged);
			// 		p.on('chainChanged', CHAIN.WALLET.handleChainChanged);
			// 	},
			// 	accounts:function(){
			// 		return ethereum.selectedAddress;
			// 	},
			// 	connect:function(c){
			// 		var th=this,eth=this.provider();
			// 		if (eth) {
			// 			var CB=function(){
			// 				if(c){
			// 					c(eth,addr,eth.networkVersion)
			// 				}else{
			// 					CHAIN.WALLET.handleChainChanged(eth.networkVersion)
			// 				}
			// 			};
			// 			eth.enable().then(function(accounts){
			// 				var wallet=CHAIN.WALLET.__wallet__,addr=accounts[0].toLocaleLowerCase();
			// 				localStorage.setItem(wallet,addr),cookie(wallet,th.name,1000,'/','.fmg.art');
			// 				// 如果在BSC网站上登录的不是BSC网络，需要提示用户切换网络状态
			// 				if(top.location.host==='bsc.fmg.art'&&eth.networkVersion!='56'){
			// 					window.ethereum.request({
			// 						method:'wallet_addEthereumChain',
			// 						params:[
			// 							{
			// 			                    chainId:'0x38',chainName:'Binance Smart Chain Mainnet',     //如果是切换测试网 就 填 测试网 的RPC配置
			// 			                    nativeCurrency:{name:'BNB',symbol:'bnb',decimals:18},
			// 			                    rpcUrls:["https://bsc-dataseed1.ninicoin.io","https://bsc-dataseed1.defibit.io","https://bsc-dataseed.binance.org"],
			// 								blockExplorerUrls:['https://bscscan.com/']
			// 							}
			// 						]
			// 					}).then(function(){
			// 						CB()
			// 					}).catch(function(ex){
			// 						CB()
			// 					})
			// 				}else{
			// 					CB()
			// 				}
			// 			}).catch(function(er){
			// 				alert(er.message);
			// 			})
			// 		} else {
			// 		}
			// 	}
			// },
			WalletConnect:{
				name:'WalletConnect',
				INFURA_ID:'09a66faa902543c2ad9aa695b0a3a30e',  //这个id免费申请的，infura上随便用
				BRIDGE_API:'https://bridge.walletconnect.org',
				__provider:null,
				isConnected:function(){
					return this.provider().connected
				},
				isUnlocked:function(){
					return this.provider().accounts.length>0;
				},
				provider:function(){
					if(!this.__provider){
						const WalletConnectProvider = window.WalletConnectProvider.default;
						this.__provider = new WalletConnectProvider({ infuraId:this.INFURA_ID, bridge:this.BRIDGE_API });
					}
					return this.__provider;
				},
				accounts:function(){
					return this.provider().accounts[0];
				},
				events:function(){
					var th=this,p=th.provider();
					// p.on('accountsChanged', CHAIN.WALLET.handleAccountsChanged);
					// p.on('chainChanged', CHAIN.WALLET.handleChainChanged);
					p.on("disconnect", (code, reason) => {
						th.__provider=null;
					});
				},
				connect:function(c){
					var th=this,provider=th.provider();
					provider.chainId=null;
					provider.enable().then(function(accounts){
						var wallet=CHAIN.WALLET.__wallet__,addr=accounts[0].toLocaleLowerCase();
						localStorage.setItem(wallet,addr),cookie(wallet,th.name,1000,'/','index.html');
						// if(c){
						// 	c(provider,addr,provider.chainId)
						// }else{
							CHAIN.WALLET.handleChainChanged(provider.chainId,c);
						// }
					}).catch(function(er) {
						if(er.message==='User closed modal'){
							th.__provider=null;
							return;
						}
			            alert(er.message)
			        })
				}
			},
		},USDT:{
			WEI:1000000,
			decimals:6,
			1:'0xdac17f958d2ee523a2206206994597c13d831ec7', //以太正式网
			56:''                          //BSC正式网
		},FMG:{
			WEI:1000000000000000000,   //FMG是18位
			decimals:18,
			1:'0x2991341D28Eaea277785D20e1d878D478c7bA4C7',
			56:'0x72A167C9783b7d4fFf91d43A60e00D25957A50f8'
		},BEL:{
			WEI:1000000000000000000,   //BEL是18位
			decimals:18,
			1:'0xa91ac63d040deb1b7a5e4d4134ad23eb0ba07e14',
			56:''
		},__at:{},
		invoke:function(){
			// m=fmg.balanceOf  类型.方法名，合约地址默认为 0
			// m=fmg.0.balanceOf  类型.合约地址.方法名
			var args=[],l=arguments.length,m=arguments[0],ms=m.split('.'),A=ms[0],B=ms[1],I=0,CN,CB,CD;
			if(ms.length>2)I=ms[1],B=ms[2];
			for(var i=1;i<l;i++){
				if(isFunction(arguments[i])){
					CB=arguments[i],CN=CB.name,CD=CB.data;
				}else{
					args.push(arguments[i]);
				}
			};
			var X=[A,I].join('.'),M='methods',C=function(){
				var c=CHAIN.__at[X][M][B];
				c.apply(c,args)[CN||"call"]((CD||{from:CHAIN.WALLET.walletAddress()}), CB);
			};
			if (CHAIN.__at&&CHAIN.__at[X]) {
				C()
			} else {
				axios.get([window.BASE_URL,'/api/contract/abi/abi_v2_',A,'.jsonp?v=', CHAIN.VERSION].join('')).then(function(conf){
					var abi=conf['abi'],contract=conf['contract'][I];
					CHAIN.__at[X]= new web3.eth.Contract(abi, contract);
					C()
				})
			}
		}
	};
	W.CHAIN.WALLET.init()
}(window);

loadJS(window.axios?null:'https://unpkg.com/axios/dist/axios.min.js?v=0.21.1',function(){
	// 添加请求拦截器
	axios.interceptors.request.use(function(config) {
	    // 在发送请求之前做些什么
	    return config;
	}, function (error) {
	    // 对请求错误做些什么
	    return Promise.reject(error);
	});
	// 添加响应拦截器
	axios.interceptors.response.use(function(response) {
	    // 对响应数据做点什么
		var data=response.data;
		if (data['errCode'] && data.errCode==='sign.code100001') {
			alert(data.message);
			top.location.href='/index.html';
			return;
		}
	    return data;
	}, function (error) {
	    // 对响应错误做点什么
	    return Promise.reject(error);
	});
});