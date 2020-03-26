class CheckBanner extends MyCompoment {
	public betArr: Array<number> = [];
	public btnArr: Array<MosueRadioButton> = [];
	public bGroup: eui.RadioButtonGroup;
	public leftIndex: number = 0;
	public curIndex: number = 0;

	public leftBtn: MouseButton;
	public rightBtn: MouseButton;

	public constructor() {
		super();
		//this.skinName = CheckBanerSkin;
	}

	public onAdd(): void {
		super.onAdd();
		this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubIndex, this);
		this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddIndex, this);
	}

	public onRemoved(): void {
		super.onRemove();
		this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubIndex, this);
		this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddIndex, this);
	}

	public initArr(arr: Array<any>,index:number): void {
		this.betArr = arr;
		if (!this.bGroup) {
			this.bGroup = new eui.RadioButtonGroup();
			this.bGroup.addEventListener(egret.Event.CHANGE,this.onChange,this);
		}
		if (this.btnArr.length == 0) {
			for (let i: number = 0; i < 10; i++) {
				let btn: MosueRadioButton = this['btn' + i];
				if (btn) {
					this.btnArr.push(btn);
					btn.group = this.bGroup;
					btn.value = i;
				}
			}
		}

		this.setIndex(index);
	}

	public onChange():void
	{
       let v:any=this.bGroup.selectedValue;
	   this.curIndex=v;
	   this.updata();
	   this.dispatchEvent(new egret.Event(egret.Event.CHANGE)); 
	}

	public setIndex(index:number):void
	{
        this.curIndex=1;
		this.leftIndex=index-1;
		this.updata();
		this.dispatchEvent(new egret.Event(egret.Event.CHANGE)); 
	}

	public getIndex():number
	{
		return this.curIndex+this.leftIndex;
	}

	public onSubIndex(): void {
		if(this.curIndex>0)
		{
           this.curIndex--;
		}
		else
		{
			if(this.leftIndex>0)
			{
				this.leftIndex--;
			}
		}
		this.updata();    
		this.dispatchEvent(new egret.Event(egret.Event.CHANGE)); 
	}


	public onAddIndex(): void {
		if(this.curIndex<this.btnArr.length-1)
		{
          this.curIndex++;
		}
		else
		{
			if(this.leftIndex<this.betArr.length-this.btnArr.length)
			{
				this.leftIndex++;
			}
		} 
		this.updata();
		this.dispatchEvent(new egret.Event(egret.Event.CHANGE)); 
	}

	public updata():void
	{
       if(this.leftIndex==0&&this.curIndex==0)
	   {
		   this.leftBtn.enabled=false;
	   }
	   else
	   {
		   this.leftBtn.enabled=true;
	   }

	   if(this.leftIndex==this.betArr.length-this.btnArr.length)
	   {
		   this.rightBtn.enabled=false;
	   }
	   else
	   {
		   this.rightBtn.enabled=true;
	   }
       this.btnArr[this.curIndex].selected=true;

	   for(let i:number=0;i<this.btnArr.length;i++)
	   {
		   this.btnArr[i].label=this.betArr[this.leftIndex+i].toFixed(2);
	   }

	}

	public setTouchEnable(b:boolean):void
	{
       this.leftBtn.enabled=this.rightBtn.enabled=b;
	   for(let i:number=0;i<this.btnArr.length;i++)
	   {
		   this.btnArr[i].enabled=b;
	   }
	}


	public setEnable(b:boolean):void
	{
		for(let i:number=0;i<this.btnArr.length;i++)
		{
			this.btnArr[i].enabled=b;
		}

		this.leftBtn.enabled=b;
		this.rightBtn.enabled=b;
	}
}


