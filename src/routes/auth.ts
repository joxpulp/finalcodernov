import { Router } from 'express';
import { authController } from '../controllers/auth';
import { isAuth } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { editUser, login, signup } from '../helpers/yup';

const router = Router();

router.post('/login', validate(login), authController.login);
router.get('/logout', isAuth, authController.logout);
router.post('/signup', validate(signup), authController.signup);
router.get('/islogged', authController.isLogged);

export default router;
