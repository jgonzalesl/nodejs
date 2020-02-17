const express=require('express')
const bodyParser=require('body-parser')
const db=require('./db')
const cors=require('cors')

// const router=require('./components/noticia/network')
const router=require('./network/routes')
db('mongodb+srv://db_user_noticias:561kfQj6EHDaOy1U@cluster0-vsaka.mongodb.net/BBDD?retryWrites=true&w=majority')

var app=express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
// app.use(router)
router(app)

app.listen(3000)
console.log('servidor corriendo')