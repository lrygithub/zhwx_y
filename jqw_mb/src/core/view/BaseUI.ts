module core {
	export class BaseUI extends eui.Component {
		private eventPool: Array<EventObj> = [];
		public isShow: boolean;
		public layer: number;
		public constructor() {
			super();
			this.initSize();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			LayerManager.getInstance().addEventListener(SetEvent.SET_OR_CHANGE, this.onOChange, this);
			this.onOChange();
		}

		private ts: number;
		public onOChange(): void {
			egret.clearTimeout(this.ts);
			let s: number = window.innerHeight / window.innerWidth;
			if (window.innerWidth >= window.innerHeight) {
				if (egret.Capabilities.os == 'iOS') {
					window['$']('#gamediv').css('height', window.innerHeight + 1);
					window['$']('#gamediv').css('width', window.innerWidth + 1);
				}
				this.currentState = 'hor';
				egret.MainContext.instance.stage.setContentSize(1334, 750);
			}
			else {
				if (egret.Capabilities.os == 'iOS') {
					window['$']('#gamediv').css('height', window.innerHeight + 1);
					window['$']('#gamediv').css('width', window.innerWidth + 1);
				}
				this.currentState = 'ver';
				egret.MainContext.instance.stage.setContentSize(750, GameConfig.HEIGHT);

			}
			this.ts = egret.setTimeout(() => {
				this.onResize();
			}, this, 200);
		}

		public upDataStateVer(): void {

		}

		public upDataStateHor(): void {

		}

		private onResize(): void {
			egret.updateAllScreens();
			if (window.innerWidth >= window.innerHeight) {
				this.updataHor();
			}
			else {
				this.updataVer();
			}
		}

		public updataHor(): void {

		}

		public updataVer(): void {

		}

		public initSize(): void {
			this.top = 0;
			this.left = 0;
			this.bottom = 0;
			this.right = 0;
		}

		public childrenCreated(): void {
			super.childrenCreated();
		}

		public onAdd(): void {
			this.isShow = true;
			this.initListener();
			//core.UIUtils.addButtonScaleEffects(this);
		}

		public onRemove(): void {
			this.clearEvent();
			NotifyManager.getInstance().removeRegister(this);
			//core.UIUtils.removeButtonScaleEffects(this);
		}
		/**注册事件 会在dispose时自动移除 */
		protected registerEvent(target: any, type: any, callback: Function, callbackobj: any) {
			target.addEventListener(type, callback, callbackobj);
			this.eventPool.push({ target: target, type: type, callback: callback, callbackobj: callbackobj });
		}
		/**移除全部事件 */
		private clearEvent() {
			if (this.eventPool.length > 0) {
				for (let i = 0; i < this.eventPool.length; i++) {
					let target = this.eventPool[i].target;
					let type = this.eventPool[i].type;
					let callback = this.eventPool[i].callback;
					let callbackobj = this.eventPool[i].callbackobj;
					target.removeEventListener(type, callback, callbackobj);
				}
			}
		}



		/**初始监听 */
		protected initListener() {

		}
		/**注册通知 由子类调用*/
		protected addRegister(type: string, callback: Function, callbackobj: any) {
			NotifyManager.getInstance().registerNotify(type, callback, callbackobj);
		}
		/**移除通知 由子类调用*/
		protected removeRegister(obj: any) {
			NotifyManager.getInstance().removeRegister(obj);
		}

		public close(): void {
			this.isShow = false;
			if (this.parent) this.parent.removeChild(this);
		}
	}

	export class EventObj {
		target: any;
		type: any;
		callback: Function;
		callbackobj: any;
	}
}