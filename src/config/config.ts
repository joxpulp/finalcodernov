import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
	PORT: process.env.PORT || 8080,
	MONGO_URL: process.env.MONGO_URL || 'MONGO_URL',
	SECRET: process.env.SECRET || 'SECRET',
	CLOUD_NAME: process.env.CLOUD_NAME || 'CLOUD_NAME',
	API_KEY: process.env.API_KEY || 'API_KEY',
	API_SECRET: process.env.API_SECRET || 'API_SECRET',
};
