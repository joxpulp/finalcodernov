import { Request, Response, NextFunction } from 'express';
import passport from '../middlewares/auth';
import cloudinary from '../services/cloudinary';
import { userModel } from '../models/schemas/userschema';
import { UploadedFile } from 'express-fileupload';

class AuthController {
	login(req: Request, res: Response, next: NextFunction) {
		passport.authenticate('login', (err, user, info) => {
			if (err) return next(err);

			if (user) {
				req.login(user, () => {
					return res.json({
						userData: {
							_id: user._id,
							name: user.name,
							lastname: user.lastname,
							age: user.age,
							address: user.address,
							phone: user.phone,
							avatar: user.avatar,
							isAdmin: user.isAdmin,
						},
						logged: true,
					});
				});
			} else {
				return res.status(401).json({ ...info, logged: false });
			}
		})(req, res, next);
	}

	signup(req: Request, res: Response, next: NextFunction) {
		passport.authenticate('signup', (err, user, info) => {
			if (err) return next(err);

			if (user) {
				return res.json({ msg: 'User created' });
			} else {
				return res.status(401).json({ ...info });
			}
		})(req, res, next);
	}

	isLogged(req: Request, res: Response) {

		if (req.user) {
			return res.json({ logged: true });
		} else {
			return res.status(404).json({ logged: false });
		}

	}

	logout(req: Request, res: Response) {

		if (req.user) {
			req.logout();
			return res.json({ msg: 'Session ended', logged: false });
		}

		return res
			.status(404)
			.json({ error: 'The is no session started or is already logout' });
	}
}

export const authController = new AuthController();
