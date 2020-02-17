exports.responder=function(req,res,error,status,message,data){
    if(!error){
        res.status(status).send({
            status:true,
            msg:message,
            data:data
    
        })
    }
    else{
        res.status(status).send({
            status:false,
            msg:message,
            data:null
        })
    }
    
}