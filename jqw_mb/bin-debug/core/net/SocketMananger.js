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
var sockets;
(function (sockets) {
    var SocketMananger = (function (_super) {
        __extends(SocketMananger, _super);
        function SocketMananger() {
            var _this = _super.call(this) || this;
            _this.url = GameConfig.CasinoGame.UrlBase;
            /**
             * 网络状态 0代表网络正常  -1代表断网    1代表重连
             */
            _this.netState = -1;
            _this.reconetCount = 0;
            _this.reconetMaxCount = 3;
            _this.isTips = false;
            return _this;
        }
        SocketMananger.getInstance = function () {
            if (!this._instance) {
                this._instance = new SocketMananger();
            }
            return this._instance;
        };
        SocketMananger.prototype.init = function () {
            var _this = this;
            this.heart = new HeartCheck(this);
            this.sock.on('connect', this.onSocketOpen.bind(this));
            this.sock.on('disconnect', this.onSocketClose.bind(this));
            this.sock.on('connect_error', function () {
                if (_this.isTips == false) {
                    NetUI.getInstance().showNetting();
                    _this.isTips = true;
                }
            });
            this.sock.on('error', this.onSocketError.bind(this));
            this.sock.on('ResponseResult', this.onReceiveMessage.bind(this));
        };
        SocketMananger.prototype.connectServer = function (callback, callobj) {
            if (callback === void 0) { callback = null; }
            if (callobj === void 0) { callobj = null; }
            NetUI.getInstance().showNetting();
            //core.NotifyManager.getInstance().sendNotify(core.NotifyConst.RECONETING);
            this.callFunction = callback;
            this.callObj = callobj;
            this.sock = io.connect(this.url);
            this.init();
        };
        /**
            * 链接关闭
            */
        SocketMananger.prototype.onSocketClose = function () {
            console.log("连接关闭");
            if (this.isTips == false) {
                NetUI.getInstance().showNetting();
                this.isTips = true;
            }
        };
        /**
         * 链接异常
        */
        SocketMananger.prototype.onSocketError = function () {
            console.log("连接异常");
            if (this.isTips == false) {
                NetUI.getInstance().showNetting();
                this.isTips = true;
            }
        };
        /**
         *
         * 连接成功返回
         */
        SocketMananger.prototype.onSocketOpen = function (data) {
            NetUI.getInstance().hideNetting();
            core.UIManager.closeUI(core.UIConst.NetCloseUI);
            console.log(this.reconetCount == 0 ? "init连接" : 'reconect连接');
            this.heart.reset();
            this.netState = 0;
            this.isTips = false;
            if (this.callFunction && this.callObj && this.reconetCount == 0) {
                this.callFunction.call(this.callObj);
            }
            this.reconetCount += 1;
        };
        /**
         * 消息返回
         */
        SocketMananger.prototype.onReceiveMessage = function (msg) {
            var n = JSON.parse(msg);
            console.log('返回obj', n);
            core.NotifyManager.getInstance().sendNotify(n.Action, n);
        };
        /**
         * 向服务端发送消息和数据
         */
        SocketMananger.prototype.sendMessage = function (data) {
            console.log(data);
            this.sock.emit('Action', JSON.stringify(data));
        };
        /**
         * 重连
         */
        SocketMananger.prototype.reconet = function () {
            var _this = this;
            this.netState = 0;
            this.connectServer(function () {
                _this.netState = 1;
                Commond.index = 0;
                core.NotifyManager.getInstance().sendNotify(core.NotifyConst.RECONET_SUC);
            }, this);
        };
        return SocketMananger;
    }(egret.EventDispatcher));
    sockets.SocketMananger = SocketMananger;
    __reflect(SocketMananger.prototype, "sockets.SocketMananger");
    var HeartCheck = (function () {
        function HeartCheck(manager) {
            this.timeout = GameConfig.CasinoGame.vtoken_interval;
            this.timeoutObj = null;
            this.serverTimeoutObj = null;
            this.manager = manager;
        }
        HeartCheck.prototype.reset = function () {
            //clearTimeout(this.timeoutObj);
            //clearTimeout(this.serverTimeoutObj);
            egret.clearInterval(this.inter);
            this.start();
        };
        HeartCheck.prototype.start = function () {
            this.inter = egret.setInterval(function () {
                Commond.sendHeartCheck();
                // this.serverTimeoutObj = setTimeout(() => {
                // 	sockets.SocketMananger.getInstance().reconet();
                // }, this.timeout);
            }, this, this.timeout * 1000);
        };
        return HeartCheck;
    }());
    __reflect(HeartCheck.prototype, "HeartCheck");
})(sockets || (sockets = {}));
//# sourceMappingURL=SocketMananger.js.map