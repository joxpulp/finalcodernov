"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
var mongoose_1 = require("mongoose");
var productsCollection = 'product';
var productsSchema = new mongoose_1.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 300 },
    code: { type: String, required: true, max: 100 },
    price: {
        type: Number,
        required: true,
        min: [10, "El valor es {VALUE}, debe ser como minimo 10 USD"],
        max: [300000, "El valor es {VALUE}, debe ser como maximo 30000 USD"],
    },
    stock: {
        type: Number,
        required: true,
        min: [1, "El valor es {VALUE}, debe ser como minimo 10 USD"],
        max: [300000, "El valor es {VALUE}, debe ser como maximo 30000 USD"],
    },
    thumbnail_id: { type: String, required: true, max: 100 },
    thumbnail: { type: String, required: true, max: 100 },
}, { versionKey: false });
exports.products = mongoose_1.model(productsCollection, productsSchema);
