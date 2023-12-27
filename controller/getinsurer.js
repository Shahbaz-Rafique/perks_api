const {connection}=require('../utils/connection');

async function getInsurer(req,response){    
    connection.query('SELECT * FROM  insurer',(err,res)=>{
        if(err) {
            console.log(err);
        }
        else{
            response.status(200).json({data:res}); 
        }
    })
}

module.exports={
    getInsurer,
}
