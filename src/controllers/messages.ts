import { Request, Response } from 'express';
import { messagesModel } from '../models/messages';

class Messages {
	async getMsg(req: Request, res: Response) {
		try {
			const { message } = req.params;
			const response = await messagesModel.getMessages(message, req.user!._id);

			return res.json({ response });
		} catch (error) {}
	}
}

export const messageController = new Messages();
