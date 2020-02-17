const express=require('express')
const response=require('../../network/response')
const validacionToken=require('../validacion/validacionToken')
const controller=require('./controller')
const jwt=require('jsonwebtoken')
const router=express.Router()

router.put('/',(req,res)=>{
    controller.addUsuario(req.body)
        .then((usuario)=>{
            response.responder(req,res,false,201,'Agregado correctamente',usuario)
        })
        .catch((error)=>{
            response.responder(req,res,true,500,'Internal Error: '+error,null)
        })
})

router.post('/login',(req,res)=>{
    var user=req.body.usuario
    var password=req.body.password
    controller.validateUsuario(user,password)
        .then((respuesta)=>{
            var tokenData={
                userId:respuesta._id
            }
            var token=jwt.sign(tokenData,'Secret Password',{
                expiresIn:60*20
            })
            res.header({
                'Header-Token':token
            })
            response.responder(req,res,false,200,'Login Exitoso',null)
        })
        .catch((error)=>{
            response.responder(req,res,true,500,"Server Error: "+error,null)
        })

    
})

module.exports=router