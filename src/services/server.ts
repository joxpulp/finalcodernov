import express, { Request, Response } from 'express';
import fileupload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import passport from '../middlewares/auth';
import { mongoose } from './mongoose';
import { CONFIG } from '../config/config';
import apiRouter from '../routes/index';

mongoose();
const app = express();

app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware with temp dir
app.use(
	fileupload({
		useTempFiles: true,
		tempFileDir: '/tmp/',
	})
);

app.use(cookieParser());
app.use(
	cors({
		origin: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	})
);
app.use(
	session({
		store: connectMongo.create({ mongoUrl: CONFIG.MONGO_URL }),
		secret: CONFIG.SECRET,
		cookie: { sameSite: true, secure: 'auto', maxAge: 1000 * 120 },
		saveUninitialized: false,
		resave: true,
		rolling: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
	res.json({ msg: 'Connected' });
});
app.use('/api', apiRouter);

export default app;
