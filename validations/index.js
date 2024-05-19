const teams_fields = [
    'name',  'desc'
]

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
        return res.status(400).json({ error: `${id} is not a valid id` })
    }

    res.id = Number(id);
    next();
}

const validateFields = (req, res, next) => {
    const body = req.body;

    for (const field of teams_fields) {
        if (!body.hasOwnProperty(field)) {
            return res.status(400).json({
                error: `${field} is missing or wrong, received ${body[field]}`
            });
        }
    }

    for (const field in body) {
        if (!teams_fields.includes(field)) {
            return res.status(400).json({ error: `${field} is not allowed.` });
        }
    }

    for (const field in body) {
        if (typeof body[field] !== 'string') {
            return res.status(400).json({ error: `'${field}' field must be a string.` });
        }
        
        if (body[field].trim() === '' ) {
            return res.status(400).json({ error: `'${field}' field cannot be empty.` });
        }
    }

    next();
};

module.exports = {validateId, validateFields}