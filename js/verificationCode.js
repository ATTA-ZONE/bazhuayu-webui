	
var url = window.location.search.split('=')[1];

function reSend(){
	var verifiedToken = url;
	$.ajax({
		url:base_url+'/v2/user/email/reg/resend',
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data:JSON.stringify({
			verifiedToken:verifiedToken
		}),
		success:function(res){
			console.log(res)
			if(res.code==0){
				success('發送成功',1800);
			}
		}
	})
}

$(function(){
	
	
	$('#code').on('input',function(){
		var emailRegValidateCode = $(this).val().trim();
		if(emailRegValidateCode!=''){
			$('.sign-btn .sign-btn-register button').addClass('register-check');
			$('.sign-btn .sign-btn-register button').data('click',1);
		}else{
			$('.sign-btn .sign-btn-register button').removeClass('register-check');
			$('.sign-btn .sign-btn-register button').data('click',0);
		}
	});
	
	$('.sign-btn .sign-btn-register button').on('click',function(){
		var isClick = $(this).data('click');
		var emailRegValidateCode = $('#code').val().trim();
		var verifiedToken = url;
		var data = {
			emailRegValidateCode,
			verifiedToken
		}
		
		if(isClick==1){
			$.ajax({
				url:base_url+'/v2/user/reg/email/validate',
				type: 'POST',
				contentType: 'application/json',
				dataType: 'json',
				data:JSON.stringify(data),
				success:function(res){
					console.log(res);
					if(res.code==0){
						success('注册成功',1800);
						setTimeout(function(){
							window.location.href = 'login.html?come=sign';
						},1800);
					}else{
						checkTip($('.sign-check-tip'),res.message);
					}
				}
			})
		}
	})
	
	
	
	
	
	
	
	
	
})