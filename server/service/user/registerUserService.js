const db = require('../../connection/index');

async function regiterUserService(params) {
    const response = await db.query(
        "INSERT INTO `user`(`phoneNumber`, `password`) VALUES ("+ params.phoneNumber +","+ params.password +")"
    );

    let message = 'Vui lòng đăng kí lại';

    if (response.affectedRows) {
        message = 'Chúc mừng đã đăng kí thành công.';
    }

    console.log(response, "123131")

    return { message };

}

module.exports = regiterUserService
