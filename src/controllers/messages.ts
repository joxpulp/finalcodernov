import { Request, Response } from 'express';
// import { messagesModel } from '../models/bot';

class Messages {
	async getMsg(req: Request, res: Response) {
		try {
			const { message } = req.params;
			const response = 'asda'

			return res.json({ response });
		} catch (error) {}
	}
}

export const messageController = new Messages();
