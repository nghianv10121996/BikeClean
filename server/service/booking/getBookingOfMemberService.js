const db = require('../../connection/index');

async function GetBookingOfMemberService(body) {
    const response = await db.query(
        "SELECT * FROM `booking` WHERE `employeeID` = ? AND `start` BETWEEN ? AND ? AND `status` = ?",
        [body?.employeeID, body?.start, body?.end, body?.status]
    );
    return response;
}

module.exports = GetBookingOfMemberService