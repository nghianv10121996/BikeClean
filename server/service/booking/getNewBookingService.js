const db = require('../../connection/index');

async function GetNewBookingService(body) {
    const response = await db.query(
        "SELECT * FROM `booking` WHERE `status` = ? AND `start` BETWEEN ? AND ?",
        [body?.status, body.start, body.end]
    );
    return response;
}

module.exports = GetNewBookingService