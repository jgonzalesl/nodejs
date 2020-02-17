const express=require('express')
const noticia=require('../components/noticia/network')
const usuario=require('../components/usuario/network')
const favorito=require('../components/favorito/network')

const routes=(server)=>{
    server.use('/noticia',noticia)
    server.use('/usuario',usuario)
    server.use('/favorito',favorito)
}

module.exports=routes