var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏类型集合
 */
var GameType;
(function (GameType) {
    var ItemType = (function () {
        function ItemType() {
        }
        return ItemType;
    }());
    GameType.ItemType = ItemType;
    __reflect(ItemType.prototype, "GameType.ItemType");
    var GameModule = (function () {
        function GameModule() {
        }
        /**
         * 真钱模式
         */
        GameModule.trueModle = 0;
        /**
         * 假钱模式
         */
        GameModule.falseModle = 1;
        return GameModule;
    }());
    GameType.GameModule = GameModule;
    __reflect(GameModule.prototype, "GameType.GameModule");
    var GameState = (function () {
        function GameState() {
        }
        GameState.PLAYING = 1;
        GameState.STOP = 0;
        return GameState;
    }());
    GameType.GameState = GameState;
    __reflect(GameState.prototype, "GameType.GameState");
    var LangType = (function () {
        function LangType() {
        }
        LangType.CN = 'cn';
        LangType.TW = 'tw';
        LangType.EN = 'en';
        return LangType;
    }());
    GameType.LangType = LangType;
    __reflect(LangType.prototype, "GameType.LangType");
    var RewardType = (function () {
        function RewardType() {
        }
        RewardType.NOMAL_REWARD = 1;
        RewardType.NO_REWARD = 0;
        RewardType.BIG_REWARD = 2;
        RewardType.FREE_REWARD = 3;
        RewardType.BIG_AND_FREE = 4;
        return RewardType;
    }());
    GameType.RewardType = RewardType;
    __reflect(RewardType.prototype, "GameType.RewardType");
    var RellMode = (function () {
        function RellMode() {
        }
        RellMode.UP = 1;
        RellMode.DOWN = 0;
        return RellMode;
    }());
    GameType.RellMode = RellMode;
    __reflect(RellMode.prototype, "GameType.RellMode");
})(GameType || (GameType = {}));
//# sourceMappingURL=GameType.js.map