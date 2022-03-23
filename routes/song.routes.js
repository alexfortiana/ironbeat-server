const router = require("express").Router();
const SongModel = require("../models/Song.model")
const isAuthenticated = require("../middleware/isAuthenticated");


router.get("/", async(req, res, next) => {                       // RENDERIZAMOS TODAS LAS CANCIONES (20)


    try{
        const response = await SongModel.find().populate({ 
            path: "owner",
            select: "username"
        }).exec();
        //no pasar mail ni passwords   COMPROBAR!!!!  ORDENAR .sort({ createdAt: -1 })
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
        console.log("he", response)
        res.json("reproduccion sumada")

    }catch(err) {
        next(err)
    }
})

module.exports = router;
