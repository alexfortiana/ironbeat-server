const router = require("express").Router();
const bcrypt = require("bcryptjs/dist/bcrypt");
const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");






router.post("/signup", async (req, res, next) => {              // AQUI ESTAMOS REGISTRANDO AL USUARIO

    const { email, password, username} = req.body

    if(!email || !password || ! username) {
        res.status(400).json({errorMessage: "Llenar todos los campos!"})
        return;
    }

    try{
        const foundUser = await UserModel.findOne({email})     //FALTA PONER USERNAME TAMBIEN
        if(foundUser) {
            res.status(400).json({errorMessage: "El usuario ya existe!"})
            return;
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await UserModel.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(201).json()

    } catch(err){
        next(err)
    }

})




router.post("login", async (req, res, next) => {
    const {username, password } = req.body

    if(!username || !password){
        res.status(400).json({errorMessage: "Llenar todos los campos!"})
        return;
    }

    try{
        const foundUser = await UserModel.findOne({username})
            if(!foundUser) {
                res.status(401).json({errorMessage: "Usuario no registrado!"})
                return;
            }

            const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
            if(!isPasswordCorrect){
                res.status(401).json({errorMessage: "Contraseña incorrecta!"})
                return;
            }

            const payload = {
                _id: foundUser._id,
                email: foundUser.email,        //PREGUNTAR A JORGE SI TIENE QUE SER SIEMPRE ASI?
                name: foundUser.username
            }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: "HS256", expiresIn: "6h"}
            )

            res.status(200).json( {authToken})


    } catch(err){
        next(err)
    }





})




// AQUI IRA LA RUTA DE VERIFY !!

















module.exports = router;
