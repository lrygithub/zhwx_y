class Utils {
    /**
     * 获取从min-max之间的值
     * @param min
     * @param max
     */
    public static rang(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
    /**
     * 设置锚点居中
     */
    public static setAnchorCenter(component: egret.DisplayObject) {
        component.anchorOffsetX = component.width / 2;
        component.anchorOffsetY = component.height / 2;
    }

    /**
     * 计算两点距离
     * @param p1
     * @param p2
     * @returns {number}
     */
    public static distance(p1: egret.Point, p2: egret.Point): number {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    /**
     * 判断直线A是否与线段B相交（线面相交）
     * @param A 线段A的一个端点
     * @param B 线段A的一个端点
     * @param C 线段B的一个端点
     * @param D 线段B的一个端点
     * @returns {boolean}
     */
    public static lineIntersectSide(A: egret.Point, B: egret.Point, C: egret.Point, D: egret.Point): boolean {
        var fC: number = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
        var fD: number = (D.y - A.y) * (A.x - B.x) - (D.x - A.x) * (A.y - B.y);

        if (fC * fD > 0) {
            return false;
        }
        return true;
    }

    /**
     * 判断直线A是否与线段B相交（面面相交）
     * @param A 线段A的一个端点
     * @param B 线段A的一个端点
     * @param C 线段B的一个端点
     * @param D 线段B的一个端点
     * @returns {boolean}
     */
    public static sideIntersectSide(A: egret.Point, B: egret.Point, C: egret.Point, D: egret.Point): boolean {
        if (!Utils.lineIntersectSide(A, B, C, D))
            return false;
        if (!Utils.lineIntersectSide(C, D, A, B))
            return false;

        return true;
    }

    /**
     * 通过边获取角度
     * @param oppositeSideLen 对边长
     * @param adjacentSide 邻边长
     */
    public static getAngleBySide(oppositeSideLen: number, adjacentSideLen: number): number {
        return Math.atan(oppositeSideLen / adjacentSideLen) * (180 / Math.PI);
    }

    /**
     * 设置富文本
     */
    public static setRichText(text: egret.TextField | eui.Label, str: string): void {
        if (!text) {
            return;
        }
        if (str) {
            let htmlParser: egret.HtmlTextParser = new egret.HtmlTextParser();
            text.textFlow = htmlParser.parse(str);
        } else {
            text.text = str;
        }
    }
    /**基于矩形的碰撞检测*/
    public static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        if (obj1.getBounds != null && obj2.getBounds != null) {
            var rect1: egret.Rectangle = obj1.getBounds();
            var rect2: egret.Rectangle = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }
    }

    /**
      * 统计字符串的字节数
      * @param str 需要统计的字符串
      * @return {number} 字节数长度
      */
    public static checkLength(str: string): number {
        let bytes: egret.ByteArray = new egret.ByteArray();
        bytes.writeUTF(str);
        return bytes.length;
    }

    /**
     * 返回以x轴右方为0开始的顺时针旋转的角度
     * centralPointX:中心点x坐标
     * centralPointY:中心点y坐标
     * distancePointX:距离点x坐标
     * distancePointY:距离点y坐标
     */
    public static pointAmongAngle(centralPointX: number, centralPointY: number, distancePointX: number, distancePointY: number): number {
        let valueX = distancePointX - centralPointX;
        let valueY = distancePointY - centralPointY;
        let m_pDegrees = 0;
        if (valueX == 0 && valueY == 0) {
            return 0;
        }
        else if (valueX >= 0 && valueY >= 0) {
            m_pDegrees = Math.atan(valueY / valueX) * 180 / Math.PI;
        }
        else if (valueX <= 0 && valueY >= 0) {
            m_pDegrees = Math.atan(Math.abs(valueX) / valueY) * 180 / Math.PI + 90;
        }
        else if (valueX <= 0 && valueY <= 0) {
            m_pDegrees = Math.atan(Math.abs(valueY) / Math.abs(valueX)) * 180 / Math.PI + 180;

        }
        else if (valueX >= 0 && valueY <= 0) {
            m_pDegrees = Math.atan(valueX / Math.abs(valueY)) * 180 / Math.PI + 270;
        }
        return m_pDegrees;
    }
    /**
     * 一维数组转二维数组
     * @param arr   要转换的数组
     * @param cols  单行列数
     */
    public static arrToArr2(arr: any[], cols: number): any[] {
        let arr2: any[] = [];
        if (arr) {
            let rowArr: any[];
            for (let i: number = 0, iLen: number = arr.length; i < iLen; i++) {
                if (i % cols === 0) {
                    rowArr = [];
                    arr2.push(rowArr);
                }
                rowArr.push(arr[i]);
            }
        }
        return arr2;
    }

    /**
     * 根据key值返回浏览器参数
     * @param key key值
     */
    public static getUrlPara(key: any): any {
        var url = location.search.replace(/^\?/, '').split('&');
        var paramsObj = {};
        for (var i = 0, iLen = url.length; i < iLen; i++) {
            var param = url[i].split('=');
            paramsObj[param[0]] = param[1];
        }
        if (key) {
            return paramsObj[key] || '';
        }
        return paramsObj;
    }

    /**
     * 限制一个数在最大值和最小值之间
     */
    public static limit(p: number, min: number, max: number): number {
        if (p < min) {
            return min;
        }
        if (p > min) {
            return max;
        }
        return p;
    }
    /**
     * 将val的值限制起来
     * @param val
     * @param min
     * @param max
     * @returns {number}
     */
    public static limit1(val: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, val));
    }
    /**
     * 时间格式化
     * @param time
     * @returns {string}
     */
    public static showTimeFormat(time: number) {
        time = Math.floor(time / 1000);
        var d = Math.floor(time / (3600 * 24));
        time = time % (3600 * 24);
        var h = Math.floor(time / (3600));
        time = time % (3600);
        var m = Math.floor(time / 60);
        time = time % 60;
        var s = Math.floor(time);
        if (d <= 0 && h <= 0 && m <= 0) {
            return s + "秒";
        }
        if (d <= 0 && h <= 0) {
            return m + "分" + (s > 9 ? s : "0" + s) + "秒";
        }
        if (d <= 0) {
            return h + "时" + (m > 0 ? m : "0" + m) + "分" + (s > 9 ? s : "0" + s) + "秒";
        }
        return d + "天" + (h > 0 ? h : "0" + h) + "时" + (m > 0 ? m : "0" + m) + "分" + (s > 9 ? s : "0" + s) + "秒";
    }

    /**
   * 返回大数据的显示方式
   * @param num
   * @returns {string}
   */
    static getBigNumberShow(num: number): string {
        if (num < 10000) {
            return num + "";
        } else {
            num /= 1000;
            return num.toFixed(1) + "K";
        }
    }

    /**
     * 元素是否包含在Array里
     * @param el
     * @param arr
     * @returns {boolean}
     */
    static isElinArr(el: any, arr: any[]) {
        return arr.indexOf(el) > -1;
    }

    /**
     * 2个Array是否有相交元素
     * @param arr1
     * @param arr2
     */
    static isArrCrossing(arr1: any[], arr2: any[]) {
        for (var i = 0; i < arr1.length; i++) {
            if (Utils.isElinArr(arr1[i], arr2)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 从地址上获取key
     * @param name {string} 要获取的key名称
     * @returns {string} key值
     * @platform Web
     * @code utf-8
     */
    public static getURLQueryString(name: string): string {
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            var url: string = decodeURIComponent(window.location.href);
            url = url.replace(/&quot/g, "\"");
            var r;
            if (url.indexOf("#?") > 0) {
                url = url.replace("#?", "&");
                r = url.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
            } else {
                r = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"))
            }
            return r ? r[2] : null;
        }
    }


    public static getMaxStr(str: string) {
        if (str.length <= 5) {
            return str;
        }
        return str.substr(0, 5) + "...";
    }

    public static removeArrayItem(arr: Array<any>, item: any) {
        var index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    public static mtaChainSdk(id: string) {
        var MtaH5 = window['MtaH5'];
        if (MtaH5 && MtaH5.clickStat) {
            var obj = {};
            obj[id.toLocaleLowerCase()] = 'true';
            MtaH5.clickStat('yemianshendu', obj);
        }
    }
    /**
    * 两矩形碰撞
    * @param x1 {number} 方1x
    * @param y1 {number} 方1y
    * @param w1 {number} 方1宽
    * @param h1 {number} 方1高
    * @param x2 {number} 方2x
    * @param y2 {number} 方2y
    * @param w2 {number} 方2宽
    * @param h2 {number} 方2高
    */
    public static isCollsionRect2(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): boolean {
        return ((x1 >= x2 && x1 >= x2 + w2) || (x1 <= x2 && x1 + w1 <= x2) || (y1 >= y2 && y1 >= y2 + h2) || (y1 <= y2 && y1 + h1 <= y2)) ? false : true;
    }

    public static rect1CollsionRect2(rect1: egret.Rectangle, rect2: egret.Rectangle) {
        return Utils.isCollsionRect2(rect1.x, rect1.y, rect1.width, rect1.height, rect2.x, rect2.y, rect2.width, rect2.height);
    }




    /**
     * 大数字转化
     */
    private static MAXK: number = 100000;
    private static MAXM: number = 1000 * 1000;
    public static BigNumTostring(n: number): string {
        var str: string = n.toString();
        if (n >= Utils.MAXK && n < Utils.MAXM) {
            str = (n / 1000).toFixed(2) + "K";
        }
        else if (n >= 1000 * 1000) {
            str = (n / Utils.MAXM).toFixed(2) + "M";
        }
        return str.toString();
    }

    private static MAXK1: number = 1000;
    public static BigNumTostring1(n: number): string {
        var str: string = n.toString();
        if (n >= Utils.MAXK1 && n < Utils.MAXM) {
            str = (n / 1000) + "";
            let a = str.split(".")[0];
            let b = str.split(".")[1];
            str = a + "." + (b ? b.substr(0, 2) : "00") + "k";
        }
        else if (n >= 1000 * 1000) {
            str = (n / Utils.MAXM) + "";
            let a = str.split(".")[0];
            let b = str.split(".")[1];
            str = a + "." + (b ? b.substr(0, 2) : "00") + "M";
        }


        return str + "";
    }

    /**
   * 判断屏幕方向 0书 1横
   */
    public static getOrientationType(): number {
        if (window.orientation === 180 || window.orientation === 0) {
            return 0;
        }
        if (window.orientation === 90 || window.orientation === -90) {
            return 1;
        }
    }
    /**将数组分割
    * @arr:原数组
    * @subLen:分割的块长度
    */
    public static ArrConvert(arr: Array<any>, subLen: number): Array<any> {
        let count = arr.length % subLen == 0 ? arr.length / subLen : arr.length / subLen + 1;
        // let count = arr.length / subLen;
        let arr1 = new Array();
        for (let i = 0; i < count; i++) {
            let index = i * subLen;
            let arr2 = new Array();
            let j = 0;
            while (j < subLen && index < arr.length) {
                arr2.push(arr[index++]);
                j++
            }
            arr1.push(arr2);
        }
        return arr1;
    }

    //计算时间截差 timer1-timer2 格式数据库默认转换 返回的是秒数*1000
    public static timerOver(_timer1, _timer2) {
        //正则转换
        var _T1 = _timer1.replace(/-/g, '/');
        var _T2 = _timer2.replace(/-/g, '/');
        //转换成时间戳
        var date_t1 = Date.parse(_T1);
        var date_t2 = Date.parse(_T2);
        //计算时间差
        var usedTime = date_t1 - date_t2;  //两个时间戳相差的毫秒数  
        var days = Math.floor(usedTime / (24 * 3600 * 1000));
        //计算出小时数  
        var leave1 = usedTime % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数  
        var hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数  
        var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数  
        var minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)
        var time = days + "天" + hours + "时" + minutes + "分" + seconds;
        return time;
    }

    //循环播放EGRET TWEEN动画
    public static playTweenAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    }

    //播放RES声音: 路径,次数(次数为-1则无限)
    public static PlayBgSound(soundurl: string, _cont: number) {
        var sound: egret.Sound = RES.getRes(soundurl);
        sound.play(0, _cont);
        return sound;
    }

    //     //创建播放龙骨动画: 资源名,x,y,动画名,加载的容器
    //    public static createArmature(_x: number, _y: number, _movieName: string, armatureName: string, _target) {
    //         let rawData = RES.getRes(armatureName + "_ske_json");
    //         let texture = RES.getRes(armatureName + "_tex_png");
    //         let textureData = RES.getRes(armatureName + "_tex_json");
    //         var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
    //         dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(rawData));
    //         dragonbonesFactory.addTextureAtlasData(new dragonBones.EgretTextureAtlas(texture, textureData));
    //         var armature: dragonBones.Armature = dragonbonesFactory.buildArmature("Armature");
    //         _target.addChild(armature.getDisplay());
    //         armature.animation.play(_movieName);
    //         armature.display.x = _x;
    //         armature.display.y = _y;
    //         dragonBones.WorldClock.clock.add(armature);
    //         return armature;
    //     }

    //     //创建播放MovieClip动画： 动画名,加载的容器,x,y,动画组名,播放次数-1为无限,资源名
    //     public static LoadMovieClipMovie(_movieName: string, _loadMc, _x: number, _y: number, GroupName, timers: number, _jsonname: string) {
    //         let data = RES.getRes(_jsonname + "_json");
    //         let txtr = RES.getRes(_jsonname + "_png");
    //         var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
    //         var _mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData(GroupName));
    //         _mc.x = _x;
    //         _mc.y = _y
    //         _loadMc.addChild(_mc)
    //         _mc.gotoAndPlay(_movieName, timers);
    //         _mc.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
    //             //监听播放完毕直接移除掉
    //             _loadMc.removeChild(_mc)
    //         }, this);
    //         return _mc;
    //     }

    //     //创建播放粒子动画: 资源名,加载的容器,x,y
    //     public static creatParticle(_pname: string, _target, _x: number, _y: number) {
    //         let texture = RES.getRes(_pname + "_png");
    //         let config = RES.getRes(_pname + "_json");
    //         var _particle = new particle.GravityParticleSystem(texture, config);
    //         _target.addChild(_particle);
    //         _particle.x = _x;
    //         _particle.y = _y;
    //         _particle.start()
    //         return _particle;
    //     }

    //是不是微信浏览
    public static isWeiXin(): boolean {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (microStr == "null") {
            return false;
        } else if (microStr == "micromessenger") {
            return true;
        }
    }
    /**
     * 随机数种子
     */
    public static seed: number = 5;
    /**
     * 随机
     */
    public static getRandom(min, max): number {
        max = max || 1;
        min = min || 0;
        Utils.seed = (Utils.seed * 9301 + 49297) % 233280;
        var rnd = Utils.seed / 233280.0;
        return min + rnd * (max - min);
    }

    public static isSameDay(timeStampA, timeStampB) {
    let dateA = new Date(timeStampA);
    let dateB = new Date(timeStampB);
    return (dateA.setHours(0, 0, 0, 0) == dateB.setHours(0, 0, 0, 0));
}
}

/**
 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
 */
function createBitmapByName(name: string): egret.Bitmap {
    var result: egret.Bitmap = new egret.Bitmap();
    var texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result;
}
/**
   * 根据name关键字创建一个Bitmap对象。此name 是根据TexturePacker 组合成的一张位图
   */
function createBitmapFromSheet(name: string, sheetName: string = "gameRes"): egret.Bitmap {
    var sheet: egret.SpriteSheet = RES.getRes(sheetName);
    var texture: egret.Texture = sheet.getTexture(name);
    var result: egret.Bitmap = new egret.Bitmap();
    result.texture = texture;
    return result;
}

function getTextureFromSheet(name: string, sheetName: string = "gameRes"): egret.Texture {
    var sheet: egret.SpriteSheet = RES.getRes(sheetName);
    var result: egret.Texture = sheet.getTexture(name);
    return result;
}

function dateFtt(fmt, date) { //author: meizz 
    var o = {
        "M+": date.getMonth() + 1,     //月份 
        "d+": date.getDate(),     //日 
        "h+": date.getHours(),     //小时 
        "m+": date.getMinutes(),     //分 
        "s+": date.getSeconds(),     //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds()    //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}





