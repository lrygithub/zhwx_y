class MouseButton3 extends MouseButton {
	public colorFlilter: egret.ColorMatrixFilter;
	public l: number = 100;
	public constructor() {
		super();
		this.initFiter();
	}

	public childrenCreated():void
	{
		super.childrenCreated();
		this.updataUI();
	}

	public onRollOver(): void {
		if (this.enabled == false) return;
		this.currentState = 'rollOver';
		this.updataUI();
	}

	public onRollOut(): void {
		this.currentState = '';
		this.updataUI();
	}


	public updataUI():void
	{
      if(this.currentState=='rollOver')
	  {
		  this.updataText(true);
	  }
	  else
	  {
		  this.updataText(false);
	  }
	}

	public updataText(isliang: boolean): void {
		(this.labelDisplay as eui.Label).textColor=isliang?0xffffff:0x94989e;
	}

	public initFiter(): void {
		//内亮度
		var colorMatrix = [
			1, 0, 0, 0, 0,
			0, 1, 0, 0, 0,
			0, 0, 1, 0, 0,
			0, 0, 0, 1, 0
		];
		if (!this.colorFlilter) {
			this.colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		}
	}
}