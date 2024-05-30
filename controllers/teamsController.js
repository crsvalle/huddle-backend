const { Router } = require("express");

const { getAllTeams, getTeamsById, createTeam, updateTeam } = require("../queries/teamsQueries")
const { getUsersofTeam } = require("../queries/usersQueries")
const { validateId, validateFields } = require("../validations/index");

const teamsController = Router();

teamsController.get('/', async (request, response) => {
    try {
        const teams = await getAllTeams()
        if (teams[0]) {
            response.status(200).json({ data: teams })
        } else {
            response.status(404).json({ error: "No teams Available" })
        }
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
})

teamsController.get("/:id", validateId,
    async (request, response) => {
        try {
            const { id } = request.params;
            const team = await getTeamsById(id)
            if (team) {
                response.status(200).json({ data: team });
            } else {
                return response.status(404).json({ error: `id: ${id} is not found` })
            }
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    },
);

teamsController.post("/", validateFields, async (request, response) => {
    try {
        const team = request.body;
        const createdTeam = await createTeam(team);
        response.status(201).json({ data: createdTeam })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

teamsController.put('/:id', validateId, validateFields, async (request, response) => {
    try {
        const { id } = request.params;
        const editedTeam = await updateTeam(id, request.body)
        response.status(200).json({ data: editedTeam })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

teamsController.get("/:id/users", validateId, async (request, response) => {
    try {
        const { id } = request.params;
        const users = await getUsersofTeam(id);
        if (users.length > 0) {
            response.status(200).json({ data: users });
        } else {
            return response.status(404).json({ error: `No users found for team with id: ${id}` });
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

module.exports = teamsController