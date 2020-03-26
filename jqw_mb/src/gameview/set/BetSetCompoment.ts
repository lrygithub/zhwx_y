class BetSetCompoment extends eui.Component {
	/**
	 * hor状态下才有的按键
	 * 该按键控制界面是否打开
	 */
	public arrButton: eui.ToggleButton;
	/**
	 * hor状态下才有的按键 
	 * 该按键为快速按键
	 */
	public checkBtn: CheckButton;

	public sunBtn: eui.Button;
	public addBtn: eui.Button;

	public touzhi: eui.Label;
	public daibi: eui.Label;
	private cState: number = 0;
	public constructor() {
		super();
	}

	public childrenCreated(): void {
		super.childrenCreated();
		this.checkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
		this.arrButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
		this.sunBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);

		this.checkBtn.selected = SetConst.SPEED_PLAY;
		this.arrButton.selected = SetConst.BETSET_SHOW;
		this.updataState();
		this.daibi.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex]);
		this.touzhi.text = '￥' + GameManager.numberToCommonStr(45 * vo.GameData.betScoreArr[vo.GameData.betIndex]);
		//	this.betLabel.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex]);
		GameManager.getInstance().addEventListener(SetEvent.SET_MODLE, this.onModleChange, this);
		core.LayerManager.getInstance().addEventListener(SetEvent.SET_OR_CHANGE, () => {
			this.updataState();
		}, this);

		GameManager.getInstance().addEventListener(SetEvent.SET_SPEED_CHANGED, this.onDataChanged, this);
		// core.MyUIUtils.addLongTouch(this.sunBtn, () => {
		// 	vo.GameData.betIndex = 0;
		// 	SoundManager.getInstance().playEffect(SoundConst.BUTTON);
		// 	GameManager.getInstance().dispatchEventWith(SetEvent.SET_BET_CHANGE);
		// 	//	this.betLabel.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex]);
		// }, () => {

		// }, this);
		// core.MyUIUtils.addLongTouch(this.addBtn, () => {
		// 	vo.GameData.betIndex = vo.GameData.betScoreArr.length - 1;
		// 	SoundManager.getInstance().playEffect(SoundConst.BUTTON);
		// 	GameManager.getInstance().dispatchEventWith(SetEvent.SET_BET_CHANGE);
		// 	//	this.betLabel.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex]);
		// }, () => {

		// }, this);


		// core.MyUIUtils.addLongTouch(this.sunBtn0, () => {
		// 	vo.GameData.line = 1;
		// 	SoundManager.getInstance().playEffect(SoundConst.BUTTON);
		// 	GameManager.getInstance().dispatchEventWith(SetEvent.SET_LINE_CHANGE);
		// 	this.lineLabel.text = vo.GameData.line + '';
		// }, () => {

		// }, this);
		// core.MyUIUtils.addLongTouch(this.addBtn0, () => {
		// 	vo.GameData.line = 9;
		// 	SoundManager.getInstance().playEffect(SoundConst.BUTTON);
		// 	GameManager.getInstance().dispatchEventWith(SetEvent.SET_LINE_CHANGE);
		// 	this.lineLabel.text = vo.GameData.line + '';
		// }, () => {

		// }, this);
	}

	public onDataChanged(): void {
		this.checkBtn.selected = SetConst.SPEED_PLAY;
	}

	public updataState(): void {
		//	console.log("++++++++++++++000000000000")
		if (window.innerWidth >= window.innerHeight) {
			this.currentState = 'hor';
		}
		else {
			this.currentState = 'ver';
		}
		//	console.log(this.currentState)
		this.sunBtn.enabled = vo.GameData.betIndex > 0;
		this.addBtn.enabled = vo.GameData.betIndex < vo.GameData.betScoreArr.length - 1;
		this.daibi.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex]);
		this.touzhi.text = '￥' + GameManager.numberToCommonStr(45 * vo.GameData.betScoreArr[vo.GameData.betIndex]);
	}

	public onTab(e: egret.TouchEvent): void {
		e.stopImmediatePropagation();
		e.stopPropagation();
		switch (e.currentTarget) {
			case this.sunBtn:
				if (vo.GameData.betIndex > 0) {
					SoundManager.getInstance().playEffect("minus_button_mp3");
					vo.GameData.betIndex -= 1;
					GameManager.getInstance().dispatchEventWith(SetEvent.SET_BET_CHANGE);
				}
				this.sunBtn.enabled = vo.GameData.betIndex > 0;
				this.addBtn.enabled = vo.GameData.betIndex < vo.GameData.betScoreArr.length - 1;
				this.daibi.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex]);
				this.touzhi.text = '￥' + GameManager.numberToCommonStr(45 * vo.GameData.betScoreArr[vo.GameData.betIndex]);
				break;
			case this.addBtn:
				if (vo.GameData.betIndex < vo.GameData.betScoreArr.length - 1) {
					SoundManager.getInstance().playEffect("plus_button_mp3");
					vo.GameData.betIndex += 1;
					GameManager.getInstance().dispatchEventWith(SetEvent.SET_BET_CHANGE);
				}

				this.sunBtn.enabled = vo.GameData.betIndex > 0;
				this.addBtn.enabled = vo.GameData.betIndex < vo.GameData.betScoreArr.length - 1;
				this.daibi.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex]);
				this.touzhi.text = '￥' + GameManager.numberToCommonStr(45 * vo.GameData.betScoreArr[vo.GameData.betIndex]);
				break;
			case this.checkBtn:
				if (this.checkBtn.selected) {
					SoundManager.getInstance().playEffect("kuaisu_on_mp3");
				} else {
					SoundManager.getInstance().playEffect("kuaisu_off_mp3");
				}
				SetConst.SPEED_PLAY = this.checkBtn.selected;
				GameManager.getInstance().dispatchEventWith(SetEvent.SET_SPEED_CHANGED);
				break;
			case this.arrButton:
				SoundManager.getInstance().playEffect("tap_mp3");
				if (this.arrButton.selected) {
					SetConst.BETSET_SHOW = true;
				}
				else {
					SetConst.BETSET_SHOW = false;
				}
				this.goUpdata();
				this.dispatchEventWith(SetEvent.SET_STATE_CHANGE);
				break;
		}
		//this.betLabel.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex]);
		this.dispatchEventWith(egret.Event.CHANGE);
	}

	private getXY(): any {
		let x: number;
		let y: number;
		if (SetConst.BETSET_SHOW) {//界面开启
			x = this.currentState.indexOf('hor') != -1 ? 0 : GameConfig.WIDTH / 2 - this.width / 2;
			y = this.currentState.indexOf('hor') != -1 ? GameConfig.HEIGHT / 2 - this.height / 2 : GameConfig.HEIGHT / 2 - this.height / 2 - 118;
		}
		else {//界面关闭
			x = this.currentState.indexOf('hor') != -1 ? -this.width + 80 : GameConfig.WIDTH / 2 - this.width / 2;
			y = this.currentState.indexOf('hor') != -1 ? GameConfig.HEIGHT / 2 - this.height / 2 : GameConfig.HEIGHT;
		}
		return { x: x, y: y };
	}

	public updata(): void {
		egret.Tween.removeTweens(this);
		this.arrButton.selected = SetConst.BETSET_SHOW;
		let t: any = this.getXY();
		this.x = t.x;
		this.y = t.y;
		//	console.log(this.x, this.y);
	}

	public goUpdata(): void {
		egret.Tween.removeTweens(this);
		this.arrButton.selected = SetConst.BETSET_SHOW;
		let t: any = this.getXY();
		egret.Tween.get(this).to({ x: t.x, y: t.y }, 200);
	}

	public onModleChange(): void {

		//	console.log("++++++++++++++++")
		this.updataState();
		this.updata();
	}
}