import express, { Request, Response, NextFunction } from 'express';
const asyncHandler = require("express-async-handler");

const { Chat, Friend, LookingForGame, Message, Photo, User, Game, Category, Genre, UserGameGenre, UserGameCategory, UserGame, UsersLookingForGame, Video } = require("../../db/models");

const router = express.Router();

/**
 * MODEL Users
 */

// CREATE / POST
router.post("/user", asyncHandler(async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
}));

// READ / GET
router.get('/user/:username', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    },
    include: [ { all: true } ]
  });
  if (!user) next();
  res.status(200).json(user);
}));

// UDATE / PUT
router.put('/user/:username', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  });
  if (!user) next();
  await user.update(req.body);
  res.status(200).json(user);
}));

// DELETE 
router.delete('/user/:username', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  });
  if (!user) next();
  await user.destroy();
  res.status(200).json({"message": "User deleted"});
}));

/**
 * MODEL Games
 */

// CREATE / POST
router.post("/game", asyncHandler(async (req: Request, res: Response) => {
  const game = await Game.create(req.body);
  res.status(201).json(game);
}));

// READ / GET
router.get('/game/:steam_id', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const game = await Game.findOne({
    where: {
      steam_id: req.params.steam_id
    },
    include: [ { all: true } ]
  });
  if (!game) next();
  res.status(200).json(game);
}));

// UDATE / PUT
router.put('/game/:steam_id', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const game = await Game.findOne({
    where: {
      steam_id: req.params.steam_id
    }
  });
  if (!game) next();
  await game.update(req.body);
  res.status(200).json(game);
}));

// DELETE
router.delete('/game/:steam_id', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const game = await Game.findOne({
    where: {
      steam_id: req.params.steam_id
    }
  });
  if (!game) next();
  await game.destroy();
  res.status(200).json({"message": "Game deleted"});
}));

/**
 * MODEL Categories
 */

// CREATE / POST
router.post("/category", asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
}));

// READ / GET
router.get('/category/:name', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const category = await Category.findOne({
    where: {
      name: req.params.name
    },
    include: [ { all: true } ]
  });
  if (!category) next();
  res.status(200).json(category);
}));

// UDATE / PUT
router.put('/category/:name', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const category = await Category.findOne({
    where: {
      name: req.params.name
    }
  });
  if (!category) next();
  await category.update(req.body);
  res.status(200).json(category);
}));

// DELETE
router.delete('/category/:name', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const category = await Category.findOne({
    where: {
      name: req.params.name
    }
  });
  if (!category) next();
  await category.destroy();
  res.status(200).json({"message": "Category deleted"});
}));

/**
 * MODEL GameGenre
 */

// CREATE / POST
router.post("/genre", asyncHandler(async (req: Request, res: Response) => {
  const gamegenre = await Genre.create(req.body);
  res.status(201).json(gamegenre);
}));

// READ / GET
router.get('/genre/:genre', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const gamegenre = await Genre.findOne({
    where: {
      genre: req.params.genre
    },
    include: [ { all: true } ]
  });
  if (!gamegenre) next();
  res.status(200).json(gamegenre);
}));

// UDATE / PUT
router.put('/genre/:genre', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const gamegenre = await Genre.findOne({
    where: {
      genre: req.params.genre
    }
  });
  if (!gamegenre) next();
  await gamegenre.update(req.body);
  res.status(200).json(gamegenre);
}));

// DELETE
router.delete('/genre/:genre', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const gamegenre = await Genre.findOne({
    where: {
      genre: req.params.genre
    }
  });
  if (!gamegenre) next();
  await gamegenre.destroy();
  res.status(200).json({"message": "Genre deleted"});
}));

/**
 * MODEL UserGame 
 */

// CREATE / POST
router.post("/user_game", asyncHandler(async (req: Request, res: Response) => {
  const usergame = await UserGame.create(req.body);
  res.status(201).json(usergame);
}));

// READ / GET
router.get('/user_game/:name', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const usergame = await UserGame.findOne({
    where: {
      name: req.params.name
    },
    include: [ { all: true } ]
  });
  if (!usergame) next();
  res.status(200).json(usergame);
}));

// UDATE / PUT
router.put('/user_game/:name', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const usergame = await UserGame.findOne({
    where: {
      name: req.params.name
    }
  });
  if (!usergame) next();
  await usergame.update(req.body);
  res.status(200).json(usergame);
}));

// DELETE
router.delete('/user_game/:name', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const usergame = await UserGame.findOne({
    where: {
      name: req.params.name
    }
  });
  if (!usergame) next();
  await usergame.destroy();
  res.status(200).json({"message": "Looking for Game deleted"});
}));

/**
 * MODEL LookingForGame
 */

// CREATE / POST
router.post("/looking_for_game", asyncHandler(async (req: Request, res: Response) => {
  const lookingforgame = await LookingForGame.create(req.body);
  res.status(201).json(lookingforgame);
}));

// READ / GET
router.get('/looking_for_game/:title', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const lookingforgame = await LookingForGame.findOne({
    where: {
      title: req.params.title
    },
    include: [ { all: true } ]
  });
  if (!lookingforgame) next();
  res.status(200).json(lookingforgame);
}));

// UDATE / PUT
router.put('/looking_for_game/:title', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const lookingforgame = await LookingForGame.findOne({
    where: {
      title: req.params.title
    }
  });
  if (!lookingforgame) next();
  await lookingforgame.update(req.body);
  res.status(200).json(lookingforgame);
}));

// DELETE
router.delete('/looking_for_game/:title', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const lookingforgame = await LookingForGame.findOne({
    where: {
      title: req.params.title
    }
  });
  if (!lookingforgame) next();
  await lookingforgame.destroy();
  res.status(200).json({"message": "Looking for Game deleted"});
}));


export = router;