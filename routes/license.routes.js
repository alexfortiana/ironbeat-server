const router = require("express").Router();
const LicenseModel = require("../models/License.model")
const SongModel = require("../models/Song.model")

router.post("/buy/:id", async(req, res, next) => {          

    const ownerId = req.payload._id
    const songId = req.params.id

    try{
   
        const song = await SongModel.findById(songId)
        
        const response = await LicenseModel.create({
            purchasedPrice: song.price, 
            owner: ownerId,
            song: songId,
            urlSong: song.audioUrl 
        })

    }catch(err){
        next(err)
    }
})

router.get("/", async(req, res, next) => {           // RENDERIZAMOS TODAS NUESTAS LICENCIAS DE CANCIONES 

    try{
        const response = await LicenseModel.find({
            owner: req.payload._id
        })
        res.json(response)

    }catch(err){
        next(err)
    }
})


module.exports = router;
