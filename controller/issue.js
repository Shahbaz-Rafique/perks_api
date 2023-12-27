const strftime = require('strftime');
const { connection } = require('../utils/connection');
const emailer = require('./thirdEmail');

async function Issue(req, response) {
    const id = req.query.id;
    const now = new Date();
    const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now);

    connection.query(`SELECT * FROM quotation WHERE Id=${id}`, (err, res) => {
        if (err) {
            console.log(err);
            response.status(500).json({ message: 'Error retrieving data' });
        } else {
            connection.query(
                `UPDATE quotation SET coverDate='${dateCreated}', status='Completed' WHERE Id=${id}`,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        response.status(500).json({ message: 'Error updating data' });
                    } else {
                        async function send() {
                            const responseData = await emailer.sendEmail(res[0].regNo, res[0].name);
                            response.status(200).json({ message: 'added' });
                        }
                        send();
                    }
                }
            );
        }
    });
}

module.exports = {
    Issue,
};
