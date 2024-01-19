const {connection}=require('../utils/connection');

async function Drivers(req,response){
    const driver1Name=req.body.driver1Name;
    const driver2Name=req.body.driver2Name;
    const driver3Name=req.body.driver3Name;
    const driver1Nric=req.body.driver1Nric;
    const driver2Nric=req.body.driver2Nric;
    const driver3Nric=req.body.driver3Nric;
    const quotationId=req.body.id;

    data={
        driver1Name:driver1Name,
        driver2Name:driver2Name,
        driver3Name:driver3Name,
        driver1Nric:driver1Nric,
        driver2Nric:driver2Nric,
        driver3Nric:driver3Nric,
        insurerId:quotationId,
    }
    
    connection.query('INSERT INTO drivers SET ?',data,(err,res)=>{
        if(err) {
            console.log(err);
        }
        else{
            async function send(){
                response.status(200).json({message:"added"}); 
            }
            send();
        }
    })
}

module.exports={
    Drivers,
}
