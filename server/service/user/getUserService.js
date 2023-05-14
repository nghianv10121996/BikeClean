const db = require('../../connection/index');

async function getUserService(phoneNumber) {
    const response = await db.query(
        `SELECT * FROM user WHERE phoneNumber = ${phoneNumber}`
    );
    return response[0];
}

module.exports = getUserService
