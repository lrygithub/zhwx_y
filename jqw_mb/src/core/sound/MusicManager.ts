
declare function playAudio(id: any);
declare function stopAudio(id: any);
module core {
	export class MusicManager {
		/**声音开关 */
		public static isBgSoundOn: number = 1;
		public static isEffectSoundOn: number = 1;
		private static channel: egret.SoundChannel;
		private static haveRegistered: boolean = false;
		public constructor() {
		}

		public static playBGMusic() {
			if (this.isBgSoundOn == 1) {
				playAudio('music_mp3');
			}
			else {
				stopAudio('music_mp3');
			}
		}
		public static stopBgMusic() {
			stopAudio('music_mp3');
		}

		public static registerPageActive() {
			if (this.haveRegistered) return;
			this.haveRegistered = true;

			var hiddenProperty = 'hidden' in document ? 'hidden' :
				'webkitHidden' in document ? 'webkitHidden' :
					'mozHidden' in document ? 'mozHidden' :
						null;
			var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
			var onVisibilityChange = function () {
				if (!document[hiddenProperty]) {
					//MusicManager.playMusic();  
				} else {
					//MusicManager.stopMusic();
				}
			}
			document.addEventListener(visibilityChangeEvent, onVisibilityChange);
		}
	}
}
