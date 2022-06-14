const axios = require('axios')
const { Diet, Recipe } = require("../db")
const { getApìDiets } = require('./Diets.controllers')
const { API_KEY } = process.env

// const { Router } = require('express')
// const router = Router()

const getApiInfo = async () => {
    try {
        apiResp = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
        )

        const apiJson = apiResp.data.results.map((recipes) => {
            return {
                id: recipes.id.toString(),
                image: recipes.image,
                name: recipes.title.toLowerCase(),
                type: recipes.diets,
                summary: recipes.summary,
                healthyScore: recipes.healthScore,
                dishTypes: recipes.dishTypes,
                steps: recipes.analyzedInstructions[0]?.steps.map((s) => {
                    return {
                        number: s.number,
                        step: s.step
                    }
                })
            }
        })
        return apiJson

    } catch (error) {
        console.log(error)
    }
}

const getDbInfo = async () => {
    const dietFindAll = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"]
        }
    })
    return dietFindAll
}

const getAllRecipes = async () => {
    const api = await getApiInfo()
    const db = await getDbInfo()
    const all = api.concat(db)
    return all
}

const getByName = async (req, res) => {
    try {
        const { name } = req.query

        const recipe = await getAllRecipes()
        if (name) {
            const fil = recipe.filter(r =>
                r.name.toLowerCase().includes(name.toLowerCase())
            )
            fil.length ? res.send(fil) : res.status(404).send({ msg: "not found" })
        } else {
            return res.send(recipe)
        }
    } catch (error) {
        console.log(error)
    }
}

const getIdRecipe = async (req, res) => {
    try {
        const { id } = req.params
        const filId = await getAllRecipes(id)
        if (id) {
            const busqueda = filId.filter((el) => el.id === id)

            busqueda.length
                ? res.send(busqueda)
                : res.send({ msg: "error does not exist" })
        } else {
            res.send({ msg: "Should enter a valid ID" })
        }
    } catch (error) {
        res.status(404).send({ msg: "Should enter a valid ID" })
    }
}

const postCreate = async (req, res) => {
    const { name, summary, healthyScore, steps, type, image, dishTypes } = req.body
    try {
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthyScore,
            steps,
            image,
            dishTypes,
            type
        })
        await getApìDiets()
        const getDiet = await Diet.findAll({
            where: { name: type }
        })
        await newRecipe.addDiet(getDiet)
     
        return res.status(200).send({ msg: "successfully created" })
    } catch (error) {
        console.log(error)
    }
}


const deleted = async (req, res) => {
    let { id } = req.params
    await Recipe.destroy({
        where: {
            id: id
        }
    }).then(count => {
        if (!count) {
            return res.status(404).send({ error: 'No user' })
        }
        res.status(204).send()
    })
}

module.exports = {
    getApiInfo,
    getDbInfo,
    getIdRecipe,
    getByName,
    postCreate,
    deleted
}

// {
//  "name":"prueba name",
//  "summary":"prueba summ",
//  "healthyScore":100,
//  "steps":"prueba steps",
//  "type":"prueba lacto ovo vegetarian",
//  "image":"prueba image",
//  "dishTypes":"prueba"
// }