const store=require('./store')

function getFavoritos(usuario){
    return new Promise(async(resolve,reject)=>{
        const respuesta=await store.find(usuario.userId)
        .then((resultado)=>{
            
            return resultado
        })
        .catch((error)=>{
            console.error(error)
            return null
        })
        if(respuesta==null){
            reject('No se encontro favoritos')
        }else{
            resolve(respuesta)
        }
    })
}

function addFavorito(usuario,idNoticia){
    return new Promise(async(resolve,reject)=>{
        const favorito={
            usuario:usuario.userId,
            noticia:idNoticia
        }
        const respuesta=await store.add(favorito)
        if(respuesta==null){
            reject('Error al intentar guardar el favorito')
        }else{
            resolve(respuesta)
        }
    })
}

module.exports={
    getFavoritos,
    addFavorito
}