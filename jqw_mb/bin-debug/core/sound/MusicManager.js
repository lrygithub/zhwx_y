var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var MusicManager = (function () {
        function MusicManager() {
        }
        MusicManager.playBGMusic = function () {
            if (this.isBgSoundOn == 1) {
                playAudio('music_mp3');
            }
            else {
                stopAudio('music_mp3');
            }
        };
        MusicManager.stopBgMusic = function () {
            stopAudio('music_mp3');
        };
        MusicManager.registerPageActive = function () {
            if (this.haveRegistered)
                return;
            this.haveRegistered = true;
            var hiddenProperty = 'hidden' in document ? 'hidden' :
                'webkitHidden' in document ? 'webkitHidden' :
                    'mozHidden' in document ? 'mozHidden' :
                        null;
            var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
            var onVisibilityChange = function () {
                if (!document[hiddenProperty]) {
                    //MusicManager.playMusic();  
                }
                else {
                    //MusicManager.stopMusic();
                }
            };
            document.addEventListener(visibilityChangeEvent, onVisibilityChange);
        };
        /**声音开关 */
        MusicManager.isBgSoundOn = 1;
        MusicManager.isEffectSoundOn = 1;
        MusicManager.haveRegistered = false;
        return MusicManager;
    }());
    core.MusicManager = MusicManager;
    __reflect(MusicManager.prototype, "core.MusicManager");
})(core || (core = {}));
//# sourceMappingURL=MusicManager.js.map