const strftime = require('strftime');
const {connection}=require('../utils/connection');
const emailer=require('./sendEmail');

async function Quotation(req,response){
    const regNo=req.body.regNo;
    const postCode=req.body.postCode;
    const name=req.body.name;
    const nric=req.body.nric;
    const email=req.body.email;
    const phone=req.body.phone;
    const insurer=req.body.insurer;
    const now = new Date();
    const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now);

    const data={
        regNo:regNo,
        postCode:postCode,
        name:name,
        nric:nric,
        email:email,
        phone:phone,
        insurer:insurer,
        dated:dateCreated,
    }
    
    connection.query('INSERT INTO quotation SET ?',data,(err,res)=>{
        if(err) {
            console.log(err);
        }
        else{
            async function send(){
                const responseData = await emailer.sendEmail(regNo,name);
                response.status(200).json({message:"added"}); 
            }
            send();
        }
    })
}

module.exports={
    Quotation,
}
