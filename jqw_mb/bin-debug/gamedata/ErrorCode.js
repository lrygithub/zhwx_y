var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ErrorCode = (function () {
    function ErrorCode() {
    }
    ErrorCode.codeArr = {
        "9000": "短信发送时间间隔太短"
    };
    return ErrorCode;
}());
__reflect(ErrorCode.prototype, "ErrorCode");
//# sourceMappingURL=ErrorCode.js.map