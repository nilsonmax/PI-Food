const express = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recipes = require("./recipes/index.js")
const Diets = require("./diets/index.js")

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", Recipes)
router.use("/diets", Diets)

module.exports = router
