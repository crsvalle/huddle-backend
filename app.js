const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json())

const rafflesController = require('./contollers/rafflesController.js')
app.use('/raffles',  rafflesController)

app.get('/', (req, res) => {
    res.status(200).json({data: "Server working!"})
})

app.get('*', (req, res) => {
    res.status(404).json({data: `path name ${req.url} does not exist`})
})

module.exports = app;