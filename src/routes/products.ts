import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import { productExist } from '../middlewares/productExist';
import { productController } from '../controllers/products';
import { validate } from '../middlewares/validate';
import { addProduct, editProduct, queryProduct } from '../helpers/yup';

const router = Router();

router.get('/list/:id?', productExist, validate(queryProduct), productController.getProduct);
router.post(
	'/add',
	isAuth,
	validate(addProduct),
	productController.addProduct
);
router.put(
	'/update/:id',
	isAuth,
	productExist,
	validate(editProduct),
	productController.updateProduct
);
router.delete(
	'/delete/:id',
	isAuth,
	productExist,
	productController.deleteProduct
);

export default router;
