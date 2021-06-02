//banner progress
var t1,t2,t3,t4;
function progress(second){
	t1 = setInterval(function(){
		if($('.progress-active').next().length==1){
			$('.progress-active').next().addClass('progress-active');
			$('.progress-active:first').removeClass('progress-active');
			
			
		}else if($('.progress-active').next().length==0){
			$('.banner-left-progress div').removeClass('progress-active');
			$('.banner-left-progress div:first').addClass('progress-active');
		}

	},second);
	
	t2 = setInterval(function(){
		if($('.banner-left ul .active').next().length==1){
			$('.banner-left ul .active').next().addClass('active');
			$('.banner-left ul .active:first').removeClass('active');
		}else if($('.banner-left ul .active').next().length==0){
			$('.banner-left ul li').removeClass('active');
			$('.banner-left ul li:first').addClass('active');
		}
	},second);
	
	t3 = setInterval(function(){
		if($('.banner-right ul .active').next().length==1){
			$('.banner-right ul .active').next().click();
		}else if($('.banner-right ul .active').next().length==0){
			$('.banner-right ul li:first').click();
		}
	},second);
	
	
	t4 = setInterval(function(){
		if($('.progress-active1').next().length==1){
			$('.progress-active1').next().addClass('progress-active1');
			$('.progress-active1:first').removeClass('progress-active1');
			
			
		}else if($('.progress-active1').next().length==0){
			$('.banner-left-progress1 div').removeClass('progress-active1');
			$('.banner-left-progress1 div:first').addClass('progress-active1');
		}
	
	},second);
}


// 切换bannner
function toggleBanner(obj){
	var index = $(obj).index();
	$('.banner-left ul li').removeClass('active');
	$(obj).addClass('active');
	
	$('.banner-left-progress div').removeClass('progress-active');
	$('.banner-left-progress div').eq(index).addClass('progress-active');
	$('.banner-left-progress1 div').removeClass('progress-active1');
	$('.banner-left-progress1 div').eq(index).addClass('progress-active1');
	
	$('.banner-right ul li').eq(index).click();
	
	clearInterval(t1)
	clearInterval(t2)
	clearInterval(t3)
	clearInterval(t4)
	
	progress(5000);
}
function togglepwd() {
	var value = $('.newPwd').val().trim()
	var regExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/
	if (regExp.test(value)) {
		$('.password-icon1').attr('src', './images/pass.png')
	} else if (value.length > 8) {
		$('.password-icon1').attr('src', './images/refuse.png')
		tips('密碼至少8位，請至少包含一個大寫字母和一個小寫字母')
	}
}

// 
function progressToggle(obj){
	var index = $(obj).index();
	
	$('.stacked-cards li').removeClass('active');
	$(obj).addClass('active');
	// console.log(this)
	
	$('.banner-left ul li').removeClass('active');
	$('.banner-left ul li').eq(index).addClass('active');
	
	$('.banner-left-progress div').removeClass('progress-active');
	$('.banner-left-progress div').eq(index).addClass('progress-active');
	$('.banner-left-progress1 div').removeClass('progress-active1');
	$('.banner-left-progress1 div').eq(index).addClass('progress-active1');
	
	// $('.banner-right ul li').eq(index).click();
	
	clearInterval(t1)
	clearInterval(t2)
	clearInterval(t3)
	clearInterval(t4)
	
	progress(5000);
}


// payment
function payment(){
	$('.payment').fadeIn();
}

function paymentClose(){
	$('.payment').hide();
}


// faqs
function answerShow(obj){
	$(obj).closest('li').addClass('faqs-list-show');
	$(obj).closest('li').children('.faqs-list-answer').slideDown();
}

function answerHide(obj){
	$(obj).closest('li').removeClass('faqs-list-show');
	$(obj).closest('li').children('.faqs-list-answer').slideUp();
}



function tcHide(){
	history.go(-1);
}

// mobile-menu
function menuShow(){
	$('.menu-list1').addClass('menu-list-show');
	$('video').addClass('video-hidden');
}

function menuHide(){
	$('.menu-list1').removeClass('menu-list-show');
	$('video').removeClass('video-hidden');
}


// add fund
function addFund(){
	if (getCookie('isConnect')=='false') {
		window.location.href="./connectWallet.html"
	}else{
		var payForm = document.getElementById("modify-ipt-form");
		payForm.style.display = "none";
		var modifyForm = document.getElementById("modify-btn-form");
		modifyForm.style.display = "block";
		$('.modify-ipt-form').addClass('modify-ipt');
		$('.modify-tit span').text('充值');
		$('.modify-tit').data('type','add');
		$.ajax({
			url:base_url+'/v2/user/wallet/info',
			success:function(res){
				if(res.code==0){
					var html = ``;
					html += `<div class="modify-ipt-add">
								<div class="modify-ipt-tit">`+(res.data.address==null?'請連接錢包':'From '+res.data.address)+`</div>
								<input type="text" placeholder="輸入金額" />
							</div>`;
							
					$('.modify-ipt').html(html);
					$('.modify-btn-active').addClass('add');
					$('.modify-btn-active').removeClass('delete');
					$('.modify-btn-active').text('立即充值');
				}
			}
		})
	}
}

function cancel(){
	$('.modify').hide();
	$.each($('.modify input'),function(i,v){
		$(v).val('');
	})
	
}

function cancelMobile(){
	// 原代码
	$('.modify').removeClass('modify-tc-active');
	// 修复手机端无法关闭的代码
	$('.modify').hide();
	$.each($('.modify input'),function(i,v){
		$(v).val('');
	})
	
}

//widthdraw
function widthDraw(){
	if (getCookie('isConnect')=='false') {	
		window.location.href="./connectWallet.html"
	}else{
		var payForm = document.getElementById("modify-ipt-form");
		payForm.style.display = "none";
		var modifyForm = document.getElementById("modify-btn-form");
		modifyForm.style.display = "block";
		$('.modify-ipt-form').addClass('modify-ipt');
		$('.modify-tit span').text('提款');
		$('.modify-tit').data('type','withdraw');
		$.ajax({
			url:base_url+'/v2/user/wallet/info',
			success:function(res){
				if(res.code==0){
					var html = ``;
					html += `<div class="modify-ipt-add">
								<div class="modify-ipt-tit">`+(res.data.address==null?'請連接錢包':'To '+res.data.address)+`</div>
								<input type="text" placeholder="輸入金額" />
							</div>`;
							
					$('.modify-ipt').html(html);
					$('.modify-btn-active').addClass('add');
					$('.modify-btn-active').removeClass('delete');
					$('.modify-btn-active').text('立即提款');
				}
			}
		})
		// $('.modify').fadeIn();
	}
}

//change card
function changeCard(){
	var payForm = document.getElementById("modify-ipt-form");
	payForm.style.display = "block";
	var modifyForm = document.getElementById("modify-btn-form");
	modifyForm.style.display = "none";
	$('.modify-ipt-form').removeClass('modify-ipt');
	$('.modify-ipt-form').html(``);
	$('.modify-tit span').text('更換信用卡');
	$('.modify-tit').data('type','card');
	$('.modify-btn-active').addClass('add');
	$('.modify-btn-active').removeClass('delete');
	$('.modify-btn-active').text('儲存');
	
	// $('#datetimepicker').datetimepicker({
	// 	format: 'mm/yyyy',
	// 	minView: 3,
	// 	autoclose: true,
	// 	language:'en'
	// });
	// $('.modify-card').fadeIn();
}

//delete info
function deleteCard(){
	var payForm = document.getElementById("modify-ipt-form");
	payForm.style.display = "none";
	var modifyForm = document.getElementById("modify-btn-form");
	modifyForm.style.display = "block";
	$('.modify-ipt-form').addClass('modify-ipt');
	$('.modify-tit span').text('刪除資料');
	$('.modify-tit').data('type','dcard');
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="modify-ipt-tit">您確定要刪除信用卡信息嗎？不能撤消。</div>
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-btn-active').removeClass('add');
	$('.modify-btn-active').addClass('delete');
	$('.modify-btn-active').text('刪除');
	// $('.modify').fadeIn();
}

function deleteWallet(){
	var payForm = document.getElementById("modify-ipt-form");
	payForm.style.display = "none";
	var modifyForm = document.getElementById("modify-btn-form");
	modifyForm.style.display = "block";
	$('.modify-ipt-form').addClass('modify-ipt');
	$('.modify-tit span').html('刪除資料');
	$('.modify-tit').data('type','dwallet');
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="modify-ipt-tit">您確定要刪除錢包信息嗎？不能撤消。</div>
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-btn-active').removeClass('add');
	$('.modify-btn-active').addClass('delete');
	$('.modify-btn-active').text('刪除   ');
	// $('.modify').fadeIn();
}

// change name
function changeName(){
	$('.modify-tit span').text('更換暱稱');
	$('.modify-tit').data('type','name');
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="modify-ipt-tit">當前暱稱：Vova Zhuruk</div>
				<input type="text" placeholder="輸入新暱稱" />
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-btn-active').addClass('add');
	$('.modify-btn-active').removeClass('delete');
	$('.modify-btn-active').text('儲存');
	// $('.modify').fadeIn();
}


function editnftaddress(){
	$('.modify-tit span').text('修改BSC NFT接收地址');
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="modify-ipt-tit dqaddress">當前接收地址：<span>`+walletId+`</span></div>
				<div class="modify-ipt-tit newaddress">新接收地址：<input type="text" value=`+walletId+`></div>
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-tips').html(`<span class="modify-tips-content">提示：一旦鑄造完成，則不可修改地址。如需查看該NFT，需連接新接收地址才可查看</span>`);
	$('.modify-btn-active').addClass('add');
	$('.modify-btn-active').removeClass('delete');
	$('.modify-btn-active').text('確認修改');
	$('.modify-btn-active').attr('data-type',1);
	$('.cancel').hide();
	$('.modify').fadeIn();
}
function zhuanyiaddress(){
	$('.modify-tit span').text('轉移Token 13 of 150 至新錢包');
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="modify-ipt-tit dqaddress">當前所在錢包地址：<span>`+walletId+`</span></div>
				<div class="modify-ipt-tit newaddress2">轉移至：<input type="text" value=`+walletId+`></div>
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-tips').html(`<span class="modify-tips-content">提示：轉移至新錢包后，需連接新錢包才可在“我的NFT”中查看</span>`);
	$('.modify-btn-active').addClass('add');
	$('.modify-btn-active').removeClass('delete');
	$('.modify-btn-active').text('確認轉移');
	$('.modify-btn-active').attr('data-type',2);
	$('.cancel').hide();
	$('.modify').fadeIn();
}

//change email
function changeEmail(){
	// $('.modify-tit span').text('Change Email');
	// var html = ``;
	// html += `<div class="modify-ipt-add">
	// 			<div class="modify-ipt-tit">Current Email: vovazhuruk@gmail.com</div>
	// 			<input type="text" placeholder="Enter New Email" />
	// 		</div>`;
			
	// $('.modify-ipt').html(html);
	// $('.modify-btn-active').addClass('add');
	// $('.modify-btn-active').removeClass('delete');
	// $('.modify-btn-active').text('Save');
	// $('.modify').fadeIn();
	
}
// change phone
function changePhone(){
	
}
//change pwd
function changePwd(){
	$('.modify-tit span').text('更換密碼');
	$('.modify-tit').data('type','pwd');
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="input-position">
					<div class="modify-ipt-tit">當前密碼</div>
					<input class="modify-ipt-pwd oldPwd" type="password" placeholder="輸入當前密碼" />
					<div class="pwdMessage oldPwd-message">當前密碼不正確。</div>
				</div>
				<div class="input-position">
					<div class="modify-ipt-tit">新密碼</div>
					<input class="modify-ipt-pwd newPwd" type="password" placeholder="輸入新密碼" oninput="togglepwd()"/>
					<img class="password-icon1" style="top:58px;" src="./images/refuse.png">
					<div class="pwdMessage newPwd-message">密碼長度不少於6比特</div>
					<div class="pswrule">密碼至少8位，請至少包含一個大寫字母和一個小寫字母</div>
				</div>
				<div class="input-position">
					<div class="modify-ipt-tit">重複新密碼</div>
					<input class="modify-ipt-pwd repeatPwd" type="password" placeholder="重複新密碼" />
					<div class="pwdMessage repeatPwd-message">重複密碼不正確</div>
				</div>
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-btn-active').addClass('add');
	$('.modify-btn-active').removeClass('delete');
	$('.modify-btn-active').text('儲存');
	// $('.modify').fadeIn();
}


// check tips
function checkTip(obj,text){
	$(obj).text(text);
}


//显示loading
function loading(){

	hsycms.loading('loading','loading');

	//2秒后隐藏
	// setTimeout(res=>{
	// 	hsycms.hideLoading('loading');
	// },2000)

}

//隐藏loading
function loadingHide(){
	hsycms.hideLoading('loading');
}


//操作成功调用 
function success(text,s){
	hsycms.success('success',text,function(){},s)
}

//操作失败调用
function error(text,s){
	hsycms.error('error',text,function(){ },s)
}


//提示弹窗
function tips(txt){
	hsycms.tips('tips',txt,function(){
		console.log("提示关闭后");
	},2000)
}



//
function connectWallet(){
	$.ajax({
		url:base_url+'/v2/user/account',
		success:function(res){
			if(res.code==0){
				var text = $('.header-right-wallet').text().trim();
				if(text=='未連接錢包'){
					window.location.href = 'connectWallet.html';
				}else{
					// tips('已連接');
				}
				
			}else{
			
				tips('未登錄，請登入');
			
			}
			// console.log(res)
		}
	});
}

function getCookie(cookieName) {
	const strCookie = document.cookie
	const cookieList = strCookie.split('; ')
	var cookieValue;
	for(let i = 0; i < cookieList.length; i++) {
		const arr = cookieList[i].split('=')
		if (cookieName === arr[0]) {
			cookieValue = arr[1];
		}
	}

	return cookieValue;
}

function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ';path=/;';
}



function moneyFormat(value) { // 金额 格式化 
    if (!value && value !== 0) return '-';
    var intPart = Number(value) | 0; //获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
 
    var floatPart = ".00"; //预定义小数部分
    var value2Array = value.toString().split(".");
 
    //=2表示数据有小数位
    if (value2Array.length == 2) {
        floatPart = value2Array[1].toString(); //拿到小数部分
 
        if (floatPart.length == 1) { //补0,实际上用不着
            return intPartFormat + "." + floatPart + '0';
        } else {
            return intPartFormat + "." + floatPart;
        }
    } else {
        return intPartFormat;
    }
}


// 选择语言
// function langSelect(obj){
// 	var lang = $(obj).text().trim();
// 	lang=='繁'?lang='TC':lang;
	
// 	$.ajax({
// 		url:base_url+'/v2/user/lang/select',
// 		type:'POST',
// 		dataType:'json',
// 		data:{lang:lang},
// 		success:function(res){
// 			console.log(res);
// 		}
// 	});

// }
