module core
{
	/**
	 * 时间管理器
	 */
 export	class DateTimer {
		private static _instance: DateTimer;

		public constructor() {
			if (DateTimer._instance) {
				throw new Error("DateTimer使用单例");
			}
		}

		public static get instance(): DateTimer {
			if (!DateTimer._instance) {
				DateTimer._instance = new DateTimer();
			}
			return DateTimer._instance;
		}
      
		public run():void
		{
			this._deltaTime=0;
		}
       
	   /**
		* 时间差
	    */
		private _deltaTime: number = 0;
        /**
		 * 得到延迟时间
		 */
		public static get deltatime() 
		{
			return DateTimer.instance._deltaTime;
		}
        /**
		 * 更新服务器时间
		 */
		public updateServerTime(val: number) 
		{
			this._deltaTime = egret.getTimer() - val*1000;
		}
        /**
		 * 得到现在时间
		 */
		public get now()
		 {
			return Math.floor((egret.getTimer() - this._deltaTime) / 1000);
		}
	}
}