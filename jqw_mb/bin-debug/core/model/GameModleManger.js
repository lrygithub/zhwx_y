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
var GameModleManger = (function (_super) {
    __extends(GameModleManger, _super);
    function GameModleManger() {
        return _super.call(this) || this;
    }
    GameModleManger.getInstance = function () {
        if (!this._instance) {
            this._instance = new GameModleManger();
        }
        return this._instance;
    };
    /**
     * 初始化引擎所需模块
     */
    GameModleManger.prototype.init = function (stage) {
        //键盘初始化
        KeyBoardManager.getInstance().init();
        //鼠标检测
        // mouse.enable(stage);
        // mouse.setMouseMoveEnabled(true);
        //mouse.setMouseMoveEnabled(true);
        //初始化层级
        var loot = new eui.UILayer();
        stage.addChild(loot);
        core.LayerManager.getInstance().initLayer(loot);
        //初始化帧回掉管理器
        core.FrameEventCenter.getInstance().init(stage);
        core.DateTimer.instance.run();
        //实例化模块控制数据
        this.moduleMap = new Dictionary();
        //sound
        SoundManager.getInstance().loadLocalData();
        //开启hashcount检测
        this.startCheckHashCount();
        //界面尺寸改变提示器
        LayerSetManager.getInstance().init();
        //初始化网络参数
        GameConfig.CasinoGame = window['CasinoGame'];
        //
        //初始化网络
        //sockets.SocketMananger.getInstance().connectServer();
        //   egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END,()=>{
        // 	  console.log('ssss');
        // 	  window['screenfull'].request();
        //   },this);
    };
    /**
     * 启动hashcount检测
     */
    GameModleManger.prototype.startCheckHashCount = function () {
        var count = egret.$hashCount;
        setInterval(function () {
            var newCount = egret.$hashCount;
            var diff = newCount - count;
            count = newCount;
            if (diff > 100) {
                console.log('性能消耗过大->' + diff);
            }
        }, 1000);
    };
    /**
     * 得到某一个模块
     */
    GameModleManger.prototype.getModle = function (key) {
        if (key === void 0) { key = core.ModleConst.COMMON_MODLE; }
        if (!this.moduleMap[key]) {
            var cls = egret.getDefinitionByName(key);
            this.moduleMap[key] = new cls();
        }
        return this.moduleMap[key];
    };
    return GameModleManger;
}(egret.EventDispatcher));
__reflect(GameModleManger.prototype, "GameModleManger");
//# sourceMappingURL=GameModleManger.js.map