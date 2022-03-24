const router = require("express").Router();
const SongModel = require("../models/Song.model");
const UserModel = require("../models/User.model");



router.get("/", async (req, res, next) => {
    let {searchReq} = req.query

    try{
        const songSearch = await SongModel.find({
            title: searchReq.toLocaleUpperCase()
        }).populate("owner")

        const userSearch = await UserModel.find({
            username: { $regex: new RegExp(searchReq, "i") }
        })

        if(songSearch.length > 0) {
            res.json(songSearch)
        } else if(userSearch.length > 0) {
            res.json(userSearch)
        } else {
            const errorMessage = "There is no results";
            res.json(errorMessage)
        }
    }catch(err){
        next(err)

    }
})









module.exports = router;