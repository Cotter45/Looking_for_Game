import express from "express";

const usersRouter = require("./users.js");
const sessionRouter = require("./session.js");
const healthRouter = require("./health.js");

const router = express.Router();

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/health", healthRouter);

export = router;
