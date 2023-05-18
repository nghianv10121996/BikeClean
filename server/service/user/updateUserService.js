const db = require('../../connection/index');
const bcrypt = require('bcryptjs');

async function updateUserService(params, userID) {
    const {
        userName,
        password,
        numberOfBike,
        image
    } = params;
    const hashedPassword = await bcrypt.hash(password, 8);
    const response = await db.query(
        "UPDATE `user` SET `userName`=?,`password`=?,`numberOfBike`=?,`image`=? WHERE userID= " + userID + "",
        [userName, hashedPassword, numberOfBike, image]
    );

    let message = 'Cập nhật tài khoản thất bại';

    if (response.affectedRows) {
        message = 'Chúc mừng đã đã cập nhật tài khoản thành công.';
    }

    return {
        message
    };

}

module.exports = updateUserService