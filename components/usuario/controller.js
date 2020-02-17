const store=require('./store')

function validateUsuario(usuario,password){
    return new Promise(async(resolve,reject)=>{
        const respuesta=await store.validate(usuario,password)
        if(respuesta){
            resolve(respuesta)
        }else{
            console.error(respuesta)
            reject('Credenciales incorrectas')
        }
    })
}
function addUsuario(usuario){
    return new Promise(async(resolve,reject)=>{
        const respuesta=await store.add(usuario)
        if(respuesta){
            resolve(respuesta)
        }else{
            console.error(respuesta)
            reject('Error al intentar agregar el usuario')
        }
    })
}
module.exports={
    validateUsuario,
    addUsuario
}