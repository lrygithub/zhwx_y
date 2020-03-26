class GameConfig {
	public constructor() {
	}
	/**
	 * 分数和钱比例
	 */
	public static bili: number = 10000;
	/**
	* 游戏是真钱模式还是假钱模式
	*/
	public static gameModle: number;
	/**
	 * 自动调整投注
	 */
	public static autoChangeBet: boolean = true;
	/**
	 * 快速玩法状态
	 */
	public static speedPlay: boolean = false;

    /**
	 * 加载
	 */
	public static loadLocalData(): void {

	}
    /**
	 * 设备区域宽度
	 */
	public static get WIDTH(): number {
		return egret.MainContext.instance.stage.stageWidth;
	}
    /**
	 * 设备区域高度
	 */
	public static get HEIGHT(): number {
		return egret.MainContext.instance.stage.stageHeight;
	}

	/**
	 * 最大宽度
	 */
	public static MAX_WIDTH: number = 1920;


    /**
	 * 设计宽度
	 */
	public static DES_WIDTH: number = 1266;
	/**
	 * 设计高度
	 */
	public static DES_HEIGHT: number = 990;
    /**
	 * 方块宽度
	 */
	public static ITEM_W: number = 121;
	/**
	 * 方块高度
	 */
	public static ITEM_H: number = 121;

	/**
	 * 上方掉落相差间隔
	 */
	public static DISTANCE: number = 5;
	/**
	 * col行
	 */
	public static COL: number = 5;
	/**
	 * row列
	 */
	public static ROW: number = 5;


	/**
	 * 当前语言模式
	 */
	public static LANG: string = 'cn';
	/**
	 * 会员账号
	 */
	public static USER_ID: any = '18996802289';
	/**
	 * 昵称
	 */
	public static NICK_NAME: any = '大西瓜';
	/**
	 * 局号
	 */
	public static ACOUNT: number = 5001;
	/**
	 * 比例库
	 */
	public static biliArr: Array<number> = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
	/**
	 * 自动次数配置
	 */
	public static autoPlayArr: Array<number> = [10, 20, 50, 75, 100];

	/**
	 * 语言库
	 */
	public static langObj: any = {
		1:
		{
			cn: '不知道干什么',
			tw: '不知道幹什麼',
			en: 'nothing to do'
		},
		2:
		{
			cn: '背景音乐',
			tw: '背景音樂',
			en: 'bg music'
		},
		3:
		{
			cn: '背景音效',
			tw: '背景音效',
			en: 'effect music'
		},
		4:
		{
			cn: '历史下注记录',
			tw: '歷史下注記錄',
			en: 'history'
		},
		5:
		{
			cn: '规则',
			tw: '規則',
			en: 'rule'
		},
		6:
		{
			cn: '离开',
			tw: '離開',
			en: 'leave'
		},
		7:
		{
			cn: '网络断线，请重新开始游戏或检查连线状态!',
			tw: '網絡斷線，請重新開始遊戲或檢查連線狀態！',
			en: 'Network disconnection, please restart the game or check the connection status!'
		},
		8:
		{
			cn: '继续加油',
			tw: '繼續加油',
			en: 'go on'
		},
		9:
		{
			cn: '不要气馁，好运气快来了',
			tw: '不要氣餒，好運氣快來了',
			en: "Don't be discouraged. Good luck is coming"
		},
		10:
		{
			cn: '好样的',
			tw: '好樣的',
			en: 'Good job'
		}

	};
	/**
	 * 当前网页参数
	 */
	public static CasinoGame = {
		"Game_id": "T5080801001",
		"GameCode": ".",
		"Skin": "normal",
		"Link_auth": "cdd523674989adc72c92eb0cd2b2fb28",
		"UrlBase": "ws://172.104.44.114:8086",
		'PartnerId': 't50',
		"PlayerId": "user-071",
		"Token": "9C0B51CDB6ACD3FACC96C2B13125CCAF",
		"IP": ":",
		"Language": "chs",
		"GameCanvas": "game_block",
		"vtoken_interval": 10,
		"Denom": "32767",
		"guset": "0",
		"crnex": '',
		"UrlRes": ":",
		"udf1": ':',
		"udf2": ':',
		"udf3": '',
		"udf4": '',
		"udf5": '',
		"NjsHost": "172.104.44.114",
		"DebugMode_Init": 'LV1',
		"DebugMode_Play": 'None',
	}

	/**
 * 调试网页参数
 */
	public static CasinoGame0  = {
		"Game_id": "80101001001",
		"GameCode": ":",
		"Skin": "normal",
		"Link_auth": "7b94be8dc53610f046053d2f3791ee5c",
		"UrlBase": "ws:\/\/172.104.33.60:8083",
		'PartnerId': 'pts',
		"PlayerId": "user-096",
		"Token": "84586C2F77BF2F4AE81E84C06F92C762",
		"IP": ":",
		"Language": "chs",
		"GameCanvas": "game_block",
		"vtoken_interval": 10,
		"Denom":  "32767",
		"crnex": '',
		"guest": "0",
		"udf1": "None",
		"udf2": '1552980588',
		"udf3": '',
		"udf4": '',
		"udf5": '',
		"UrlRes": ":",
		"NjsHost": "172.104.33.60"
	}


}