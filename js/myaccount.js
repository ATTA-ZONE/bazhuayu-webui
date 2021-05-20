
var tximg = "./images/Ellipse 93.png";

$(function(){
	
	// 用户信息
	$.ajax({
		url:base_url+'/v2/user/account',
		success:function(res){
			if(res.code==0){
				$('.my-account-name').text(res.data.name);
				
				if(res.data.headIcon != null && res.data.headIcon != ''){
					$('.my-account-left-img img').attr('src',base_url+res.data.headIcon);
					tximg = res.data.headIcon ? base_url+res.data.headIcon : "./images/Ellipse 93.png";
				}
				if(res.data.mobile!=null && res.data.mobile!=''){
					$('.my-account-phone').text(res.data.mobile);
				}
				$('.my-account-email').text(res.data.email);
			}
		}
	});
	
	
	$("#changeName").click(function(){
		var oName=$(".my-account-name").text();
		$(".modify-ipt-tit").text(`當前暱稱：`+oName);
	});
	
	
	$(".modify-btn-active").click(function(){
		
		var exchange = $(".modify-tit").data('type'); //获取修改内容标题
		var newName = $(".modify-ipt-add input").val();//获取输入的新昵称
		var oldPwd =$(".oldPwd").val();//获取输入的原密码
		var newPwd = $(".newPwd").val();//获取输入的新密码
		var repeatPwd = $(".repeatPwd").val();//获取确认输入的新密码
		
		if(exchange == "name"){//修改昵称
			if(newName ==""){
				tips("昵稱不能為空")
			}else{
				$.ajax({
					type:"post",
					url:"/user/update",
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify({
						nickName:newName,
					}),
					success:function(res){
						window.location.reload()
					},
					error:function(err){
						window.location.reload()
					}
				});
			}
			
		} else if (exchange == "pwd"){//修改密码
			
			if(newPwd.length <=5){
				$(".newPwd-message").css("display","block")
			} else if (repeatPwd != newPwd){
				$(".newPwd-message").css("display","none")
				$(".repeatPwd-message").css("display","block")	
			}  else {
				$.ajax({
					type:"post",
					url:"/v2/user/password/change",
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify({
						curPassword:oldPwd,
						newPassword:repeatPwd
					}),
					success:function(res){
						if(res.code == 0){
							success('修改成功');
							setTimeout(function(){
								window.location.href = 'login.html';
							},1500)
						}else{
							$(".newPwd-message").css("display","none")
							$(".repeatPwd-message").css("display","none")	
							$(".oldPwd-message").css("display","block")
						}
					},
					
					error:function(err){
					}
				});
				
			} 
			
			
		} else {//其他修改
			console.log("准备修改其他")
		}

	});
	
//	修改图像
	
	
	
	
})