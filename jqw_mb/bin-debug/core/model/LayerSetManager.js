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
var LayerSetManager = (function (_super) {
    __extends(LayerSetManager, _super);
    function LayerSetManager() {
        var _this = _super.call(this) || this;
        _this.s = GameConfig.HEIGHT / GameConfig.WIDTH;
        egret.MainContext.instance.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, function () {
            _this.s = GameConfig.HEIGHT / GameConfig.WIDTH;
        }, _this);
        return _this;
        // if (egret.Capabilities.os == 'iOS') {
        // egret.setInterval(() => {
        // 	//window.scrollTo(0, 0);
        // 	 console.log(window.innerWidth,window.innerHeight,window.innerWidth/window.innerHeight);
        // 	 console.log(window.screen.width,window.screen.height,window.screen.width/window.screen.height);
        // }, this, 1000);
        // }
    }
    LayerSetManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new LayerSetManager();
        }
        return this._instance;
    };
    LayerSetManager.prototype.init = function () {
        var _this = this;
        window.scrollTo(0, 0);
        var ish = window.innerWidth > window.innerHeight;
        var sw = ish ? 115 / 2 : 115 / 2;
        var sh = ish ? 319 / 2 : 319 / 2;
        var sx = window.innerWidth / 2 - sw / 2;
        var sy = window.innerHeight / 2 - sh / 2 - 10 + 40;
        var sx1 = window.innerWidth / 2 - 143 / 2;
        var sy1 = window.innerHeight / 2 - sh / 2 - 10 - 31 / 2 - 5;
        var $ = window['$'];
        $('#nvImg').css({ left: sx, top: sy, width: sw, height: sh });
        $('#nvImg1').css({ left: sx1, top: sy1, width: 286 / 2, height: 31 / 2 });
        var t;
        var self = this;
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
            clearTimeout(t);
            t = setTimeout(function () {
                var ish = window.innerWidth > window.innerHeight;
                var sw = ish ? 115 : 115;
                var sh = ish ? 319 : 319;
                var sx = window.innerWidth / 2 - sw / 2;
                var sy = window.innerHeight / 2 - sh / 2 - 10 + 40;
                var sx1 = window.innerWidth / 2 - 143 / 2;
                var sy1 = window.innerHeight / 2 - sh / 2 - 10 - 31 / 2 - 5;
                var $ = window['$'];
                $('#nvImg').css({ left: sx, top: sy, width: sw, height: sh });
                $('#nvImg1').css({ left: sx1, top: sy1, width: 286 / 2, height: 31 / 2 });
                if (egret.Capabilities.os == 'iOS') {
                    self.resizeCompete();
                }
            }, 200);
        });
        if (egret.Capabilities.os == 'iOS') {
            var JQ = window['$'];
            JQ('#nvLayer').show();
            window.onscroll = function () {
                egret.clearTimeout(_this.timeout);
                _this.timeout = egret.setTimeout(function () {
                    _this.resizeCompete();
                }, _this, 200);
            };
        }
    };
    LayerSetManager.prototype.resizeCompete = function () {
        var JQ = window['$'];
        //JQ('gameDiv').css('top', 0);
        if (window.innerHeight >= window.innerWidth) {
            //6,7,8系列
            console.log('h', window.screen.height);
            console.log('w', window.innerHeight);
            if (window.screen.height - window.innerHeight >= 100) {
                JQ('#nvLayer').show();
            }
            else {
                JQ('#nvLayer').hide();
            }
        }
        else {
            var b = window.screen.width - window.innerHeight;
            if (Math.abs(b) < 2) {
                JQ('#nvLayer').hide();
            }
            else {
                JQ('#nvLayer').show();
            }
        }
        window.scrollTo(0, 0);
        core.LayerManager.getInstance().dispatchEventWith(SetEvent.SET_OR_CHANGE);
    };
    return LayerSetManager;
}(egret.EventDispatcher));
__reflect(LayerSetManager.prototype, "LayerSetManager");
//# sourceMappingURL=LayerSetManager.js.map