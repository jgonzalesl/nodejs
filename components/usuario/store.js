const Model=require('./model')

async function validateUsuario(usuario,password){
    const findUsuario=await Model.findOne({usuario:usuario,password:password}).catch(()=>null)
    return findUsuario
}
async function findUsuario(usuario,email){
    const findusuario=await Model.findOne({usuario:usuario})
    .catch(()=>{return 'Error'})
    if(findUsuario=='Error'){
        return 'Error inesperado'
    }else if(findUsuario!=null){
        return findUsuario
    }else {
        return null
    }
}
async function addUsuario(usuario){
    const myUsuario=new Model(usuario)
    const resultado=await myUsuario.save().catch((error)=>{return error.errors})
    return resultado
}

module.exports={
    validate:validateUsuario,
    add:addUsuario,
    find:findUsuario
}