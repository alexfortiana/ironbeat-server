const router = require("express").Router();
const SongModel = require("../models/Song.model")


router.get("/", async(req, res, next) => {                       // RENDERIZAMOS TODAS LAS CANCIONES (20)


    try{
        const response = await SongModel.find()
        .limit(20)
        .populate("owner")
        .select("username", "imgProfile", "bio")        //no pasar mail ni passwords   COMPROBAR!!!!
        res.json(response)

    }catch(err){
        next(err)
    }
})

router.post("/", async (req, res, next) => {                         // CREAMOS LA CANCION *REPASAR*

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

router.get("/:id", async (req, res, next) => {                      // RENDERIZAMOS LA CANCION ESPECIFICA

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

module.exports = router;
