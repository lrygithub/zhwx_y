module core {
	export class NomalLoadingUI extends BaseUI {
		public lgroup: eui.Group;
		public barbg: eui.Image;
		public masks: eui.Image;
		public constructor() {
			super();
			this.skinName = NomalLoadingUISkin;
		}
		public onAdd(): void {
			super.onAdd();
			this.barbg.mask = this.masks;
		}
		public isOpen: boolean = false;
		public setPross(cur: number, max: number): void {
			var n: number = cur / max;
			this.barbg.x = -this.lgroup.width * (1 - n);
			if (n > 0.5 && this.isOpen == false) {
				this.isOpen = true;
				// if (egret.localStorage.getItem('music') != '1') {
				//	core.UIManager.openUI(core.UIConst.AudioTips, core.LayerManager.Layer_Top);
				// }
			}
		}
	}
}
