const db = require('../../connection/index');

async function deleUserService(userId) {
    const response = await db.query(
        `DELETE FROM user WHERE userID=${userId}`
    );
    let message = 'Xoá tài khoản không thành công.';

    if (response.affectedRows) {
        message = 'Chúc mừng bạn đã xoá thành công.';
    }

    return { message };
}

module.exports = deleUserService
