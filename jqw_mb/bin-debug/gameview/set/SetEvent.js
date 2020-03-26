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
var SetEvent = (function (_super) {
    __extends(SetEvent, _super);
    function SetEvent(type, bubbles, cancelable, data) {
        return _super.call(this, type, bubbles, cancelable, data) || this;
    }
    SetEvent.SET_MODLE = 'SET_MODLE';
    SetEvent.SET_OR_CHANGE = 'SET_OR_CHANGE';
    SetEvent.SET_STATE_CHANGE = 'SET_STATE_CHANGE';
    SetEvent.SET_START = 'SET_START';
    SetEvent.SET_freeSTART = 'SET_freeSTART';
    SetEvent.SET_STOP = 'SET_STOP';
    SetEvent.SET_AUTO_CHANGED = 'SET_AUTO_CHANGED';
    /**
     * 快速按键事件
     */
    SetEvent.SET_SPEED_CHANGED = 'SET_SPEED_CHANGED';
    /**
     * 点击加减注数事件
     */
    SetEvent.SET_BET_CHANGE = 'SET_BET_CHANGE';
    SetEvent.SET_LINE_CHANGE = 'SET_LINE_CHANGE';
    SetEvent.SET_BALANCE_CHANGE = 'SET_BALANCE_CHANGE';
    SetEvent.SET_MUSIC_CHANGE = 'SET_MUSIC_CHANGE';
    SetEvent.SET_HIDE_REWARD = 'SET_HIDE_REWARD';
    /**
     * 出3个牌子，把出牌子这一轮的奖励播放完之后，发送的事件
     */
    SetEvent.SET_PAI_OVER_CHANGE = 'SET_PAIOVER_CHANGE';
    /**
     * 中奖事件
     */
    SetEvent.SET_Reward_CHANGE = 'SET_Reward_CHANGE';
    /**
    * 中奖事件
     */
    SetEvent.freeSET_Reward_CHANGE = 'freeSET_Reward_CHANGE';
    /**
     * 动画界面展示完毕，准备旋转免费游戏
     */
    SetEvent.SET_AamOver = 'SET_AamOver';
    /**
     * 免费游戏结束事件
     */
    SetEvent.SET_FREE_Over = 'SET_FREE_Over';
    return SetEvent;
}(egret.Event));
__reflect(SetEvent.prototype, "SetEvent");
//# sourceMappingURL=SetEvent.js.map