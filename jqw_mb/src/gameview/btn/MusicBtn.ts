class MusicBtn extends MosueCheckBox {
	public _valume: number = 1;
	public volueImg: eui.Image;
	public constructor() {
		super();
	}

	public onAdd(): void {
		super.onAdd();
		this.valume=SoundManager.getInstance().getBgVolume();
		this.updataImg();
	}

	public set valume(v: number) {
		this._valume = v;
		this.updataImg();
	}

	public get valume(): number {
		return this._valume;
	}
	public onRollOver(): void {
		super.onRollOver();
		egret.callLater(() => {
			this.updataImg();
		}, this);
	}

	public onRollOut(): void {
		super.onRollOut();
		egret.callLater(() => {
			this.updataImg();
		}, this);

	}

	public updataImg(): void {
		if (this.selected) {
			if (this.valume == 0) {
				this.selected = false;
				this.currentState='';
				this.volueImg.source = '';
				return;
			}
			let index: number = Math.ceil(this.valume / 0.334);
			this.volueImg.source = this.currentState == 'rollOverAndSelected' ? this.volueImg.source = 'open_liang' + index + '_png' : this.volueImg.source = 'open_an' + index + '_png';
		}
		else {
			if (this.valume > 0) {
				this.selected = true;
				this.currentState='';
				let index: number = Math.ceil(this.valume / 0.334);
				this.volueImg.source = this.currentState == 'rollOverAndSelected' ? this.volueImg.source = 'open_liang' + index + '_png' : this.volueImg.source = 'open_an' + index + '_png';
				return;
			}
			this.volueImg.source = '';
		}


	}



}