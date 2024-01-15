const {connection}=require('../utils/connection');

async function getDetailComp(req,response){    
    connection.query(`SELECT * FROM  quotationDetails WHERE quotationId=${req.query.id}`,(err,res)=>{
        if(err) {
            console.log(err);
        }
        else{
            connection.query(`SELECT * from insurer WHERE quotationId=${req.query.id}`,(err,resu)=>{
                if(err) throw err;
                else{
                    response.status(200).json({data:res,datas:resu}); 
                }
            })
        }
    })
}

module.exports={
    getDetailComp,
}
