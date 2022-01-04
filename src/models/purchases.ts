import { PurchaseI } from './interfaces';
import { cart } from './schemas/cartschema';
import { purchase } from './schemas/purchaseschema';
// TODO REVISAR BIEN ESTO
class Purchase {
	async get(userId: string, orderId?: string): Promise<PurchaseI[]> {
		const outputGet: PurchaseI[] = [];

		if (orderId) {
			const getOrderById = await purchase.findOne({ _id: orderId, userId });
			if (getOrderById) {
				outputGet.push(getOrderById!);
			}
			return outputGet;
		}

		const getPurchases = await purchase.find({ userId });
		if (getPurchases) {
			outputGet.push(...getPurchases!);
		}
		return outputGet;
	}

	async newOrder(userId: string): Promise<string> {
		const findCart = await cart.findOne({ userId });

		const newOrder = new purchase({ userId });
		await newOrder.save();

		await purchase.updateOne(
			{ _id: newOrder._id },
			{
				$set: { total: findCart!.total },
				$push: {
					purchases: findCart!.cartProducts,
				},
			}
		);

		await cart.findOneAndDelete({ userId });
		return 'Order generated';
	}

	async complete(userId: string, orderId: string): Promise<string> {
		await purchase.updateOne(
			{ userId, orderId },
			{
				$set: { state: 'completed' },
			}
		);

		return 'Order state changed to completed';
	}
}

export const purchaseModel = new Purchase();
