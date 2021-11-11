"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var mongoose_1 = require("./mongoose");
var config_1 = require("../config/config");
var index_1 = __importDefault(require("../routes/index"));
mongoose_1.mongoose();
var app = express_1.default();
app.set('json spaces', 2);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// File upload middleware with temp dir
app.use(express_fileupload_1.default({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));
app.use(cookie_parser_1.default());
app.use(cors_1.default({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express_session_1.default({
    store: connect_mongo_1.default.create({ mongoUrl: config_1.CONFIG.MONGO_URL }),
    secret: config_1.CONFIG.SECRET,
    cookie: { sameSite: true, secure: 'auto', maxAge: 1000 * 120 },
    saveUninitialized: false,
    resave: true,
    rolling: true,
}));
app.use(auth_1.default.initialize());
app.use(auth_1.default.session());
app.get('/', function (req, res) {
    res.json({ msg: 'Connected' });
});
app.use('/api', index_1.default);
exports.default = app;
