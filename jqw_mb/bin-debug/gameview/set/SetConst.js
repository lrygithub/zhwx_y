var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SetConst = (function () {
    function SetConst() {
    }
    SetConst.TOP_SHOW = false;
    SetConst.RIGHT_SHOW = false;
    SetConst.Break_Line_Reconnection = false;
    /**
     * 记录是否在免费还是在普通游戏
     * false 代表在普通游戏
     * true 代表在免费游戏
     */
    SetConst.Free_ordinary = false;
    /**
     * 记录starbtn按钮是否处于奖励事件
     */
    SetConst.STAR_BTN_SHOW = false;
    /**
    * 记录freestarbtn按钮是否处于奖励事件
    */
    SetConst.freeSTAR_BTN_SHOW = false;
    /**
     * 该变量记录betset界面是否打开 false为关闭 true为开启
     */
    SetConst.BETSET_SHOW = false;
    /**
     * 该变量记录AUTO界面是否打开 false为关闭 true为开启
    */
    SetConst.AUTO_SHOW = false;
    /**
     * 记录 controllGroup和controllGroup1  false为controllGroup打开，true为controllGroup1打开
     */
    SetConst.Whetherornot_Open = false;
    /**
     * 该变量记录set界面是否打开 false为关闭 true为开启
    */
    SetConst.SET_SHOW = false;
    SetConst.LONG_TOUCH = false;
    /**
     * 记录免费游戏界面是否开启
     */
    SetConst.SET_FreeGame_interface = false;
    /**
     * 记录是否处于	免费游戏结算界面
     */
    SetConst.SET_FreeGame_settlement = false;
    /**
     * 该变量记录信息界面是否打开 false为关闭 true为开启
    */
    SetConst.SET_INFO = false;
    SetConst.REWARD_SHOW = false;
    SetConst.REWARD_SMALLSHOW = false;
    /**
     * 记录 setui 里面 controllGroup1里面 one 或 two
     * true 为 two   false为one
     */
    SetConst.ONE_TWO = false;
    /**
     * 是否手动中断自动完成
     */
    SetConst.handStop = false;
    /**
     * 是否能中断游戏
     */
    SetConst.isCanStopGame = false;
    /**
     * 快速是否提示过
     */
    SetConst.QUIKTIP_SHOW = false;
    /**
     * 记录 按钮是否隐藏，在免费游戏时这些要隐藏
     */
    SetConst.SET_Button_VIS = false;
    /**
     * 0代表右手 1代表左手
     */
    SetConst.MODLE = 0;
    /**
     * 快速模式
     */
    SetConst.SPEED_PLAY = false;
    /**
     * 自动状态
     */
    SetConst.AUTO = false;
    /**
     * 自动次数
     */
    SetConst.AUTO_COUNT = 0;
    /**
     * 自动设置数组
     */
    SetConst.AUTO_COUNT_ARR = [10, 20, 30, 40, 50, 60, 70, 80, 90, 99, 100];
    return SetConst;
}());
__reflect(SetConst.prototype, "SetConst");
//# sourceMappingURL=SetConst.js.map