class GameModleManger extends egret.EventDispatcher {
	private static _instance:GameModleManger;
	private moduleMap:Dictionary<core.BaseModel>;
	public constructor() 
	{
		super();
	}
	public  static getInstance():GameModleManger
	{
		if(!this._instance)
		{
			this._instance=new GameModleManger();
		}
		return this._instance;
	}

    /**
	 * 初始化引擎所需模块
	 */
	public init(stage:egret.Stage):void
	{      
		   //键盘初始化
		   KeyBoardManager.getInstance().init();
		   //鼠标检测
		  // mouse.enable(stage);
		  // mouse.setMouseMoveEnabled(true);
		   //mouse.setMouseMoveEnabled(true);
		   //初始化层级
           var loot:eui.UILayer=new eui.UILayer();
           stage.addChild(loot);
		   core.LayerManager.getInstance().initLayer(loot);
		   //初始化帧回掉管理器
		   core.FrameEventCenter.getInstance().init(stage);
		   core.DateTimer.instance.run();
		   //实例化模块控制数据
		   this.moduleMap=new Dictionary<core.BaseModel>();
		   //sound
		   SoundManager.getInstance().loadLocalData();
		   //开启hashcount检测
            this.startCheckHashCount();
			//界面尺寸改变提示器
			LayerSetManager.getInstance().init();
			 //初始化网络参数
		   GameConfig.CasinoGame=window['CasinoGame'];
		   //
		   //初始化网络
		   //sockets.SocketMananger.getInstance().connectServer();
		//   egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END,()=>{
		// 	  console.log('ssss');
		// 	  window['screenfull'].request();
		//   },this);
		  
	}

	/**
	 * 启动hashcount检测
	 */
	public startCheckHashCount():void
	{
		let count=egret.$hashCount;
		setInterval(()=>{
			let newCount=egret.$hashCount;
		    var diff=newCount-count;
			count=newCount;
			if(diff>100)
			{
				console.log('性能消耗过大->'+diff);
			}
		},1000);
	}
    
	/**
	 * 得到某一个模块
	 */
	public getModle(key:any=core.ModleConst.COMMON_MODLE):core.BaseModel
	{
		if(!this.moduleMap[key])
		{
			var cls:any=egret.getDefinitionByName(key);
            this.moduleMap[key]=new cls();
		}
		return this.moduleMap[key];       
	}







}