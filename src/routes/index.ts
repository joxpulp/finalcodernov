import { Router } from 'express';
import productRouter from './products';
import authRouter from './auth';
import cartRouter from './cart';
import purchaseRouter from './purchase';
import { messageController } from '../controllers/messages';

const router = Router();

router.use('/products', productRouter);
router.use('/auth', authRouter);
router.use('/cart', cartRouter);
router.use('/orders', purchaseRouter);
router.get('/message/:message', messageController.getMsg)

export default router;
