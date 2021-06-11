// jq实现页面文案的单向绑定
var el = document.getElementById(htmlId);
var template = el.innerHTML;
var languageType = 'ch';
var data = new Proxy(chEnTextHtml[languageType], {
  set:function(obj, name, value) {
    obj[name] = value;
    render();
  }
});
render();
function render() {
  el.innerHTML = template.replace(/\{\{\w+\}\}/g, function(str){
    str = str.substring(2, str.length - 2);
    return chEnTextHtml[languageType][str];
  });
}