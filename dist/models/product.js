"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
var productschema_1 = require("./schemas/productschema");
var cartschema_1 = require("./schemas/cartschema");
var Product = /** @class */ (function () {
    function Product() {
    }
    Product.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var outputGet, singleProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outputGet = [];
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, productschema_1.products.findById(id)];
                    case 1:
                        singleProduct = _a.sent();
                        if (singleProduct)
                            outputGet.push(singleProduct);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, productschema_1.products.find()];
                    case 3:
                        outputGet = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, outputGet];
                }
            });
        });
    };
    Product.prototype.add = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var newProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newProduct = new productschema_1.products(data);
                        return [4 /*yield*/, newProduct.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, newProduct];
                }
            });
        });
    };
    Product.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var outputUpdate, updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outputUpdate = [];
                        return [4 /*yield*/, productschema_1.products.findByIdAndUpdate(id, { $set: data }, { runValidators: true })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, productschema_1.products.findById(id)];
                    case 2:
                        updatedProduct = _a.sent();
                        if (updatedProduct)
                            outputUpdate.push(updatedProduct);
                        return [2 /*return*/, outputUpdate];
                }
            });
        });
    };
    Product.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var outputDelete, deletedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outputDelete = [];
                        return [4 /*yield*/, productschema_1.products.findByIdAndDelete(id)];
                    case 1:
                        deletedProduct = _a.sent();
                        if (deletedProduct)
                            outputDelete.push(deletedProduct);
                        // * Deletes the product if is present on all user's cart
                        return [4 /*yield*/, cartschema_1.cart.updateMany({}, {
                                $inc: { total: -deletedProduct.price },
                                $pull: {
                                    cartProducts: { _id: id },
                                },
                            })];
                    case 2:
                        // * Deletes the product if is present on all user's cart
                        _a.sent();
                        return [2 /*return*/, outputDelete];
                }
            });
        });
    };
    Product.prototype.query = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {};
                        if (options.title)
                            query.title = options.title;
                        if (options.priceMin && options.priceMax)
                            query.price = { $gte: options.priceMin, $lte: options.priceMax };
                        if (options.stockMin && options.stockMax)
                            query.stock = { $gte: options.stockMin, $lte: options.stockMax };
                        if (options.code)
                            query.code = options.code;
                        return [4 /*yield*/, productschema_1.products.find(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Product;
}());
exports.productModel = new Product();