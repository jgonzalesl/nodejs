const db=require('mongoose')
//mongodb+srv://db_user_noticias:561kfQj6EHDaOy1U@cluster0-vsaka.mongodb.net/BBDD
//mongodb+srv://<username>:<password>@cluster0-vsaka.mongodb.net/test?retryWrites=true&w=majority

//mongodb+srv://db_user_noticias:561kfQj6EHDaOy1U@cluster0-vsaka.mongodb.net/BBDD?retryWrites=true&w=majority
async function connect(url){
    db.Promise=global.Promise
    await db.connect(url,{
        useNewUrlParser:true,useUnifiedTopology: true
    })
    .then(()=>{
        console.log('db conectada')
    }).catch((error)=>{
        console.log(error)
    })
}

module.exports=connect