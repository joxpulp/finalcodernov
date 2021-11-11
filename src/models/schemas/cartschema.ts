import { Schema, model } from 'mongoose';
import { CartI, ProductI } from '../interfaces';

const cartCollection = 'cart';

const cartProductSchema = new Schema<ProductI>(
	{
		_id: { type: Schema.Types.ObjectId, ref: 'products' },
		title: { type: String, required: true, max: 100 },
		description: { type: String, required: true, max: 300 },
		code: { type: String, required: true, max: 100 },
		price: {
			type: Number,
			required: true,
			min: [10, `El valor es {VALUE}, debe ser como minimo 10 USD`],
			max: [300000, `El valor es {VALUE}, debe ser como maximo 30000 USD`],
		},
		thumbnail_id: { type: String, required: true, max: 100 },
		thumbnail: { type: String, required: true, max: 100 },
		quantity: { type: Number, required: true, default: 1 },
	},
	{ versionKey: false }
);

const cartSchema = new Schema<CartI>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'users' },
		total: { type: Number },
		cartProducts: [cartProductSchema],
	},
	{ versionKey: false, timestamps: true }
);
export const cart = model<CartI>(cartCollection, cartSchema);
