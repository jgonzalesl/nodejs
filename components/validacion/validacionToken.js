const jwt=require('jsonwebtoken')

function validar(token){
    return new Promise((resolve,reject)=>{
        if(!token){
            reject('Es necesario el token de autenticación')
        }else{
            token = token.replace('Bearer ', '')
            jwt.verify(token, 'Secret Password', (err, userId)=> {
                if (err) {
                    reject('Token inválido')
                } else {
                    resolve(userId)
                }
            })
        }
    })
}

module.exports={validar}