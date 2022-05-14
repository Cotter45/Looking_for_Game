"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const csurf = require("csurf");
const path = require("path");
const apiRouter = require("./api");
const router = express_1.default.Router();
if (process.env.NODE_ENV === "production") {
    router.use(csurf({
        cookie: {
            secure: true,
            sameSite: "Lax",
            httpOnly: true,
        },
    }));
}
router.use("/api", apiRouter);
// Static routes
router.use("/static", express_1.default.static(path.resolve(__dirname, '../public')));
// Serve React build files in production
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    // Serve the frontend's index.html file at the root route
    router.get("/", (req, res) => {
        res.cookie("XSRF-TOKEN", req.csrfToken());
        res.sendFile(path.resolve(__dirname, "../../../frontend", "build", "index.html"));
    });
    // if not https redirect to https
    router.all('*', (req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            res.redirect(`https://${req.hostname}${req.url}`);
        }
        else {
            next();
        }
    });
    // Serve the static assets in the frontend's build folder
    router.use(express_1.default.static(path.resolve("../frontend/build")));
    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie("XSRF-TOKEN", req.csrfToken());
        res.sendFile(path.resolve(__dirname, "../../../frontend", "build", "index.html"));
    });
}
// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
    router.use(csurf({
        cookie: {
            secure: true,
            sameSite: "Lax",
            httpOnly: true,
        },
    }));
    router.get("/api/csrf/restore", (req, res) => {
        res.cookie("XSRF-TOKEN", req.csrfToken());
        res.status(201).json({});
    });
}
module.exports = router;
