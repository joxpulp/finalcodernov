import { Router } from 'express';
import { purchaseController } from '../controllers/purchase';
import { isAuth } from '../middlewares/auth';
import { cartExist } from '../middlewares/cartExist';

const router = Router();

router.get('/getpurchases', isAuth, purchaseController.getProducts);
router.post(
	'/purchase',
	isAuth,
	cartExist,
	purchaseController.purchaseProducts
);

export default router;
