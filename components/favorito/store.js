const Model=require('./model')

async function addFavorito(favorito){
    const myFavorito=new Model(favorito)
    const resultado=await myFavorito.save()
    .catch((error)=>{
        console.error(error)
        return null
    })
    return resultado
}

async function findFavoritos(userId){
    return new Promise(async(resolve,reject)=>{
        await Model.find({usuario:userId})
                                .populate({path:'noticia',model:'Noticia'})
                                .exec(async(error,populated)=>{
                                                if(error){
                                                    console.error(error)
                                                    reject( null)
                                                }else{
                                                    resolve( populated)
                                                }
                                            })
    })
}

module.exports={
    find:findFavoritos,
    add:addFavorito
}