import * as Yup from 'yup';
import 'yup-phone';

const mimeType = ['image/png', 'image/jpeg', 'image/jpg'];

export const login = Yup.object({
	body: Yup.object({
		email: Yup.string()
			.email('email field is invalid')
			.required('email field is required'),
		password: Yup.string()
			.min(8, 'password field must be at least 8 characters')
			.required('password field is required'),
	}).noUnknown(true),
});

export const signup = Yup.object({
	body: Yup.object({
		email: Yup.string()
			.email('email field is invalid')
			.required('email field is required'),
		password: Yup.string()
			.min(8, 'password field must be at least 8 characters')
			.required('password field is required'),
		name: Yup.string()
			.min(3, 'name field must be at least 3 characters')
			.required('name field is Required'),
		age: Yup.number()
			.min(16, 'age field must be at least 16 or more')
			.required('age field is required'),
		address: Yup.string()
			.min(10, 'address field must at least 10 characters or more')
			.required('address field is required'),
		phone: Yup.string().phone().required('address field is required'),
	}).noUnknown(true),
	files: Yup.object({
		avatar: Yup.mixed().test(
			'fileType',
			'File type not supported only .png .jpg .jpeg',
			(value) => mimeType.includes(value.mimetype)
		),
	})
		.noUnknown(true)
		.nullable()
		.required('avatar image is required'),
});

export const addProduct = Yup.object({
	body: Yup.object({
		title: Yup.string()
			.min(3, 'title field must be at least 3 characters')
			.required('title field is required'),
		description: Yup.string()
			.min(20, 'description field must be at least 20 characters')
			.required('description field is required'),
		code: Yup.string()
			.min(8, 'code field must be at least 8 characters')
			.required('code field is required'),
		price: Yup.number()
			.min(10, 'price field min is 10')
			.max(30000, 'price field max is 30000')
			.required('price field is required'),
		stock: Yup.number()
			.min(1, 'stock field min is 10')
			.max(30000, 'stock field max is 30000')
			.required('stock field is required'),
	}).noUnknown(true),
	files: Yup.object({
		thumbnail: Yup.mixed().test(
			'fileType',
			'File type not supported only .png .jpg .jpeg',
			(value) => mimeType.includes(value.mimetype)
		),
	})
		.noUnknown(true)
		.nullable()
		.required('thumbnail image is required'),
});

export const editUser = Yup.object({
	body: Yup.object({
		email: Yup.string().email('email field is invalid'),
		password: Yup.string().min(
			8,
			'password field must be at least 8 characters'
		),
		name: Yup.string().min(3, 'name field must be at least 3 characters'),
		lastname: Yup.string().min(
			3,
			'lastname field must be at least 3 characters'
		),
		age: Yup.number().min(16, 'age field must be at least 16 or more'),
		cardId: Yup.string().matches(
			/^\d{8}$/,
			'cardId field must be 8 digits only'
		),
		address: Yup.string().min(
			10,
			'address field must at least 10 characters or more'
		),
	}).noUnknown(true),
	files: Yup.object({
		avatar: Yup.mixed().test(
			'fileType',
			'File type not supported only .png .jpg .jpeg',
			(value) => mimeType.includes(value.mimetype)
		),
	})
		.noUnknown(true)
		.nullable(),
});

export const editProduct = Yup.object({
	body: Yup.object({
		name: Yup.string().min(3, 'name field must be at least 3 characters'),
		description: Yup.string().min(
			20,
			'description field must be at least 20 characters'
		),
		category: Yup.string().min(
			8,
			'category field must be at least 8 characters'
		),
		price: Yup.number()
			.min(10, 'price field min is 10')
			.max(30000, 'price field max is 30000'),
	}).noUnknown(true),
	files: Yup.object({
		thumbnail: Yup.mixed().test(
			'fileType',
			'File type not supported only .png .jpg .jpeg',
			(value) => mimeType.includes(value.mimetype)
		),
	})
		.noUnknown(true)
		.nullable(),
});

export const queryProduct = Yup.object({
	query: Yup.object({
		title: Yup.string()
			.lowercase()
			.min(5, 'title query must be at least 5 characters'),
		code: Yup.string()
			.lowercase()
			.min(5, 'code query must be at least 5 characters'),
		priceMin: Yup.number().min(10, 'priceMin query min is 10'),
		priceMax: Yup.number().max(30000,'priceMax query max is 30000'),
		stockMin: Yup.number().min(1, 'stockMin query min is 1'),
		stockMax: Yup.number().max(30000, 'stockMax query max is 30000'),
	}).noUnknown(true),
});
