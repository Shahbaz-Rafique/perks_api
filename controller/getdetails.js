const {connection}=require('../utils/connection');

async function getDetails(req,response){    
    connection.query('SELECT * FROM  quotationDetails',(err,res)=>{
        if(err) {
            console.log(err);
        }
        else{
            response.status(200).json({data:res}); 
        }
    })
}

module.exports={
    getDetails,
}
