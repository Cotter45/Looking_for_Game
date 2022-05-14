"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const usersRouter = require("./users.js");
const sessionRouter = require("./session.js");
const healthRouter = require("./health.js");
const router = express_1.default.Router();
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/health", healthRouter);
module.exports = router;
