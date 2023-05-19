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

    return response;

}

module.exports = updateUserService