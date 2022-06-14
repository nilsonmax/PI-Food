import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postCreate, types } from '../../redux/action'
import s from '../Create/Create.module.css'
const Create = () => {


    // Validates 
    const validate = () => {
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

        } else if (input.type.length === 0) {
            errors.type = "it has to be a different diet"
       
        } else if (!input.healthyScore) {
            errors.healthyScore = "required field"
       
        } else if (!input.image.includes("https")) {
            errors.image = 'Please insert an image type URL'
       
        } else if (!input.steps) {
            errors.steps = "required field"
        }
        return errors
    }

    // Validates 
    const dispatch = useDispatch()
    const diet = useSelector(state => state.typeDiets)

    let navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        summary: '',
        healthyScore: '',
        steps: '',
        image: '',
        dishTypes: '',
        type: []
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

        if (input.type.includes(e.target.value)) {
            return 'Diet Type exists'
        } else {
            setInput({
                ...input,
                type: [...input.type, e.target.value]
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
            type: input.type.filter(e => e !== el)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(input))
        const errorSave = validate(input)
        
        if (Object.values(errorSave).length === 0) {
            alert('The recipe is not created, fill in the required fields!')
        } else {
            dispatch(postCreate(input))
            alert("recipe created successfully")
            setInput({
                name: '',
                summary: '',
                healthyScore: '',
                steps: '',
                image: '',
                dishTypes: '',
                type: []
            })
            navigate('/home')
        }

    }

    useEffect(() => {
        dispatch(types())
    }, [dispatch])


    return (
        <div className={s.formulario}>

            <Link to="/home" className={s.linkB}>
                <span>back</span>
            </Link>

            <form action="" onSubmit={(e) => handleSubmit(e)} className={s.fondoform}>

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
                <div>
                    <input className={s.inputs}
                        type="number"
                        value={input.healthyScore}
                        name="healthyScore"
                        placeholder='0-100'
                        min="1"
                        max="100"
                        onChange={handleChange}
                    />

                    {
                        errors.healthyScore && (
                            <p className={s.error}>{errors.healthyScore}</p>
                        )
                    }
                </div>

                <label htmlFor="">Step by Step</label>
                <div>
                    <textarea className={s.textar} onChange={handleChange} type="text" name="steps" value={input.steps}>
                    </textarea>

                    {
                        errors.steps && (
                            <p className={s.error}>{errors.steps}</p>
                        )
                    }
                </div>

                <div className={s.op}>
                    <select onChange={handleSelect} className={s.selet}>
                        <option value={input.type} name="type">Diet..</option>

                        {
                            diet?.map(c => {
                                return (
                                    <option key={c.id} value={c.name}>{c.name}</option>
                                )
                            })
                        }
                    </select>

                    {
                        errors.type && (
                            <p className={s.error}>{errors.type}</p>
                        )
                    }
                </div>

                <button type='submit' className={s.bto} onSubmit={handleSubmit}>Crear</button>

            </form>

            <div className={s.xx}>
                {
                    input.type.map((el) => (
                        <div key={el} className={s.a}>
                            <span >{el}</span >
                            <button className={s.bt} onClick={() => handleDelete(el)}> x </button>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Create