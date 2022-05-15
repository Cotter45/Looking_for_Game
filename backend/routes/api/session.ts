import express, { Request, Response, NextFunction } from 'express';
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
// const redisClient = require("../../utils/redis/index");

const router = express.Router();

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
router.post('/', validateLogin, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// Log out
router.delete('/', (_req: Request, res: Response) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get('/', restoreUser, asyncHandler( async (req: Request, res: Response) => {
  // @ts-ignore
    const { user } = req;
    if (user) {
      const newUser = await User.findOne({
        where: {
          id: +user.id
        }
      })
      return res.json({
        user: newUser
    });
    } else return res.json({});
  }
));

export = router;