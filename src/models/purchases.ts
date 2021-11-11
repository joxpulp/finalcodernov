import { PurchaseI } from './interfaces';
import { cart } from './schemas/cartschema';
import { purchase } from './schemas/purchaseschema';


class Purchase {
	async get(userId: string): Promise<PurchaseI[]> {
		const getPurchases = await purchase.findOne({ userId });
		const outputGet: PurchaseI[] = [];
		if (getPurchases) {
			outputGet.push(getPurchases);
		}
		return outputGet;
	}

	async purchase(userId: string): Promise<string> {
		const findCart = await cart.findOne({ userId });
		const findOrders = await purchase.findOne({ userId });

		if (findOrders === null) {
			const newOrder = new purchase({ userId });
			await newOrder.save();
		}

		await purchase.updateOne(
			{ userId },
			{
				$inc: { total: findCart!.total },
				$push: {
					purchases: findCart!.cartProducts,
				},
			}
		);
		await cart.findOneAndDelete({ userId });
		return 'Purchase Completed';
	}
}

export const purchaseModel = new Purchase();
