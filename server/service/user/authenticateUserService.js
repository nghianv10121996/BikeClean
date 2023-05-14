const db = require('../../connection/index');

async function authenticateUserService(params) {
    const response = await db.query(
        "SELECT * FROM `user` WHERE `phoneNumber`= "+params.phoneNumber+" AND `password`= "+ params.password +""
    );

    return response[0];

}

module.exports = authenticateUserService
