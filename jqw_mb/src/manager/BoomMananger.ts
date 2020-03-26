class BoomMananger extends egret.EventDispatcher {
	public mcPool: any={};
	public curPool: any={};
	public constructor() {
		super();
	}

	private static _instance: BoomMananger;
	public static getInstance(): BoomMananger {
		if (!this._instance) {
			this._instance = new BoomMananger();
		}
		return this._instance;
	}

	public createMC(name: any): egret.MovieClip {
		let mc: any;
		if (this.mcPool[name] && this.mcPool[name].length > 0) {
			mc = this.mcPool[name].pop();
		}
		else {
			mc = game.MCUtils.getMc(name);
		}
		mc.isDie = false;
		if (!this.curPool[name]) {
			this.curPool[name] = [];
		}
		this.curPool[name].push(mc);
		return mc;
	}

	public onUpdata(): void {
		for (let key in this.curPool) {
			let arr: Array<any> = this.curPool[key];
			for (let i: number = 0; i < arr.length; i++) {
				if (arr[i].isDie) {
					let s: any = arr.splice(i, 1);
					if (!this.mcPool[key]) {
						 this.mcPool[key]=[];
					}
					this.mcPool[key].unShift(s);
				}
			}
		}
	}
}