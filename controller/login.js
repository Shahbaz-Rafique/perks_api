const {connection}=require('../utils/connection');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


function GenerateToken(user) {
    const payload = {
        id: user.Id,
    };
    const token = jwt.sign(payload, 'kjdhfjkdhfjksdhfjkahfjky3ur6783ryaujasgdjhasgd');
    return token;
}

async function Login(req,response){
    const email=req.body.email;
    const password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    
    connection.query(`SELECT * FROM admin WHERE email='${email}' and password='${password}'`,(err,res)=>{
        if(err) {
            console.log(err);
        }
        else{
            if(res.length>0){
                var token = GenerateToken(res);
                return response.status(200).json({
                    message: 'success',
                    email: email,
                    userid: res[0].Id,
                    token: token,
                });
            }
        }
    })
}

module.exports={
    Login,
}
