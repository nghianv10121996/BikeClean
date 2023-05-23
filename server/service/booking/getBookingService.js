const db = require('../../connection/index');

async function GetBookingService(body) {
    const response = await db.query(
        "SELECT * FROM `booking` WHERE `start` = ? AND `end` = ?",
        [body?.start, body?.end]
    );
    return response;
}

module.exports = GetBookingService