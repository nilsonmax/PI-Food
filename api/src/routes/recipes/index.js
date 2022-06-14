const express = require('express')
const {getByName, getIdRecipe, postCreate, deleted} = require('../../controllers/Recipe.controllers')
const router = express.Router()

router.get('/',getByName)
router.get('/:id', getIdRecipe)
router.post('/create',postCreate)
router.delete('/delete/:id',deleted)

module.exports = router