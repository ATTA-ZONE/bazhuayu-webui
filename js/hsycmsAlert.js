/*
* hsycmsAlert 弹窗插件
* author @ http://www.hsycms.com 
*/
var hsycms =function(){ 
 return {
   //打开
   open:function(id,txt=''){     
     var obj = $("#"+id);
     var height = obj.height();
     if(txt!=''){   
       obj.find(".hsycms-model-text").html(txt);  
     }  
     obj.show();
     setTimeout(res=>{
     },100)
   },

   //普通弹窗
    alert:function(id,txt='',callback){
          this.open(id,txt); 
          let that = this;
          $("#"+id).find(".hsycms-model-btn button").click(function(){  
                  that.close(id);     
                  if(typeof(callback)!='undefined'){ callback(); }
          })     
    },

    //提示弹窗
   tips:function(id,txt='',callback,time=1600){
    this.open(id,txt); 
    let that = this;
    setTimeout(res=>{  
     that.close(id);    
     if(typeof(callback)!='undefined'){ callback(); }
    },time)     
  },

   //询问弹窗
   confirm:function(id,txt='',confirm,concel){
      this.open(id,txt); 
      $("#"+id).find(".hsycms-model-btn button").click(function(){
         hsycms.close(id);
         if($(this).attr("class")=="ok"){           
          confirm();
         }else{
          concel();
         }
      })     
   },

   //自定义弹窗
   model:function(id){
      this.open(id); 
   },

  //显示loading
  loading:function(id,txt){   
    this.open('loading',txt);
  },

  //隐藏loading
  hideLoading(id,callback){
   this.close(id);
   if(typeof(callback)!='undefined'){ callback(); }
  },

  //操作成功提示
  success:function(id,txt,callback,time=1600){
   this.open(id,txt);
   let that = this;
   setTimeout(res=>{  
     that.close(id);    
     if(typeof(callback)!='undefined'){ callback(); }
   },time)
  },

  //操作失败提示
  error:function(id,txt,callback,time=1600){
   this.open(id,txt);
   let that = this;
   setTimeout(res=>{  
     that.close(id);    
     if(typeof(callback)!='undefined'){ callback(); }
   },time)
  },
   
  //关闭
  close:function(id){    
   var obj = $("#"+id);
   setTimeout(res=>{
    obj.hide();
   },300)
 },

 //关闭所有
 closeAll(){
    setTimeout(res=>{
     $(".hsycms-model").hide();
    },100)
 }
  
 }
}();