const router = require("express").Router();

const usersRouter = require("./users.js");
const sessionRouter = require("./session.js");
const healthRouter = require("./health.js");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/health", healthRouter);

module.exports = router;
