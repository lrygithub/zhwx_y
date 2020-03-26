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
/**
 * WebImage
 * 适配FIXED_WIDTH、FIXED_HEIGHT、NO_BORDER、SHOW_ALL四种缩放模式
 * 暂未考虑屏幕大小改变、屏幕旋转以及单页面多Webplay实例的情形
 * Created by yxiao on 2015/9/30.
 */
var WebImage = (function (_super) {
    __extends(WebImage, _super);
    /**
     * @param src
     */
    function WebImage(src) {
        var _this = _super.call(this) || this;
        _this._x = 0;
        _this._y = 0;
        _this._width = 0;
        _this._height = 0;
        _this._src = "";
        _this._scaleMode = egret.MainContext.instance.stage.scaleMode;
        _this._imgWrapper = null;
        _this._img = null;
        var stageDelegateDom = document.getElementById("StageDelegateDiv"), playerContainer = stageDelegateDom.parentElement;
        var imgWrapperDom = document.getElementById("img-wrapper");
        if (!imgWrapperDom) {
            imgWrapperDom = document.createElement("div");
            imgWrapperDom.style.display = "none";
            imgWrapperDom.attributes['style'].value += 'position:absolute;'; //解决iframe在ios下的显示问题
            imgWrapperDom.id = "img-wrapper";
            stageDelegateDom.appendChild(imgWrapperDom);
        }
        _this._imgWrapper = imgWrapperDom;
        _this._imgWrapper.style.display = "none";
        _this._imgWrapper.style.opacity = "0";
        var img = document.createElement("img"), t = new Date().getTime();
        img.src = src;
        img.id = "img-" + t;
        img.name = "img-" + t;
        img.style.position = "absolute";
        img.style.top = "0";
        img.style.left = "0";
        img.style.opacity = "0";
        img.style.display = 'none';
        img.border = "0";
        img.style.width = "100%";
        img.style.height = "100%";
        _this._imgWrapper.appendChild(img);
        _this._img = document.getElementById("img-" + t);
        var self = _this;
        _this._img.onload = function () {
            self._imgWrapper.style.opacity = "1";
            self._img.style.opacity = "1";
        };
        _this._stageW = egret.MainContext.instance.stage.stageWidth;
        _this._stageH = egret.MainContext.instance.stage.stageHeight;
        _this._windowW = window.innerWidth;
        _this._windowH = window.innerHeight;
        _this._designH = parseInt(playerContainer.attributes['data-content-height'].value);
        _this._designW = parseInt(playerContainer.attributes['data-content-width'].value);
        var stageSize = egret.sys.screenAdapter.calculateStageSize(egret.MainContext.instance.stage.scaleMode, _this._windowW, _this._windowH, _this._designW, _this._designH);
        _this._displayH = stageSize.displayHeight;
        _this._displayW = stageSize.displayWidth;
        console.log("windowW:" + _this._windowW);
        console.log("stageW:" + _this._stageW);
        console.log("disPlayW:" + _this._displayW);
        console.log("windowH:" + _this._windowH);
        console.log("stageH:" + _this._stageH);
        console.log("displayH:" + _this._displayH);
        return _this;
    }
    WebImage.prototype.show = function () {
        this._img.style.display = 'block';
        this._imgWrapper.style.display = 'block';
    };
    WebImage.prototype.destroy = function () {
        if (this._img) {
            this._imgWrapper.style.display = "none";
            this._imgWrapper.removeChild(this._img);
        }
    };
    Object.defineProperty(WebImage.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                //this._img.width=this._width/this._stageW*this._windowW+"px";
                this._imgWrapper.style.width = this._width / this._stageW * this._windowW + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowW == this._displayW) {
                    //this._img.style.width = this._width / this._stageW * this._windowW + "px";
                    this._imgWrapper.style.width = this._width / this._stageW * this._windowW + "px";
                }
                else {
                    //this._img.style.width = this._width / this._stageW * this._displayW + "px";
                    this._imgWrapper.style.width = this._width / this._stageW * this._displayW + "px";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebImage.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                //this._img.height=this._height/this._stageH*this._windowH+"px";
                this._imgWrapper.style.height = this._height / this._stageH * this._windowH + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowH == this._displayH) {
                    //this._img.style.height = this._height / this._stageH * this._windowH + "px";
                    this._imgWrapper.style.height = this._height / this._stageH * this._windowH + "px";
                }
                else {
                    //this._img.style.height = this._height / this._stageH * this._displayH + "px";
                    this._imgWrapper.style.height = this._height / this._stageH * this._displayH + "px";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebImage.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._imgWrapper.style.left = this._x / this._stageW * this._windowW + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowW == this._displayW) {
                    this._imgWrapper.style.left = this._x / this._stageW * this._windowW + "px";
                }
                else {
                    this._imgWrapper.style.left = this._x / this._stageW * this._displayW + "px";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebImage.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._imgWrapper.style.top = this._y / this._stageH * this._windowH + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowH == this._displayH) {
                    this._imgWrapper.style.top = this._y / this._stageH * this._windowH + "px";
                }
                else {
                    this._imgWrapper.style.top = this._y / this._stageH * this._displayH + "px";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebImage.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (value) {
            this._src = value;
        },
        enumerable: true,
        configurable: true
    });
    return WebImage;
}(egret.DisplayObjectContainer));
__reflect(WebImage.prototype, "WebImage");
//# sourceMappingURL=WebImage.js.map