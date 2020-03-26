module core {
    /**
     * @param createUserName lry
     * @param crateDay 2019.3.29
     */
    export class MyUIUtils {
        /**
         * 长按监听
         * @param displayObj 对象
         * @param startLongouch 长安开始
         * @param endLongTouch 长按结束
         * @param thisObj 回掉对象
         */
        public static addLongTouch(displayObj: any, startLongouch: any, endLongTouch: any, thisObj: any = null): void {
            displayObj.startLongouch = startLongouch;
            displayObj.endLongTouch = endLongTouch;
            displayObj.thisObj = thisObj;
            displayObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, MyUIUtils.longTouchBegin, displayObj);
        }

        private static timeout: any;
        private static curx: number;
        private static cury: number;
        private static isLong: boolean = false;
        private static longTouchBegin(e: egret.TouchEvent): void {
            egret.clearTimeout(MyUIUtils.timeout);
            MyUIUtils.isLong = false;
            let displayObj = e.currentTarget;
            MyUIUtils.curx = e.stageX;
            MyUIUtils.cury = e.stageY;
            egret.MainContext.instance.stage.once(egret.TouchEvent.TOUCH_END, MyUIUtils.longTouchEnd, this);
            MyUIUtils.timeout = egret.setTimeout(() => {
                MyUIUtils.isLong = true;
                if (displayObj.thisObj == null) {
                    displayObj.startLongouch && displayObj.startLongouch(e);
                }
                else {
                    displayObj.startLongouch && displayObj.startLongouch.call(displayObj.thisObj, e);
                }
            }, this, 350);
        }

        private static longTouchEnd(e: egret.TouchEvent): void {
            egret.clearTimeout(MyUIUtils.timeout);
            let displayObj: any = this;
            if (MyUIUtils.isLong != true) return;
            MyUIUtils.isLong = false;
            if (displayObj.thisObj = null) {
                displayObj.endLongTouch && displayObj.endLongTouch(e);
            }
            else {
                displayObj.endLongTouch && displayObj.endLongTouch.call(displayObj.thisObj, e);
            }
        }
        /**
         * 删除长按监听
         * @param displayObj 删掉监听对象
         */
        public static deleteLongtouch(displayObj: any): void {
            displayObj.startLongouch = null;
            displayObj.endLongTouch = null;
            displayObj.thisObj = null;
            displayObj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, MyUIUtils.longTouchBegin, displayObj);
        }
        /**
         * 移除对象
         * @param displayObj 对象
         */
        public static removeDisplayObject(displayObj: egret.DisplayObject | egret.DisplayObjectContainer): void {
            if (displayObj.parent) displayObj.parent.removeChild(displayObj);
        }
        /**
         * 渐变移除对象
         * @param displayObj 对象
         * @param time 时间
         */
        public static removeDisplayObjectForAni(displayObj: egret.DisplayObject | egret.DisplayObjectContainer, time: number = 500) {
            return new Promise(
                (resolve, reject) => {
                    egret.Tween.get(displayObj).to({ alpha: 0 }, time).call(() => {
                        MyUIUtils.removeDisplayObject(displayObj);
                        resolve();
                    }, this);
                }
            );
        }
        /**
         * 设置一个对象锚点居中
         * @param displayObj  对象
         * @param isMove 是否移动
         */
        public static setAnchorMiddle(displayObj: egret.DisplayObject | egret.DisplayObjectContainer, isMove = false): void {
            egret.callLater(() => {
                displayObj.anchorOffsetX = displayObj.width / 2;
                displayObj.anchorOffsetY = displayObj.height / 2;
                if (isMove) {
                    displayObj.x = displayObj.x + displayObj.width / 2;
                    displayObj.y = displayObj.y + displayObj.height / 2;
                }
            }, this);
        }

        /**
         * 给按钮添加动画
         * @param p 添加动画对象
         * @param onlyThis  是否是自己本身
         */
        public static addButtonScaleEffects(p, onlyThis: boolean = false) {
            if (!p) return;
            if (onlyThis) {
                p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, MyUIUtils.onButtonTouchBegan, p);
            } else {
                if (egret.is(p, egret.getQualifiedClassName(eui.Button))) {
                    p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, MyUIUtils.onButtonTouchBegan, p);
                } else {
                    var len = (<egret.DisplayObjectContainer>p)['numChildren'];
                    for (var i = 0; i < len; i++) {
                        var ch: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>(<egret.DisplayObjectContainer>p).getChildAt(i);
                        MyUIUtils.addButtonScaleEffects(ch);
                    }
                }
            }
        }

        private static onButtonTouchBegan(e: egret.TouchEvent): void {
            var btn = e.currentTarget;
            egret.Tween.get(btn).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
            SoundManager.getInstance().playEffect(SoundConst.CHECKSTART);
        }
    }
}