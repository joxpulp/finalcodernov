import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
	PORT: process.env.PORT || 8080,
	PID: process.pid || 'PID',
	MONGO_URL: process.env.MONGO_URL || 'MONGO_URL',
	SECRET: process.env.SECRET || 'SECRET',
	CLOUD_NAME: process.env.CLOUD_NAME || 'CLOUD_NAME',
	API_KEY: process.env.API_KEY || 'API_KEY',
	API_SECRET: process.env.API_SECRET || 'API_SECRET',
	GMAIL_NAME: process.env.GMAIL_NAME || 'NAME',
	GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'EMAIL',
	GMAIL_PWD: process.env.GMAIL_PWD || 'NAME',
	TWILIO_ACCOUNTID: process.env.TWILIO_ACCOUNTID || 'ACCOUNTID',
	TWILIO_AUTHTOKEN: process.env.TWILIO_AUTHTOKEN || 'AUTHTOKEN',
	TWILIO_PHONE: process.env.TWILIO_PHONE || 'PHONE',
	ADMIN_PHONE: process.env.ADMIN_PHONE || 'ADMINPHONE'
};
