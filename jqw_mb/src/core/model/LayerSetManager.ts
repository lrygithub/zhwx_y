class LayerSetManager extends egret.EventDispatcher {
	public constructor() {
		super();
		this.s = GameConfig.HEIGHT / GameConfig.WIDTH;
		egret.MainContext.instance.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, () => {
			this.s = GameConfig.HEIGHT / GameConfig.WIDTH;
		}, this);
		// if (egret.Capabilities.os == 'iOS') {
		// egret.setInterval(() => {
		// 	//window.scrollTo(0, 0);
		// 	 console.log(window.innerWidth,window.innerHeight,window.innerWidth/window.innerHeight);
		// 	 console.log(window.screen.width,window.screen.height,window.screen.width/window.screen.height);
		// }, this, 1000);
		// }
	}
	public static getInstance(): LayerSetManager {
		if (!this._instance) {
			this._instance = new LayerSetManager();
		}
		return this._instance;
	}

	private static _instance: LayerSetManager;


	public init(): void {
		window.scrollTo(0, 0);
		let ish: boolean = window.innerWidth > window.innerHeight;
		let sw: number = ish ? 115 / 2 : 115 / 2;
		let sh: number = ish ? 319 / 2 : 319 / 2;
		var sx = window.innerWidth / 2 - sw / 2;
		var sy = window.innerHeight / 2 - sh / 2 - 10 + 40;

		var sx1 = window.innerWidth / 2 - 143 / 2;
		var sy1 = window.innerHeight / 2 - sh / 2 - 10 - 31 / 2-5;

		let $ = window['$'];
		$('#nvImg').css({ left: sx, top: sy, width: sw, height: sh });

		$('#nvImg1').css({ left: sx1, top: sy1, width: 286 / 2, height: 31 / 2 });
		var t;
		var self = this;

		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
			clearTimeout(t);
			t = setTimeout(function () {
				let ish: boolean = window.innerWidth > window.innerHeight;
				let sw: number = ish ? 115 : 115;
				let sh: number = ish ? 319 : 319;
				var sx = window.innerWidth / 2 - sw / 2;
				var sy = window.innerHeight / 2 - sh / 2 - 10 + 40;
				var sx1 = window.innerWidth / 2 - 143 / 2;
				var sy1 = window.innerHeight / 2 - sh / 2 - 10 - 31 / 2-5;
				let $ = window['$'];
				$('#nvImg').css({ left: sx, top: sy, width: sw, height: sh });
				$('#nvImg1').css({ left: sx1, top: sy1, width: 286 / 2, height: 31 / 2 });
				if (egret.Capabilities.os == 'iOS') {
					self.resizeCompete();
				}
			}, 200);
		})
		if (egret.Capabilities.os == 'iOS') {
			let JQ = window['$'];
			JQ('#nvLayer').show();
			window.onscroll = () => {
				egret.clearTimeout(this.timeout);
				this.timeout = egret.setTimeout(() => {
					this.resizeCompete();
				}, this, 200);
			}
		}
	}



	public timeout: number;
	public s: number;
	public resizeCompete(): void {
		let JQ = window['$'];
		//JQ('gameDiv').css('top', 0);
		if (window.innerHeight >= window.innerWidth) {//shu
			//6,7,8系列
			console.log('h', window.screen.height);
			console.log('w', window.innerHeight);
			if (window.screen.height - window.innerHeight >= 100) {
				JQ('#nvLayer').show();

			}
			else {
				JQ('#nvLayer').hide();
			}


		}
		else {//heng

			let b: any = window.screen.width - window.innerHeight;
			if (Math.abs(b) < 2) {
				JQ('#nvLayer').hide();
			}
			else {
				JQ('#nvLayer').show();
			}
		}
		window.scrollTo(0, 0);
		core.LayerManager.getInstance().dispatchEventWith(SetEvent.SET_OR_CHANGE);
	}

}