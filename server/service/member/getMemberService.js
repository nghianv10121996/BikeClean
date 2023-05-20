const db = require('../../connection/index');

async function getMemberService() {
    const response = await db.query(
        `SELECT * FROM user WHERE roles = "member"`,
    );
    return response;
}

module.exports = getMemberService