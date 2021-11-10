import { Schema, model } from 'mongoose';
import { ProductI } from '../interfaces';

const productsCollection = 'product';

const productsSchema = new Schema<ProductI>(
	{
		title: { type: String, required: true, max: 100 },
		description: { type: String, required: true, max: 300 },
		code: { type: String, required: true, max: 100 },
		price: {
			type: Number,
			required: true,
			min: [10, `El valor es {VALUE}, debe ser como minimo 10 USD`],
			max: [300000, `El valor es {VALUE}, debe ser como maximo 30000 USD`],
		},
		stock: {
			type: Number,
			required: true,
			min: [1, `El valor es {VALUE}, debe ser como minimo 10 USD`],
			max: [300000, `El valor es {VALUE}, debe ser como maximo 30000 USD`],
		},
		thumbnail_id: { type: String, required: true, max: 100 },
		thumbnail: { type: String, required: true, max: 100 },
	},
	{ versionKey: false }
);

export const products = model<ProductI>(productsCollection, productsSchema);
