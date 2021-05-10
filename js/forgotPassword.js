
//邮箱格式验证
function emailCheck(email){
	var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
	var isEmail = false;
	if(reg.test(email)){
		isEmail = true;
	}else{
		isEmail = false;
	}
	return isEmail;
}

$(function(){
	$('.sign-btn .sign-btn-register button').on('click',function(){
		var email = $('#email').val().trim();//邮箱格式
		var isEmail = emailCheck(email);    //邮箱格式
		if(isEmail != false){
			$.ajax({
				url:base_url+'/v2/user/password/email/forget',
				type:'POST',
				contentType: 'application/json',
				data:JSON.stringify({email:email}), 
				success:function(){
					success("驗證已發送到郵箱",1800);
					setTimeout(function(){
						window.location.href = "index.html";
					},2000);
				}
			})
		}else{
			console.log("郵箱格式錯誤")
		}
	})
})




