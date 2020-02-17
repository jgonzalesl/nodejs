const express=require('express')
const response=require('../../network/response')
const validacionToken=require('../validacion/validacionToken')
const controller=require('./controller')
const router=express.Router()


router.get('/buscar/:id',(req,res)=>{
    const id=req.params.id
    controller.getNoticia(id).then((noticia)=>{
        response.responder(req,res,false,200,"Correcto",noticia)
    }).catch((error)=>{
        response.responder(req,res,true,500,"Server Error: "+error,null)
    })
})
router.get('/listaNoticias',(req,res)=>{
    controller.getNoticias()
    .then((listaNoticias)=>{
        response.responder(req,res,false,200,"Noticias del día",listaNoticias)
    }).catch((error)=>{
        response.responder(req,res,true,400,error,null);
    })
})
router.put('/guardar',(req,res)=>{
    validacionToken.validar(req.headers['authorization'])
    .then((userId)=>{
        const noticia=req.body
        controller.addNoticia(userId,noticia)
        .then((noticia)=>{
            response.responder(req,res,false,201,"Guardado correctamente",noticia)
        }).catch((error)=>{
            response.responder(req,res,true,500,"Internal Error: "+error,null)
        })
    }).catch((error)=>{
        response.responder(req,res,true,400,"Internal Error: "+error,null)
    })
})
router.patch('/actualizar/:id',(req,res)=>{
    validacionToken.validar(req.headers['authorization']).then(()=>{
        const id=req.params.id
        const noticia=req.body
        controller.updateNoticia(id,noticia).then((noticia)=>{
            response.responder(req,res,false,200,"Actualizado correctamente",noticia)
        }).catch((error)=>{
            response.responder(req,res,true,500,'Server Error: '+error,null)
        })
    }).catch((error)=>{
        response.responder(req,res,true,400,error,null)
    })
})
router.delete('/:id',(req,res)=>{
    validacionToken.validar(req.headers['authorization']).then(()=>{
        const id=req.params.id
        controller.deleteNoticia(id).then(()=>{
            response.responder(req,res,false,200,"Eliminado correctamente",null)
        }).catch((error)=>{
            response.responder(req,res,true,500,'Server Error: '+error,null)
        })
    }).catch((error)=>{
        response.responder(req,res,true,400,error,null)
    })
})
module.exports=router