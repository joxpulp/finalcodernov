import { ObjectId } from 'mongoose';

export interface ProductI {
	_id: string | ObjectId;
	title?: string;
	description?: string;
	code?: string;
	price?: number;
	stock?: number;
	quantity?: number;
	thumbnail?: string;
	thumbnail_id?: string;
}

export interface NewProductI {
	name: string;
	description: string;
	category: string;
	thumbnail: string;
	thumbnail_id: string;
	price: number;
}

export interface UserI {
	_id: string;
	avatar: string;
	avatar_id: string;
	name: string;
	age: number;
	email: string;
	address: string;
	password: string;
	purchases?: any;
	phone?: string;
	isAdmin?: boolean;
	isValidPassword(password: string): Promise<boolean>;
}

export interface UpdateUserI {
	_id?: string;
	avatar?: string;
	avatar_id?: string;
	name?: string;
	age?: number;
	email?: string;
	address?: string;
	password?: string;
	phone?: string;
}

export interface CartI {
	_id: string | ObjectId;
	userId?: string;
	total?: number;
	cartProducts?: ProductI[];
}

export interface PurchaseI {
	_id: string | ObjectId;
	userId?: string;
	total?: number;
	purchases?: ProductI[];
}

export interface ProductQuery {
	title?: string;
	price?: number;
	code?: string;
	stock?: number;
	priceMax?: number;
	priceMin?: number;
	stockMax?: number;
	stockMin?: number;
}

export interface paramsWhatsapp {
	body: string;
	from: string;
	to: string;
	mediaUrl?: string | string[];
}

export interface Owner {
	name: string;
	address: string;
}

declare global {
	namespace Express {
		interface User {
			_id: string;
			avatar?: string;
			avatar_id: string;
			name?: string;
			age?: number;
			email?: string;
			address?: string;
			password?: string;
			phone?: string;
			isAdmin?: boolean;
		}
	}

	interface Error {
		errors: string[];
	}
}
