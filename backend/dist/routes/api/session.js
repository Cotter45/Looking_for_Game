"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
// const redisClient = require("../../utils/redis/index");
const router = express_1.default.Router();
const validateLogin = [
    check("credential")
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Please provide a valid email or username."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
    handleValidationErrors,
];
// Log in
router.post('/', validateLogin, asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { credential, password } = req.body;
    const user = yield User.login({ credential, password });
    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }
    yield setTokenCookie(res, user);
    return res.json({
        user,
    });
})));
// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});
// Restore session user
router.get('/', restoreUser, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { user } = req;
    if (user) {
        const newUser = yield User.findOne({
            where: {
                id: +user.id
            }
        });
        return res.json({
            user: newUser
        });
    }
    else
        return res.json({});
})));
module.exports = router;
