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
var core;
(function (core) {
    var LoadManger = (function (_super) {
        __extends(LoadManger, _super);
        function LoadManger() {
            return _super.call(this) || this;
        }
        LoadManger.getInstance = function () {
            if (!this.instance) {
                this.instance = new LoadManger();
            }
            return this.instance;
        };
        /**
         * 加载的组名   回掉方法，回掉对象
         */
        LoadManger.prototype.loadGroup = function (clsKey, groupName, callBackFunc, callBackObj) {
            if (clsKey === void 0) { clsKey = core.UIConst.NomalLoadingUI; }
            if (!RES.isGroupLoaded(groupName)) {
                core.UIManager.openUI(clsKey, core.LayerManager.Layer_Top);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, function (e) {
                    var ui = core.UIManager.getUI(clsKey);
                    ui.setPross(e.itemsLoaded, e.itemsTotal);
                    //console.log(e.itemsLoaded+'/'+e.itemsTotal);
                }, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function (e) {
                    if (e.groupName == groupName) {
                        callBackFunc.call(callBackObj);
                        var ui = core.UIManager.getUI(clsKey);
                        core.UIManager.closeUI(clsKey);
                    }
                }, this);
                RES.loadGroup(groupName);
            }
            else {
                callBackFunc.call(callBackObj);
            }
        };
        return LoadManger;
    }(egret.EventDispatcher));
    core.LoadManger = LoadManger;
    __reflect(LoadManger.prototype, "core.LoadManger");
})(core || (core = {}));
//# sourceMappingURL=LoadManger.js.map