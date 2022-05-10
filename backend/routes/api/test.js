const express = require("express");
const asyncHandler = require("express-async-handler");

const { Chat, Friend, LookingForGame, Message, Photo, User, UserGameGenre, UserGameCategory, UserGame, UsersLookingForGame, Video } = require("../../db/models");

const router = express.Router();

// should return all models with all associations
router.get('/user', asyncHandler( async(req, res, next) => {
  const user = await User.findOne({
    where: {
      username: 'demoUser'
    },
    include: { all: true }
  })

  return res.json({ user });
}))


module.exports = router;