const db = require('../../connection/index');

async function DeleteBookingService(params) {
    const response = await db.query(
        "UPDATE `booking` SET `status`='cancel' WHERE `userID` = ? AND `start`= ? AND `end` = ?",
        [params?.userID, params?.start, params?.end]
    );
    return response;
}

module.exports = DeleteBookingService