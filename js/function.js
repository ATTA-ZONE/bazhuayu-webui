//banner progress
var chEnText;
// 定义全局的html文案变量
var chEnTextHtml;
// 定义全局的html最外层的id
var htmlId = "app";
// 语言类型默认中文
var lang = 'TC';
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
	var functionText = chEnText.function[lang];
	var value = $('.newPwd').val().trim()
	var regExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/
	if (regExp.test(value)) {
		$('.password-icon1').attr('src', './images/pass.png')
	} else if (value.length > 8) {
		$('.password-icon1').attr('src', './images/refuse.png')
		tips(functionText.passWord)
	}
}

// 
function progressToggle(obj){
	var index = $(obj).index();
	
	$('.stacked-cards li').removeClass('active');
	$(obj).addClass('active');
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
	$('.payment-result-modal').hide();
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
	var functionText = chEnText.function[lang];
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
		CHAIN.WALLET.accounts()
		.then(function(account){
			var html = ``;
			html += `<div class="modify-ipt-add">
						<div class="modify-ipt-tit" id="testcopy">`+(account.length == 0?functionText.connectWallet:'From '+account[0])+`<img class="copybtn" src="./images/copyicon.png" onclick="copyaddressbtn()"/></div>
						<input type="text" placeholder="${functionText.amount}" />
					</div>`;
					
			$('.modify-ipt').html(html);
			$('.modify-btn-active').addClass('add');
			$('.modify-btn-active').removeClass('delete');
			$('.modify-btn-active').text(functionText.nowRecharge);
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
	var functionText = chEnText.function[lang];
	if (getCookie('isConnect')=='false') {	
		window.location.href="./connectWallet.html"
	}else{
		var payForm = document.getElementById("modify-ipt-form");
		payForm.style.display = "none";
		var modifyForm = document.getElementById("modify-btn-form");
		modifyForm.style.display = "block";
		$('.modify-ipt-form').addClass('modify-ipt');
		$('.modify-tit span').text(functionText.withdraw);
		$('.modify-tit').data('type','withdraw');
		$.ajax({
			url:base_url+'/v2/user/wallet/info',
			success:function(res){
				if(res.code==0){
					var html = ``;
					html += `<div class="modify-ipt-add">
								<div class="modify-ipt-tit">`+(res.data.address==null?'請連接錢包':'To '+res.data.address)+`</div>
								<input type="text" placeholder="${functionText.amount}" />
							</div>`;
							
					$('.modify-ipt').html(html);
					$('.modify-btn-active').addClass('add');
					$('.modify-btn-active').removeClass('delete');
					$('.modify-btn-active').text(functionText.nowWithdraw);
				}
			}
		})
		// $('.modify').fadeIn();
	}
}

//change card
function changeCard(){
	var functionText = chEnText.function[lang];
	var payForm = document.getElementById("modify-ipt-form");
	payForm.style.display = "block";
	var modifyForm = document.getElementById("modify-btn-form");
	modifyForm.style.display = "none";
	$('.modify-ipt-form').removeClass('modify-ipt');
	$('.modify-ipt-form').html(``);
	$('.modify-tit span').text(functionText.changeCard);
	$('.modify-tit').data('type','card');
	$('.modify-btn-active').addClass('add');
	$('.modify-btn-active').removeClass('delete');
	$('.modify-btn-active').text(functionText.save);
	
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
	var functionText = chEnText.function[lang];
	var payForm = document.getElementById("modify-ipt-form");
	payForm.style.display = "none";
	var modifyForm = document.getElementById("modify-btn-form");
	modifyForm.style.display = "block";
	$('.modify-ipt-form').addClass('modify-ipt');
	$('.modify-tit span').text(functionText.deleteData);
	$('.modify-tit').data('type','dcard');
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="modify-ipt-tit">${functionText.deleteCard}</div>
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-btn-active').removeClass('add');
	$('.modify-btn-active').addClass('delete');
	$('.modify-btn-active').text(functionText.delete);
	// $('.modify').fadeIn();
}

function deleteWallet(){
	var functionText = chEnText.function[lang];
	var payForm = document.getElementById("modify-ipt-form");
	payForm.style.display = "none";
	var modifyForm = document.getElementById("modify-btn-form");
	modifyForm.style.display = "block";
	$('.modify-ipt-form').addClass('modify-ipt');
	$('.modify-tit span').html(functionText.deleteData);
	$('.modify-tit').data('type','dwallet');
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="modify-ipt-tit">${functionText.deleteWallt}</div>
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-btn-active').removeClass('add');
	$('.modify-btn-active').addClass('delete');
	$('.modify-btn-active').text(functionText.delete);
	// $('.modify').fadeIn();
}

// change name
function changeName(){
	var functionText = chEnText.function[lang];
	$('.modify-tit span').text(functionText.chengeNick);
	$('.modify-tit').data('type','name');
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="modify-ipt-tit">${functionText.currentNick}Vova Zhuruk</div>
				<input type="text" placeholder="${functionText.newNick}" />
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-btn-active').addClass('add');
	$('.modify-btn-active').removeClass('delete');
	$('.modify-btn-active').text(functionText.save);
	// $('.modify').fadeIn();
}


function editnftaddress(e,walletIdval){
	var functionText = chEnText.function[lang];
	let obj = JSON.parse(e.target.dataset.json);
	$('.modify-tit span').text(functionText.changeNFT);
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="modify-ipt-tit dqaddress">${functionText.currentAddress}<span>`+(obj.receiver ? obj.receiver : functionText.noAddress)+`</span></div>
				<div class="modify-ipt-tit newaddress">${functionText.newAddress}<input type="text" value=`+walletIdval+`></div>
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-tips').html(`<span class="modify-tips-content">${functionText.tips01}</span>`);
	$('.modify-btn-active').addClass('add');
	$('.modify-btn-active').removeClass('delete');
	$('.modify-btn-active').text(functionText.edit);
	$('.modify-btn-active').attr('data-type',e.target.dataset.json);
	$('.cancel').hide();
	$('.modify').fadeIn();
}
function zhuanyiaddress(e){
	var functionText = chEnText.function[lang];
	let obj = JSON.parse(e.target.dataset.json);
	let endedition = JSON.parse(e.target.dataset.endedition);
	$('.modify-tit span').text(functionText.transfer+obj.edition+` of `+endedition+functionText.newWallt);
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="modify-ipt-tit dqaddress">${functionText.walltAdress}<span>`+walletId+`</span></div>
				<div class="modify-ipt-tit newaddress2">${functionText.transferTo}<input type="text" value=`+walletId+`></div>
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-tips').html(`<span class="modify-tips-content">${functionText.tips02}</span>`);
	$('.modify-btn-active').addClass('add');
	$('.modify-btn-active').removeClass('delete');
	$('.modify-btn-active').text(functionText.confirmCurrent);
	$('.modify-btn-active').attr('data-type',e.target.dataset.json);
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
	var functionText = chEnText.function[lang];
	$('.modify-tit span').text(functionText.changePassword);
	$('.modify-tit').data('type','pwd');
	var html = ``;
	html += `<div class="modify-ipt-add">
				<div class="input-position">
					<div class="modify-ipt-tit">${functionText.currentPassword}</div>
					<input class="modify-ipt-pwd oldPwd" type="password" placeholder="${functionText.enterCurrentPassword}" />
					<div class="pwdMessage oldPwd-message">${functionText.currentPasswordErr}</div>
				</div>
				<div class="input-position">
					<div class="modify-ipt-tit">${functionText.newPassword}</div>
					<input class="modify-ipt-pwd newPwd" type="password" placeholder="${functionText.entweNewPassword}" oninput="togglepwd()"/>
					<img class="password-icon1" style="top:58px;" src="./images/refuse.png">
					<div class="pwdMessage newPwd-message">${functionText.passwordLength}</div>
					<div class="pswrule">${functionText.passwordReg}</div>
				</div>
				<div class="input-position">
					<div class="modify-ipt-tit">${functionText.repeatPassword}</div>
					<input class="modify-ipt-pwd repeatPwd" type="password" placeholder="${functionText.repeatPassword}" />
					<div class="pwdMessage repeatPwd-message">${functionText.repeatPasswordErr}</div>
				</div>
			</div>`;
			
	$('.modify-ipt').html(html);
	$('.modify-btn-active').addClass('add');
	$('.modify-btn-active').removeClass('delete');
	$('.modify-btn-active').text(functionText.save);
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
	},2000)
}



//
function connectWallet(){
	var functionText = chEnText.function[lang];
	$.ajax({
		url:base_url+'/v2/user/account',
		success:function(res){
			if(res.code==0){
				var text = $('.header-right-wallet').text().trim();
				if(text==functionText.noConnectWallet){
					window.location.href = 'connectWallet.html';
				}else{
					// tips('已連接');
				}
				
			}else{
				tips(functionText.noLog);
			}
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
// 		}
// 	});

// }
