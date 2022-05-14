import express, { Request, Response, NextFunction } from 'express';
const asyncHandler = require("express-async-handler");

const { Chat, Friend, LookingForGame, Message, Photo, User, Game, Category, Genre, UserGameGenre, UserGameCategory, UserGame, UsersLookingForGame, Video } = require("../../db/models");

const router = express.Router();

/**
 * MODEL Users
 */

// CREATE / POST
router.post("/user", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}));

// READ / GET
router.get('/user/:username', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      },
      include: [ { all: true } ]
    });
    if (!user) next();
    return res.status(200).json(user);
  } catch(e) {
    next(e);
  }
}));

// UDATE / PUT
router.put('/user/:username', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    });
    if (!user) next();
    await user.update(req.body);
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
}));

// DELETE 
router.delete('/user/:username', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    });
    if (!user) next();
    await user.destroy();
    return res.status(200).json({"message": "User deleted"});
  } catch (e) {
    next(e);
  }
}));

/**
 * MODEL Games
 */

// CREATE / POST
router.post("/game", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const game = await Game.create(req.body);
    return res.status(201).json(game);
  } catch (e) {
    next(e);
  }
}));

// READ / GET
router.get('/game/:steam_id', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const game = await Game.findOne({
      where: {
        steam_id: req.params.steam_id
      },
      include: [ { all: true } ]
    });
    if (!game) next();
    return res.status(200).json(game);
  } catch (e) {
    next(e);
  }
}));

// UDATE / PUT
router.put('/game/:steam_id', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const game = await Game.findOne({
      where: {
        steam_id: req.params.steam_id
      }
    });
    if (!game) next();
    await game.update(req.body);
    return res.status(200).json(game);
  } catch (e) {
    next(e);
  }
}));

// DELETE
router.delete('/game/:steam_id', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const game = await Game.findOne({
      where: {
        steam_id: req.params.steam_id
      }
    });
    if (!game) next();
    await game.destroy();
    return res.status(200).json({"message": "Game deleted"});
  } catch (e) {
    next(e);
  }
}));

/**
 * MODEL Categories
 */

// CREATE / POST
router.post("/category", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json(category);
  } catch (e) {
    next(e);
  }
}));

// READ / GET
router.get('/category/:name', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findOne({
      where: {
        name: req.params.name
      },
      include: [ { all: true } ]
    });
    if (!category) next();
    return res.status(200).json(category);
  } catch(e) {
    next(e);
  }
}));

// UDATE / PUT
router.put('/category/:name', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findOne({
      where: {
        name: req.params.name
      }
    });
    if (!category) next();
    await category.update(req.body);
    return res.status(200).json(category);
  } catch (e) {
    next(e);
  }
}));

// DELETE
router.delete('/category/:name', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findOne({
      where: {
        name: req.params.name
      }
    });
    if (!category) next();
    await category.destroy();
    return res.status(200).json({"message": "Category deleted"});
  } catch (e) {
    next(e);
  }
}));

/**
 * MODEL GameGenre
 */

// CREATE / POST
router.post("/genre", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gamegenre = await Genre.create(req.body);
    return res.status(201).json(gamegenre);
  } catch (e) {
    next(e);
  }
}));

// READ / GET
router.get('/genre/:genre', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const gamegenre = await Genre.findOne({
      where: {
        genre: req.params.genre
      },
      include: [ { all: true } ]
    });
    if (!gamegenre) next();
    return res.status(200).json(gamegenre);
  } catch (e) {
    next(e);
  }
}));

// UDATE / PUT
router.put('/genre/:genre', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const gamegenre = await Genre.findOne({
      where: {
        genre: req.params.genre
      }
    });
    if (!gamegenre) next();
    await gamegenre.update(req.body);
    return res.status(200).json(gamegenre);
  } catch (e) {
    next(e);
  }
}));

// DELETE
router.delete('/genre/:genre', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const gamegenre = await Genre.findOne({
      where: {
        genre: req.params.genre
      }
    });
    if (!gamegenre) next();
    await gamegenre.destroy();
    return res.status(200).json({"message": "Genre deleted"});
  } catch (e) {
    next(e);
  }
}));

/**
 * MODEL UserGame 
 */

// CREATE / POST
router.post("/userGame", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usergame = await UserGame.create(req.body);
    return res.status(201).json(usergame);
  } catch (e) {
    next(e);
  }
}));

// READ / GET
router.get('/userGame/:name', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const usergame = await UserGame.findOne({
      where: {
        name: req.params.name
      },
      include: [ { all: true } ]
    });
    if (!usergame) next();
    return res.status(200).json(usergame);
  } catch (e) {
    next(e);
  }
}));

// UDATE / PUT
router.put('/userGame/:name', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const usergame = await UserGame.findOne({
      where: {
        name: req.params.name
      }
    });
    if (!usergame) next();
    await usergame.update(req.body);
    return res.status(200).json(usergame);
  } catch (e) {
    next(e);
  }
}));

// DELETE
router.delete('/userGame/:name', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const usergame = await UserGame.findOne({
      where: {
        name: req.params.name
      }
    });
    if (!usergame) next();
    await usergame.destroy();
    return res.status(200).json({"message": "Looking for Game deleted"});
  } catch (e) {
    next(e);
  }
}));

/**
 * MODEL LookingForGame
 */

// CREATE / POST
router.post("/lookingForGame", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lookingforgame = await LookingForGame.create(req.body);
    return res.status(201).json(lookingforgame);
  } catch (e) {
    next(e);
  }
}));

// READ / GET
router.get('/lookingForGame/:title', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const lookingforgame = await LookingForGame.findOne({
      where: {
        title: req.params.title
      },
      include: [ { all: true } ]
    });
    if (!lookingforgame) next();
    return res.status(200).json(lookingforgame);
  } catch (e) {
    next(e);
  }
}));

// UDATE / PUT
router.put('/lookingForGame/:title', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const lookingforgame = await LookingForGame.findOne({
      where: {
        title: req.params.title
      }
    });
    if (!lookingforgame) next();
    await lookingforgame.update(req.body);
    return res.status(200).json(lookingforgame);
  } catch (e) {
    next(e);
  }
}));

// DELETE
router.delete('/lookingForGame/:title', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  try {
    const lookingforgame = await LookingForGame.findOne({
      where: {
        title: req.params.title
      }
    });
    if (!lookingforgame) next();
    await lookingforgame.destroy();
    return res.status(200).json({"message": "Looking for Game deleted"});
  } catch (e) {
    next(e);
  }
}));


export = router;