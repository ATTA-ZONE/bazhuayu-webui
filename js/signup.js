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
	hsycms.confirm('confirm', '去驗證郵箱',
		function (res) {
			hsycms.success('success', '成功');
			setTimeout(function () {
				window.location.href = 'verificationCode.html?vtoken=' + vtoken;
			}, 1500)
		},
		function (res) {
			hsycms.error('error', '取消');
		},
	)
};


// 邮箱注册
function emailRegister(data) {
	$.ajax({
		url: base_url + '/v2/user/reg/email',
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(data),
		success: function (res) {
			loadingHide();
			console.log(res);
			// console.log(data)
			if (res.code == 0) {
				var token = res.data.verifiedToken;
				setTimeout(function () {
					window.location.href = 'verificationCode.html?vtoken=' + token;
				}, 500)
			} else {
				tips(res.message);
				// console.log(res);
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

function toggleLoginStatus() {
	var nickname = $('#nickname').val().trim();
	var email = $('#email').val().trim();
	var pwd = $('#pwd').val().trim();
	var pwd2 = $('#pwd2').val().trim();
	checkTip($('.sign-check-tip'), '');
	checkTip($('.sign-check-tip2'), '');

	var regExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/
	var result = regExp.test(pwd) && regExp.test(pwd2)
	if (nickname != '' && email != '' && pwd != '' && pwd2 != '' && result) {
		$('.sign-btn .sign-btn-register button').addClass('register-check');
		$('.sign-btn .sign-btn-register button').data('click', 1);
	} else {
		$('.sign-btn .sign-btn-register button').removeClass('register-check');
		$('.sign-btn .sign-btn-register button').data('click', 0);
	}
}

$(function () {
	$("#agree").click(function () {
		toggleLoginStatus()
	})
	// 输入框不为空时 可注册
	$('.sign-input p input').on('input', function () {


		toggleLoginStatus()
	})

	$('.sign-btn .sign-btn-register button').on('click', function () {
		var isClick = $(this).data('click');
		if (isClick == 1) {
			var email = $('#email').val().trim(); //邮箱格式
			var name = $('#nickname').val().trim(); //昵称
			var password = $('#pwd').val().trim(); //密码
			var password2 = $('#pwd2').val().trim(); //密码
			var code = $('#regType').val().trim(); //邀請碼
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
							platform
						};
					}
					if (password != password2) {
						checkTip($('.sign-check-tip2'), '密码请输入一致');
					} else {
						$.ajax({ //1邀請碼註冊
							url: base_url + '/v2/user/check/email',
							type: 'POST',
							contentType: 'application/json',
							dataType: 'json',
							data: JSON.stringify({
								email: email
							}),
							success: function (res) { // console.log(res);
								// console.log(res.data.code)//邀請碼
								// var inviteCode = res.data.code;
								var code = res.data.emailStatus;
								// console.log(code)
								if (code == 0) {
									loading();
									emailRegister(data);
									return;
								}
								if (code == 1) {
									checkTip($('.sign-check-tip'), '該郵箱已被注册，但未驗證');

									// tips('該郵箱已被注册，但未驗證');
									// setTimeout(function(){
									// 	confirm(res.data.verifiedToken);
									// },1500);
									return;
								}
								if (code == 2) {
									checkTip($('.sign-check-tip'), '該郵箱已被注册，請嘗試換一個郵箱')
									return;
								}

							}
						});
					}


				} else {
					checkTip($('.sign-check-tip'), '當前禁止註冊');
				}


			} else {
				checkTip($('.sign-check-tip'), '郵箱格式不正確');
			}

		}
	})

})