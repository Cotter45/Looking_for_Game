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
const { Chat, Friend, LookingForGame, Message, Photo, User, Game, Category, Genre, UserGameGenre, UserGameCategory, UserGame, UsersLookingForGame, Video } = require("../../db/models");
const router = express_1.default.Router();
/**
 * MODEL Users
 */
// CREATE / POST
router.post("/user", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.create(req.body);
    res.status(201).json(user);
})));
// READ / GET
router.get('/user/:username', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({
        where: {
            username: req.params.username
        },
        include: [{ all: true }]
    });
    if (!user)
        next();
    res.status(200).json(user);
})));
// UDATE / PUT
router.put('/user/:username', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({
        where: {
            username: req.params.username
        }
    });
    if (!user)
        next();
    yield user.update(req.body);
    res.status(200).json(user);
})));
// DELETE 
router.delete('/user/:username', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({
        where: {
            username: req.params.username
        }
    });
    if (!user)
        next();
    yield user.destroy();
    res.status(200).json({ "message": "User deleted" });
})));
/**
 * MODEL Games
 */
// CREATE / POST
router.post("/game", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield Game.create(req.body);
    res.status(201).json(game);
})));
// READ / GET
router.get('/game/:steam_id', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield Game.findOne({
        where: {
            steam_id: req.params.steam_id
        },
        include: [{ all: true }]
    });
    if (!game)
        next();
    res.status(200).json(game);
})));
// UDATE / PUT
router.put('/game/:steam_id', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield Game.findOne({
        where: {
            steam_id: req.params.steam_id
        }
    });
    if (!game)
        next();
    yield game.update(req.body);
    res.status(200).json(game);
})));
// DELETE
router.delete('/game/:steam_id', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield Game.findOne({
        where: {
            steam_id: req.params.steam_id
        }
    });
    if (!game)
        next();
    yield game.destroy();
    res.status(200).json({ "message": "Game deleted" });
})));
/**
 * MODEL Categories
 */
// CREATE / POST
router.post("/category", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category.create(req.body);
    res.status(201).json(category);
})));
// READ / GET
router.get('/category/:name', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category.findOne({
        where: {
            name: req.params.name
        },
        include: [{ all: true }]
    });
    if (!category)
        next();
    res.status(200).json(category);
})));
// UDATE / PUT
router.put('/category/:name', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category.findOne({
        where: {
            name: req.params.name
        }
    });
    if (!category)
        next();
    yield category.update(req.body);
    res.status(200).json(category);
})));
// DELETE
router.delete('/category/:name', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category.findOne({
        where: {
            name: req.params.name
        }
    });
    if (!category)
        next();
    yield category.destroy();
    res.status(200).json({ "message": "Category deleted" });
})));
/**
 * MODEL GameGenre
 */
// CREATE / POST
router.post("/genre", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gamegenre = yield Genre.create(req.body);
    res.status(201).json(gamegenre);
})));
// READ / GET
router.get('/genre/:genre', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const gamegenre = yield Genre.findOne({
        where: {
            genre: req.params.genre
        },
        include: [{ all: true }]
    });
    if (!gamegenre)
        next();
    res.status(200).json(gamegenre);
})));
// UDATE / PUT
router.put('/genre/:genre', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const gamegenre = yield Genre.findOne({
        where: {
            genre: req.params.genre
        }
    });
    if (!gamegenre)
        next();
    yield gamegenre.update(req.body);
    res.status(200).json(gamegenre);
})));
// DELETE
router.delete('/genre/:genre', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const gamegenre = yield Genre.findOne({
        where: {
            genre: req.params.genre
        }
    });
    if (!gamegenre)
        next();
    yield gamegenre.destroy();
    res.status(200).json({ "message": "Genre deleted" });
})));
/**
 * MODEL UserGame
 */
// CREATE / POST
router.post("/user_game", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usergame = yield UserGame.create(req.body);
    res.status(201).json(usergame);
})));
// READ / GET
router.get('/user_game/:name', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usergame = yield UserGame.findOne({
        where: {
            name: req.params.name
        },
        include: [{ all: true }]
    });
    if (!usergame)
        next();
    res.status(200).json(usergame);
})));
// UDATE / PUT
router.put('/user_game/:name', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usergame = yield UserGame.findOne({
        where: {
            name: req.params.name
        }
    });
    if (!usergame)
        next();
    yield usergame.update(req.body);
    res.status(200).json(usergame);
})));
// DELETE
router.delete('/user_game/:name', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usergame = yield UserGame.findOne({
        where: {
            name: req.params.name
        }
    });
    if (!usergame)
        next();
    yield usergame.destroy();
    res.status(200).json({ "message": "Looking for Game deleted" });
})));
/**
 * MODEL LookingForGame
 */
// CREATE / POST
router.post("/looking_for_game", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lookingforgame = yield LookingForGame.create(req.body);
    res.status(201).json(lookingforgame);
})));
// READ / GET
router.get('/looking_for_game/:title', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const lookingforgame = yield LookingForGame.findOne({
        where: {
            title: req.params.title
        },
        include: [{ all: true }]
    });
    if (!lookingforgame)
        next();
    res.status(200).json(lookingforgame);
})));
// UDATE / PUT
router.put('/looking_for_game/:title', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const lookingforgame = yield LookingForGame.findOne({
        where: {
            title: req.params.title
        }
    });
    if (!lookingforgame)
        next();
    yield lookingforgame.update(req.body);
    res.status(200).json(lookingforgame);
})));
// DELETE
router.delete('/looking_for_game/:title', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const lookingforgame = yield LookingForGame.findOne({
        where: {
            title: req.params.title
        }
    });
    if (!lookingforgame)
        next();
    yield lookingforgame.destroy();
    res.status(200).json({ "message": "Looking for Game deleted" });
})));
module.exports = router;
