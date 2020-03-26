var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var UIManager = (function () {
        function UIManager() {
        }
        /**打开一个UI */
        UIManager.openUI = function (name, layer, showType) {
            if (layer === void 0) { layer = core.LayerManager.Layer_UI; }
            if (showType === void 0) { showType = 0; }
            if (layer == core.LayerManager.Layer_UI)
                this.checkLastUI();
            /**根据ui名获取UI */
            var ui;
            if (this.pool[name]) {
                ui = this.pool[name];
                UIManager.showUI(ui, layer, showType);
            }
            else {
                var cls = egret.getDefinitionByName(name);
                ui = new cls();
                ui.layer = layer;
                this.pool[name] = ui;
                UIManager.showUI(ui, layer, showType);
                core.LayerManager.getInstance().addUI(ui, layer);
            }
        };
        //如果要在UI层打开新UI，关闭之前的UI层的UI
        UIManager.checkLastUI = function () {
            for (var key in this.pool) {
                var poolUI = this.pool[key];
                if (poolUI.layer == core.LayerManager.Layer_UI && poolUI.isShow) {
                    poolUI.close();
                }
            }
        };
        /**判断某个UI是否打开 */
        UIManager.isUIOpen = function (name) {
            if (this.pool[name]) {
                return this.pool[name].isShow;
            }
            return false;
        };
        /**
         * 得到ui实例
         */
        UIManager.getUI = function (name) {
            if (this.pool[name]) {
                return UIManager.pool[name];
            }
            return null;
        };
        /**关闭指定的UI */
        UIManager.closeUI = function (name) {
            if (this.pool[name]) {
                this.pool[name].close();
            }
        };
        UIManager.showUI = function (ui, layer, showType) {
            if (showType === void 0) { showType = 0; }
            //ui.scaleX=0;
            //ui.scaleY=0;
            core.LayerManager.getInstance().addUI(ui, layer);
            ui.validateNow();
            ui.anchorOffsetX = ui.width / 2;
            ui.anchorOffsetY = ui.height / 2;
            var midlex = GameConfig.WIDTH / 2;
            var midley = GameConfig.HEIGHT / 2;
            ui.x = midlex;
            ui.y = midley;
            switch (showType) {
                case 0:
                    ui.scaleX = 1;
                    ui.scaleY = 1;
                    break;
                case 1:
                    egret.Tween.get(ui).to({ scaleX: 1, scaleY: 1 }, 500);
                    break;
                case 2:
                    break;
            }
            ui.x = 0;
            ui.y = 0;
        };
        /**存放打开过的UI */
        UIManager.pool = {};
        return UIManager;
    }());
    core.UIManager = UIManager;
    __reflect(UIManager.prototype, "core.UIManager");
})(core || (core = {}));
//# sourceMappingURL=UIManager.js.map