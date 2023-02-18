const db = require('../../connection/index');

async function getUserService(userID) {
    const response = await db.query(
        `SELECT * FROM user WHERE userID = ${userID}`
    );
    let message = 'Không tìm thấy tài khoản.';
    if (!!response[0]) {
        message = 'Lấy thông tin tài khoản thành công.';
    }

    return { message, data: response };
}

module.exports = getUserService
