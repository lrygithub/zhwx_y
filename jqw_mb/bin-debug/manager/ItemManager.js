// class ItemManager extends egret.EventDispatcher {
// 	public itemPool: Array<Item>;
// 	public curPool: Array<Item>;
// 	public constructor() {
// 		super();
// 		this.itemPool = [];
// 		this.curPool = [];
// 	}
// 	private static _instance: ItemManager;
// 	public static getInstance(): ItemManager {
// 		if (!this._instance) {
// 			this._instance = new ItemManager();
// 		}
// 		return this._instance;
// 	}
// 	public createItem(): Item {
// 		let item: Item = this.itemPool.pop();
// 		if (!item) {
// 			item = new Item();
// 		}
// 		item.reset();
// 		this.curPool.push(item);
// 		return item;
// 	}
//     /**
// 	 * 每帧更新
// 	 */
// 	public updata(): void {
// 		let n: number = 0;
// 		for (let i: number = 0; i < this.curPool.length; i++) {
// 			let item: Item = this.curPool[i];
// 			item.onFrame();
// 			if (item.isDie) {
// 				this.curPool.splice(i, 1);
// 				this.itemPool.unshift(item);
// 				if(item.parent)
// 				{
// 					item.parent.removeChild(item);
// 				}
// 			}
// 		}
// 	}
// } 
//# sourceMappingURL=ItemManager.js.map