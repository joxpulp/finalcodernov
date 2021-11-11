"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
var auth_1 = __importDefault(require("../middlewares/auth"));
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.login = function (req, res, next) {
        auth_1.default.authenticate('login', function (err, user, info) {
            if (err)
                return next(err);
            if (user) {
                req.login(user, function () {
                    return res.json({
                        userData: {
                            _id: user._id,
                            name: user.name,
                            lastname: user.lastname,
                            age: user.age,
                            address: user.address,
                            phone: user.phone,
                            avatar: user.avatar,
                            isAdmin: user.isAdmin,
                        },
                        logged: true,
                    });
                });
            }
            else {
                return res.status(401).json(__assign(__assign({}, info), { logged: false }));
            }
        })(req, res, next);
    };
    AuthController.prototype.signup = function (req, res, next) {
        auth_1.default.authenticate('signup', function (err, user, info) {
            if (err)
                return next(err);
            if (user) {
                return res.json({ msg: 'User created' });
            }
            else {
                return res.status(401).json(__assign({}, info));
            }
        })(req, res, next);
    };
    AuthController.prototype.isLogged = function (req, res) {
        if (req.user) {
            return res.json({ logged: true });
        }
        else {
            return res.status(404).json({ logged: false });
        }
    };
    AuthController.prototype.logout = function (req, res) {
        if (req.user) {
            req.logout();
            return res.json({ msg: 'Session ended', logged: false });
        }
        return res
            .status(404)
            .json({ error: 'The is no session started or is already logout' });
    };
    return AuthController;
}());
exports.authController = new AuthController();
