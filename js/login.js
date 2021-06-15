var indexText = chEnText.login[lang];
function loginconfirm(vtoken){
	hsycms.confirm('confirm',indexText.emailMgs,
		function(res){            
			hsycms.success('success',indexText.confirm);
			setTimeout(function(){
				window.location.href = 'verificationCode.html?vtoken='+vtoken;
			},1500)
		},
		function(res){
			hsycms.error('error',indexText.cancel);
		},
	)
};

//登录
function logIn(data,url){
	$.ajax({
		url:base_url+'/v2/user/login/email',
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data:JSON.stringify(data),
		success:function(res){
			console.log(res)
			if(res.code==0){
				if(res.data.verified==1){
					setCookie('islogin',true);
					success(indexText.logSuc,1800);
					setTimeout(function(){
						if(url!=''){
							window.location.href = 'index.html'
						}else{
							window.location.href = document.referrer;
						}
					},1800);
				};
				
				if(res.data.verified==0){
					// tips('該郵箱已被注册，但未驗證');
					// setTimeout(function(){
					loginconfirm(res.data.verifiedToken);
					// },1500);
				}
				
			}else{
				// console.log(res)
				tips(indexText.logErr);
			}
		}
	});
}


$(function(){
	
	var url = window.location.search;	
	$('.form-btn-signin').on('click',function(){
		var isClick = false;
		var email = $('#email').val().trim();
		var password = $('#pwd').val().trim();
		var data = {
			email,
			password
		};
		
		if(email==''||password==""){
			tips(indexText.dataErr);
			isClick = false;
		}else{
			isClick = true;
		}
		
		if(isClick){
			logIn(data,url);
		}
		
	})
	
	
	
	
	$('.form-ipt input').on('keydown',function(e){
		
		if(e.keyCode==13){
			var email = $('#email').val().trim();
			var password = $('#pwd').val().trim();
			var data = {
				email,
				password
			};
			if(email==''||password==""){
				tips(indexText.dataErr);
				isClick = false;
			}else{
				isClick = true;
			};
			
			if(isClick){
				logIn(data,url);
			}
		}
	})
})