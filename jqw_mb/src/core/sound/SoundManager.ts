/**
 * Created by lry 2019.1.7
 * Sound管理类
 */
class SoundManager {

    public effectOn: boolean = false;
    public bgOn: boolean = false;
    private currBg: string;
    private bgVolume: number;
    private effectVolume: number;
    public bgchanel: egret.SoundChannel;
    public dic: Dictionary<any>;

    public lastVolume: number;




    /**
     * 构造函数
     */
    private constructor() {
        this.bgOn = false;
        this.effectOn = false;
        this.bgVolume = 1;
        this.effectVolume = 1;
        this.lastVolume = 1;
        this.dic = new Dictionary<any>();
        // egret.MainContext.instance.stage.once(egret.TouchEvent.TOUCH_TAP,()=>{
        //     this.playMusic('button_mp3',1).then((channel)=>{
        //        channel.volue=0;
        //     });
        // },this);
    }

    public saveVolue(): void {
        this.lastVolume = this.effectVolume;
    }

    public loadLocalData(): void {
        let bg: any = egret.localStorage.getItem('bgOn');
        let effect: any = egret.localStorage.getItem('effectOn');
        let volume: any = egret.localStorage.getItem('volume');
        let lastVolume: any = egret.localStorage.getItem('lastVolume');
        if (bg != null) {
            this.bgOn = bg == 0 ? false : true;
        }
        else {
            egret.localStorage.setItem('bgOn', '1');
        }
        if (effect != null) {
            this.effectOn = effect == 0 ? false : true;
        }
        else {
            egret.localStorage.setItem('effectOn', '1');
        }

        if (volume != null) {
            this.bgVolume = volume;
            this.effectVolume = volume;
        }
        else {
            egret.localStorage.setItem('volume', '' + this.bgVolume);
        }

        if (lastVolume != null) {
            this.lastVolume = lastVolume;
        }
        else {
            egret.localStorage.setItem('lastVolume', '' + this.lastVolume);
        }


    }

    /**
     * 播放音效
     */
    public playEffect(effectName: string, delayTime: number = -1): void {

        if (!this.effectOn) return;
        let chanel: egret.SoundChannel;
        let sound: egret.Sound = RES.getRes(effectName);
        if (sound) {
            chanel = sound.play(0, 1);
            this.dic.add(effectName, chanel);
            chanel.once(egret.Event.SOUND_COMPLETE, (e: egret.Event) => {
                this.dic.remove(effectName);
            }, this);
            chanel.volume = this.effectVolume;
        }
        else {
            //console.log('聲音->'+effectName+'->未預加載');
            let loadComplete: any = (data, key) => {
                chanel = data.play(0, 1);
                this.dic.add(effectName, chanel);
                chanel.once(egret.Event.SOUND_COMPLETE, (e: egret.Event) => {
                    this.dic.remove(effectName);
                }, this);
                chanel.volume = this.effectVolume;
            }
            RES.getResAsync(effectName, loadComplete, this);
        }
    }

    public close(): void {
        for (let i: number = 0; i < this.dic.values.length; i++) {
            let chanel: egret.SoundChannel = this.dic.values[i];
            if (chanel) {
                chanel.volume = 0;
            }
        }
    }

    public open(): void {
        for (let i: number = 0; i < this.dic.values.length; i++) {
            let chanel: egret.SoundChannel = this.dic.values[i];
            if (chanel) {
                chanel.volume = this.effectVolume;
            }
        }
    }

    /**
     * 播放背景音乐
     * @param key
     */
    public playBg(bgName: string): void {
        this.currBg = bgName;
        if (!this.bgOn)
            return;
        this.playMusic(bgName).then((chanel) => {
            if (this.bgchanel) {
                this.bgchanel.stop();
                this.bgchanel = null;
            }
            this.bgchanel = chanel;
            this.bgchanel.volume = this.bgVolume;
        });
    }

    /**
     * 停止背景音乐
     */
    public stopBg(): void {
        if (this.bgchanel) {
            this.bgchanel.stop();
            this.bgchanel = null;
        }
    }

    /**
     * 设置音效是否开启
     * @param $isOn
     */
    public setEffectOn($isOn: boolean): void {
        this.effectOn = $isOn;
        egret.localStorage.setItem('effectOn', this.effectOn == true ? '1' : '0');
        if (this.effectOn) {
            this.open();
        }
        else {
            this.close();
        }
    }

    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    public setBgOn($isOn: boolean): void {
        this.bgOn = $isOn;
        egret.localStorage.setItem('bgOn', this.bgOn == true ? '1' : '0');
        if (!this.bgOn) {
            this.stopBg();
        }
        else {
            this.playBg(this.currBg);
        }
    }


    /**
     * 设置背景音乐音量
     * @param volume
     */
    public setBgVolume(volume: number): void {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        egret.localStorage.setItem('lastVolume', this.bgVolume + '');
        this.bgVolume = volume;
        egret.localStorage.setItem('volume', volume + '');
        if (this.bgchanel) {
            this.bgchanel.volume = this.bgVolume;
        }

    }

    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    public getBgVolume(): number {
        return this.bgVolume;
    }

    /**
     * 设置音效音量
     * @param volume
     */
    public setEffectVolume(volume: number): void {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        egret.localStorage.setItem('lastVolume', this.effectVolume + '');
        this.effectVolume = volume;
        egret.localStorage.setItem('volume', volume + '');
    }

    /**
     * 获取音效音量
     * @returns {number}
     */
    public getEffectVolume(): number {
        return this.effectVolume;
    }
    private static ins: SoundManager;

    public static getInstance(): SoundManager {
        if (this.ins == null) {
            this.ins = new SoundManager();
        }
        return this.ins;
    }

    public playMusic(name: any = '', isloop: number = -1): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let chanel: egret.SoundChannel;
            let sound: egret.Sound = RES.getRes(name);
            if (!sound) {
                let loadComplete = (data, key) => {
                    if (data == null) {
                        console.log(name + '->不存在的资源');
                        reject();
                    }
                    else {
                        chanel = data.play(name, isloop);
                        this.dic.add(name, chanel);
                        chanel.once(egret.Event.SOUND_COMPLETE, (e: egret.Event) => {
                            this.dic.remove(name);
                        }, this);
                        chanel.volume = this.effectVolume;
                        resolve(chanel);
                    }

                }
                RES.getResAsync(name, loadComplete, this);
            }
            else {
                chanel = sound.play(name, isloop);
                this.dic.add(name, chanel);
                chanel.once(egret.Event.SOUND_COMPLETE, (e: egret.Event) => {
                    this.dic.remove(name);
                }, this);
                chanel.volume = this.effectVolume;
                resolve(chanel);
            }
        });

    }
}