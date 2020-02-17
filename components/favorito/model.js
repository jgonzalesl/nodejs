const mongoose=require('mongoose')

const Schema=mongoose.Schema

const mySchema=new Schema({
    usuario:{
        type:Schema.Types.ObjectId,
        refer:'Usuario'
    },
    noticia:{
        type:Schema.Types.ObjectId,
        refer:'Noticia',
    }
})
const model=mongoose.model('Favorito',mySchema)
module.exports=model