class MyCompoment extends eui.Component
 {
	public constructor() 
	{
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdd,this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
	}

	public onAdd():void
	{

	}

	public onRemove():void
	{
		
	}
}