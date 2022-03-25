const router = require("express").Router();
const SongModel = require("../models/Song.model")
const isAuthenticated = require("../middleware/isAuthenticated");


router.get("/all-music/:page", async(req, res, next) => {                       // RENDERIZAMOS TODAS LAS CANCIONES (20)

    const { page  } = req.params

    // 1 => start 0. Limit 20
    const songsToSkip = page * 20

    try{
        const response = await SongModel.find()
        .sort({ createdAt: -1 })
        .skip(songsToSkip)
        .limit(20)
        .populate({ 
            path: "owner",
            select: "username"
        }).exec();
        //no pasar mail ni passwords   COMPROBAR!!!!  ORDENAR .sort({ createdAt: -1 })
            console.log("getting songs", response.length)
        res.json(response)

    }catch(err){
        next(err)
    }
})

router.post("/", isAuthenticated, async (req, res, next) => {                         // CREAMOS LA CANCION *REPASAR*

    const { title, imgSong, price, audioUrl} = req.body

    try{

        const response = await SongModel.create({
            title, 
            imgSong, 
            price, 
            audioUrl,
            owner: req.payload._id
        })
        res.json(response)

    }catch(err){
        next(err)
    }
})

router.get("/:id/details", async (req, res, next) => {                      // RENDERIZAMOS LA CANCION ESPECIFICA

    const { id } = req.params

    try{

        const response = await SongModel.findById(id)
        res.json(response)

    }catch(err){
        next(err)
    }
})

router.delete("/:id", async(req, res, next) => {                // ELIMINAMOS LA CANCION

    try{

        await SongModel.findByIdAndDelete(id)
        res.json("Cancion eliminada")

    }catch(err){
        next(err)
    }
})


router.patch("/plays", async(req, res, next) => {
    const {id} = req.body
    
    try{
        console.log("estoy añadiendo")
        const response = await SongModel.findByIdAndUpdate({_id: id},{$inc: {plays: 1}} ) 

        res.json("reproduccion sumada")

    }catch(err) {
        next(err)
    }
})


router.get("/my-songs", isAuthenticated, async (req, res, next) => {
    const {_id} = req.payload
   

    try{
        const response = await SongModel.find({owner: _id})
        
        res.json(response)


    }catch(err){
        next(err)
    }
})

router.get("/:id/songs-list", async (req, res, next) => {
    const {id} = req.params

    try{
        const response = await SongModel.find({owner: id})
        res.json(response)
    }catch(err){
        next(err)
    }
})

router.get("/ranking-plays", async (req, res, next) => {

    try{
        const response = await SongModel.find()
        .sort({plays: 1})
        .skip(5)

        res.json(response)

    }catch(err){
        next(err)
    }
})



router.delete("/:id/delete-song", isAuthenticated, async (req, res, next) => {
    const {id} = req.params
    console.log(req.params)
    try{
    
        await SongModel.findByIdAndDelete(id, {owner: req.payload._id})
        // const infoMessage = "cancion eliminada correctamente!"
        res.json("Cancion eliminada")

    }catch(err){
        next(err)
    }
    

})





module.exports = router;
