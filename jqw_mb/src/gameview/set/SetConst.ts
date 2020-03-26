class SetConst {
	public static TOP_SHOW: boolean = false;
	public static RIGHT_SHOW: boolean = false;

	public static Break_Line_Reconnection: boolean = false;

	/**
	 * 记录是否在免费还是在普通游戏
	 * false 代表在普通游戏
	 * true 代表在免费游戏
	 */
	public static Free_ordinary: boolean = false;

	/**
	 * 记录starbtn按钮是否处于奖励事件
	 */
	public static STAR_BTN_SHOW: boolean = false;
	/**
 	* 记录freestarbtn按钮是否处于奖励事件
 	*/
	public static freeSTAR_BTN_SHOW: boolean = false;

	/**
	 * 该变量记录betset界面是否打开 false为关闭 true为开启
	 */
	public static BETSET_SHOW: boolean = false;
	/**
	 * 该变量记录AUTO界面是否打开 false为关闭 true为开启
 	*/
	public static AUTO_SHOW: boolean = false;

	/**
	 * 记录 controllGroup和controllGroup1  false为controllGroup打开，true为controllGroup1打开
	 */
	public static Whetherornot_Open: boolean = false;
	/**
	 * 该变量记录set界面是否打开 false为关闭 true为开启
	*/
	public static SET_SHOW: boolean = false;
	public static LONG_TOUCH: boolean = false;
	/**
	 * 记录免费游戏界面是否开启
	 */
	public static SET_FreeGame_interface = false;
	/**
	 * 记录是否处于	免费游戏结算界面
	 */
	public static SET_FreeGame_settlement = false;

	/**
	 * 该变量记录信息界面是否打开 false为关闭 true为开启
	*/
	public static SET_INFO: boolean = false;

	public static REWARD_SHOW: boolean = false;
	public static REWARD_SMALLSHOW: boolean = false;
	/**
	 * 记录 setui 里面 controllGroup1里面 one 或 two 
	 * true 为 two   false为one
	 */
	public static ONE_TWO: boolean = false;
	/**
	 * 是否手动中断自动完成
	 */
	public static handStop: boolean = false;
	/**
	 * 是否能中断游戏
	 */
	public static isCanStopGame: boolean = false;

	/**
	 * 快速是否提示过
	 */
	public static QUIKTIP_SHOW: boolean = false;
	/**
	 * 记录 按钮是否隐藏，在免费游戏时这些要隐藏
	 */
	public static SET_Button_VIS = false;

    /**
	 * 0代表右手 1代表左手
	 */
	public static MODLE: number = 0;
	/**
	 * 快速模式
	 */
	public static SPEED_PLAY: boolean = false;
	/**
	 * 自动状态
	 */
	public static AUTO: boolean = false;

	/**
	 * 自动次数
	 */
	public static AUTO_COUNT: number = 0;
	/**
	 * 自动设置数组
	 */
	public static AUTO_COUNT_ARR: Array<number> = [10, 20, 30, 40, 50, 60, 70, 80, 90, 99, 100];
}