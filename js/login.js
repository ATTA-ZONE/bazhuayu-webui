

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
			$.ajax({
				url:base_url+'/v2/user/login/email',
				type: 'POST',
				contentType: 'application/json',
				dataType: 'json',
				data:JSON.stringify(data),
				success:function(res){
					if(res.code==0){
						success('登入成功',1800);
						setTimeout(function(){
							if(url!=''){
								window.location.href = 'index.html'
							}else{
								window.location.href = document.referrer;
							}
						},1800);
					}else{
						console.log(res)
						tips('郵箱或密碼錯誤');
					}
				}
			})
		}
		
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})