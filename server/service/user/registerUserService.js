const db = require('../../connection/index');

async function regiterUserService(params) {
    const response = await db.query(
        "INSERT INTO `user`(`userName`,`phoneNumber`,`password`) VALUES (?,?,?)",
        [params.userName, params.phoneNumber, params.password]
    );

    let message = 'Vui lòng đăng kí lại';

    if (response.affectedRows) {
        message = 'Chúc mừng đã đăng kí thành công.';
    }
    return { message };

}

module.exports = regiterUserService
