const db = require("../db/dbConfig");

const getAllTeams = async () => {
    return db.manyOrNone(`
        SELECT 
        teams.*,
        json_build_object(
            'id', owners.id,
            'first_name', owners.first_name,
            'last_name', owners.last_name,
            'email', owners.email) 
        AS owner,
        COUNT(user_teams.user_id) AS total_members,
        array_agg(user_teams.user_id) AS member_ids
        FROM teams
        JOIN users AS owners ON teams.owner_id = owners.id
        JOIN user_teams ON teams.id = user_teams.team_id
        GROUP BY teams.id, owners.id
        ORDER BY teams.id DESC;
`)
}

const getTeamsById = async (id) => {
    return db.oneOrNone("SELECT * FROM teams WHERE id = $1", [id]);
};

const createTeam = async (team) => {
    const { ownerId, name, desc } = team;
    return db.oneOrNone(`
        INSERT INTO teams (ownerId, name, desc, created_at)
        VALUES ($1, $2, $3,CURRENT_TIMESTAMP)
        RETURNING *;
        `,
        [ownerId, name, desc]
    );
}

const updateTeam = async (id, team) => {
    const { name, desc } = team;
    return db.oneOrNone(`
        UPDATE teams SET name = $2, desc = $3
        WHERE id = $1
        RETURNING *;
        `,
        [id, name, desc]
    )
}

const deleteTeam = async (id) => {
    return db.oneOrNone("DELETE FROM teams WHERE id = $1 RETURNING *;", [id]);
};

module.exports = {
    getAllTeams,
    getTeamsById,
    createTeam,
    updateTeam,
    deleteTeam
};