class KeyBoardManager extends egret.EventDispatcher {
	private static _instance: KeyBoardManager;
	private kb: KeyBoard;
	public constructor() {
		super();
	}

	public static getInstance(): KeyBoardManager {
		if (!this._instance) {
			this._instance = new KeyBoardManager();
		}
		return this._instance;
	}

	public init(): void {
		this.kb = new KeyBoard();
		this.kb.addEventListener(KeyBoard.onkeydown, this.onkeydown, this);
	}

	private onkeydown(event) {
		//console.log(event.data);
		// //监听Esc键被按下事件
		// if(this.kb.isContain(event.data,KeyBoard.Esc)){
		//     console.log(event.data);
		// }

		// //监听空格键被按下事件
		if(this.kb.isContain(event.data,KeyBoard.SPACE)){
		    // if(GameConfig.emptyPlay)
			// {
            //    if(GameManager.getInstance().gameState==GameType.GameState.STOP){
            //       //GameManager.getInstance().startGame();
			//    }
			//    else
			//    {
			// 	  GameManager.getInstance().stopGame();
			//    }
			// }
		}

		// //监听Esc和F1键同时被按下事件
		// if(this.kb.isContain(event.data,KeyBoard.Esc) && this.kb.isContain(event.data,KeyBoard.F1)){
		//     console.log(event.data);
		// }
		
		


	}
}