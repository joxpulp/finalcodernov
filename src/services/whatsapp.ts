import { CONFIG } from '../config/config';
import { paramsWhatsapp } from '../models/interfaces';
import twilio from 'twilio';


class Whatsapp {
	private twilio;

	constructor() {
		this.twilio = twilio(CONFIG.TWILIO_ACCOUNTID, CONFIG.TWILIO_AUTHTOKEN);
	}

	async sendMessage(phonenumber: string, message: string) {

		const params: paramsWhatsapp = {
			body: message,
			from: `whatsapp:${CONFIG.TWILIO_PHONE}`,
			to: `whatsapp:${phonenumber}`,
		};

		const response = await this.twilio.messages.create(params);
		return response;
	}
}

export const whatsapp = new Whatsapp();
