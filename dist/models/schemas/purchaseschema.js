"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = void 0;
var mongoose_1 = require("mongoose");
var pruchaseCollection = 'purchase';
var purchaseProductSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'products' },
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 300 },
    code: { type: String, required: true, max: 100 },
    price: {
        type: Number,
        required: true,
        min: [10, "El valor es {VALUE}, debe ser como minimo 10 USD"],
        max: [300000, "El valor es {VALUE}, debe ser como maximo 30000 USD"],
    },
    thumbnail_id: { type: String, required: true, max: 100 },
    thumbnail: { type: String, required: true, max: 100 },
    quantity: { type: Number, required: true },
}, { versionKey: false });
var purchaseSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    total: { type: Number },
    purchases: [purchaseProductSchema],
}, { versionKey: false, timestamps: true });
exports.purchase = mongoose_1.model(pruchaseCollection, purchaseSchema);
