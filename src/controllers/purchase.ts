import { Request, Response } from 'express';
import { purchaseModel } from '../models/purchases';

class PurchaseController {
	async getProducts(req: Request, res: Response) {
		const findAll = await purchaseModel.get(req.user!._id);
		if (findAll.length) {
			return res.json(...findAll);
		}

		return res.status(404).json({ error: 'No purchases for this user' });
	}

	async purchaseProducts(req: Request, res: Response) {
		const purchase = await purchaseModel.purchase(req.user!._id);
		return res.json({ msg: purchase });
	}
}

export const purchaseController = new PurchaseController();
