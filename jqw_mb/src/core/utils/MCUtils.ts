module game {
	export class MCUtils {
		public static getMc(name: string, callback: Function = null, action: string = ""): egret.MovieClip {
			var texture: egret.Texture = RES.getRes(name + "_png");
			if (texture) {
				var mc = createMc(action);
				if (callback) {
					callback(mc)
				}
				return mc;
			} else {
				RES.getResAsync(name + "_png", () => {
					RES.getResAsync(name + "_json", () => {
						if (callback) {
							callback(createMc(action));
						}
					}, this);
				}, this);
				return null;
			}

			function createMc(action: string) {
				var texture: egret.Texture = RES.getRes(name + "_png");
				var data: any = RES.getRes(name + "_json");
				//创建动画工厂
				var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
				//创建 MovieClip，将工厂生成的 MovieClipData 传入参数
				var mc: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData(action));
				mc['fac'] = mcDataFactory;
				mc.touchEnabled = false;
				return mc;
			}
		}

		public static changeAction(mc: egret.MovieClip, action: string) {
			var fac: egret.MovieClipDataFactory = mc['fac'];
			mc.movieClipData = fac.generateMovieClipData(action);
		}
	}
}