const express = require('express')
const { dbDiets } = require('../../controllers/Diets.controllers')
const router = express.Router()

router.get('/', dbDiets)

module.exports = router