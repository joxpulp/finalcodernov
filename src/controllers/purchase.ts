import { Request, Response } from 'express';
import { CONFIG } from '../config/config';
import { cartModel } from '../models/cart';
import { purchaseModel } from '../models/purchases';
import { email } from '../services/email';

class PurchaseController {
	async getOrders(req: Request, res: Response) {
		const { orderId } = req.params;
		if (orderId) {
			const findById = await purchaseModel.get(req.user!._id, orderId);
			if (findById.length) {
				return res.json(...findById);
			}
		}
		const findAll = await purchaseModel.get(req.user!._id);
		if (findAll.length) {
			return res.json(findAll);
		}

		return res.status(404).json({ error: 'No orders for this user' });
	}

	async newOrder(req: Request, res: Response) {
		const [cart] = await cartModel.get(req.user!._id);
		const productTitles = cart
			.cartProducts!.map((cart) => cart.name)
			.toString();
		const purchase = await purchaseModel.newOrder(req.user!._id);

		await email.sendEmail(
			CONFIG.GMAIL_EMAIL,
			`Nueva orden generada para ${req.user!.name} | ${req.user!.email}`,
			productTitles
		);

		return res.json({ msg: purchase });
	}

	async complete(req: Request, res: Response) {
		const { orderId } = req.body;

		const findById = await purchaseModel.get(req.user!._id, orderId);
		if (findById.length) {
			const completeOrder = await purchaseModel.complete(
				req.user!._id,
				orderId
			);
			await email.sendEmail(
				CONFIG.GMAIL_EMAIL,
				`Notificacion para ${req.user!.name} | ${req.user!.email}`,
				'El estado de su orden fue cambiada a completada'
			);
			return res.json({ msg: completeOrder });
		}
		return res.status(404).json({ error: 'Order does not exist' });
	}
}

export const purchaseController = new PurchaseController();
