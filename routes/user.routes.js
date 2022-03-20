const router = require("express").Router();
const UserModel = require("../models/User.model");
const isAuthenticated = require("../middleware/isAuthenticated");

//const fileUploader = require("../config/cloudinary.config");
const { imageUploader } = require("../middleware/cloudinary.config")



router.get("/", isAuthenticated, async (req, res, next) => {              // PERFIL DEL USUARIO

    const id  = req.payload._id
    console.log("aqui estoy", req.payload)
    

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

router.get("/:id/followers",isAuthenticated, async (req, res, next) => {
    const {id} = req.params
    const myId = req.payload._id
    
    

    try{
        const userToFollow = await UserModel.findById(id)
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

    }catch(err){
        next(err)
    }
    
    
})

router.get("/:id", async (req, res, next) => {        // PERFIL DE OTROS USUARIOS

        const { id } = req.params
    try{
        const response = await UserModel.findById(id).select("username").select("bio").select("imgProfile")  //no pasar mail ni password   COMPROBAR!!!!
        res.json(response)

    }catch(err){
        next(err)
    }
})



//  SI EN ALGUN MOMENTO QUEREMOS UN ADMIN, HACERLO QUE PUEDA ELIMINAR A LOS USUARIOS 

module.exports = router;
