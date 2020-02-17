const mongoose=require('mongoose')

const Schema=mongoose.Schema

const mySchema=new Schema({
    email:{
        type:String,
        required:true
    },
    usuario:{
        type:String,
        required:true
    },
    nombres:{
        type:String
    },
    apellidos:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    foto:{
        type:String,
        required:false
    }
})
const model=mongoose.model('Usuario',mySchema)
module.exports=model