const {connection}=require('../utils/connection');

async function getQuotations(req,response){    
    connection.query('SELECT * FROM  quotation',(err,res)=>{
        if(err) {
            console.log(err);
        }
        else{
            async function send(){
                response.status(200).json({data:res}); 
            }
            send();
        }
    })
}

module.exports={
    getQuotations,
}
