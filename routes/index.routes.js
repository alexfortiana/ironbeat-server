const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

const messageRoutes = require("./message.routes")
router.use("/message", messageRoutes)

const songRoutes = require("./song.routes")
router.use("/song", songRoutes)


const licenseRoutes = require("./license.routes")
router.use("/license", licenseRoutes)

const uploaderRoutes = require("./uploader.routes")
router.use("/upload", uploaderRoutes)

const playlistRoutes = require("./playlist.routes")
router.use("/playlist", playlistRoutes)

const searchRoutes = require("./search.routes")
router.use("/search", searchRoutes)


module.exports = router;
