import { products } from './schemas/productschema';
import { NewProductI, ProductI, ProductQuery, ThumbnailsI } from './interfaces';
import { cartModel } from './cart';
import { cart } from './schemas/cartschema';

class Thumbnail {
	async get(id: string): Promise<ThumbnailsI[]> {
		let outputGet: ThumbnailsI[] = [];

		const findById = await products.findOne(
			{},
			{ thumbnails: { $elemMatch: { thumbnail_id: id } } }
		);
		if (findById) outputGet.push(...findById.thumbnails!);
		return outputGet;
	}

	async add(data: NewProductI): Promise<ProductI> {
        const outputNew: ThumbnailsI[] = [];

		await products.updateOne(
			{}
			{
				$addToSet: {
					thumbnails: data,
				},
			},
			{ upsert: true }
		);

        ouputNew.push(findProduct);
	}

	async update(id: string, data: NewProductI): Promise<ProductI[]> {
		const outputUpdate: ProductI[] = [];

		await products.findByIdAndUpdate(
			id,
			{ $set: data },
			{ runValidators: true }
		);

		const updatedProduct = await products.findById(id);
		if (updatedProduct) outputUpdate.push(updatedProduct);

		return outputUpdate;
	}

	async delete(id: string): Promise<ProductI[]> {
		const outputDelete: ProductI[] = [];

		const deletedProduct = await products.findByIdAndDelete(id);
		if (deletedProduct) outputDelete.push(deletedProduct);

		// * Deletes the product if is present on all user's cart
		await cart.updateMany(
			{},
			{
				$inc: { total: -deletedProduct!.price! },
				$pull: {
					cartProducts: { _id: id },
				},
			}
		);

		return outputDelete;
	}

	async query(options: ProductQuery): Promise<ProductI[]> {
		const query: any = {};
		if (options.title) query.title = options.title;

		if (options.priceMin && options.priceMax)
			query.price = { $gte: options.priceMin, $lte: options.priceMax };

		if (options.stockMin && options.stockMax)
			query.stock = { $gte: options.stockMin, $lte: options.stockMax };

		if (options.code) query.code = options.code;

		return await products.find(query);
	}
}

export const productModel = new Product();
