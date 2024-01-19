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

    let data={};

    if(insurer.length==1){
        data={
            regNo:regNo,
            postCode:postCode,
            name:name,
            nric:nric,
            email:email,
            phone:phone,
            insurer:insurer[0].value,
            dated:dateCreated,
            status:"Pending",
        }
    }
    else if(insurer.length==2){
        data={
            regNo:regNo,
            postCode:postCode,
            name:name,
            nric:nric,
            email:email,
            phone:phone,
            insurer:`${insurer[0].value},${insurer[1].value}`,
            dated:dateCreated,
            status:"Pending",
        }
    }
    
    connection.query('INSERT INTO quotation SET ?',data,(err,res)=>{
        if(err) {
            console.log(err);
        }
        else{
            async function send(){
                const responseData = await emailer.sendEmail(regNo,name,email);
                response.status(200).json({message:"added"}); 
            }
            send();
        }
    })
}

module.exports={
    Quotation,
}
