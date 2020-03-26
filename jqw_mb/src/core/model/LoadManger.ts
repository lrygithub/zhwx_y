module core
{
   export class LoadManger extends egret.EventDispatcher
 {
	private static instance:LoadManger;
	public static getInstance():LoadManger
	{
		if(!this.instance)
		{
			this.instance=new LoadManger();
		}
		return this.instance;
	}
	
	public constructor() 
	{
		super();
	}
  
   /**
	* 加载的组名   回掉方法，回掉对象
    */
	public loadGroup(clsKey:any=UIConst.NomalLoadingUI,groupName:string,callBackFunc:any,callBackObj):void
	{ 
		if(!RES.isGroupLoaded(groupName))
		{
             UIManager.openUI(clsKey,LayerManager.Layer_Top);
             RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,(e:RES.ResourceEvent)=>{          
				var ui:NomalLoadingUI=UIManager.getUI(clsKey);
				ui.setPross(e.itemsLoaded,e.itemsTotal);
				//console.log(e.itemsLoaded+'/'+e.itemsTotal);
	         },this);
      
	         RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,(e:RES.ResourceEvent)=>{
				if(e.groupName==groupName)
				{
					callBackFunc.call(callBackObj);
					var ui:NomalLoadingUI=UIManager.getUI(clsKey);
				    UIManager.closeUI(clsKey);
				}
	         },this);
             RES.loadGroup(groupName);
		}
		else
		{
			callBackFunc.call(callBackObj);
		}
	
	}
}
}
