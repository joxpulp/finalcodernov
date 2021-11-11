"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryProduct = exports.editProduct = exports.editUser = exports.addProduct = exports.signup = exports.login = void 0;
var Yup = __importStar(require("yup"));
require("yup-phone");
var mimeType = ['image/png', 'image/jpeg', 'image/jpg'];
exports.login = Yup.object({
    body: Yup.object({
        email: Yup.string()
            .email('email field is invalid')
            .required('email field is required'),
        password: Yup.string()
            .min(8, 'password field must be at least 8 characters')
            .required('password field is required'),
    }).noUnknown(true),
});
exports.signup = Yup.object({
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
        avatar: Yup.mixed().test('fileType', 'File type not supported only .png .jpg .jpeg', function (value) { return mimeType.includes(value.mimetype); }),
    })
        .noUnknown(true)
        .nullable()
        .required('avatar image is required'),
});
exports.addProduct = Yup.object({
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
        thumbnail: Yup.mixed().test('fileType', 'File type not supported only .png .jpg .jpeg', function (value) { return mimeType.includes(value.mimetype); }),
    })
        .noUnknown(true)
        .nullable()
        .required('thumbnail image is required'),
});
exports.editUser = Yup.object({
    body: Yup.object({
        email: Yup.string().email('email field is invalid'),
        password: Yup.string().min(8, 'password field must be at least 8 characters'),
        name: Yup.string().min(3, 'name field must be at least 3 characters'),
        lastname: Yup.string().min(3, 'lastname field must be at least 3 characters'),
        age: Yup.number().min(16, 'age field must be at least 16 or more'),
        cardId: Yup.string().matches(/^\d{8}$/, 'cardId field must be 8 digits only'),
        address: Yup.string().min(10, 'address field must at least 10 characters or more'),
    }).noUnknown(true),
    files: Yup.object({
        avatar: Yup.mixed().test('fileType', 'File type not supported only .png .jpg .jpeg', function (value) { return mimeType.includes(value.mimetype); }),
    })
        .noUnknown(true)
        .nullable(),
});
exports.editProduct = Yup.object({
    body: Yup.object({
        name: Yup.string().min(3, 'name field must be at least 3 characters'),
        description: Yup.string().min(20, 'description field must be at least 20 characters'),
        category: Yup.string().min(8, 'category field must be at least 8 characters'),
        price: Yup.number()
            .min(10, 'price field min is 10')
            .max(30000, 'price field max is 30000'),
    }).noUnknown(true),
    files: Yup.object({
        thumbnail: Yup.mixed().test('fileType', 'File type not supported only .png .jpg .jpeg', function (value) { return mimeType.includes(value.mimetype); }),
    })
        .noUnknown(true)
        .nullable(),
});
exports.queryProduct = Yup.object({
    query: Yup.object({
        title: Yup.string()
            .lowercase()
            .min(5, 'title query must be at least 5 characters'),
        code: Yup.string()
            .lowercase()
            .min(5, 'code query must be at least 5 characters'),
        priceMin: Yup.number().min(10, 'priceMin query min is 10'),
        priceMax: Yup.number().max(30000, 'priceMax query max is 30000'),
        stockMin: Yup.number().min(1, 'stockMin query min is 1'),
        stockMax: Yup.number().max(30000, 'stockMax query max is 30000'),
    }).noUnknown(true),
});
