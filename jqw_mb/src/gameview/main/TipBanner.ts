class TipBanner extends eui.Component {
	public addBtn: MouseButton;
	public subBtn: MouseButton;
	public KGroup: eui.Group;
	public itemArr: Array<TipItem> = [];
	public index: number = 0;
	public jiange: number = 22;
	public constructor() {
		super();
	}

	public childrenCreated(): void {
		super.childrenCreated();
		this.subBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
		this.updataUI();
	}

	public updataHor(): void {
		this.index=this.itemArr.length>4?this.itemArr.length-4:0;
		let qy:number=3*98+this.index*98;
        for(let i:number=0;i<this.itemArr.length;i++)
		{
			this.itemArr[i].y=qy-i*this.itemArr[i].height;
			this.itemArr[i].x=0;
		}
		this.updataUI();
	}

	public updataVer(): void {
       this.index=this.itemArr.length>3?this.itemArr.length-3:0;
		let qx:number=-this.index*(225+22);
        for(let i:number=0;i<this.itemArr.length;i++)
		{
			this.itemArr[i].x=qx+i*(this.itemArr[i].width+22);
			this.itemArr[i].y=0;
		}
		this.updataUI();
	}





	public showItem(data: any): void {
		let lastItem: TipItem = this.itemArr.length > 0 ? this.itemArr[this.itemArr.length - 1] : null;
		let item: TipItem = new TipItem();
		item.setData(data);
		this.itemArr.push(item);
		this.KGroup.addChild(item);
		let ishor: boolean = window.innerWidth > window.innerHeight ? true : false;
		let showNum: number = ishor ? 4 : 3;
		item.y = ishor ? (showNum - this.itemArr.length) * item.height : 0;
		if (item.y < 0) item.y = 0;
		item.x = ishor ? -300 : 800;
		let tx: number;
		if (this.itemArr.length > showNum) {
			for (let i: number = 0; i < this.itemArr.length - 1; i++) {
				let items: TipItem = this.itemArr[i];
				let tys: number = items.y + items.height;
				let txs: number = items.x - items.width - this.jiange;
				if (ishor) {
					egret.Tween.get(items).to({ y: tys }, 200);
				}
				else {
					egret.Tween.get(items).to({ x: txs }, 200);
				}
			}
			this.index++;
			this.subBtn.visible = true;
			this.subBtn.enabled = false;
			tx = ishor ? 0 : (showNum - 1) * item.width + this.jiange + this.jiange;
			egret.Tween.get(item).to({ x: tx }, 200);
		}
		else {
			tx = ishor ? 0 : (this.itemArr.length - 1) * (item.width + this.jiange);
			egret.Tween.get(item).to({ x: tx }, 200);
		}

	}

	public clear(): void {
		this.itemArr.length = 0;
		this.index = 0;
		for (let i: number = 0; i < this.KGroup.numChildren; i++) {
			let item: TipItem = this.KGroup.getChildAt(i) as TipItem;
			item.visible = false;
		}
		this.addBtn.visible = this.subBtn.visible = false;
	}

	public updataUI(isa: boolean = false): void {
		let s: number = this.currentState == 'hor' ? 4 : 3;
		this.addBtn.visible = this.subBtn.visible = this.itemArr.length > s;
		this.subBtn.enabled = this.index > 0 ? true : false;
		this.addBtn.enabled = this.index < this.itemArr.length - s ? true : false;
	}

	public onTab(e: egret.TouchEvent): void {
		let s: number = this.currentState == 'hor' ? 4 : 3;
		switch (e.currentTarget) {
			case this.subBtn:
				if (this.index > 0) {
					this.index--;
					this.sub();
				}
				this.subBtn.enabled = this.index > 0 ? true : false;
				this.addBtn.enabled = this.index < this.itemArr.length - s ? true : false;
				break;
			case this.addBtn:
				if (this.index < this.itemArr.length - s) {
					this.index++;
					this.add();
				}
				this.subBtn.enabled = this.index > 0 ? true : false;
				this.addBtn.enabled = this.index < this.itemArr.length - s ? true : false;
				break;
		}
	}


	private sub(): void {
		for (let i: number = 0; i < this.itemArr.length; i++) {
			if (this.currentState == 'hor') {
              this.itemArr[i].y-=this.itemArr[i].height;
			}
			else {
				this.itemArr[i].x += this.itemArr[i].width+this.jiange;
			}
		}
	}

	private add(): void {
	for (let i: number = 0; i < this.itemArr.length; i++) {
			if (this.currentState == 'hor') {
              this.itemArr[i].y+=this.itemArr[i].height;
			}
			else {
				this.itemArr[i].x -= this.itemArr[i].width+this.jiange;
			}
		}
	}


}