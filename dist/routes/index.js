"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_1 = __importDefault(require("./products"));
var auth_1 = __importDefault(require("./auth"));
var cart_1 = __importDefault(require("./cart"));
var purchase_1 = __importDefault(require("./purchase"));
var router = express_1.Router();
router.use('/products', products_1.default);
router.use('/auth', auth_1.default);
router.use('/cart', cart_1.default);
router.use('/orders', purchase_1.default);
exports.default = router;
