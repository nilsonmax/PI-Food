const express = require('express')
const { getByName, getIdRecipe, postCreate} = require('../../controllers/Recipe.controllers')
const router = express.Router()

router.get('/', getByName)
router.get('/:id', getIdRecipe)
router.post('/create', postCreate)
//router.get('/db/db/', getDbMostrar)

module.exports = router