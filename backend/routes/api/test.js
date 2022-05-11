const express = require("express");
const asyncHandler = require("express-async-handler");

const { Chat, Friend, LookingForGame, Message, Photo, User, Game, Category, Genre, UserGameGenre, UserGameCategory, UserGame, UsersLookingForGame, Video } = require("../../db/models");

const router = express.Router();

/**
 * MODEL Users
 */

// CREATE / POST
router.post("/user", asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
}));

// READ / GET
router.get('/user/:username', asyncHandler( async(req, res, next) => {
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
router.put('/user/:username', asyncHandler( async(req, res, next) => {
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
router.delete('/user/:username', asyncHandler( async(req, res, next) => {
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
router.post("/game", asyncHandler(async (req, res) => {
  const game = await Game.create(req.body);
  res.status(201).json(game);
}));

// READ / GET
router.get('/game/:steam_id', asyncHandler( async(req, res, next) => {
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
router.put('/game/:steam_id', asyncHandler( async(req, res, next) => {
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
router.delete('/game/:steam_id', asyncHandler( async(req, res, next) => {
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
router.post("/category", asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
}));

// READ / GET
router.get('/category/:name', asyncHandler( async(req, res, next) => {
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
router.put('/category/:name', asyncHandler( async(req, res, next) => {
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
router.delete('/category/:name', asyncHandler( async(req, res, next) => {
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
router.post("/genre", asyncHandler(async (req, res) => {
  const gamegenre = await Genre.create(req.body);
  res.status(201).json(gamegenre);
}));

// READ / GET
router.get('/genre/:genre', asyncHandler( async(req, res, next) => {
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
router.put('/genre/:genre', asyncHandler( async(req, res, next) => {
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
router.delete('/genre/:genre', asyncHandler( async(req, res, next) => {
  const gamegenre = await Genre.findOne({
    where: {
      genre: req.params.genre
    }
  });
  if (!gamegenre) next();
  await gamegenre.destroy();
  res.status(200).json({"message": "Genre deleted"});
}));


module.exports = router;