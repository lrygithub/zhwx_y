
module vo {
    /**
	 * 游戏数据总集合
	 */
	export class GameData {
		/**
		 * 初始化数据存入
		 */
		public static initData: any;
		/**
		 * 结果数据存入
		 */
		public static resultData: any;
		/**
		 * 玩家余额
		 */
		public static balance: number = 549.88;
		/**
		 * 当前自动次数
		 */
		public static autoPlayCount: number = 0;

		
		/**
		 * 当前老虎机数据
		 */
		public static slotInfo: SlotInfo;

	/**
		 * 赔付表
		 */
		public static payData: Array<any> = [];
        /**
		 * 下注数组
		 */
		public static betScoreArr: Array<any> = [0.05,0.10,0.50,1.00,2.50,3.75,5.00,10.00,20.00,25.00,50.00,100.00];
		//public static betScoreArr:Array<any>=['1.00','2.00','3.00','4.00','5.00','10.00','15.00','20.00','25.00','30.00','35.00','40.00','45.00','50.00','75.00','100.00','150.00','200.00','250.00','300.00','350.00','400.00','450.00','500.00','600.00','700.00','800.00','900.00','1000.00'];
		/**
		 * 投注索引
		 */
		public static betIndex: number = 0;

   
		/**
		 * 线数
		 */
		public static line:number=9;

		/**
		 * 线配置
		 */
		public static lineObj:any={
			1:[1,1,1,1,1],
			2:[0,0,0,0,0],
			3:[2,2,2,2,2],
			4:[0,1,2,1,0],
			5:[2,1,0,1,2],
			6:[0,0,1,0,0],
			7:[2,2,1,2,2],
			8:[1,0,0,0,1],
			9:[1,2,2,2,1]
		}

		public static autoCountArr: Array<any> = [10,25,50,99];
		public static autoCountIndex: number = 0;

		public static desArr:Array<string>=['继续玩!','加油!','火热奖金等着您!','赢不停!','炸出通向大奖的路!','爆炸5个或更多来赢奖!'];
		/**
		 * 滚动列表
		 */
		public static reelArr: Array<Array<any>> = [
			['M4', 'WW', 'M3', 'M5', 'M0', 'M3', 'M2', 'M3', 'M4', 'M1', 'M1', 'M2', 'WW', 'M1'],
			['M4', 'M1', 'M3', 'M1', 'M1', 'M2', 'M6', 'M4', 'M1', 'M2', 'M3', 'M4', 'M4', 'M2'],
			['M4', 'WW', 'M2', 'M3', 'M1', 'M0', 'M3', 'M2', 'WW', 'WW', 'M3', 'M1', 'WW', 'M3'],
		];

	}

	/**
	 * 基本信息结构
	 */
	export class BaseInfo {
		constructor() {
		}
		public readData(obj: any) {
		}
	}

	/**
	 * 老虎机数据
	 */
	export class SlotInfo extends BaseInfo {
		constructor() {
			super();
		}
		/**
		 * 滚轮的最终结果
		 */
		public resultArr: Array<any> = [
		
		];
		public indexArr: Array<number> = [];
        /**
		 * 总获胜
		 */
		public allwin: number = 0;
		public readData(obj: any) {

		}

		/**
		 * 读取开始游戏返回数据
		 */
		public readPlayAction(data: any): void {

		}

	}
}


