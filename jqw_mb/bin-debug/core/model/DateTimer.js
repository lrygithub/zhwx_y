var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * 时间管理器
     */
    var DateTimer = (function () {
        function DateTimer() {
            /**
             * 时间差
             */
            this._deltaTime = 0;
            if (DateTimer._instance) {
                throw new Error("DateTimer使用单例");
            }
        }
        Object.defineProperty(DateTimer, "instance", {
            get: function () {
                if (!DateTimer._instance) {
                    DateTimer._instance = new DateTimer();
                }
                return DateTimer._instance;
            },
            enumerable: true,
            configurable: true
        });
        DateTimer.prototype.run = function () {
            this._deltaTime = 0;
        };
        Object.defineProperty(DateTimer, "deltatime", {
            /**
             * 得到延迟时间
             */
            get: function () {
                return DateTimer.instance._deltaTime;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新服务器时间
         */
        DateTimer.prototype.updateServerTime = function (val) {
            this._deltaTime = egret.getTimer() - val * 1000;
        };
        Object.defineProperty(DateTimer.prototype, "now", {
            /**
             * 得到现在时间
             */
            get: function () {
                return Math.floor((egret.getTimer() - this._deltaTime) / 1000);
            },
            enumerable: true,
            configurable: true
        });
        return DateTimer;
    }());
    core.DateTimer = DateTimer;
    __reflect(DateTimer.prototype, "core.DateTimer");
})(core || (core = {}));
//# sourceMappingURL=DateTimer.js.map