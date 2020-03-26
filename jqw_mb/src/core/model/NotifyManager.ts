module core
{
   export class NotifyManager 
   {
		private static _instance: NotifyManager;
		public constructor() {
		}
		public static getInstance(): NotifyManager
		{
			if(!this._instance) this._instance = new NotifyManager();
			return this._instance;
		}

		/**通知对象池，以通知类型为key,以回调对象的数组为value */
		private notifyPool = {};

		/**注册通知 */
		public registerNotify(type:string, callback:Function, callbackobj:any)
		{
			if(!this.notifyPool[type]) this.notifyPool[type] = [];
			this.notifyPool[type].push({callback: callback, callbackobj: callbackobj});
		}
		/**派发通知 */
		public sendNotify(type:string, body:any=null)
		{
			// console.log("派发通知 ",type,body);
			let callbacks:Array<any> = this.notifyPool[type];
			if(callbacks && callbacks.length>0)
			{
				// console.log("该通知是有对象要接受的",callbacks);
				for(let i=0; i<callbacks.length; i++)
				{
					(<Function>callbacks[i].callback).apply(callbacks[i].callbackobj, [body]);
				}
			}
		} 
		/**移除某对象上的所有注册通知 */
		public removeRegister(obj:any)
		{
			// console.log("移除通知注册  ",obj);
			for(let type in this.notifyPool)
			{
				let callbacks:Array<any> = this.notifyPool[type];
				if(callbacks && callbacks.length>0)
				{
					for(let i=0; i<callbacks.length; i++)
					{
						if(callbacks[i].callbackobj == obj)
						{
							callbacks.splice(i--,1);
						}
					}

					if(callbacks.length == 0)
					{
						delete this.notifyPool[type];
					}
				}
			}
		}
   }
}
