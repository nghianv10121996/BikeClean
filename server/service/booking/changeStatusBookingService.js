const db = require('../../connection/index');

async function changeStatusBookingService(body, userID) {
    const response = await db.query(
        "UPDATE `booking` SET `status`=?, `employeeID`=?, `comments`=?, `labelComments`=? WHERE `bookingID` = ?",
        [body?.status, body?.employeeID, body?.comments, body?.labelComments, userID]
    );
    return response;
}

module.exports = changeStatusBookingService