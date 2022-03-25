const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)


const songRoutes = require("./song.routes")
router.use("/song", songRoutes)


const uploaderRoutes = require("./uploader.routes")
router.use("/upload", uploaderRoutes)

const playlistRoutes = require("./playlist.routes")
router.use("/playlist", playlistRoutes)


module.exports = router;
