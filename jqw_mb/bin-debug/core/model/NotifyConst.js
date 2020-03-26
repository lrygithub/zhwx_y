var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var NotifyConst = (function () {
        function NotifyConst() {
        }
        NotifyConst.HEART_CHECK = "HEART_CHECK";
        /**
         * 启动重连
         */
        NotifyConst.RECONETING = 'RECONETING';
        /**
         * 重连成功
         */
        NotifyConst.RECONET_SUC = 'RECONET_SUC';
        NotifyConst.WX_JSSDK_CONFIG = "WX_JSSDK_CONFIG";
        /**
         * 消除
         */
        NotifyConst.LOGIC_XIAOCHU = 'LOGIC_XIAOCHU';
        /**
         * 掉落
         */
        NotifyConst.LOGIC_DROP = 'LOGIC_DROP';
        /**
         * 数据改变
         */
        NotifyConst.LOGIC_DATACHANGE = 'LOGIC_DATACHANGE';
        /**
         * 余额改变
         */
        NotifyConst.LOGIC_BALANCE = 'LOGIC_BALANCE';
        /**
         * 当局结束
         */
        NotifyConst.LOGIC_ROUNDOVER = 'LOGIC_ROUNDOVER';
        /**
         * 当局开始
         */
        NotifyConst.LOGIC_ROUNDSTART = 'LOGIC_ROUNDSTART';
        /**
         * 初始化
         */
        NotifyConst.NET_INIT = 'Initial';
        /**
         * 开始
         */
        NotifyConst.NET_PLAY = 'Play';
        /**
         * TouchToken
         */
        NotifyConst.NET_TOUCHTOKEN = 'TouchToken';
        return NotifyConst;
    }());
    core.NotifyConst = NotifyConst;
    __reflect(NotifyConst.prototype, "core.NotifyConst");
})(core || (core = {}));
//# sourceMappingURL=NotifyConst.js.map