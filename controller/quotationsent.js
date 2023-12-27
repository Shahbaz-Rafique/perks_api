const strftime = require('strftime');
const { connection } = require('../utils/connection');
const emailer = require('./secondEmail');

async function QuotationSent(req, response) {
    const id = req.body.id;
    const start = req.body.start;
    const end = req.body.end;
    const sixmonths = req.body.sixmonth;
    const twelvemonths = req.body.twelvemonths;
    const ncd = req.body.ncd;
    const now = new Date();
    const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now);

    const datas={
        coverageStart:start,
        coverageEnd:end,
        ncd:ncd,
        sixmonths:sixmonths,
        twlevemonths:twelvemonths,
        quotationId:id,
    }

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
                                async function send() {
                                    const responseData = await emailer.sendEmail(res[0].regNo,res[0].dated, res[0].name,res[0].Id);
                                    response.status(200).json({ message: 'added' });
                                }
                                send();
                            }
                        }
                    );
                }
            })
        }
    });
}

module.exports = {
    QuotationSent,
};
