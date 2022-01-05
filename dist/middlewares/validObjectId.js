"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validObjectId = void 0;
var validObjectId = function (req, res, next) {
    var _a = req.params, id = _a.id, orderId = _a.orderId;
    var productId = req.body.productId;
    var idValidation = id || orderId || productId;
    if (idValidation) {
        if (/^[0-9a-fA-F]{24}$/.test(idValidation)) {
            return next();
        }
        return res.status(404).json({ error: 'Invalid id try with other option' });
    }
    return next();
};
exports.validObjectId = validObjectId;
