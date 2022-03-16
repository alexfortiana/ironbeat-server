const router = require("express").Router();
const LicenseModel = require("../models/License.model")

router.post("/buy/:id", async(req, res, next) => {          // CREAMOS LA LICENCIA DE COMPRA * PREGUNTAR A JORGE EL PURCHASEDPRICE* 

    const { purchasedPrice, owner, song } = req.body
    const ownerId = req.payload._id
    const songId = req.params.id

    try{

        const response = await LicenseModel.create({
            purchasedPrice, 
            owner: ownerId,
            song: songId
        })

    }catch(err){
        next(err)
    }
})

router.get("/buy", async(req, res, next) => {           // RENDERIZAMOS TODAS NUESTAS LICENCIAS DE CANCIONES 

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
