const strftime = require('strftime');
const { connection } = require('../utils/connection');
const emailer = require('./secondEmail');

async function QuotationSent(req, response) {
    const insurerCount=req.query.count;
    // Quotation Details
    const id = req.body.id;
    const start = req.body.start;
    const end = req.body.end;
    const sixmonths = req.body.sixmonths;
    const twelvemonths = req.body.twelvemonths;
    const ncd = req.body.ncd;
    const now = new Date();
    const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now);

    // Insurer 1
    const name=req.body.name;
    const bncd=req.body.bncd;
    const ancd=req.body.ancd;
    const windscreen=req.body.windscreen;
    const alldriver=req.body.alldriver;
    const stampduty=req.body.stampduty;
    const addon=req.body.addon;
    const sst=req.body.sst;

    // Insurer 2
    const name1=req.body.name1;
    const bncd1=req.body.bncd1;
    const ancd1=req.body.ancd1;
    const windscreen1=req.body.windscreen1;
    const alldriver1=req.body.alldriver1;
    const stampduty1=req.body.stampduty1;
    const addon1=req.body.addon1;
    const sst1=req.body.sst1;

    const datas={
        coverageStart:start,
        coverageEnd:end,
        ncd:ncd,
        sixmonths:sixmonths,
        twlevemonths:twelvemonths,
        quotationId:id,
    }

    const data={
        name:name,
        bncd:bncd,
        ancd:ancd,
        windscreen:windscreen,
        alldriver:alldriver,
        stampduty:stampduty,
        addon:addon,
        sst:sst,
        file: req.files.file[0].originalname,
        quotationid:id,
    };

    const second={
        name:name1,
        bncd:bncd1,
        ancd:ancd1,
        windscreen:windscreen1,
        alldriver:alldriver1,
        stampduty:stampduty1,
        addon:addon1,
        sst:sst1,
        file:req.files.file1?.[0]?.originalname || null,
        quotationid:id,
    };
    
    connection.query('INSERT INTO insurer SET ?',data,(err,res)=>{
        if(err) {
            console.log(err);
        }
        else{
            connection.query(`SELECT * FROM quotation WHERE Id=${id}`, (err, res) => {
                if (err) {
                    console.log(err);
                    response.status(500).json({ message: 'Error retrieving data' });
                } else {
                    connection.query('INSERT INTO quotationDetails SET ?',datas,(err,resu)=>{
                        if(err) throw err;
                        else{
                            connection.query(
                                `UPDATE quotation SET quotationSent='${dateCreated}', status='Submitted' WHERE Id=${id}`,
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        response.status(500).json({ message: 'Error updating data' });
                                    } else {
                                        if(insurerCount==2){
                                            connection.query(`INSERT INTO insurer SET ?`,second,(err, resl)=>{
                                                if(err) throw err;
                                                else{
                                                    send();
                                                }
                                            })
                                        }
                                        else{
                                            send();
                                        }
                                        async function send() {
                                            const responseData = await emailer.sendEmail(res[0].regNo,res[0].dated, res[0].name,res[0].Id);
                                            response.redirect('http://127.0.0.1:5500/insurer.html')
                                        }
                                        
                                    }
                                }
                            );
                        }
                    })
                }
            });
        }
    })

    
}

module.exports = {
    QuotationSent,
};
