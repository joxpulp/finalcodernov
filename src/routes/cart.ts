import { Router } from 'express';
import { cartController } from '../controllers/cart';
import { isAuth } from '../middlewares/auth';
import { cartExist } from '../middlewares/cartExist';
import { productExist } from '../middlewares/productExist';

const router = Router();

router.get('/list/:id?', isAuth, cartExist, cartController.getProducts);
router.post('/add/:id', isAuth, productExist, cartController.addProducts);
router.delete('/delete/:id', isAuth, cartExist, cartController.deleteProducts);

export default router;
