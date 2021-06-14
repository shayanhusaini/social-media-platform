"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = function (schema) {
    return function (req, res, next) {
        var result = schema.validate(req.body);
        if (result.error) {
            var messages = result.error.details.map(function (detail) { return detail.message; });
            return res.status(400).send({ errors: messages });
        }
        next();
    };
};
//# sourceMappingURL=validator.js.map