const router = require("express").Router();
const MessageModel = require("../models/Message.model")

router.post("/:id", async(req, res, next) => {

    const { text } = req.body
    const toId = req.params.id
    const fromId = req.payload._id
    try{

        const response = await MessageModel.create({
            from: fromId,
            to: toId,
            text
        })
        res.json(response)

    }catch(err){
        next(err)
    }
})

router.get("/:id", async(req, res, next)=>{                                    // RENDERIZANDO MENSAJES
    const toId = req.params.id
    const fromId = req.payload._id

    try{

        const messageFrom = await MessageModel.find({           // AQUI BUSCO MIS MENSAJES CON UNA PERSONA ESPECIFICA
            from: fromId,
            to: toId
        })
        .populate("from")
        .populate("to")
        const messageTo = await MessageModel.find({             // BUSCO MENSAJES DE UNA PERSONA CONMIGO
            from: toId,
            to: fromId
        })
        .populate("from")
        .populate("to")
        const totalMessage = [...messageFrom, ...messageTo]
        const orderedMessage = totalMessage.sort((a, b) => {    // MEZCLO LOS MENSAJES Y LOS ORDENO POR FECHA
            if(a.createdAt < b.createAt){
                return 1
            }else if(a.createdAt > b.createAt){
                return -1
            }else {
                return 0
            }
        })
        res.json(orderedMessage)

    }catch(err){
        next(err)
    }
})

// AQUI AÑADIRIAMOS LA FUNCION PARA BORRAR LOS MENSAJES *SI ESO*




module.exports = router;
