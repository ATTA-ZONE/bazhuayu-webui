$(function(){ 
	
	var canClick = false;
	
	$('.sign-input input').on('input',function(){
		var newPwd = $('#pwd').val().trim();
		var repeatPwd = $('#newPwd').val().trim();
		
		if(newPwd!=''&& repeatPwd!=''){
			$('.sign-btn .sign-btn-register button').addClass('register-check');
		}else{
			$('.sign-btn .sign-btn-register button').removeClass('register-check');
		}
		
	});
	
	$('.sign-btn .sign-btn-register button').on('click',function(){ 
		var newPwd = $('#pwd').val().trim();
		var repeatPwd = $('#newPwd').val().trim();
		var url = window.location.search.substr(1);
		url = url.split('&');
		var newArr = [];
		var token,code;
		for(var i = 0; i < url.length; i++){
			newArr.push(url[i].split('='))
		};
		// console.log(newArr);
		$.each(newArr,function(i,v){
			if(v[0]=='token'){
				token = v[1];
			}
			if(v[0]=='code'){
				code = v[1];
			}
		});
		// console.log(token)
		// console.log(code)
		
		if(newPwd == ''){
			tips('密碼不能為空');
			canClick = false;
			
		}else if(newPwd.length < 6){
			tips('密碼長度不能低於6');
			canClick = false;
			
		}else if(newPwd != repeatPwd){
			tips('兩次密碼不相等');
			canClick = false;
		}else{
			canClick = true;
		}
		
		if(canClick){
			$.ajax({
				type:"post",
				url:"/v2/user/password/email/change",
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify({
					token:token,
					code:code,
					password:newPwd
				}),
				success:function(res){
					if(res.code == 0){
						success('修改成功');
						setTimeout(function(){
							window.location.href = '/mobile/tc/login.html';
						},1500)
					}else{
						console.log("失敗")
					}
				},
				error:function(err){
			
				},
			})
		};
		
	});
}) 

