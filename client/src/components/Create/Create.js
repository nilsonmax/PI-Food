import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postCreate, types } from '../../redux/action'
import s from '../Create/Create.module.css'
import imgFondo from '../../images/bgheading02.jpg'
const Create = () => {


    // Validates 
    const validate = (input) => {
        let errors = {}

        if (input.name === "") {
            errors.name = "Name required!"

        } else if (input.name.length < 3) {
            errors.name = 'Minimum 3 letters'

        } else if (!input.summary) {
            errors.summary = "summary must be complete"

        } else if (input.summary.length < 20) {
            errors.summary = 'Minimum 20 letters'

        } else if (input.healthyScore < 0 || input.healthyScore > 100) {
            errors.healthyScore = 'Maximum up to 100'

        } else if (input.dishTypes === "") {
            errors.dishTypes = "required field"

        } else if (input.diets.length === 0) {
            errors.diets = "it has to be a different diet"

        } else if (!input.healthyScore) {
            errors.healthyScore = "required field"

        } else if (!input.image.includes("https")) {
            errors.image = 'Please insert an image type URL https'

        } else if (input.steps === "") {
            errors.steps = "required field"
        }
        return errors
    }

    // Validates 
    const dispatch = useDispatch()
    const diet = useSelector(state => state.typeDiets)

    let navigate = useNavigate()
    const [errors, setErrors] = useState({
        name: 'name required'
    })
    const [input, setInput] = useState({
        name: '',
        summary: '',
        healthyScore: '',
        steps: '',
        image: '',
        dishTypes: '',
        diets: []
    })

    const handleChange = (e) => {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.value]: e.target.value
        }))
    }

    const handleSelect = (e) => {

        if (input.diets.includes(e.target.value)) {
            return 'Diet Type exists'
        } else {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }

        setErrors(validate({
            ...input,
            [e.target.value]: e.target.value
        }))
    }


    const handleDelete = (el) => {
        setInput({
            ...input,
            diets: input.diets.filter(e => e !== el)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postCreate(input))
        alert("recipe created successfully")
        setInput({
            name: '',
            summary: '',
            healthyScore: '',
            steps: '',
            image: '',
            dishTypes: '',
            diets: []
        })
        navigate('/home')
    }

    useEffect(() => {
        dispatch(types())
    }, [dispatch])


    return (
        // <div className={s.fondo}>
        <div className={s.formulario}>
            <div className={s.forma}>
                <div className={s.cardHeader}>
                    <img src={imgFondo} alt="" />
                </div>
                <Link to="/home" className={s.buttonBack}>
                    <span>back</span>
                </Link>
        <div className={s.title}><h2 >CREATE RECIPE</h2></div>
               
                <form action="" onSubmit={(e) => handleSubmit(e)} className={s.fondoform}>
                
                    <label htmlFor="">name</label>
                    <div>
                        <input className={s.inputt}
                            type="text"
                            value={input.name}
                            name='name'
                            onChange={handleChange}
                        />

                        {
                            errors.name && (
                                <p className={s.error}>{errors.name}</p>
                               
                            )
                        }
                    </div>
                    
                    <label htmlFor="">URL Img</label>
                    <div>
                        <input className={s.inputt}
                            type="text"
                            value={input.image}
                            name='image'
                            onChange={handleChange}
                        />

                        {
                            errors.image && (
                                <p className={s.error}>{errors.image}</p>
                            )
                        }
                    </div>


                    <label htmlFor="">summary</label>
                    <div>
                        <input className={s.inputt}
                            type="text"
                            value={input.summary}
                            name="summary"
                            onChange={handleChange}
                        />

                        {
                            errors.summary && (
                                <p className={s.error}>{errors.summary}</p>
                            )
                        }
                    </div>

                    <label htmlFor="">dishTypes</label>
                    <div>
                        <input className={s.inputt}
                            type="text"
                            value={input.dishTypes}
                            name="dishTypes"
                            onChange={handleChange}
                        />

                        {
                            errors.dishTypes && (
                                <p className={s.error}>{errors.dishTypes}</p>
                            )
                        }
                    </div>

                    <label htmlFor="">HealthyScore</label>
                    <div className={s.subContainer}>
                        <input className={s.subinput}
                            type="range" min="1" max="100"
                            value={input.healthyScore}
                            name="healthyScore"
                            onChange={handleChange}
                        />

                        {
                            errors.healthyScore && (
                                <p className={s.error}>{errors.healthyScore}</p>
                            )
                        }
                    <label htmlFor="">{`Point: ${input.healthyScore ? input.healthyScore : 0}%`}</label>
                    </div>
                   
                    <label htmlFor="">Step by Step</label>
                    <div>
                        <textarea className={s.inputt} onChange={handleChange} type="text" name="steps" value={input.steps}>
                        </textarea>

                        {
                            errors.steps && (
                                <div><p className={s.error}>{errors.steps}</p></div>
                            )
                        }
                    </div>

                    <div>
                        <select onChange={handleSelect}>
                            <option value={input.diets} name="diets">Diet..</option>

                            {
                                diet?.map(c => {
                                    return (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    )
                                })
                            }
                        </select>

                        {
                            errors.diets && (
                                <p className={s.error}>{errors.diets}</p>
                            )
                        }
                    </div>

                    <button type='submit' className={s.bto} onSubmit={handleSubmit} disabled={Object.keys(errors).length === 0 ? false : true}>Crear</button>

                </form>

                <div className={s.cajaDieta}>

                    {
                        input.diets.map((el) => (
                            <div key={el} className={`${s.space} ${s.tagTeal}`}>
                                <button className={s.bt} onClick={() => handleDelete(el)}> x </button>
                                <span className={s.letraSpace}>{el}</span >
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Create