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
    var LayerManager = (function (_super) {
        __extends(LayerManager, _super);
        function LayerManager() {
            return _super.call(this) || this;
        }
        LayerManager.getInstance = function () {
            if (!this._instance)
                this._instance = new LayerManager();
            return this._instance;
        };
        /**初始层级 */
        LayerManager.prototype.initLayer = function (root) {
            var _this = this;
            this.scenceLayer = new eui.UILayer();
            this.uiLayer = new eui.UILayer();
            this.topLayer = new eui.UILayer();
            this.tipLayer = new eui.UILayer();
            this.scenceLayer.touchThrough = true;
            this.uiLayer.touchThrough = true;
            this.topLayer.touchThrough = true;
            this.tipLayer.touchThrough = true;
            this.tipLayer.touchEnabled = false;
            root.addChild(this.scenceLayer);
            root.addChild(this.uiLayer);
            root.addChild(this.topLayer);
            root.addChild(this.tipLayer);
            var self = this;
            // 	      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {  
            //             var type:number=Utils.getOrientationType();  
            // 			egret.setTimeout(()=>{
            //                 for(var key in UIManager.pool)
            // 			{
            // 		       var baseui:BaseUI=UIManager.pool[key] as BaseUI;
            // 			   if(baseui)
            // 			   {
            // 				   baseui.width=GameConfig.WIDTH;
            // 				   baseui.height=GameConfig.HEIGHT;
            // 				   baseui.validateNow();
            // 			   }
            // 			}     
            // 			},this,200);
            // }, false);   
            egret.MainContext.instance.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, function () {
                // if (egret.Capabilities.os == 'iOS') {
                // 	let JQ = window['$'];
                // 	JQ('#nvLayer').show();
                // }
                _this.dispatchEventWith(SetEvent.SET_OR_CHANGE);
            }, this);
            window.onresize = function () {
                _this.dispatchEventWith(SetEvent.SET_OR_CHANGE);
            };
        };
        /**添加UI到舞台 */
        LayerManager.prototype.addUI = function (ui, layer) {
            if (layer === void 0) { layer = 1; }
            var parent;
            switch (layer) {
                case LayerManager.Layer_Scence:
                    this.scenceLayer.addChild(ui);
                    break;
                case LayerManager.Layer_UI:
                    this.uiLayer.addChild(ui);
                    break;
                case LayerManager.Layer_Top:
                    this.topLayer.addChild(ui);
                    break;
                case LayerManager.Layer_Tip:
                    this.tipLayer.addChild(ui);
                    break;
            }
        };
        /**删除UI */
        LayerManager.prototype.deleteUI = function (ui, layer) {
            if (layer === void 0) { layer = 1; }
            var parent;
            switch (layer) {
                case LayerManager.Layer_Scence:
                    this.scenceLayer.removeChild(ui);
                    break;
                case LayerManager.Layer_UI:
                    this.uiLayer.removeChild(ui);
                    break;
                case LayerManager.Layer_Top:
                    this.topLayer.removeChild(ui);
                    break;
                case LayerManager.Layer_Tip:
                    this.tipLayer.removeChild(ui);
                    break;
            }
        };
        /**
         * 得到layer
         */
        LayerManager.prototype.getLayer = function (index) {
            if (index == core.LayerManager.Layer_Scence) {
                return this.scenceLayer;
            }
            else if (index == core.LayerManager.Layer_UI) {
                return this.uiLayer;
            }
            else if (index == core.LayerManager.Layer_Top) {
                return this.topLayer;
            }
            else if (index == core.LayerManager.Layer_Tip) {
                return this.tipLayer;
            }
        };
        LayerManager.Layer_Scence = 0;
        LayerManager.Layer_UI = 1;
        LayerManager.Layer_Top = 2;
        LayerManager.Layer_Tip = 3;
        return LayerManager;
    }(egret.EventDispatcher));
    core.LayerManager = LayerManager;
    __reflect(LayerManager.prototype, "core.LayerManager");
})(core || (core = {}));
//# sourceMappingURL=LayerManager.js.map