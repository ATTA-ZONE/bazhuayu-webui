var signupText = chEnText.signup[lang];
// 注册类型
var type;
$.ajax({
	url: base_url + '/v2/user/reg/type',
	type: 'POST',
	async: false,
	// contentType: 'application/json',
	dataType: 'json',
	success: function (res) {
		var regType = res.data.regType;
		if (regType == 1) {
			type = 1;
			$(".regType").css("display", "block");
		}
		if (regType == 10) {
			type = 10;
		}
		if (regType == 99) {
			type = 99;
		}
	}
});

function confirm(vtoken) {
	hsycms.confirm('confirm', signupText.verificationEmail,
		function (res) {
			hsycms.success('success', signupText.suc);
			setTimeout(function () {
				window.location.href = 'verificationCode.html?vtoken=' + vtoken;
			}, 1500)
		},
		function (res) {
			hsycms.error('error', signupText.cancel);
		},
	)
};


// 邮箱注册
function emailRegister(data) {
	console.log(data);
	$.ajax({
		url: base_url + '/v2/user/reg/email',
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(data),
		success: function (res) {
			loadingHide();
			
			if (res.code == 0) {
				var token = res.data.verifiedToken;
				setTimeout(function () {
					window.location.href = 'verificationCode.html?vtoken=' + token;
				}, 500)
			} else {
				tips(res.message);
			}
		}
	})
}


//邮箱格式验证
function emailCheck(email) {
	var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
	var isEmail = false;
	if (reg.test(email)) {
		isEmail = true;
	} else {
		isEmail = false;
	}
	return isEmail;
}
function judgepsw(){
	var regExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/
	var pwd = $('#pwd').val().trim();
	var pwd2 = $('#pwd2').val().trim();
	var result1 = regExp.test(pwd)
	var result2 = regExp.test(pwd2)

	if (result1 && pwd) {
		$('.password-icon1').show();
		$('.pswerror').hide();
		$('.password-icon1').attr('src','./images/pass.png')
	} else {
		$('.password-icon1').show();
		$('.pswerror').show();
		$('.password-icon1').attr('src','./images/refuse.png')
	}

	if (result2 && pwd === pwd2) {
		$('.password-icon2').show();
		$('.password-icon2').attr('src','./images/pass.png')
	} else {
		$('.password-icon2').show();
		$('.password-icon2').attr('src','./images/refuse.png')
	}
	toggleLoginStatus()
}

function toggleLoginStatus() {
	var regExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/
	var nickname = $('#nickname').val().trim();
	var email = $('#email').val().trim();
	var pwd = $('#pwd').val().trim();
	var pwd2 = $('#pwd2').val().trim();
	var verifyChecked = $('.sign-check input')[0].checked
	checkTip($('.sign-check-tip'), '');
	checkTip($('.sign-check-tip2'), '');

	var result1 = regExp.test(pwd)
	var result2 = regExp.test(pwd2)

	if (nickname != '' && email != '' && pwd != '' && pwd2 != '' && result1 && result2 && verifyChecked && pwd == pwd2) {
		$('.sign-btn .sign-btn-register button').addClass('register-check');
		$('.sign-btn .sign-btn-register button').data('click', 1);
	} else {
		$('.sign-btn .sign-btn-register button').removeClass('register-check');
		$('.sign-btn .sign-btn-register button').data('click', 0);
	}
}
// 获取地址栏参数
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
$(function () {
	$("#agree").click(function () {
		toggleLoginStatus()
	})

	// 输入框不为空时 可注册 .sign-input p input
	$('.sign-input p #nickname,.sign-input p #email,.sign-input p #regType').on('input', function (e) {
		toggleLoginStatus()
	})

	$('.sign-btn .sign-btn-register button').on('click', function () {
		var isClick = $(this).data('click');
		if (isClick == 1) {
			var email = $('#email').val().trim(); //邮箱格式
			var name = $('#nickname').val().trim(); //昵称
			var password = $('#pwd').val().trim(); //密码
			var password2 = $('#pwd2').val().trim(); //密码
			// var code = $('#regType').val().trim(); //邀請碼
			var code = GetQueryString('code')?GetQueryString('code'):'';
			var platform = 0;

			// var data = {
			// 	email,
			// 	name,
			// 	password,
			// 	platform
			// };

			var isEmail = emailCheck(email); //邮箱格式

			if (isEmail) {
				if (type != 10) {
					if (type == 1) {
						var data = {
							email,
							name,
							password,
							platform,
							code
						};

					} else { //99開放註冊
						var data = {
							email,
							name,
							password,
							platform,
							code
						};
					}
					if (password != password2) {
						checkTip($('.sign-check-tip2'), signupText.tips01);
					} else {
						$.ajax({ //1邀請碼註冊
							url: base_url + '/v2/user/check/email',
							type: 'POST',
							contentType: 'application/json',
							dataType: 'json',
							data: JSON.stringify({
								email: email
							}),
							success: function (res) { 
								var code = res.data.emailStatus;
								if (code == 0) {
									loading();
									emailRegister(data);
									return;
								}
								if (code == 1) {
									checkTip($('.sign-check-tip'), signupText.tips02);

									// tips('該郵箱已被注册，但未驗證');
									// setTimeout(function(){
									// 	confirm(res.data.verifiedToken);
									// },1500);
									return;
								}
								if (code == 2) {
									checkTip($('.sign-check-tip'), signupText.tips03)
									return;
								}

							}
						});
					}


				} else {
					checkTip($('.sign-check-tip'), signupText.tips04);
				}


			} else {
				checkTip($('.sign-check-tip'), signupText.tips05);
			}

		}
	})

})