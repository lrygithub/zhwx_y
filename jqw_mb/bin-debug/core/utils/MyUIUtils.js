var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * @param createUserName lry
     * @param crateDay 2019.3.29
     */
    var MyUIUtils = (function () {
        function MyUIUtils() {
        }
        /**
         * 长按监听
         * @param displayObj 对象
         * @param startLongouch 长安开始
         * @param endLongTouch 长按结束
         * @param thisObj 回掉对象
         */
        MyUIUtils.addLongTouch = function (displayObj, startLongouch, endLongTouch, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            displayObj.startLongouch = startLongouch;
            displayObj.endLongTouch = endLongTouch;
            displayObj.thisObj = thisObj;
            displayObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, MyUIUtils.longTouchBegin, displayObj);
        };
        MyUIUtils.longTouchBegin = function (e) {
            egret.clearTimeout(MyUIUtils.timeout);
            MyUIUtils.isLong = false;
            var displayObj = e.currentTarget;
            MyUIUtils.curx = e.stageX;
            MyUIUtils.cury = e.stageY;
            egret.MainContext.instance.stage.once(egret.TouchEvent.TOUCH_END, MyUIUtils.longTouchEnd, this);
            MyUIUtils.timeout = egret.setTimeout(function () {
                MyUIUtils.isLong = true;
                if (displayObj.thisObj == null) {
                    displayObj.startLongouch && displayObj.startLongouch(e);
                }
                else {
                    displayObj.startLongouch && displayObj.startLongouch.call(displayObj.thisObj, e);
                }
            }, this, 350);
        };
        MyUIUtils.longTouchEnd = function (e) {
            egret.clearTimeout(MyUIUtils.timeout);
            var displayObj = this;
            if (MyUIUtils.isLong != true)
                return;
            MyUIUtils.isLong = false;
            if (displayObj.thisObj = null) {
                displayObj.endLongTouch && displayObj.endLongTouch(e);
            }
            else {
                displayObj.endLongTouch && displayObj.endLongTouch.call(displayObj.thisObj, e);
            }
        };
        /**
         * 删除长按监听
         * @param displayObj 删掉监听对象
         */
        MyUIUtils.deleteLongtouch = function (displayObj) {
            displayObj.startLongouch = null;
            displayObj.endLongTouch = null;
            displayObj.thisObj = null;
            displayObj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, MyUIUtils.longTouchBegin, displayObj);
        };
        /**
         * 移除对象
         * @param displayObj 对象
         */
        MyUIUtils.removeDisplayObject = function (displayObj) {
            if (displayObj.parent)
                displayObj.parent.removeChild(displayObj);
        };
        /**
         * 渐变移除对象
         * @param displayObj 对象
         * @param time 时间
         */
        MyUIUtils.removeDisplayObjectForAni = function (displayObj, time) {
            var _this = this;
            if (time === void 0) { time = 500; }
            return new Promise(function (resolve, reject) {
                egret.Tween.get(displayObj).to({ alpha: 0 }, time).call(function () {
                    MyUIUtils.removeDisplayObject(displayObj);
                    resolve();
                }, _this);
            });
        };
        /**
         * 设置一个对象锚点居中
         * @param displayObj  对象
         * @param isMove 是否移动
         */
        MyUIUtils.setAnchorMiddle = function (displayObj, isMove) {
            if (isMove === void 0) { isMove = false; }
            egret.callLater(function () {
                displayObj.anchorOffsetX = displayObj.width / 2;
                displayObj.anchorOffsetY = displayObj.height / 2;
                if (isMove) {
                    displayObj.x = displayObj.x + displayObj.width / 2;
                    displayObj.y = displayObj.y + displayObj.height / 2;
                }
            }, this);
        };
        /**
         * 给按钮添加动画
         * @param p 添加动画对象
         * @param onlyThis  是否是自己本身
         */
        MyUIUtils.addButtonScaleEffects = function (p, onlyThis) {
            if (onlyThis === void 0) { onlyThis = false; }
            if (!p)
                return;
            if (onlyThis) {
                p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, MyUIUtils.onButtonTouchBegan, p);
            }
            else {
                if (egret.is(p, egret.getQualifiedClassName(eui.Button))) {
                    p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, MyUIUtils.onButtonTouchBegan, p);
                }
                else {
                    var len = p['numChildren'];
                    for (var i = 0; i < len; i++) {
                        var ch = p.getChildAt(i);
                        MyUIUtils.addButtonScaleEffects(ch);
                    }
                }
            }
        };
        MyUIUtils.onButtonTouchBegan = function (e) {
            var btn = e.currentTarget;
            egret.Tween.get(btn).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
            SoundManager.getInstance().playEffect(SoundConst.CHECKSTART);
        };
        MyUIUtils.isLong = false;
        return MyUIUtils;
    }());
    core.MyUIUtils = MyUIUtils;
    __reflect(MyUIUtils.prototype, "core.MyUIUtils");
})(core || (core = {}));
//# sourceMappingURL=MyUIUtils.js.map