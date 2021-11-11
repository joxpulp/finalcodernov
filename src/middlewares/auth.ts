import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import {
	Strategy,
	VerifyFunctionWithRequest,
	IStrategyOptionsWithRequest,
} from 'passport-local';
import { userModel } from '../models/schemas/userschema';
import { UpdateUserI } from '../models/interfaces';
import cloudinary from '../services/cloudinary';
import { UploadedFile } from 'express-fileupload';
import { email } from '../services/email';
import { CONFIG } from '../config/config';

// Select passport strategy
const localStrategy = Strategy;

// Define the strategy options, we use username field(email) and password field
const strategyOptions: IStrategyOptionsWithRequest = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
};

// Login logic
const loginFunc = async (
	req: Request,
	username: string,
	password: string,
	done: any
): Promise<VerifyFunctionWithRequest> => {
	const user = await userModel.findOne({ email: username });

	if (!user || !(await user.isValidPassword(password))) {
		return done(null, false, {
			error: 'Invalid email or password, try again',
		});
	}

	return done(null, user);
};

//  Signup logic
const signupFunc = async (
	req: Request,
	username: string,
	password: string,
	done: any
): Promise<VerifyFunctionWithRequest> => {

	const data = {
		...req.body,
	};

	const user = await userModel.findOne({
		$or: [{ email: req.body.email }],
	});

	if (user) {
		return done(null, false, {
			error: 'This email already exist, try with other option',
		});
	} else {

		if (req.files) {
			const { tempFilePath } = req.files.avatar as UploadedFile;
			const { secure_url, public_id } = await cloudinary.uploader.upload(
				tempFilePath,
				{ folder: 'AVATARS' }
			);
			data.avatar = secure_url;
			data.avatar_id = public_id;
		}

		const newUser = new userModel(data);
		await newUser.save();
		await email.sendEmail(CONFIG.GMAIL_EMAIL, 'Nuevo Registro', JSON.stringify(await userModel.findOne({email: req.body.email}), null, 2))
		return done(null, newUser);
	}
};

// Create the login with the local strategy, we pass the strategy options and the login logic contained in loginFunc
passport.use('login', new localStrategy(strategyOptions, loginFunc));

// Create the signup with the local strategy, we pass the strategy options and the signup logic contained in signupFunc
passport.use('signup', new localStrategy(strategyOptions, signupFunc));

// Serialize the user by id
passport.serializeUser((user: Express.User, done) => {
	done(null, user._id);
});

//  Deserialize user by looking to the db with the id and a callback that executes the done.
passport.deserializeUser((userId, done) => {
	userModel.findById(userId, (err: any, user: any) => {
		done(err, user);
	});
});

export const isAuth = (req: Request, res: Response, done: NextFunction) => {
	if (req.isAuthenticated()) {
		done();
	} else {
		return res.status(401).json({
			error: 'You are not logged',
			logged: false,
		});
	}
};

export default passport;
