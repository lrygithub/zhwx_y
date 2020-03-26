//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();
        egret.lifecycle.addLifecycleListener((context) => {
        

            //egret.sys.screenAdapter = new MyScreenAdapter();
            // let s: number = window.innerWidth / window.innerHeight - GameConfig.DES_WIDTH / GameConfig.DES_HEIGHT;
            // let d: number = (window.innerWidth / window.innerHeight) * GameConfig.DES_HEIGHT;
            // if (s > 0) {
            //     if (d > GameConfig.MAX_WIDTH) {
            //         egret.MainContext.instance.stage.setContentSize(GameConfig.MAX_WIDTH, GameConfig.DES_HEIGHT);
            //     }
            //     else {
            //         egret.MainContext.instance.stage.setContentSize(d, GameConfig.DES_HEIGHT);
            //     }
            // }
            // else {
            //     egret.MainContext.instance.stage.setContentSize(GameConfig.DES_WIDTH, GameConfig.DES_HEIGHT);
            // }
            //egret.sys.screenAdapter= new MyScreenAdapter();
        })

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            //egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
    }

    private async loadResource() {
        try {
            //  const loadingView = new LoadingUI();
            //  this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0);
            //this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        GameModleManger.getInstance().init(this.stage);
        //初始化具体游戏模块
        GameManager.getInstance().init();
        // let i: number = 2135;
        // //core.UIManager.openUI(core.UIConst.LoginUI);
        // window.onresize = () => {
        //     let s: number = window.innerWidth / window.innerHeight - GameConfig.DES_WIDTH / GameConfig.DES_HEIGHT;
        //     let d: number = (window.innerWidth / window.innerHeight) * GameConfig.DES_HEIGHT;
        //     if (s > 0) {
        //         if (d > GameConfig.MAX_WIDTH) {
        //             egret.MainContext.instance.stage.setContentSize(GameConfig.MAX_WIDTH, GameConfig.DES_HEIGHT);
        //         }
        //         else {
        //             egret.MainContext.instance.stage.setContentSize(d, GameConfig.DES_HEIGHT);
        //         }
        //     }
        //     else {
        //         egret.MainContext.instance.stage.setContentSize(GameConfig.DES_WIDTH, GameConfig.DES_HEIGHT);
        //     }

        // }
        // var webview = new WebView("http://www.sina.com");
        // webview.x = 100;
        // webview.y = 100;
        // webview.width = 500;
        // webview.height = 500;
        // webview.show();

        //  var img = new WebImage("/resource/assets/bg/atlas_1_34.png");
        // img.x = 100;
        // img.y = 100;
        // img.width = 500;
        // img.height = 500;
        // img.show();
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}
