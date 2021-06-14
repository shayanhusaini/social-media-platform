"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralError = /** @class */ (function (_super) {
    __extends(GeneralError, _super);
    function GeneralError(message) {
        var _this = _super.call(this) || this;
        _this.code = 500;
        _this.message = message;
        return _this;
    }
    return GeneralError;
}(Error));
exports.GeneralError = GeneralError;
var BadRequest = /** @class */ (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.code = 400;
        return _this;
    }
    return BadRequest;
}(GeneralError));
exports.BadRequest = BadRequest;
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.code = 404;
        return _this;
    }
    return NotFound;
}(GeneralError));
exports.NotFound = NotFound;
//# sourceMappingURL=errorHandler.js.map