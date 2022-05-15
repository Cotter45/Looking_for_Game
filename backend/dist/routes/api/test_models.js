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
const asyncHandler = require("express-async-handler");
// Chat, Friend,  Message, Photo,  UserGameGenre, UserGameCategory,  UsersLookingForGame, Video 
const { LookingForGame, User, Game, Category, Genre, UserGame } = require("../../db/models");
const router = express_1.default.Router();
/**
 * MODEL Users
 */
// CREATE / POST
router.post("/user", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.create(req.body);
        return res.status(201).json(user);
    }
    catch (e) {
        next(e);
    }
})));
// READ / GET
router.get('/user/:username', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({
            where: {
                username: req.params.username
            },
            include: [{ all: true }]
        });
        if (!user)
            next();
        return res.status(200).json(user);
    }
    catch (e) {
        next(e);
    }
})));
// UDATE / PUT
router.put('/user/:username', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({
            where: {
                username: req.params.username
            }
        });
        if (!user)
            next();
        yield user.update(req.body);
        return res.status(200).json(user);
    }
    catch (e) {
        next(e);
    }
})));
// DELETE 
router.delete('/user/:username', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({
            where: {
                username: req.params.username
            }
        });
        if (!user)
            next();
        yield user.destroy();
        return res.status(200).json({ "message": "User deleted" });
    }
    catch (e) {
        next(e);
    }
})));
/**
 * MODEL Games
 */
// CREATE / POST
router.post("/game", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield Game.create(req.body);
        return res.status(201).json(game);
    }
    catch (e) {
        next(e);
    }
})));
// READ / GET
router.get('/game/:steam_id', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield Game.findOne({
            where: {
                steam_id: req.params.steam_id
            },
            include: [{ all: true }]
        });
        if (!game)
            next();
        return res.status(200).json(game);
    }
    catch (e) {
        next(e);
    }
})));
// UDATE / PUT
router.put('/game/:steam_id', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield Game.findOne({
            where: {
                steam_id: req.params.steam_id
            }
        });
        if (!game)
            next();
        yield game.update(req.body);
        return res.status(200).json(game);
    }
    catch (e) {
        next(e);
    }
})));
// DELETE
router.delete('/game/:steam_id', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield Game.findOne({
            where: {
                steam_id: req.params.steam_id
            }
        });
        if (!game)
            next();
        yield game.destroy();
        return res.status(200).json({ "message": "Game deleted" });
    }
    catch (e) {
        next(e);
    }
})));
/**
 * MODEL Categories
 */
// CREATE / POST
router.post("/category", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category.create(req.body);
        return res.status(201).json(category);
    }
    catch (e) {
        next(e);
    }
})));
// READ / GET
router.get('/category/:name', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category.findOne({
            where: {
                name: req.params.name
            },
            include: [{ all: true }]
        });
        if (!category)
            next();
        return res.status(200).json(category);
    }
    catch (e) {
        next(e);
    }
})));
// UDATE / PUT
router.put('/category/:name', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category.findOne({
            where: {
                name: req.params.name
            }
        });
        if (!category)
            next();
        yield category.update(req.body);
        return res.status(200).json(category);
    }
    catch (e) {
        next(e);
    }
})));
// DELETE
router.delete('/category/:name', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category.findOne({
            where: {
                name: req.params.name
            }
        });
        if (!category)
            next();
        yield category.destroy();
        return res.status(200).json({ "message": "Category deleted" });
    }
    catch (e) {
        next(e);
    }
})));
/**
 * MODEL GameGenre
 */
// CREATE / POST
router.post("/genre", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gamegenre = yield Genre.create(req.body);
        return res.status(201).json(gamegenre);
    }
    catch (e) {
        next(e);
    }
})));
// READ / GET
router.get('/genre/:genre', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gamegenre = yield Genre.findOne({
            where: {
                genre: req.params.genre
            },
            include: [{ all: true }]
        });
        if (!gamegenre)
            next();
        return res.status(200).json(gamegenre);
    }
    catch (e) {
        next(e);
    }
})));
// UDATE / PUT
router.put('/genre/:genre', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gamegenre = yield Genre.findOne({
            where: {
                genre: req.params.genre
            }
        });
        if (!gamegenre)
            next();
        yield gamegenre.update(req.body);
        return res.status(200).json(gamegenre);
    }
    catch (e) {
        next(e);
    }
})));
// DELETE
router.delete('/genre/:genre', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gamegenre = yield Genre.findOne({
            where: {
                genre: req.params.genre
            }
        });
        if (!gamegenre)
            next();
        yield gamegenre.destroy();
        return res.status(200).json({ "message": "Genre deleted" });
    }
    catch (e) {
        next(e);
    }
})));
/**
 * MODEL UserGame
 */
// CREATE / POST
router.post("/userGame", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usergame = yield UserGame.create(req.body);
        return res.status(201).json(usergame);
    }
    catch (e) {
        next(e);
    }
})));
// READ / GET
router.get('/userGame/:name', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usergame = yield UserGame.findOne({
            where: {
                name: req.params.name
            },
            include: [{ all: true }]
        });
        if (!usergame)
            next();
        return res.status(200).json(usergame);
    }
    catch (e) {
        next(e);
    }
})));
// UDATE / PUT
router.put('/userGame/:name', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usergame = yield UserGame.findOne({
            where: {
                name: req.params.name
            }
        });
        if (!usergame)
            next();
        yield usergame.update(req.body);
        return res.status(200).json(usergame);
    }
    catch (e) {
        next(e);
    }
})));
// DELETE
router.delete('/userGame/:name', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usergame = yield UserGame.findOne({
            where: {
                name: req.params.name
            }
        });
        if (!usergame)
            next();
        yield usergame.destroy();
        return res.status(200).json({ "message": "Looking for Game deleted" });
    }
    catch (e) {
        next(e);
    }
})));
/**
 * MODEL LookingForGame
 */
// CREATE / POST
router.post("/lookingForGame", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lookingforgame = yield LookingForGame.create(req.body);
        return res.status(201).json(lookingforgame);
    }
    catch (e) {
        next(e);
    }
})));
// READ / GET
router.get('/lookingForGame/:title', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lookingforgame = yield LookingForGame.findOne({
            where: {
                title: req.params.title
            },
            include: [{ all: true }]
        });
        if (!lookingforgame)
            next();
        return res.status(200).json(lookingforgame);
    }
    catch (e) {
        next(e);
    }
})));
// UDATE / PUT
router.put('/lookingForGame/:title', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lookingforgame = yield LookingForGame.findOne({
            where: {
                title: req.params.title
            }
        });
        if (!lookingforgame)
            next();
        yield lookingforgame.update(req.body);
        return res.status(200).json(lookingforgame);
    }
    catch (e) {
        next(e);
    }
})));
// DELETE
router.delete('/lookingForGame/:title', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lookingforgame = yield LookingForGame.findOne({
            where: {
                title: req.params.title
            }
        });
        if (!lookingforgame)
            next();
        yield lookingforgame.destroy();
        return res.status(200).json({ "message": "Looking for Game deleted" });
    }
    catch (e) {
        next(e);
    }
})));
module.exports = router;
