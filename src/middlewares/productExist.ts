import { Request, Response, NextFunction } from 'express';
import { productModel } from '../models/product';

export const productExist = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		if (id) {
			const findById = await productModel.get(id);
			if (findById.length !== 0) {
				return next();
			}
			return res
				.status(404)
				.json({ error: 'This product does not exist in db or was deleted' });
		} else {
			const findAll = await productModel.get();
			if (findAll.length !== 0) {
				return next();
			}
			return res.status(404).json({ error: 'There are no products in db' });
		}
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
	}
};
