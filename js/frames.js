/* global Frames */
var payButton = document.getElementById("pay-button");
var form = document.getElementById("payment-form");

// Frames.init("pk_test_8ac41c0d-fbcc-4ae3-a771-31ea533a2beb");
Frames.init({
	publicKey:'pk_test_7cabb2f1-609e-4581-918f-0f2c304989be',
	localization: {
	    cardNumberPlaceholder: "卡號",
	    expiryMonthPlaceholder: "MM",
	    expiryYearPlaceholder: "YY",
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

var logos = generateLogos();
function generateLogos() {
  var logos = {};
  logos["card-number"] = {
    src: "card",
    alt: "card number logo",
  };
  logos["expiry-date"] = {
    src: "exp-date",
    alt: "expiry date logo",
  };
  logos["cvv"] = {
    src: "cvv",
    alt: "cvv logo",
  };
  return logos;
}

var errors = {};
// errors["card-number"] = "Please enter a valid card number";
// errors["expiry-date"] = "Please enter a valid expiry date";
// errors["cvv"] = "Please enter a valid cvv code";

errors["card-number"] = "請輸入有效的卡號";
errors["expiry-date"] = "請輸入有效的到期日期";
errors["cvv"] = "請輸入有效的cvv程式碼";

Frames.addEventHandler(
  Frames.Events.FRAME_VALIDATION_CHANGED,
  onValidationChanged
);
function onValidationChanged(event) {
  var e = event.element;

  if (event.isValid || event.isEmpty) {
    if (e === "card-number" && !event.isEmpty) {
      showPaymentMethodIcon();
    }
    setDefaultIcon(e);
    clearErrorIcon(e);
    clearErrorMessage(e);
  } else {
    if (e === "card-number") {
      clearPaymentMethodIcon();
    }
    setDefaultErrorIcon(e);
    setErrorIcon(e);
    setErrorMessage(e);
  }
}

function clearErrorMessage(el) {
  var selector = ".error-message__" + el;
  var message = document.querySelector(selector);
  message.textContent = "";
}

function clearErrorIcon(el) {
  var logo = document.getElementById("icon-" + el + "-error");
  logo.style.removeProperty("display");
}

function showPaymentMethodIcon(parent, pm) {
  if (parent) parent.classList.add("show");

  var logo = document.getElementById("logo-payment-method");
  if (pm) {
    var name = pm.toLowerCase();
    logo.setAttribute("src", "images/card-icons/" + name + ".svg");
    logo.setAttribute("alt", pm || "payment method");
  }
  logo.style.removeProperty("display");
}

function clearPaymentMethodIcon(parent) {
  if (parent) parent.classList.remove("show");

  var logo = document.getElementById("logo-payment-method");
  logo.style.setProperty("display", "none");
}

function setErrorMessage(el) {
  var selector = ".error-message__" + el;
  var message = document.querySelector(selector);
  message.textContent = errors[el];
}

function setDefaultIcon(el) {
  var selector = "icon-" + el;
  var logo = document.getElementById(selector);
  logo.setAttribute("src", "images/card-icons/" + logos[el].src + ".svg");
  logo.setAttribute("alt", logos[el].alt);
}

function setDefaultErrorIcon(el) {
  var selector = "icon-" + el;
  var logo = document.getElementById(selector);
  logo.setAttribute("src", "images/card-icons/" + logos[el].src + "-error.svg");
  logo.setAttribute("alt", logos[el].alt);
}

function setErrorIcon(el) {
  var logo = document.getElementById("icon-" + el + "-error");
  logo.style.setProperty("display", "block");
}

Frames.addEventHandler(
  Frames.Events.CARD_VALIDATION_CHANGED,
  cardValidationChanged
);
function cardValidationChanged() {
  payButton.disabled = true;
  if ($('#save').prop('checked') && $('#savetips').prop('checked')) {
    payButton.disabled = !Frames.isCardValid();
  }
}

Frames.addEventHandler(
  Frames.Events.CARD_TOKENIZATION_FAILED,
  onCardTokenizationFailed
);
function onCardTokenizationFailed(error) {
  console.log("CARD_TOKENIZATION_FAILED: %o", error);
  Frames.enableSubmitForm();
}

$('.pay-button').click(function(){
	loading();
});
Frames.addEventHandler(Frames.Events.CARD_TOKENIZED, onCardTokenized);
function onCardTokenized(event) {
  // var el = document.querySelector(".success-payment-message");
  // el.innerHTML =
  //   "Card tokenization completed<br>" +
  //   'Your card token is: <span class="token">' +
  //   event.token +
  //   "</span>";
	
	console.log(event.token);
	var orderNo = $('.order-number span').text().trim();
	var saveCard = $('#save').prop('checked');
	var ctoken = event.token;
	var useLast = false;
	var data = {
		orderNo,
		saveCard,
		ctoken,
		useLast
	};
	
	$.ajax({
		url:base_url+'/v2/order/order/pay/credit',
		type:'POST',
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(data),
		success:function(res){
			console.log(res);
			loadingHide();
			if(res.code==0){
				window.location.href = res.data.paytdsUrl;
			}
		}
	});
	
}

Frames.addEventHandler(
  Frames.Events.PAYMENT_METHOD_CHANGED,
  paymentMethodChanged
);
function paymentMethodChanged(event) {
  var pm = event.paymentMethod;
  let container = document.querySelector(".icon-container.payment-method");

  if (!pm) {
    clearPaymentMethodIcon(container);
  } else {
    clearErrorIcon("card-number");
    showPaymentMethodIcon(container, pm);
  }
}

form.addEventListener("submit", onSubmit);
function onSubmit(event) {
  event.preventDefault();
  Frames.submitCard();
}
