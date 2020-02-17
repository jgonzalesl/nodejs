const store=require('./store')

function addNoticia(usuario,noticia){
    return new Promise(async(resolve,reject)=>{
        if(!noticia.tituloCorto || noticia.tituloCorto==''){
            reject('El campo titulo corto es requerido')
        }else if(!noticia.tituloLargo || noticia.tituloLargo==''){
            reject('El campo titulo largo es requerido')
        }else if(!noticia.contenidoCorto || noticia.contenidoCorto==''){
            reject('El campo contenido corto es requerido')
        }else if(!noticia.contenidoLargo || noticia.contenidoLargo==''){
            reject('El campo contenido largo es requerido')
        }else if(!noticia.tipo || noticia.tipo==''){
            reject('El campo tipo es requerido')
        }else if(!noticia.imagen || noticia.imagen==''){
            reject('El campo imagen es requerido')
        }else if(!usuario){
            reject('Usuario no valido')
        }else{
            const noticiaModelo={
                usuario:usuario.userId,
                fechaCreacion:new Date(),
                tipo:noticia.tipo,
                tituloCorto:noticia.tituloCorto,
                tituloLargo:noticia.tituloLargo,
                contenidoCorto:noticia.contenidoCorto,
                contenidoLargo:noticia.contenidoLargo,
                imagen:noticia.imagen,
                tags:noticia.tags
            }
            const respuesta=await store.add(noticiaModelo)
            if(respuesta!=null)
            {
                resolve(respuesta)
            }else{
                reject('Error inespererado al intentar guardar')
            }
            
        }
        
    })
}
function getNoticia(id){
    return new Promise(async(resolve,reject)=>{
        const respuesta=await store.find(id)
        if (respuesta!=null){
            const noticia={
                id:respuesta._id,
                titulo:respuesta.tituloLargo,
                contenido:respuesta.contenidoLargo,
                fecha:respuesta.fechaCreacion,
                nombres:respuesta.usuario.nombres,
                apellidos:respuesta.usuario.apellidos,
                foto:respuesta.usuario.foto
            }
            resolve(noticia)
        }else{
            reject('Error inesperado al intentar obtener la noticia')
        }
    })
}
function getNoticias(){
    return new Promise(async(resolve,reject)=>{
        const respuesta=await store.list()
        if(respuesta!=null){
            var listaNoticias=[]
            for (let index = 0; index < respuesta.length; index++) {
                const element = respuesta[index];
                listaNoticias.push({
                    id:element._id,
                    fecha:element.fechaCreacion,
                    imagenURL:element.imagen,
                    titulo:element.tituloCorto,
                    contenido:element.contenidoCorto,
                    comentarios:4//calcular de otro component
                })
            }
            resolve(listaNoticias)
        }else{
            reject('Error inesperado al intentar obtener las noticias')
        }
    })
}
function updateNoticia(id,noticia){
    return new Promise(async(resolve,reject)=>{
        if(!id || !noticia)
        {
            reject('Datos invalidos')
        }else{
            const resultado=await store.update(id,noticia)
            if(!resultado.error){
                resolve(resultado.data)
            }else{
                console.error(resultado)
                reject(resultado.message)
            }
        }
        
    })
}
function deleteNoticia(id){
    return new Promise(async(resolve,reject)=>{
        if(!id){
            reject('Datos invalidos')
        }else{
            const resultado=await store.delete(id)
            if (resultado!=null){
                resolve('Procesado')
            }else{
                reject('Error al intentar eliminar')
            }
        }
    })
}
module.exports	={
    addNoticia,
    getNoticias,
    updateNoticia,
    getNoticia,
    deleteNoticia
}