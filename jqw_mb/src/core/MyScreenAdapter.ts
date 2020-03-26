class MyScreenAdapter implements egret.sys.IScreenAdapter {
	public constructor() {
	}

	public calculateStageSize(scaleMode: string, screenWidth: number, screenHeight: number, contentWidth: number, contentHeight: number): egret.sys.StageDisplaySize {
		var displayWidth = screenWidth;
		var displayHeight = screenHeight;
		var stageWidth = contentWidth;
		var stageHeight = contentHeight;
		var scaleX = (screenWidth / stageWidth) || 0;
		var scaleY = (screenHeight / stageHeight) || 0;
		switch (scaleMode) {
			case egret.StageScaleMode.EXACT_FIT:
				break;
			case egret.StageScaleMode.FIXED_HEIGHT:
				stageWidth = Math.round(screenWidth / scaleY);
				break;
			case egret.StageScaleMode.FIXED_WIDTH:
				stageHeight = Math.round(screenHeight / scaleX);
				break;
			case egret.StageScaleMode.NO_BORDER:
				if (scaleX > scaleY) {
					displayHeight = Math.round(stageHeight * scaleX);
				}
				else {
					displayWidth = Math.round(stageWidth * scaleY);
				}
				break;
			case egret.StageScaleMode.SHOW_ALL:
				if (scaleX > scaleY) {
					displayWidth = Math.round(stageWidth * scaleY);
				}
				else {
					if(window.innerWidth / window.innerHeight > GameConfig.DES_WIDTH / GameConfig.DES_HEIGHT)
					{
					   displayWidth=Math.round(stageWidth * scaleY);
					}
					else
					{
                        displayHeight = Math.round(stageHeight * scaleX);
					}
					
				}
				break;
			case egret.StageScaleMode.FIXED_NARROW:
				if (scaleX > scaleY) {
					stageWidth = Math.round(screenWidth / scaleY);
				}
				else {
					stageHeight = Math.round(screenHeight / scaleX);
				}
				break;
			case egret.StageScaleMode.FIXED_WIDE:
				if (scaleX > scaleY) {
					stageHeight = Math.round(screenHeight / scaleX);
				}
				else {
					stageWidth = Math.round(screenWidth / scaleY);
				}
				break;
			default:
				stageWidth = screenWidth;
				stageHeight = screenHeight;
				break;
		}
		if (egret.Capabilities.runtimeType != egret.RuntimeType.WXGAME) {
			//宽高不是2的整数倍会导致图片绘制出现问题
			if (stageWidth % 2 != 0) {
				stageWidth += 1;
			}
			if (stageHeight % 2 != 0) {
				stageHeight += 1;
			}
			if (displayWidth % 2 != 0) {
				displayWidth += 1;
			}
			if (displayHeight % 2 != 0) {
				displayHeight += 1;
			}
		}
		return {
			stageWidth: stageWidth,
			stageHeight: stageHeight,
			displayWidth: displayWidth,
			displayHeight: displayHeight
		};
	}
}