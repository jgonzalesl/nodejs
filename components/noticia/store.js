
const Model=require('./model')

async function addNoticia(noticia){
    const myNoticia=new Model(noticia)
    const resultado= await myNoticia.save()
        .catch((error)=>{
            console.error(error) 
            return null
        })
    return resultado
}
async function findNoticia(id){
    return new Promise((resolve,reject)=>{
        Model.findOne({_id:id})
            .populate({path:'usuario',model:'Usuario'})
            .exec((error,populated)=>{
                if(error){
                    console.error(error)
                    reject(null)
                }else{
                    resolve(populated)
                }
            })
    })
    
}
async function getNoticias(){
    const noticias= await Model.find()
        .catch((error)=>{
            console.error(error)
            return null
        })
    return noticias
}
async function deleteNoticia(id){
    const eliminado=await Model.deleteOne({'_id':id})
        .catch((error)=>{
            console.error(error)
            return null
        })
    return eliminado
}
async function updateNoticia(id,noticia){
    const foundNoticia=await Model.findOne({_id:id})
        .catch((error)=>{
            console.error(error)
            return null
        })
    if(!foundNoticia){
        return {
            error:true,
            message:"No se encontro la noticia",
            data:null
        }
    }else{
        if(noticia.tipo){foundNoticia.tipo=noticia.tipo}
        if(noticia.tituloCorto){foundNoticia.tituloCorto=noticia.tituloCorto}
        if(noticia.tituloLargo){foundNoticia.tituloLargo=noticia.tituloLargo}
        if(noticia.contenidoCorto){foundNoticia.contenidoCorto=noticia.contenidoCorto}
        if(noticia.contenidoLargo){foundNoticia.contenidoLargo=noticia.contenidoLargo}
        if(noticia.tags){foundNoticia.tags=noticia.tags}
        foundNoticia.fechaModificacion=new Date()
        const resultado=await foundNoticia.save()
            .then(()=>{
                return {
                    error:false,
                    message:"Actualizado con exito",
                    data:foundNoticia
                }
            })
            .catch((error)=>{
                return {
                    error:true,
                    message:"Error al actualizar",
                    data:error
                }
            })
        return resultado
    }
}
module.exports={
    add:addNoticia,
    list:getNoticias,
    update:updateNoticia,
    find:findNoticia,
    delete:deleteNoticia
}