class GamePentCompoment extends eui.Component {
	public lineGroup: eui.Group;
	public kuangGroup: eui.Group;
	public tipGroup: eui.Group;
	public gGroup: eui.Group;
public topGroup:eui.Group;


	public constructor() {
		super();
		this.skinName = GamePentSkin;
	}

	public childrenCreated(): void {
		super.childrenCreated();
		this.clear();
		//let i: number = 6;
		// egret.setInterval(() => {
		// 	this.showLine(i, [{ x: 0, y: vo.GameData.lineObj['' + i][0] }, { x: 4, y: vo.GameData.lineObj['' + i][4] }]);
		// 	this.showKuang(i, [{ x: 1, y: vo.GameData.lineObj['' + i][1] }, { x: 2, y: vo.GameData.lineObj['' + i][2] }, { x: 3, y: vo.GameData.lineObj['' + i][3] }]);
		// 	i++;
		// 	if (i > 9) i = 1;
		// }, this, 1000);
		//this.drallall();
		GameManager.getInstance().addEventListener(SetEvent.SET_LINE_CHANGE,()=>{
			this.showLineArr(vo.GameData.line);
		},this);

		this.clearReward();

	}

	public clear(): void {
		this.kuangGroup.visible = false;
		this.tipGroup.visible = false;
		this.lineGroup.visible = false;
		this.topGroup.visible=false;
		
	}

	public showTipLine(line: number): void {
		this.tipGroup.visible=true;
		(this['gr' + line] as eui.Group).visible = true;
		(this['gl' + line] as eui.Group).visible = true;
	}

	public clearTip(): void {
		this.tipGroup.visible = false;
		for (let i: number = 1; i < 10; i++) {
			(this['gr' + i] as eui.Group).visible = false;
			(this['gl' + i] as eui.Group).visible = false;
		}
	}

	public drallall(): void {
		let colarr:Array<any>=[0x000000,0x999999,0xffddaa,0x887799];
		this.gGroup.removeChildren();
		this.lineGroup.visible=true;
		this.gGroup.visible=true;
		for (let i: number = 0; i < 5; i++) {
			for (let j: number = 0; j < 3; j++) {
				let rect: eui.Rect = new eui.Rect();
				rect.fillColor =colarr[Math.floor(Math.random()*4)];
				rect.x = i* 210 + 69 ;
				rect.y = j * 198;
				rect.width = 213;
				rect.height = 210;
				rect.ellipseWidth = 30;
				rect.ellipseHeight = 30;
				this.gGroup.addChild(rect);
			}
		}
	}


	public showLine(line: number, arr: Array<any> = null): void {
		this.lineGroup.visible = true;
		this.gGroup.removeChildren();
		let img: eui.Image;
		if (arr == null) return;
		for (let i: number = 1; i < 10; i++) {
			img = this['line' + i] as eui.Image;
			if (line == i) {
				img.visible = true;
				for (let i: number = 0; i < arr.length; i++) {
					let rect: eui.Rect = new eui.Rect();
					rect.fillColor = 0x000000;
					// rect.x = arr[i].X * 213 + 69;
					// rect.y = arr[i].Y * 198;
					// rect.width = 213;
					// rect.height = 213;

					let g:eui.Group=this.kuangGroup.getChildAt(arr[i].X) as eui.Group;
					let img:eui.Image=g.getChildAt(arr[i].Y) as eui.Image;
					rect.x=img.x+g.x;
					rect.y=img.y;
					rect.width=img.width;
					rect.height=img.height;			
					//rect.ellipseWidth = 30;
					//rect.ellipseHeight = 30;
					this.gGroup.addChild(rect);
				}
				img.mask = this.gGroup;
			}
			else {
				img.mask = null;
				img.visible = false;
			}
		}
	}

	public cleaAllLine(): void {
		for (let i: number = 1; i < 10; i++) {
			let img = this['line' + i] as eui.Image;
			img.visible = false;
			img.mask=null;
		}
		this.lineGroup.visible=false;
		this.topGroup.visible=false;
	}

	public showLines(line: number): void {
		this.lineGroup.visible=true;
		let img = this['line' + line] as eui.Image;
		img.visible = true;
	}

	public showLineArr(line:number):void
	{
          this.cleaAllLine();
		  for(let i:number=1;i<=line;i++)
		  {
               this.showLines(i);
		  }		
		  egret.Tween.removeTweens(this.lineGroup);
		  this.lineGroup.alpha=1;
		  egret.Tween.get(this.lineGroup).wait(2000).to({alpha:0},1000).call(()=>{
			  this.lineGroup.visible=false;
			  this.lineGroup.alpha=1;
		  }); 
	}

	public clearReward():void
	{
		this.topGroup.visible=false;
		let arr:Array<number>=[0,4];
		for(let i:number=0;i<arr.length;i++)
		{
             let s:number=arr[i];
			 for(let j=0;j<3;j++)
			 {
			  let g:eui.Group=(this['t'+j+''+s+'Group'] as eui.Group);
			  g.visible=false;
			 }
		}
	}
    
	/**
	 * 第几线
	 * 位置
	 * 数据
	 */
	public showReward(line,p:any,n:number):void
	{
		this.topGroup.visible=true;
          let g:eui.Group=(this['t'+p.Y+''+p.X+'Group'] as eui.Group);
		  g.visible=true;
		  let img:eui.Image=g.getChildAt(0) as eui.Image;
		  img.source='winbg_lin'+line+'@2x_png';
		  let label:eui.Label=g.getChildAt(1) as eui.Label;
		  label.text='￥'+GameManager.numberToCommonStr(n);
	}


	public showKuang(line: number, arr: Array<any>): void {
		this.kuangGroup.visible = true;
		for (let i: number = 0; i < this.kuangGroup.numChildren; i++) {
			let g: eui.Group = this.kuangGroup.getChildAt(i) as eui.Group;
			for (let j: number = 0; j < g.numChildren; j++) {
				let img: eui.Image = g.getChildAt(j) as eui.Image;
				img.visible = false;
			}
		}
		for (let s: number = 0; s < arr.length; s++) {
			for (let i: number = 0; i < this.kuangGroup.numChildren; i++) {
				let g: eui.Group = this.kuangGroup.getChildAt(i) as eui.Group;
				for (let j: number = 0; j < g.numChildren; j++) {
					let img: eui.Image = g.getChildAt(j) as eui.Image;
					if (i == arr[s].X && j == arr[s].Y) {
						img.visible = true;
						img.source = 'box_' + line + '_png';
					}
				}
			}
		}
	}



	public showkuang2(arr: Array<any>):void
	{
        this.kuangGroup.visible = true;
		for (let i: number = 0; i < this.kuangGroup.numChildren; i++) {
			let g: eui.Group = this.kuangGroup.getChildAt(i) as eui.Group;
			for (let j: number = 0; j < g.numChildren; j++) {
				let img: eui.Image = g.getChildAt(j) as eui.Image;
				img.visible = false;
			}
		}

			for (let s: number = 0; s < arr.length; s++) {
			for (let i: number = 0; i < this.kuangGroup.numChildren; i++) {
				let g: eui.Group = this.kuangGroup.getChildAt(i) as eui.Group;
				for (let j: number = 0; j < g.numChildren; j++) {
					let img: eui.Image = g.getChildAt(j) as eui.Image;
					if (i == arr[s].X && j == arr[s].Y) {
						img.visible = true;
						img.source = 'box_' + 1 + '_png';
					}
				}
			}
		}

	}

	/**
	 * 通过获奖坐标以及线数，获得不获奖的坐标
	 */
	public getLineArrForKuang(line: number, arr: Array<any>): Array<any> {
		let larr: Array<any> = [];
		let objArr: Array<any> = vo.GameData.lineObj[line + ''];
		for (let i: number = 0; i < objArr.length; i++) {
			let sy: number = objArr[i];
			let is: number = 0;
			for (let j: number = 0; j < arr.length; j++) {
				if (arr[j].X == i) {
					break;
				}
				else {
					is++;
				}
			}
			if (is == arr.length) {
				larr.push({ X: i, Y: sy });
			}

		}

		return larr;
	}


	public clearAll():void
	{
         this.cleaAllLine();
		 this.clearTip();
		 this.gGroup.removeChildren();
		 this.kuangGroup.visible=false;
	}


}