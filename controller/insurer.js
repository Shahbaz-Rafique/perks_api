const {connection}=require('../utils/connection');

async function Insuere(req,response){
    console.log(req.body);
    const name=req.body.name;
    const bncd=req.body.bncd;
    const ancd=req.body.ancd;
    const windscreen=req.body.windscreen;
    const alldriver=req.body.alldriver;
    const stampduty=req.body.stampduty;
    const addon=req.body.addon;
    const sst=req.body.sst;
    const id=req.body.id;
    const file=req.file.filename;

    const data={
        name:name,
        bncd:bncd,
        ancd:ancd,
        windscreen:windscreen,
        alldriver:alldriver,
        stampduty:stampduty,
        addon:addon,
        sst:sst,
        file:file,
        quotationid:id,
    };
    
    connection.query('INSERT INTO insurer SET ?',data,(err,res)=>{
        if(err) {
            console.log(err);
        }
        else{
            response.redirect('http://127.0.0.1:5500/insurer.html')
        }
    })
}

module.exports={
    Insuere,
}
