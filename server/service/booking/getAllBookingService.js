const db = require('../../connection/index');

async function GetAllBookingService(body) {
    const query = !Boolean(body?.isAll) ?
        "SELECT * FROM `booking` WHERE NOT `status` = 'cancel' AND `start` BETWEEN ? AND ?"
            : "SELECT * FROM `booking` WHERE `start` BETWEEN ? AND ?"
    const response = await db.query(
        query,
        [body?.start, body?.end]
    );
    return response;
}

module.exports = GetAllBookingService