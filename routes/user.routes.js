const router = require("express").Router();
const UserModel = require("../models/User.model");

router.get("/", async (req, res, next) => {              // PERFIL DEL USUARIO

    const id  = req.payload._id
    

    try{

        const response = await UserModel.findById(id)
        res.json(response)

    }catch(err){
        next(err)
    }
})

router.patch("/", async (req, res, next) => {         // EDITAR EL PERFIL DEL USUARIO
    
    const id  = req.payload._id
    const { username, imgProfile, bio } = req.body


    try{

        await UserModel.findByIdAndUpdate(id, { username, imgProfile, bio })
        res.json("Perfil actualizado")

    }catch(err){
        next(err)
    }
})

router.delete("/", async (req, res, next) => {       // ELIMINAR PERFIL
    const id  = req.payload._id

    try{
        await UserModel.findbyIdAndDelete(id)
        res.json("Elemento eliminado")

    }catch(err){
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {        // PERFIL DE OTROS USUARIOS

        const { id } = req.params
    try{
        const response = await UserModel.findById(id).select("username", "imgProfile", "bio")  //no pasar mail ni password   COMPROBAR!!!!
        res.json(response)

    }catch(err){
        next(err)
    }
})

//  SI EN ALGUN MOMENTO QUEREMOS UN ADMIN, HACERLO QUE PUEDA ELIMINAR A LOS USUARIOS 

module.exports = router;
