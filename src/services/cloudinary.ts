import { v2 as cloudinary } from 'cloudinary';
import { CONFIG } from '../config/config';

cloudinary.config({
	cloud_name: CONFIG.CLOUD_NAME,
	api_key: CONFIG.API_KEY,
	api_secret: CONFIG.API_SECRET,
});


export default cloudinary