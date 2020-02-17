const express=require('express')
const response=require('../../network/response')
const validacionToken=require('../validacion/validacionToken')
const controller=require('./controller')
const router=express.Router()

router.put('/:id',(req,res)=>{
    const idNoticia=req.params.id
    validacionToken.validar(req.headers['authorization'])
        .then((userId)=>{
            controller.addFavorito(userId,idNoticia)
                .then(()=>{
                    response.responder(req,res,false,200,'Agregado correctamente',null)
                })
                .catch((error)=>{
                    response.responder(req,res,true,500,"Internal Error: "+error,null)
                })
        })
        .catch((error)=>{
            response.responder(req,res,true,400,'Internal Error: '+error,null)
        })
})

router.get('/',(req,res)=>{
    validacionToken.validar(req.headers['authorization'])
        .then((userId)=>{
            controller.getFavoritos(userId)
                .then((favoritos)=>{
                    response.responder(req,res,false,200,'Favoritos',favoritos)
                })
                .catch((error)=>{
                    response.responder(req,res,true,500,"Internal Error: "+error,null)
                })
        })
        .catch((error)=>{
            response.responder(req,res,true,400,'Internal Error: '+error,null)
        })
    
})

module.exports=router