const db = require('../../connection/index');

async function changeStatusBookingService(body, userID) {
    const response = await db.query(
        "UPDATE `booking` SET `status`=?, `employeeID`=? WHERE `bookingID` = ?",
        [body?.status, body?.employeeID, userID]
    );
    return response;
}

module.exports = changeStatusBookingService