import express, { Request, Response } from 'express';
import * as http from 'http';
import fileupload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import passport from '../middlewares/auth';
import { mongoose } from './mongoose';
import { CONFIG } from '../config/config';
import apiRouter from '../routes/index';
import swaggerUi from 'swagger-ui-express';
import { specs } from '../config/swagger';

mongoose();
const app = express();

export const sessionMiddleware = session({
	store: connectMongo.create({ mongoUrl: CONFIG.MONGO_URL }),
	secret: CONFIG.SECRET,
	cookie: { sameSite: false, secure: 'auto', maxAge: 1000 * 120 },
	saveUninitialized: false,
	resave: true,
	rolling: true,
});

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
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
		credentials: true,
	})
);
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// API DOCS
app.use(
	'/docs',
	swaggerUi.serve,
	swaggerUi.setup(specs, {
		customSiteTitle: 'Backend Coderhouse Final Project',
	})
);

app.get('/', (req: Request, res: Response) => {
	res.json({ msg: 'Connected' });
});
app.use('/api', apiRouter);

const server = new http.Server(app);

export default server;
