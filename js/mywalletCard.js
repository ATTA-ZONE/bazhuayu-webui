/* global Frames */
var payButton = document.getElementById("pay-button");
var form = document.getElementById("payment-form");

// Frames.init("pk_test_8ac41c0d-fbcc-4ae3-a771-31ea533a2beb");
Frames.init({
	publicKey:'pk_a154d2a3-6b40-4401-a12c-dba288e68957',
	localization: {
	    cardNumberPlaceholder: "卡號",
	    expiryMonthPlaceholder: "XX",
	    expiryYearPlaceholder: "XX",
	    cvvPlaceholder: "CVV",
	},
	style:{
		base:{
			height: "46px",
			border: "none",
			background: "#282828",
			fontSize: "14px",
			opacity: "0.4",
			color: "#fff",
		}
	}
});

var errors = {};
errors["card-number"] = "請輸入有效的卡號";
errors["expiry-date"] = "請輸入有效的到期日期";
errors["cvv"] = "請輸入有效的cvv程式碼";

Frames.addEventHandler(
  Frames.Events.FRAME_VALIDATION_CHANGED,
  onValidationChanged
);
function onValidationChanged(event) {
  var e = event.element;
  console.log(event);
  if (event.isValid || event.isEmpty) {
    clearErrorMessage(e);
  } else {
    setErrorMessage(e);
  }
}

function clearErrorMessage(el) {
  var selector = ".error-message__" + el;
  var message = document.querySelector(selector);
  message.textContent = "";
}

function setErrorMessage(el) {
  var selector = ".error-message__" + el;
  var message = document.querySelector(selector);
  message.textContent = errors[el];
}


Frames.addEventHandler(
  Frames.Events.CARD_VALIDATION_CHANGED,
  cardValidationChanged
);
function cardValidationChanged() {
  payButton.disabled = true;
    payButton.disabled = !Frames.isCardValid();
}

Frames.addEventHandler(
  Frames.Events.CARD_TOKENIZATION_FAILED,
  onCardTokenizationFailed
);
function onCardTokenizationFailed(error) {
  Frames.enableSubmitForm();
}

$('.pay-button').click(function(){
  console.log(8989798798);
	loading();
});
Frames.addEventHandler(Frames.Events.CARD_TOKENIZED, onCardTokenized);
function onCardTokenized(event) {
  console.log(event);
  var data = {
		cardNo:event.bin + '********' + event.last4,//信用卡号码
    monthLimit:event.expiry_month,//月份
    // verifyCode:event.,//安全码
    yearLimit:event.expiry_year,//年份
	};
	$.ajax({
		url:base_url+'/v2/user/wallet/credit/change',                                                                       
		type:'POST',
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(data),
		success:function(res){
			loadingHide();
			if(res.code==0){
				window.location.reload();
			}
		}
	});
}

form.addEventListener("submit", onSubmit);
function onSubmit(event) {
  console.log(event);
  event.preventDefault();
  Frames.submitCard();
}
