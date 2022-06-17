const axios = require("axios")
const { Diet } = require("../db")
const { API_KEY } = process.env

const getApìDiets = async () => {
    try {
        apiResp = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
        )
      
        const types = await apiResp.data.results.map((t) => t.diets)
        const diets = types.flat()
        const typeDiets = [...new Set(diets)]
        typeDiets.forEach(async (d) => {
            await Diet.findOrCreate({
                where: { name: d }
            })
       })

        // const allDiets = await Diet.findAll()
        // return allDiets
    
    } catch (error) {
        console.log(error)
    }
}

const dbDiets = async (req, res) => {
    try {
        // const d = await getApìDiets()
        await getApìDiets()
        const d = await Diet.findAll()
        res.send(d)

    } catch (error) {
        res.status(404).send({ msg: "error" })
    }
}

module.exports = {
    getApìDiets,
    dbDiets
};