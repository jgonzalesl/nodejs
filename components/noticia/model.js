const mongoose=require('mongoose')

const Schema=mongoose.Schema

const mySchema=new Schema({
    usuario:{
        type:Schema.Types.ObjectId,
        refer:'Usuario',
        required:true
    },
    fechaCreacion:{
        type:Date,
        required:true
    },
    fechaModificacion:{
        type:Date,
        required:false
    },
    tituloCorto:{
        type:String,
        required:true
    },
    tituloLargo:{
        type:String,
        required:true
    },
    contenidoCorto:{
        type:String,
        required:true
    },
    contenidoLargo:{
        type:String,
        required:true
    },
    tags:{
        type:Array,
        required:false
    },
    tipo:{
        type:String,
        required:true
    },
    imagen:{
        type:String,
        required:true
    },
})

const model=mongoose.model('Noticia',mySchema)
module.exports=model