module core {
	export class LayerManager extends egret.EventDispatcher {
		public constructor() {
			super();
		}
		private static _instance: LayerManager;
		public static getInstance() {
			if (!this._instance) this._instance = new LayerManager();
			return this._instance;
		}

		public static Layer_Scence: number = 0;
		public static Layer_UI: number = 1;
		public static Layer_Top: number = 2;
		public static Layer_Tip: number = 3;


		private scenceLayer: eui.UILayer;
		private uiLayer: eui.UILayer;
		private topLayer: eui.UILayer;
		private tipLayer: eui.UILayer;


		/**初始层级 */
		public initLayer(root: eui.UILayer) {
			this.scenceLayer = new eui.UILayer();
			this.uiLayer = new eui.UILayer();
			this.topLayer = new eui.UILayer();
			this.tipLayer = new eui.UILayer();

			this.scenceLayer.touchThrough = true;
			this.uiLayer.touchThrough = true;
			this.topLayer.touchThrough = true;
			this.tipLayer.touchThrough = true;
			this.tipLayer.touchEnabled = false;

			root.addChild(this.scenceLayer);
			root.addChild(this.uiLayer);
			root.addChild(this.topLayer);
			root.addChild(this.tipLayer);

			var self = this;
			// 	      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {  
			//             var type:number=Utils.getOrientationType();  
			// 			egret.setTimeout(()=>{
			//                 for(var key in UIManager.pool)
			// 			{
			// 		       var baseui:BaseUI=UIManager.pool[key] as BaseUI;
			// 			   if(baseui)
			// 			   {
			// 				   baseui.width=GameConfig.WIDTH;
			// 				   baseui.height=GameConfig.HEIGHT;
			// 				   baseui.validateNow();
			// 			   }
			// 			}     
			// 			},this,200);

			// }, false);   

			egret.MainContext.instance.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, () => {
				// if (egret.Capabilities.os == 'iOS') {
				// 	let JQ = window['$'];
				// 	JQ('#nvLayer').show();
				// }
				this.dispatchEventWith(SetEvent.SET_OR_CHANGE);
			}, this);

			window.onresize = () => {
				this.dispatchEventWith(SetEvent.SET_OR_CHANGE);
			};

		}
		/**添加UI到舞台 */
		public addUI(ui: any, layer: number = 1) {
			var parent;
			switch (layer) {
				case LayerManager.Layer_Scence:
					this.scenceLayer.addChild(ui);
					break;
				case LayerManager.Layer_UI:
					this.uiLayer.addChild(ui);
					break;
				case LayerManager.Layer_Top:
					this.topLayer.addChild(ui);
					break;
				case LayerManager.Layer_Tip:
					this.tipLayer.addChild(ui);
					break;
			}
		}

		/**删除UI */
		public deleteUI(ui: any, layer: number = 1) {
			var parent;
			switch (layer) {
				case LayerManager.Layer_Scence:
					this.scenceLayer.removeChild(ui);
					break;
				case LayerManager.Layer_UI:
					this.uiLayer.removeChild(ui);
					break;
				case LayerManager.Layer_Top:
					this.topLayer.removeChild(ui);
					break;
				case LayerManager.Layer_Tip:
					this.tipLayer.removeChild(ui);
					break;
			}
		}


		/**
		 * 得到layer
		 */
		public getLayer(index: number): eui.UILayer {
			if (index == core.LayerManager.Layer_Scence) {
				return this.scenceLayer;
			}
			else if (index == core.LayerManager.Layer_UI) {
				return this.uiLayer;
			}
			else if (index == core.LayerManager.Layer_Top) {
				return this.topLayer;
			}
			else if (index == core.LayerManager.Layer_Tip) {
				return this.tipLayer;
			}

		}
	}
}