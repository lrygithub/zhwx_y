var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var core;
(function (core) {
    /**
     * 微信管理模块
     */
    var WeiXinManager = (function (_super) {
        __extends(WeiXinManager, _super);
        function WeiXinManager() {
            var _this = _super.call(this) || this;
            _this.WEIXIN_DEBUG = true;
            _this.init();
            return _this;
        }
        WeiXinManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new WeiXinManager();
            }
            return this._instance;
        };
        WeiXinManager.prototype.init = function () {
            core.NotifyManager.getInstance().registerNotify(core.NotifyConst.WX_JSSDK_CONFIG, this.onNotifyJSSDK, this);
        };
        WeiXinManager.prototype.config = function () {
            if (Utils.isWeiXin() && Utils.getURLQueryString('openid')) {
                this.wx = window["wx"];
                //var ourl = encodeURIComponent(window.location.href); 
                var ourl = encodeURIComponent(window.location.href);
                // GameController.getInstance().getJSSDKConfig({ourl:ourl});    
            }
        };
        WeiXinManager.prototype.onNotifyJSSDK = function (obj) {
            console.log('微信配置1', obj);
            var self = this;
            this.wx.config({
                "debug": obj.data["debug"],
                "appId": obj.data["appId"],
                "timestamp": obj.data["timestamp"],
                "nonceStr": obj.data["nonceStr"],
                "signature": obj.data["signature"],
                "jsApiList": obj.data['jsApiList'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            this.wx.ready(function () {
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
            this.wx.error(function (err) {
                // self.config();           
            });
        };
        WeiXinManager.prototype.shareNomal = function (url, desc, id) {
            if (desc === void 0) { desc = null; }
            if (id === void 0) { id = ""; }
            this.shareURL = url;
            desc = '生态农场开始种植';
            var wx = window["wx"];
            var shareObj = {
                "title": '生态农场',
                "desc": desc,
                "link": url,
                "imgUrl": 'https://mmbiz.qpic.cn/mmbiz_jpg/UGlwtu18sBwJrS7J0jdFs4w10x3yIDzrhISA7WpYCKHKwsDNN17sRiaCf5OwDoqgbxiagoWz9BicyqTnvn0vQSZibQ/0?wx_fmt=jpeg',
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
        };
        return WeiXinManager;
    }(egret.EventDispatcher));
    core.WeiXinManager = WeiXinManager;
    __reflect(WeiXinManager.prototype, "core.WeiXinManager");
})(core || (core = {}));
//# sourceMappingURL=WeiXinManager.js.map