import { Request, Response } from 'express';
import { CONFIG } from '../config/config';
import { cartModel } from '../models/cart';
import { purchaseModel } from '../models/purchases';
import { email } from '../services/email';
import { whatsapp } from '../services/whatsapp';

class PurchaseController {
	async getProducts(req: Request, res: Response) {
		const findAll = await purchaseModel.get(req.user!._id);
		if (findAll.length) {
			return res.json(...findAll);
		}

		return res.status(404).json({ error: 'No purchases for this user' });
	}

	async purchaseProducts(req: Request, res: Response) {
		const [cart] = await cartModel.get(req.user!._id);
		const productTitles = (cart.cartProducts!.map(cart => cart.title)).toString()
		const purchase = await purchaseModel.purchase(req.user!._id);

		await email.sendEmail(
			CONFIG.GMAIL_EMAIL,
			`Nuevo compra de ${req.user!.name} | ${req.user!.email}`,
			productTitles
		);
		await whatsapp.sendMessage(CONFIG.ADMIN_PHONE, `Nueva compra de ${req.user!.name}\nCompras:\n${productTitles}`);
		await whatsapp.sendMessage(req.user!.phone!, 'Su orden se ha procesado');

		return res.json({ msg: purchase });
	}
}

export const purchaseController = new PurchaseController();
