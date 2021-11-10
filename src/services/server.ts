import express, { Request, Response } from 'express';
import fileupload from 'express-fileupload';
import path from 'path';
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
app.use(express.static(path.resolve('public')));

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
		cookie: { sameSite: false, secure: 'auto', maxAge: 1000 * 120 },
		saveUninitialized: false,
		resave: true,
		rolling: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Routes and serve static files
app.use('/api', apiRouter);
app.get('/*', (req: Request, res: Response) => {
	const indexHtml = path.resolve('public/index.html');
	res.sendFile(indexHtml);
});

export default app;
