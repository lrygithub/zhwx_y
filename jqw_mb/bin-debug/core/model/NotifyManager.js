var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var NotifyManager = (function () {
        function NotifyManager() {
            /**通知对象池，以通知类型为key,以回调对象的数组为value */
            this.notifyPool = {};
        }
        NotifyManager.getInstance = function () {
            if (!this._instance)
                this._instance = new NotifyManager();
            return this._instance;
        };
        /**注册通知 */
        NotifyManager.prototype.registerNotify = function (type, callback, callbackobj) {
            if (!this.notifyPool[type])
                this.notifyPool[type] = [];
            this.notifyPool[type].push({ callback: callback, callbackobj: callbackobj });
        };
        /**派发通知 */
        NotifyManager.prototype.sendNotify = function (type, body) {
            if (body === void 0) { body = null; }
            // console.log("派发通知 ",type,body);
            var callbacks = this.notifyPool[type];
            if (callbacks && callbacks.length > 0) {
                // console.log("该通知是有对象要接受的",callbacks);
                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i].callback.apply(callbacks[i].callbackobj, [body]);
                }
            }
        };
        /**移除某对象上的所有注册通知 */
        NotifyManager.prototype.removeRegister = function (obj) {
            // console.log("移除通知注册  ",obj);
            for (var type in this.notifyPool) {
                var callbacks = this.notifyPool[type];
                if (callbacks && callbacks.length > 0) {
                    for (var i = 0; i < callbacks.length; i++) {
                        if (callbacks[i].callbackobj == obj) {
                            callbacks.splice(i--, 1);
                        }
                    }
                    if (callbacks.length == 0) {
                        delete this.notifyPool[type];
                    }
                }
            }
        };
        return NotifyManager;
    }());
    core.NotifyManager = NotifyManager;
    __reflect(NotifyManager.prototype, "core.NotifyManager");
})(core || (core = {}));
//# sourceMappingURL=NotifyManager.js.map