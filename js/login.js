

function confirm(vtoken){
	hsycms.confirm('confirm','該郵箱已被注册，但未驗證，去驗證郵箱',
		function(res){            
			hsycms.success('success','確認');
			setTimeout(function(){
				window.location.href = 'verificationCode.html?vtoken='+vtoken;
			},1500)
		},
		function(res){
			hsycms.error('error','取消');
		},
	)
};

//登录
function logIn(data){
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
					success('登入成功',1800);
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
					confirm(res.data.verifiedToken);
					// },1500);
				}
				
			}else{
				// console.log(res)
				tips('郵箱或密碼錯誤');
			}
		}
	});
}


$(function(){
	
	var url = window.location.search;
	console.log(url)
	
	$('.form-btn-signin').on('click',function(){
		var isClick = false;
		var email = $('#email').val().trim();
		var password = $('#pwd').val().trim();
		var data = {
			email,
			password
		};
		
		if(email==''||password==""){
			tips('郵箱或密碼不能為空');
			isClick = false;
		}else{
			isClick = true;
		}
		
		if(isClick){
			logIn(data);
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
				tips('郵箱或密碼不能為空');
				isClick = false;
			}else{
				isClick = true;
			};
			
			if(isClick){
				logIn(data);
			}
		}
	})
	
	
	
	
	
	
	
	
	
	
	
})