class logshow extends eui.Component {
	public icon_1: eui.Image;
	public icon_2: eui.Image;
	public icon_3: eui.Image;
	public icon_4: eui.Image;
	public icon_5: eui.Image;
	public icon_6: eui.Image;

	public G1: eui.Group;
	public G2: eui.Group;
	public FreeGameNum: eui.BitmapLabel;

	public constructor() {
		super();
	}

	public childrenCreated(): void {
		super.childrenCreated();
		this.exitResin();
	}

	/**
	 * 进入正常
	 */
	public exitResin(): void {
		egret.Tween.removeTweens(this['icon_1']);
		egret.Tween.removeTweens(this['icon_2']);
		egret.Tween.removeTweens(this['icon_3']);
		egret.Tween.removeTweens(this['icon_4']);
		egret.Tween.removeTweens(this['icon_5']);
		egret.Tween.removeTweens(this['icon_6']);
		(this['icon_1'] as eui.Image).alpha = 1;
		(this['icon_1'] as eui.Image).y = 25;

		(this['icon_2'] as eui.Image).alpha = 0;
		(this['icon_2'] as eui.Image).y = -40;

		(this['icon_3'] as eui.Image).alpha = 0;
		(this['icon_3'] as eui.Image).y = -90;

		(this['icon_4'] as eui.Image).alpha = 0;
		(this['icon_4'] as eui.Image).y = -40;

		(this['icon_5'] as eui.Image).alpha = 0;
		(this['icon_5'] as eui.Image).y = -90;

		(this['icon_6'] as eui.Image).alpha = 0;
		(this['icon_6'] as eui.Image).y = -40;

		let index = 0;
		let valueIndex = 1;
		egret.setInterval(() => {
			switch (valueIndex) {
				case 1:
					valueIndex = 2;
					egret.Tween.get(this['icon_' + 6]).to({ alpha: 0, y: -40 }, 500).call(() => {
						egret.Tween.get(this['icon_' + 1]).to({ alpha: 1, y: 25 }, 500);
					});
					break;
				case 2:
					valueIndex = 3;
					egret.Tween.get(this['icon_' + 1]).to({ alpha: 0, y: -90 }, 500).call(() => {
						egret.Tween.get(this['icon_' + 2]).to({ alpha: 1, y: 30 }, 500);
					});
					break;
				case 3:
					valueIndex = 4;
					egret.Tween.get(this['icon_' + 2]).to({ y: -40, alpha: 0 }, 500).call(() => {
						egret.Tween.get(this['icon_' + 3]).to({ alpha: 1, y: 25 }, 500);
					});
					break;
				case 4:
					valueIndex = 5;
					egret.Tween.get(this['icon_' + 3]).to({ alpha: 0, y: -90 }, 500).call(() => {
						egret.Tween.get(this['icon_' + 4]).to({ alpha: 1, y: 30 }, 500);
					});
					break;
				case 5:
					valueIndex = 6;
					egret.Tween.get(this['icon_' + 4]).to({ alpha: 0, y: -40 }, 500).call(() => {
						egret.Tween.get(this['icon_' + 5]).to({ alpha: 1, y: 25 }, 500);
					});
					break;
				case 6:
					valueIndex = 1;
					egret.Tween.get(this['icon_' + 5]).to({ alpha: 0, y: -90 }, 200).call(() => {
						egret.Tween.get(this['icon_' + 6]).to({ alpha: 1, y: 30 }, 200);
					});;
					break;
			}
		}, this, 17000);
	}
}