const db = require('../../connection/index');

async function deleUserService(userId) {
    const response = await db.query(
        `DELETE FROM user WHERE userID=${userId}`
    );

    return response;
}

module.exports = deleUserService
