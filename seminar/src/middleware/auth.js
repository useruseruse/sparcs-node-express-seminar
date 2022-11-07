
const authMiddleware = (req, res, next) => {
    if (req.body.id === process.env.USER && req.body.pwd === process.env.PWD) {
        console.log("[AUTH-MIDDLEWARE] Authorized User");
        next();
    }
    else {
        console.log("[AUTH-MIDDLEWARE] Not Authorized User");
        res.status(401).json({ error: "Not Authorized" });
    }
}

module.exports = authMiddleware;