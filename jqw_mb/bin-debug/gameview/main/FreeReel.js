var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var FreeReel = (function (_super) {
    __extends(FreeReel, _super);
    function FreeReel() {
        var _this = _super.call(this) || this;
        /**
        * 滚动速度
        */
        _this.reelSpeed = 80;
        /**
             * 展示数量
             */
        _this.ShowNum = 4;
        _this.displacement = 41;
        _this.NukER = 0;
        _this.skinName = FreeReelSkin;
        _this.oninit();
        return _this;
    }
    FreeReel.prototype.oninit = function () {
        this.MC_Array = [];
        this.MC_Array.length = 0;
        this.JQW_Array = [];
        this.JQW_Array.length = 0;
        this.pz_Array = [];
        this.pz_Array.length = 0;
        if (!this.quanMC) {
            this.quanMC = game.MCUtils.getMc('quan');
        }
        for (var i = 0; i < 4; i++) {
            this.MC_Array.push(game.MCUtils.getMc('iocnType'));
        }
        for (var j = 0; j < 4; j++) {
            this.JQW_Array.push(game.MCUtils.getMc('jqw'));
        }
        for (var k = 0; k < 4; k++) {
            this.pz_Array.push(game.MCUtils.getMc('freeIcon'));
        }
    };
    FreeReel.prototype.init = function (index, initone) {
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 4; j++) {
                var item = new FreeItem();
                item.width = this.G1.width;
                item.height = this.G1.height / this.ShowNum;
                this.G1.addChild(item);
                item.y = item.height * j - this.G1.height * (i);
                if (!initone) {
                    item.isShowIcon(index, j);
                }
                else {
                    item.isShowIcon(index, j, vo.GameData.resultData.Value.Main.ReelSymbols);
                }
            }
        }
    };
    FreeReel.prototype.start = function (index) {
        this.NukER = 0;
        FreeReel.if_onefree = false;
        FreeReel.if_twofree = false;
        if (GameConfig.speedPlay) {
            this.displacement = 54;
            for (var j = 0; j < this.G1.numChildren; j++) {
                var reelItem = this.G1.getChildAt(j);
                reelItem.OnshowIcon(index, j % 4, GameManager.getInstance().initdata_1, false);
            }
            this.iocnTurn1(index);
        }
        else {
            this.displacement = 40.5;
            for (var j = 4; j < this.G1.numChildren; j++) {
                var reelItem = this.G1.getChildAt(j);
                reelItem.OnshowIcon(index, j % 4, GameManager.getInstance().initdata_1, true);
            }
            this.iocnTurn(index);
        }
    };
    /**
     * 接收到数据之后，判断是否有在2.3轴出现C1图标
     */
    FreeReel.prototype.judge = function () {
        for (var k = 1; k < 3; k++) {
            for (var g = 0; g < 4; g++) {
                if (vo.GameData.resultData.Value.Main.ReelSymbols[k][g] == "C1") {
                    if (k == 1) {
                        FreeReel.if_onefree = true;
                    }
                    if (k == 2) {
                        FreeReel.if_twofree = true;
                    }
                }
            }
        }
        if (FreeReel.if_onefree && FreeReel.if_twofree) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     *icon普通转动
     */
    FreeReel.prototype.iocnTurn = function (index) {
        var _this = this;
        var yy = 0;
        var tt = 0;
        this["timer1" + index] = egret.setInterval(function () {
            yy += 1;
            for (var i_1 = 0; i_1 < _this.G1.numChildren; i_1++) {
                var reelItem = _this.G1.getChildAt(i_1);
                reelItem.y += _this.displacement;
                if (reelItem.y > (_this.G1.height + reelItem.height)) {
                    _this.NukER += 1;
                    if (_this.NukER > 47) {
                        _this.NukER = 0;
                    }
                    reelItem.y = -_this.G1.height + reelItem.height;
                    reelItem.OnshowIcon(index, _this.NukER, GameManager.getInstance().initdata_1, true);
                }
            }
            if (yy > 100 && GameManager.getInstance().WhetherData) {
                if (_this.judge()) {
                    if (index < 3) {
                        tt += 1;
                        if (tt >= 72 + index * 10) {
                            egret.clearInterval(_this["timer1" + index]);
                            var _loop_1 = function (j) {
                                var reelItem = _this.G1.getChildAt(j);
                                reelItem.y = (j % 4) * reelItem.height - Math.floor(j / 4) * _this.G1.height;
                                reelItem.isShowIcon(index, j % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
                                egret.Tween.get(reelItem).to({ y: reelItem.y + 40 }, 200, egret.Ease.backOut).call(function () {
                                    egret.Tween.get(reelItem).to({ y: reelItem.y - 40 }, 100).call(function () {
                                    });
                                });
                            };
                            for (var j = 0; j < _this.G1.numChildren; j++) {
                                _loop_1(j);
                            }
                            if (index == 1) {
                                var Whetherfree = false;
                                for (var i = 0; i < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; i++) {
                                    if ((vo.GameData.resultData.Value.Main.ReelSymbols[index][i]) == "C1") {
                                        Whetherfree = true;
                                        var reelItem = _this.G1.getChildAt(i);
                                        reelItem.isPlayFree(true);
                                    }
                                }
                                if (Whetherfree) {
                                    SoundManager.getInstance().playEffect("paizi_1_mp3");
                                    //	console.log("2轴  出现免费牌子 播放免费牌子出现音效，播放免费牌子第一个特效")
                                }
                            }
                            if (index == 2) {
                                var Whetherfree = false;
                                FreeGameScence.quanType.G2.addChild(FreeGameScence.quanType.quanMC);
                                FreeGameScence.quanType.quanMC.gotoAndPlay("a0", -1);
                                FreeGameScence.quanType.quanMC.x = -60;
                                FreeGameScence.quanType.quanMC.y = -90;
                                FreeGameScence.quanType.quanMC.scaleX = 1.05;
                                FreeGameScence.quanType.quanMC.scaleY = 1.1;
                                for (var i = 0; i < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; i++) {
                                    if ((vo.GameData.resultData.Value.Main.ReelSymbols[index][i]) == "C1") {
                                        Whetherfree = true;
                                        var reelItem = _this.G1.getChildAt(i);
                                        reelItem.isPlayFree(true);
                                    }
                                }
                                if (Whetherfree) {
                                    SoundManager.getInstance().playEffect("paizi_2_mp3");
                                    //	SoundManager.getInstance().playEffect("quan_mp3");
                                    SoundManager.getInstance().playMusic("quan_mp3").then(function (chanel) {
                                        GameScence.Music_1 = chanel;
                                    });
                                    //	console.log("3轴  出现免费牌子 播放免费牌子出现音效，播放免费牌子第一个特效")
                                }
                            }
                        }
                    }
                    else if (index >= 3) {
                        tt += 1;
                        if (tt == 20 + index * 10) {
                            for (var j1 = 0; j1 < _this.G1.numChildren; j1++) {
                                var reelItem = _this.G1.getChildAt(j1);
                                //	reelItem.y = (j % 4) * reelItem.height - Math.floor(j / 4) * this.G1.height;
                                reelItem.isShowIcon(index, j1 % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
                            }
                        }
                        if (tt >= 50 + index * 16) {
                            egret.clearInterval(_this["timer1" + index]);
                            var _loop_2 = function (j) {
                                var reelItem = _this.G1.getChildAt(j);
                                reelItem.y = (j % 4) * reelItem.height - Math.floor(j / 4) * _this.G1.height;
                                reelItem.isShowIcon(index, j % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
                                egret.Tween.get(reelItem).to({ y: reelItem.y + 40 }, 200, egret.Ease.backOut).call(function () {
                                    egret.Tween.get(reelItem).to({ y: reelItem.y - 40 }, 100).call(function () {
                                    });
                                });
                            };
                            for (var j = 0; j < _this.G1.numChildren; j++) {
                                _loop_2(j);
                            }
                            if (index == 3) {
                                if (_this.quanMC && _this.quanMC.parent) {
                                    _this.quanMC.parent.removeChild(_this.quanMC);
                                    _this.quanMC.stop();
                                }
                                var Whetherfree = false;
                                for (var i = 0; i < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; i++) {
                                    if ((vo.GameData.resultData.Value.Main.ReelSymbols[index][i]) == "C1") {
                                        Whetherfree = true;
                                        var reelItem = _this.G1.getChildAt(i);
                                        reelItem.isPlayFree(true);
                                    }
                                }
                                if (Whetherfree) {
                                    //		console.log("4轴  出现免费牌子 播放免费牌子出现音效，播放免费牌子第一个特效")
                                    SoundManager.getInstance().playEffect("paizi3_mp3");
                                }
                                else {
                                    FreeGameScence.Type1.onEliminateIcon(1);
                                    FreeGameScence.Type2.onEliminateIcon(2);
                                }
                            }
                            if (index == 4) {
                                _this.timerdely = egret.setTimeout(function () {
                                    //		console.log("index=" + 4 + " -------------游戏结束");
                                    if (GameScence.START_CHANEL) {
                                        GameScence.START_CHANEL.stop();
                                        GameScence.START_CHANEL = null;
                                    }
                                    if (GameScence.Music_1) {
                                        GameScence.Music_1.stop();
                                        GameScence.Music_1 = null;
                                    }
                                    core.NotifyManager.getInstance().sendNotify(core.NotifyConst.LOGIC_ROUNDOVER);
                                }, _this, 300);
                            }
                        }
                    }
                }
                else {
                    tt += 1;
                    if (tt >= 48 + index * 32) {
                        egret.clearInterval(_this["timer1" + index]);
                        var _loop_3 = function (j) {
                            var reelItem = _this.G1.getChildAt(j);
                            reelItem.y = (j % 4) * reelItem.height - Math.floor(j / 4) * _this.G1.height;
                            reelItem.isShowIcon(index, j % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
                            egret.Tween.get(reelItem).to({ y: reelItem.y + 40 }, 200, egret.Ease.backOut).call(function () {
                                egret.Tween.get(reelItem).to({ y: reelItem.y - 40 }, 100).call(function () {
                                });
                            });
                        };
                        for (var j = 0; j < _this.G1.numChildren; j++) {
                            _loop_3(j);
                        }
                        if (index == 1) {
                            var Whetherfree = false;
                            for (var i = 0; i < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; i++) {
                                if (vo.GameData.resultData.Value.Main.ReelSymbols[index][i] == "C1") {
                                    Whetherfree = true;
                                    var reelItem = _this.G1.getChildAt(i);
                                    reelItem.isPlayFree(false);
                                }
                            }
                            if (Whetherfree) {
                                SoundManager.getInstance().playEffect("paizi_1_mp3");
                                //		console.log("2轴  出现免费牌子 播放免费牌子出现音效，播放免费牌子第一个特效")
                            }
                        }
                        if (index == 2) {
                            var Whetherfree = false;
                            for (var i = 0; i < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; i++) {
                                if (vo.GameData.resultData.Value.Main.ReelSymbols[index][i] == "C1") {
                                    Whetherfree = true;
                                    var reelItem = _this.G1.getChildAt(i);
                                    reelItem.isPlayFree(false);
                                }
                            }
                            if (Whetherfree) {
                                //		console.log("3轴  出现免费牌子 播放免费牌子出现音效，播放免费牌子第一个特效")
                            }
                        }
                        if (index == 3) {
                            var Whetherfree = false;
                            for (var i = 0; i < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; i++) {
                                if ((vo.GameData.resultData.Value.Main.ReelSymbols[index][i]) == "C1") {
                                    Whetherfree = true;
                                    var reelItem = _this.G1.getChildAt(i);
                                    reelItem.isPlayFree(false);
                                }
                            }
                            if (Whetherfree) {
                                SoundManager.getInstance().playEffect("paizi_1_mp3");
                                //	console.log("4轴  出现免费牌子 播放免费牌子出现音效，播放免费牌子第一个特效")
                            }
                        }
                        if (index == 4) {
                            _this.timerdely = egret.setTimeout(function () {
                                //		console.log("index=" + 4 + " -------------游戏结束")
                                core.NotifyManager.getInstance().sendNotify(core.NotifyConst.LOGIC_ROUNDOVER);
                            }, _this, 300);
                        }
                    }
                }
            }
        }, this, 15);
    };
    FreeReel.prototype.clerarquan = function () {
        if (this.quanMC && this.quanMC.parent) {
            this.quanMC.parent.removeChild(this.quanMC);
            this.quanMC.stop();
        }
    };
    FreeReel.prototype.onEliminateIcon = function (index) {
        if (vo.GameData.resultData != undefined)
            for (var j = 0; j < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; j++) {
                if ((vo.GameData.resultData.Value.Main.ReelSymbols[index][j]) == "C1") {
                    var reelItem = this.G1.getChildAt(j);
                    reelItem.isNoshow();
                }
            }
    };
    /**
     *icon快速转动
     */
    FreeReel.prototype.iocnTurn1 = function (index) {
        var _this = this;
        var yy = 0;
        var tt = 0;
        this["timerr" + index] = egret.setInterval(function () {
            yy += 1;
            for (var i = 0; i < _this.G1.numChildren; i++) {
                var reelItem = _this.G1.getChildAt(i);
                reelItem.y += _this.displacement;
                if (reelItem.y > (_this.G1.height + reelItem.height)) {
                    _this.NukER += 1;
                    if (_this.NukER > 47)
                        _this.NukER = 0;
                    reelItem.y = -_this.G1.height + reelItem.height;
                    reelItem.OnshowIcon(index, _this.NukER, GameManager.getInstance().initdata_1, false);
                }
            }
            if (yy > 0 && GameManager.getInstance().WhetherData) {
                tt += _this.displacement;
                if (tt >= 328 * (index + 2)) {
                    SoundManager.getInstance().playEffect("reelstop_mp3");
                    egret.clearInterval(_this["timerr" + index]);
                    var _loop_4 = function (j) {
                        var reelItem = _this.G1.getChildAt(j);
                        reelItem.y = (j % 4) * reelItem.height - Math.floor(j / 4) * _this.G1.height;
                        reelItem.isShowIcon(index, j % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
                        egret.Tween.get(reelItem).to({ y: reelItem.y + 40 }, 200, egret.Ease.backOut).call(function () {
                            egret.Tween.get(reelItem).to({ y: reelItem.y - 40 }, 100).call(function () {
                            });
                        });
                    };
                    for (var j = 0; j < _this.G1.numChildren; j++) {
                        _loop_4(j);
                    }
                    if (index == 1) {
                    }
                    // if (index == 2) {
                    // }
                    if (index == 3) {
                    }
                    if (index == 4) {
                        _this.timerdely = egret.setTimeout(function () {
                            //	console.log("index=" + 4 + " -------------游戏结束")
                            core.NotifyManager.getInstance().sendNotify(core.NotifyConst.LOGIC_ROUNDOVER);
                        }, _this, 300);
                    }
                }
            }
        }, this, 15);
    };
    FreeReel.prototype.removStart = function () {
        this.G1.removeChildren();
    };
    FreeReel.prototype.stopIcon = function (index) {
        //	this.displacement = 0;
        egret.clearInterval(this.timerdely);
        egret.clearInterval(this["timerr" + index]);
        egret.clearInterval(this["timer1" + index]);
        egret.clearTimeout(this.timer2);
        var _loop_5 = function (i) {
            var reelItem = this_1.G1.getChildAt(i);
            egret.Tween.removeTweens(reelItem);
            egret.Tween.removeTweens(reelItem);
            reelItem.y = (i % 4) * reelItem.height - Math.floor(i / 4) * this_1.G1.height;
            reelItem.isShowIcon(index, i % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
            if (!GameConfig.speedPlay)
                egret.Tween.get(reelItem).to({ y: reelItem.y + 40 }, 100, egret.Ease.backOut).call(function () {
                    egret.Tween.get(reelItem).to({ y: reelItem.y - 40 }, 100).call(function () {
                    });
                });
        };
        var this_1 = this;
        for (var i = 0; i < this.G1.numChildren; i++) {
            _loop_5(i);
        }
        if (this.quanMC && this.quanMC.parent) {
            this.quanMC.parent.removeChild(this.quanMC);
            this.quanMC.stop();
        }
    };
    FreeReel.prototype.initFreeGame = function (index) {
        for (var i = 0; i < this.G1.numChildren; i++) {
            var reelItem = this.G1.getChildAt(i);
            reelItem.y = (i % 4) * reelItem.height - Math.floor(i / 4) * this.G1.height;
            reelItem.isShowIcon(index, i % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
        }
    };
    /**
     * 展示图标动画
     */
    FreeReel.prototype.showIcon = function (index_x, index_y, type) {
        var reelItem = this.G1.getChildAt(index_y);
        reelItem.visible = false;
        //	console.log(vo.GameData.resultData.Value.Main.ReelSymbols[index_x][index_y])
        switch (vo.GameData.resultData.Value.Main.ReelSymbols[index_x][index_y]) {
            case "AA":
                type.G1.addChild(type.MC_Array[index_y]);
                type.MC_Array[index_y].x = reelItem.x - 20;
                type.MC_Array[index_y].y = reelItem.y - 40 + 2;
                type.MC_Array[index_y].scaleY = 0.95;
                type.MC_Array[index_y].gotoAndPlay("a1", -1);
                break;
            case "KK":
                type.G1.addChild(type.MC_Array[index_y]);
                type.MC_Array[index_y].x = reelItem.x - 20;
                type.MC_Array[index_y].y = reelItem.y - 40;
                type.MC_Array[index_y].gotoAndPlay("a2", -1);
                break;
            case "QQ":
                type.G1.addChild(type.MC_Array[index_y]);
                type.MC_Array[index_y].x = reelItem.x - 20;
                type.MC_Array[index_y].y = reelItem.y - 40;
                type.MC_Array[index_y].gotoAndPlay("a3", -1);
                break;
            case "JJ":
                type.G1.addChild(type.MC_Array[index_y]);
                type.MC_Array[index_y].x = reelItem.x - 20;
                type.MC_Array[index_y].y = reelItem.y - 40;
                type.MC_Array[index_y].gotoAndPlay("a4", -1);
                break;
            case "TN":
                type.G1.addChild(type.MC_Array[index_y]);
                type.MC_Array[index_y].x = reelItem.x - 20;
                type.MC_Array[index_y].y = reelItem.y - 40;
                type.MC_Array[index_y].gotoAndPlay("a5", -1);
                break;
            case "NI":
                type.G1.addChild(type.MC_Array[index_y]);
                type.MC_Array[index_y].x = reelItem.x - 20;
                type.MC_Array[index_y].y = reelItem.y - 40;
                type.MC_Array[index_y].gotoAndPlay("a6", -1);
                break;
            case "M4":
                type.G1.addChild(type.MC_Array[index_y]);
                type.MC_Array[index_y].x = reelItem.x - 20 - 5;
                type.MC_Array[index_y].y = reelItem.y - 40;
                type.MC_Array[index_y].gotoAndPlay("a7", -1);
                break;
            case "M3":
                type.G1.addChild(type.MC_Array[index_y]);
                type.MC_Array[index_y].x = reelItem.x - 20;
                type.MC_Array[index_y].y = reelItem.y - 40;
                type.MC_Array[index_y].gotoAndPlay("a8", -1);
                break;
            case "M2":
                type.G1.addChild(type.MC_Array[index_y]);
                type.MC_Array[index_y].x = reelItem.x - 20 - 5;
                type.MC_Array[index_y].y = reelItem.y - 40;
                type.MC_Array[index_y].gotoAndPlay("a9", -1);
                break;
            case "M1":
                type.G1.addChild(type.MC_Array[index_y]);
                type.MC_Array[index_y].x = reelItem.x - 20 - 13;
                type.MC_Array[index_y].y = reelItem.y - 40;
                type.MC_Array[index_y].gotoAndPlay("a10", -1);
                break;
            case "C1":
                //	console.log("**************11************")
                type.G1.addChild(type.pz_Array[index_y]);
                type.pz_Array[index_y].x = reelItem.x + reelItem.width / 2;
                type.pz_Array[index_y].y = reelItem.y + reelItem.height / 2 + 7;
                type.pz_Array[index_y].gotoAndPlay("a0", -1);
                break;
            case "WW":
                type.G1.addChild(type.JQW_Array[index_y]);
                type.JQW_Array[index_y].x = reelItem.x + 118;
                type.JQW_Array[index_y].y = reelItem.y + 82;
                type.JQW_Array[index_y].scaleY = 0.98;
                type.JQW_Array[index_y].gotoAndPlay("a0", 1);
                type.JQW_Array[index_y].addEventListener(egret.MovieClipEvent.COMPLETE, function () {
                    type.JQW_Array[index_y].gotoAndPlay("a1", -1);
                }, type);
                break;
        }
        //	this.G1.removeChildAt(y);
    };
    /**
     * 隐藏掉图标动画
     */
    FreeReel.prototype.hideAction = function () {
        for (var i = 0; i < 4; i++) {
            if (this.MC_Array[i] && this.MC_Array[i].parent) {
                this.MC_Array[i].parent.removeChild(this.MC_Array[i]);
                this.MC_Array[i].stop();
            }
            if (this.JQW_Array[i] && this.JQW_Array[i].parent) {
                this.JQW_Array[i].parent.removeChild(this.JQW_Array[i]);
                this.JQW_Array[i].stop();
            }
            if (this.pz_Array[i] && this.pz_Array[i].parent) {
                this.pz_Array[i].parent.removeChild(this.pz_Array[i]);
                this.pz_Array[i].stop();
            }
        }
    };
    FreeReel.prototype.hideAction1 = function () {
        if (this.quanMC && this.quanMC.parent) {
            this.quanMC.parent.removeChild(this.quanMC);
            this.quanMC.stop();
        }
        for (var i = 0; i < 4; i++) {
            var reelItem = this.G1.getChildAt(i);
            reelItem.isNoshow();
        }
    };
    /**
     * 显示图标
     */
    FreeReel.prototype.AccordingIcon = function (index_x, index_y) {
        var reelItem = this.G1.getChildAt(index_y);
        reelItem.visible = true;
    };
    /**
     * 正常滚动时间
     */
    FreeReel.TIME = 600;
    /**
     * 快速滚动时间
     */
    FreeReel.SPEEDTIME = 200;
    /**
     * 停止间隔时间
     */
    FreeReel.STOPTIME = 100;
    /**
     * 快速停止间隔时间
     */
    FreeReel.SPEEDSTOPTIME = 20;
    FreeReel.if_onefree = false;
    FreeReel.if_twofree = false;
    return FreeReel;
}(eui.Component));
__reflect(FreeReel.prototype, "FreeReel");
var FreeItem = (function (_super) {
    __extends(FreeItem, _super);
    function FreeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = FreeItemSkin;
        _this.init();
        return _this;
    }
    FreeItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    FreeItem.prototype.init = function () {
        if (!this.FreeIconMC) {
            this.FreeIconMC = game.MCUtils.getMc('freeIcon');
        }
        if (!this.FreeIconMC1) {
            this.FreeIconMC1 = game.MCUtils.getMc('freeIcon1');
        }
    };
    FreeItem.prototype.isShowIcon = function (index1, index2, data, isSohw) {
        if (data === void 0) { data = vo.GameData.initData.Value.Geninit.Main.ReelSymbols; }
        if (isSohw === void 0) { isSohw = true; }
        this.icon.visible = true;
        if (data[index1][index2] == "WW") {
            this.icon.scaleX = 1.08;
            this.icon.scaleY = 1.08;
            this.icon.horizontalCenter = -5.5;
        }
        else if (data[index1][index2] == "C1") {
            this.icon.scaleX = 1;
            this.icon.scaleY = 1;
            this.icon.horizontalCenter = -3;
        }
        else {
            this.icon.horizontalCenter = -4;
            this.icon.scaleX = this.icon.scaleY = 0.95;
        }
        this.icon.source = isSohw == true ? "icon_0" + data[index1][index2] + "_png" : "icon_0" + data[index1][index2] + "_M_png";
    };
    FreeItem.prototype.isPlayFree = function (type) {
        var _this = this;
        this.addChild(this.FreeIconMC);
        this.FreeIconMC.x = this.icon.width / 2;
        this.FreeIconMC.y = this.icon.height / 2;
        this.FreeIconMC.gotoAndPlay("a0", 1);
        this.FreeIconMC.addEventListener(egret.MovieClipEvent.COMPLETE, function () {
            if (!type) {
                if (_this.FreeIconMC && _this.FreeIconMC.parent) {
                    _this.FreeIconMC.parent.removeChild(_this.FreeIconMC);
                    _this.FreeIconMC.stop();
                }
            }
            else {
                if (_this.FreeIconMC && _this.FreeIconMC.parent) {
                    _this.FreeIconMC.parent.removeChild(_this.FreeIconMC);
                    _this.FreeIconMC.stop();
                }
                _this.addChild(_this.FreeIconMC1);
                _this.FreeIconMC1.x = _this.icon.width / 2;
                _this.FreeIconMC1.y = _this.icon.height / 2;
                _this.FreeIconMC1.gotoAndPlay("a0", -1);
            }
        }, this);
    };
    FreeItem.prototype.OnshowIcon = function (index1, index2, data, isSohw) {
        if (isSohw === void 0) { isSohw = true; }
        this.icon.visible = true;
        if (index2 > 47)
            index2 = 0;
        if (data[index1].Symbols[index2] == "WW") {
            this.icon.scaleX = 1.08;
            this.icon.scaleY = 1.08;
            this.icon.horizontalCenter = -5.5;
        }
        else if (data[index1].Symbols[index2] == "C1") {
            this.icon.scaleX = 1;
            this.icon.scaleY = 1;
            this.icon.horizontalCenter = -3;
        }
        else {
            this.icon.horizontalCenter = -5;
            this.icon.scaleX = this.icon.scaleY = 0.95;
        }
        this.icon.source = isSohw == true ? "icon_0" + data[index1].Symbols[index2] + "_png" : "icon_0" + data[index1].Symbols[index2] + "_M_png";
    };
    FreeItem.prototype.isNoshow = function () {
        if (this.FreeIconMC && this.FreeIconMC.parent) {
            this.FreeIconMC.parent.removeChild(this.FreeIconMC);
            this.FreeIconMC.stop();
        }
        if (this.FreeIconMC1 && this.FreeIconMC1.parent) {
            this.FreeIconMC1.parent.removeChild(this.FreeIconMC1);
            this.FreeIconMC1.stop();
        }
    };
    return FreeItem;
}(eui.Component));
__reflect(FreeItem.prototype, "FreeItem");
//# sourceMappingURL=FreeReel.js.map