module core {
	/**
	 * 微信管理模块
	 */

	export class WeiXinManager extends egret.EventDispatcher
	 {
		 private static _instance:WeiXinManager;
		 public  WEIXIN_DEBUG:boolean=true;
		 public  shareURL:any;

         public wx:any;
		 public constructor() 
		 {
			super();
			this.init();
		 }
		 public static getInstance():WeiXinManager
		 {
			 if(!this._instance)
			 {
				 this._instance=new WeiXinManager();
			 }
			 return this._instance;
		 }
		 public init():void
		 {
             core.NotifyManager.getInstance().registerNotify(core.NotifyConst.WX_JSSDK_CONFIG,this.onNotifyJSSDK,this);
		 }

		 public config()
         {    
			 if(Utils.isWeiXin()&&Utils.getURLQueryString('openid'))
			 {
                this.wx = window["wx"];      
                //var ourl = encodeURIComponent(window.location.href); 
                var ourl = encodeURIComponent(window.location.href);         
               // GameController.getInstance().getJSSDKConfig({ourl:ourl});    
			 }    
         }

		 public onNotifyJSSDK(obj:any):void
		 {
               console.log('微信配置1',obj);   
               var self=this;        
                this.wx.config({     
                    "debug": obj.data["debug"], // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    "appId":  obj.data["appId"], // 必填，公众号的唯一标识
                    "timestamp":  obj.data["timestamp"], // 必填，生成签名的时间戳
                    "nonceStr":  obj.data["nonceStr"], // 必填，生成签名的随机串
                    "signature":  obj.data["signature"],// 必填，签名，见附录1
                    "jsApiList":  obj.data['jsApiList'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                 
                this.wx.ready(()=>
                 {
                     self.shareNomal(obj.data['url']);
                    //  //浇水
                    //  if(this.sharetype==0)
                    //  {
                    //       self.shareWater(data["url"]);
                    //  }
                    //  //邀请好友
                    //  else if(this.sharetype==1)
                    //  {
                    //       self.shareInvite(data["url"]);
                    //  }//分享类型
                    //  else if(this.sharetype)
                    //  {
                    //       self.shareNomal(data["url"]);
                    //  }                 
                    // wx.checkJsApi({
                    //     "jsApiList": ['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    //     "success": function(res) {
                    //         //初始化微信分享
                          
                    //     }
                    // });
                });

                this.wx.error(function(err) 
                {       
                       // self.config();           
                });
		 }

		  public shareNomal(url: string,desc: string = null, id: string = "") {
            this.shareURL = url;
            desc = '生态农场开始种植';
            var wx = window["wx"];
            var shareObj = {
                "title": '生态农场', // 分享标题
                "desc": desc, // 分享内容
                "link": url, // 分享链接
                "imgUrl": 'https://mmbiz.qpic.cn/mmbiz_jpg/UGlwtu18sBwJrS7J0jdFs4w10x3yIDzrhISA7WpYCKHKwsDNN17sRiaCf5OwDoqgbxiagoWz9BicyqTnvn0vQSZibQ/0?wx_fmt=jpeg', // 分享图标
            };

            // var shareObjTimeline = new BodyMenuShareTimeline();
            // for(var key in shareObj) {
            //     shareObjTimeline[key] = shareObj[key];
            // }
            // shareObjTimeline["success"] = function() {
            //     if(window['dc']) {
            //         window['dc']('onEvent','分享完成');
            //     }          
            // }
            // var shareAppMessage = new BodyMenuShareAppMessage();
            // for(var key in shareObj) {
            //     shareAppMessage[key] = shareObj[key];
            // }
            // shareAppMessage["success"] = function() {
            //     if(window['dc']){
            //         window['dc']('onEvent','分享完成');
            //     }
            // }        
            // wx.onMenuShareTimeline(shareObjTimeline);
            // wx.onMenuShareAppMessage(shareAppMessage);
        }

	}
}