const db = require('../../connection/index');

async function CreateBookingService(body, userID) {
    const response = await db.query(
        "INSERT INTO `booking`(`userID`, `start`, `end`, `title`, `status`, `options`, `price`) VALUES (?,?,?,?,?,?,?)",
        [userID, body?.start, body?.end, body?.title ,body?.status, body?.options, body?.price]
    );
    return response;
}

module.exports = CreateBookingService