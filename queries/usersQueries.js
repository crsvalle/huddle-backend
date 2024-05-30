const db = require("../db/dbConfig");

const getUsersofTeam = async (teamId) => {
    return db.any(`
        SELECT u.*, ut.joined_at
        FROM users u
        INNER JOIN user_teams ut ON u.id = ut.user_id
        WHERE ut.team_id = $1
    `, [teamId]);
}

module.exports = {
    getUsersofTeam
};