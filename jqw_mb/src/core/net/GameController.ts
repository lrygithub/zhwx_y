class GameController {
	private static _instance: GameController;
	private sequence: number = 0;
	private key = "a95c530a7af5f492a74499e70578d150";
	// private serverAddress:string = "http://fruit-meow-farm.cteee.cn";
	private serverAddress: string = "http://54.95.43.201/80101/99";

	public constructor() {
	}
	public static getInstance(): GameController {
		if (!this._instance) this._instance = new GameController();
		return this._instance;
	}
	private getSeq(): number {
		this.sequence++;
		return this.sequence;
	}
	
	/**发送http请求， type:GET/POST, url:接口地址, notify:返回数据后要发送什么通知 */
	private sendHttp(sendData: any, type: string, url: string, callback: Function) {
		var xhr = new XMLHttpRequest();
		xhr.open(type, url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		// if (vo.GameData.token != '') {  // 判断是否存在token，如果存在的话，则每个http header都加上token
		// 	xhr.setRequestHeader("Authorization", 'Bearer ' + vo.GameData.token);
		// }
		xhr.onload = function (e) {
			switch (xhr.status) {
				case 200:
					let obj: any = JSON.parse(xhr.responseText);
					if (obj.status > 0) {
						TipsManager.getInstance().showTips(ErrorCode.codeArr[obj.status]);
					}
					if (obj.server_time != undefined) {
						core.DateTimer.instance.updateServerTime(obj.server_time);
					}
					TipsManager.getInstance().showLog('receive---', obj);
					callback.call(this, obj);
					break;
			}
		};
		xhr.send(JSON.stringify(sendData));
		TipsManager.getInstance().showLog('send---', JSON.stringify(sendData));
	}


	public clearRedis():void
	{
        //  	let sendData = {
		// 	PlayerId:GameConfig.CasinoGame.PlayerId,
		// 	Type:"clear_redis"
		// };
		// this.sendHttp(
		// 	sendData,
		// 	'POST',
		// 	this.serverAddress + '/status/clear_personal_redis',
		// 	(obj) => {
		// 		// (GameModleManger.getInstance().getModle(core.ModleConst.LOGIN_MODLE) as LoginModleManager).readRegesterData(obj);
		// 	}
		// );
	}
}