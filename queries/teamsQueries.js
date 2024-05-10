const db = require("../db/dbConfig");

const getAllTeams = async () => {
    return db.manyOrNone("SELECT * FROM teams")
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