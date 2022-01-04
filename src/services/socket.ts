import * as http from 'http';
import { Server } from 'socket.io';
import passport from '../middlewares/auth';
import { botModel } from '../models/bot';
import { messages } from '../models/schemas/messages';
import { sessionMiddleware } from './server';
// Socket Server
export const ioServer = (server: http.Server) => {
	const io = new Server(server);
	const wrap = (middleware: any) => (socket: any, next: any) =>
		middleware(socket.request, {}, next);

	io.use(wrap(sessionMiddleware));
	io.use(wrap(passport.initialize()));
	io.use(wrap(passport.session()));

	io.use((socket: any, next) => {
		if (socket.request.user) {
			next();
		} else {
			next(new Error('unauthorized'));
		}
	});

	io.on('connection', async (socket) => {
		console.log('Client Authorized and Connected');

		try {
			socket.on('sendMessage', async (message) => {
				try {
					const newUserMessage = new messages({
						// @ts-ignore
						userId: socket.request.user._id,
						// @ts-ignore
						type: socket.request.user.name,
						message: message,
					});

					await newUserMessage.save();

					const botResponse = new messages({
						// @ts-ignore
						userId: socket.request.user._id,
						type: 'HekiBOT',
						message: await botModel.getResponse(
							message,
							// @ts-ignore
							socket.request.user._id
						),
					});

					await botResponse.save();
				} catch (error) {
					console.log(error);
				}
				io.emit(
					'messages',
					// @ts-ignore
					await messages.find({ userId: socket.request.user._id })
				);
			});

			socket.emit(
				'messages',
				// @ts-ignore
				await messages.find({ userId: socket.request.user._id })
			);

			socket.on('delete', async () => {
				console.log('Messages Deleted');
				// @ts-ignore
				await messages.deleteMany({ userId: socket.request.user._id });
			});
		} catch (error) {
			console.log(error);
		}
	});

	io.on('disconnect', async () => {
		console.log('deleted');
		// @ts-ignore
		await messages.deleteMany({ userId: socket.request.user._id });
	});

	return io;
};
