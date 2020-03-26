/**
 * WebImage
 * 适配FIXED_WIDTH、FIXED_HEIGHT、NO_BORDER、SHOW_ALL四种缩放模式
 * 暂未考虑屏幕大小改变、屏幕旋转以及单页面多Webplay实例的情形
 * Created by yxiao on 2015/9/30.
 */
class WebImage extends egret.DisplayObjectContainer {

    private _x:number=0;
    private _y:number=0;
    private _width:number=0;
    private _height:number=0;
    private _src:string="";

    private _scaleMode:string=egret.MainContext.instance.stage.scaleMode;
    private _stageW:number;
    private _stageH:number;
    private _windowW:number;
    private _windowH:number;
    private _displayH:number;
    private _displayW:number;
    private _designH:number;
    private _designW:number;

    private _imgWrapper:HTMLDivElement=null;
    private _img:HTMLIFrameElement=null;

    /**
     * @param src
     */
    public constructor(src:string){
        super();

        var stageDelegateDom:HTMLElement=document.getElementById("StageDelegateDiv"),playerContainer:HTMLElement=stageDelegateDom.parentElement;
        var imgWrapperDom=document.getElementById("img-wrapper");
        if(!imgWrapperDom){
            imgWrapperDom=document.createElement("div");
            imgWrapperDom.style.display="none";
            imgWrapperDom.attributes['style'].value+='position:absolute;';//解决iframe在ios下的显示问题
            imgWrapperDom.id="img-wrapper";
            stageDelegateDom.appendChild(imgWrapperDom);
        }
        this._imgWrapper=<HTMLDivElement>imgWrapperDom;
        this._imgWrapper.style.display="none";
        this._imgWrapper.style.opacity="0";

        var img = document.createElement("img"),t=new Date().getTime();
        img.src=src;
        img.id="img-"+t;
        img.name="img-"+t;
        img.style.position="absolute";
        img.style.top="0";
        img.style.left="0";
        img.style.opacity="0";
        img.style.display='none';
        img.border="0";
		img.style.width="100%";
		img.style.height="100%";
        this._imgWrapper.appendChild(img);

        this._img=<HTMLIFrameElement>document.getElementById("img-"+t);
        var self=this;
        this._img.onload=function(){
            self._imgWrapper.style.opacity="1";
            self._img.style.opacity="1";
        }

        this._stageW=egret.MainContext.instance.stage.stageWidth;
        this._stageH=egret.MainContext.instance.stage.stageHeight;
        this._windowW=window.innerWidth;
        this._windowH=window.innerHeight;
        this._designH=parseInt(playerContainer.attributes['data-content-height'].value);
        this._designW=parseInt(playerContainer.attributes['data-content-width'].value);

        var stageSize = egret.sys.screenAdapter.calculateStageSize(egret.MainContext.instance.stage.scaleMode, this._windowW, this._windowH, this._designW, this._designH);
        this._displayH=stageSize.displayHeight;
        this._displayW=stageSize.displayWidth;

        console.log("windowW:"+this._windowW);
        console.log("stageW:"+this._stageW);
        console.log("disPlayW:"+this._displayW);
        console.log("windowH:"+this._windowH);
        console.log("stageH:"+this._stageH);
        console.log("displayH:"+this._displayH);
    }

    public show():void {
        this._img.style.display='block';
        this._imgWrapper.style.display='block';
    }

    public destroy():void {
        if(this._img){
            this._imgWrapper.style.display="none";
            this._imgWrapper.removeChild(this._img);
        }
    }

    public get width():number {
        return this._width;
    }

    public set width(value:number) {
        this._width = value;
        if(this._scaleMode==egret.StageScaleMode.FIXED_WIDTH || this._scaleMode==egret.StageScaleMode.FIXED_HEIGHT ){
            //this._img.width=this._width/this._stageW*this._windowW+"px";
            this._imgWrapper.style.width=this._width/this._stageW*this._windowW+"px";
        }
        if(this._scaleMode==egret.StageScaleMode.SHOW_ALL || this._scaleMode==egret.StageScaleMode.NO_BORDER ) {
            if(this._windowW==this._displayW){
                //this._img.style.width = this._width / this._stageW * this._windowW + "px";
                this._imgWrapper.style.width = this._width / this._stageW * this._windowW + "px";
            }else{
                //this._img.style.width = this._width / this._stageW * this._displayW + "px";
                this._imgWrapper.style.width = this._width / this._stageW * this._displayW + "px";
            }
        }
    }

    public get height():number {
        return this._height;
    }

    public set height(value:number) {
        this._height = value;
        if(this._scaleMode==egret.StageScaleMode.FIXED_WIDTH || this._scaleMode==egret.StageScaleMode.FIXED_HEIGHT ) {
            //this._img.height=this._height/this._stageH*this._windowH+"px";
            this._imgWrapper.style.height=this._height/this._stageH*this._windowH+"px";
        }
        if(this._scaleMode==egret.StageScaleMode.SHOW_ALL || this._scaleMode==egret.StageScaleMode.NO_BORDER ) {
            if(this._windowH==this._displayH){
                //this._img.style.height = this._height / this._stageH * this._windowH + "px";
                this._imgWrapper.style.height = this._height / this._stageH * this._windowH + "px";
            }else{
                //this._img.style.height = this._height / this._stageH * this._displayH + "px";
                this._imgWrapper.style.height = this._height / this._stageH * this._displayH + "px";
            }
        }
    }

    public set x(value:number) {
        this._x = value;
        if(this._scaleMode==egret.StageScaleMode.FIXED_WIDTH   || this._scaleMode==egret.StageScaleMode.FIXED_HEIGHT) {
            this._imgWrapper.style.left = this._x / this._stageW * this._windowW + "px";
        }
        if(this._scaleMode==egret.StageScaleMode.SHOW_ALL || this._scaleMode==egret.StageScaleMode.NO_BORDER ) {
            if(this._windowW==this._displayW){
                this._imgWrapper.style.left = this._x / this._stageW * this._windowW + "px";
            }else{
                this._imgWrapper.style.left = this._x / this._stageW * this._displayW + "px";
            }
        }
    }

    public set y(value:number) {
        this._y = value;
        if(this._scaleMode==egret.StageScaleMode.FIXED_WIDTH  || this._scaleMode==egret.StageScaleMode.FIXED_HEIGHT ) {
            this._imgWrapper.style.top = this._y / this._stageH * this._windowH + "px";
        }
        if(this._scaleMode==egret.StageScaleMode.SHOW_ALL || this._scaleMode==egret.StageScaleMode.NO_BORDER){
            if(this._windowH==this._displayH){
                this._imgWrapper.style.top = this._y / this._stageH * this._windowH + "px";
            }else{
                this._imgWrapper.style.top =this._y / this._stageH * this._displayH + "px";
            }
        }
    }

    public get x():number {
        return this._x;
    }

    public get y():number {
        return this._y;
    }

    public get src():string {
        return this._src;
    }

    public set src(value:string) {
        this._src = value;
    }
}