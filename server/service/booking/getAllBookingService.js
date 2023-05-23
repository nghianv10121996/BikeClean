const db = require('../../connection/index');

async function GetAllBookingService(body) {
    const response = await db.query(
        "SELECT * FROM `booking` WHERE `start` BETWEEN ? AND ?",
        [body?.start, body?.end]
    );
    return response;
}

module.exports = GetAllBookingService