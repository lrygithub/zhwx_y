module core {
	export class BaseTops  extends eui.Component
	{
		public rect:eui.Rect;
		public constructor() 
		{
			super();
			this.rect=new eui.Rect();
		    this.rect.alpha=0;
		    this.rect.width=GameConfig.WIDTH;
		    this.rect.height=GameConfig.HEIGHT;
		}

		 public show():void
	 {  
		  var layer:eui.UILayer=core.LayerManager.getInstance().getLayer(core.LayerManager.Layer_Top);
		  layer.addChild(this.rect);
	 }

	 public hide():void
	 {
           if(this.parent)
		   {
			   this.parent.removeChild(this);
		   }
		   if(this.rect.parent)
		   {
                var layer:eui.UILayer=core.LayerManager.getInstance().getLayer(core.LayerManager.Layer_Top);
		        layer.removeChild(this.rect);
		   }
	 }
	}
}