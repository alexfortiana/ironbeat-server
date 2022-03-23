const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const PlaylistModel = require("../models/Playlist.model")



// CREAR LISTA
router.post("/:id/new", isAuthenticated, async(req, res, next) => {     
    const songId = req.params.id 
    const myId = req.payload._id
    const { name } = req.body
    
    try{
        await PlaylistModel.create({
            owner: myId,
            list: songId,
            name
        })
        res.json("Lista creada!!")

    }catch(err){
        next(err)
    }
})


//OBTENER NOMBRES DE LISTAS
router.get("/all", isAuthenticated, async(req, res, next) => {
    const myId = req.payload._id
    try{
        const responsive = await PlaylistModel.find({owner: myId} )
        res.json(responsive)

    }catch(err){
        next(err)
    }
})
 router.get("/:id/playlist", async (req, res, next) => {

        const {id} = req.params;
    try{

        const response = await PlaylistModel.findById(id).populate("list")
        console.log("back", response)
        res.json(response)
    }catch(err){
        next(err)
    }
}) 


//AÑADIR CANCIONES A UNA LISTA VIEJA  PONER TAMBIEN PARA ELIMINAR!!

router.patch("/:idSong/old/", isAuthenticated, async(req, res, next) => {
    const songId = req.params.idSong
    const myId = req.payload._id
    const {playlistId} = req.body

    try{
        

            
          await PlaylistModel.findByIdAndUpdate(playlistId, {
            $push:  {list: songId}
          })
            

    //     } )  
    //     } else {
    //         await PlaylistModel.findOneAndUpdate(theList._id, {
    //     $pull: {list: songId}
    // })
        // }
        

res.json("actualizado")
    }catch(err){
        next(err)
    }
})







//QUITAR LISTA HACER CONDICIONAL DE SI ES MIA LA LISTA

/* router.delete("/:id/", isAuthenticated, async (res, req, next) => {
    const {id} = req.params
    try{
    
        await PlaylistModel.findByIdAndDelete(id)

    }catch(err){
        next(err)
    }
    

}) */


















module.exports = router;
