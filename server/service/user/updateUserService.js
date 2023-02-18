const db = require('../../connection/index');

async function updateUserService(params) {
    const { userID, phoneNumber, password } = params;
    const response = await db.query(
        "UPDATE `user` SET `userID`=" + userID + ",`phoneNumber`=" + phoneNumber + ",`password`="+ password +" WHERE `userID` = " + userID + ""
    );

    let message = 'Cập nhật tài khoản thất bại';

    if (response.affectedRows) {
        message = 'Chúc mừng đã đã cập nhật tài khoản thành công.';
    }

    return { message };

}

module.exports = updateUserService
