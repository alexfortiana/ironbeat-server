const router = require("express").Router();
const UserModel = require("../models/User.model");
const isAuthenticated = require("../middleware/isAuthenticated");

//const fileUploader = require("../config/cloudinary.config");
const { imageUploader } = require("../middleware/cloudinary.config")
const SongModel = require("../models/Song.model");
const { json } = require("express/lib/response");



router.get("/", isAuthenticated, async (req, res, next) => {              // PERFIL DEL USUARIO

    const id  = req.payload._id
    

    try{

        const response = await UserModel.findById(id)
        res.json(response)

    }catch(err){
        next(err)
    }
})

router.patch("/",imageUploader.single("image"), isAuthenticated, async (req, res, next) => {         // EDITAR EL PERFIL DEL USUARIO
    
    const id  = req.payload._id
    const { username, imgProfile, bio } = req.body


    try{
       
            await UserModel.findByIdAndUpdate(id, { 
                username,
                imgProfile,
                bio })
                
        res.json("Perfil actualizado")
        

        

    }catch(err){
        next(err)
    }
})

router.delete("/", isAuthenticated, async (req, res, next) => {       // ELIMINAR PERFIL
    const id  = req.payload._id

    try{
        await UserModel.findByIdAndDelete(id)
        res.json("Elemento eliminado")

    }catch(err){
        next(err)
    }
})

router.get("/followers", isAuthenticated, async (req, res, next) => {

       
    try{
         const response = await UserModel.findById(req.payload._id).populate("follows")
        //  console.log(response.follows)

    
    
         
        res.json(response.follows)
    } catch(err) {
        next(err)
    }
       
    })

//AÑADIR EN EL array y BORRAR DEL favoritos

    router.patch("/:id/favorites", isAuthenticated, async(req, res ,next) => {
        const {id} = req.params
    const myId = req.payload._id

    try{
        const myUser = await UserModel.findById(myId)
        if(!myUser.favorites.includes(id)){
          await UserModel.findByIdAndUpdate(myId, {
           $push: {favorites: id}
        })  
        } else {
            await UserModel.findByIdAndUpdate(myId, {
                $pull: {favorites: id}})

        }
        
        res.json("actualizado")



        

    }catch(err){
        next(err)
    }

    })


    //RENDERIZAR favoritos LIST

    router.get("/favorites", isAuthenticated, async (req, res, next) => {
        try{
            const response = await UserModel.findById(req.payload._id).populate("favorites")
            console.log(response)
            res.json(response)

        }catch(err){
            next(err)
        }
    })

    router.get("/:id/favorites", async (req, res, next) => {
        const {id} = req.params
        try{
            const response = UserModel.findById(id).populate("favorites")

        }catch(err){
            next(err)
        }
    })









router.patch("/:id/followers",isAuthenticated, async (req, res, next) => {
    const {id} = req.params
    const myId = req.payload._id
    
    

    try{
        // const userToFollow = await UserModel.findById(id)
        const myUser = await UserModel.findById(myId)

        if(!myUser.follows.includes(id)){
            await UserModel.findByIdAndUpdate(myId, { 
                $push: { follows: id }
             })
        }else {
            await UserModel.findByIdAndUpdate(myId, {
                $pull: { follows: id }
            })
        }
        res.json()

    }catch(err){
        next(err)
    }
    
    
})



router.get("/:id", async (req, res, next) => {        // PERFIL DE OTROS USUARIOS

        const { id } = req.params
    try{
            const response = await UserModel.findById(id).select("username").select("bio").select("imgProfile")
            
            res.json(response) 

        

    }catch(err){
        next(err)
    }
})



//  SI EN ALGUN MOMENTO QUEREMOS UN ADMIN, HACERLO QUE PUEDA ELIMINAR A LOS USUARIOS 

module.exports = router;
