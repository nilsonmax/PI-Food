import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getDetail } from '../../redux/action/index'
import s from '../RecipesDetails/RecipesDetails.module.css'
import Loading from '../Loading/Loading'

const RecipesDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const details = useSelector((state) => state.detail)
    console.log(details)

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    let [loading, setLoading] = useState(true)

    if (typeof details.name !== 'undefined' && loading) {
        // console.log('estoy en setLoading', loading)
        setLoading(false)
    } //  else {
    //      console.log(' no estoy en setLoading', loading)
    // }

    console.log(details.name)
    console.log(details.id)

    return (
        <>
            {
                typeof details.name !== 'undefined' && !loading ? (
                    // return (

                    <div className={s.contenedor}>

                        <div className={s.content}>
                            <Link to="/home"><span className={s.backButton}>Back </span></Link>

                            <div className={s.titlee}>
                                {details.name ? <h1>{details.name}</h1> : <h1>Recipe not Found</h1>}
                            </div>

                            <div className={s.sumary}>
                                <h4 >Summary:</h4>
                                <p >{details.summary ? details.summary.replace(/<[^>]*>/g, '') : "not found"}</p>

                            </div>
                            <div className={s.im}>
                                <img className={s.img} src={details.image ? details.image :
                                    'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'} alt="Pic not found" />
                            </div>
                            <section className={s.wrapper}>
                                <div className={s.columns}>
                                    <div className={s.column}>
                                        <h3 className={s.textFirst}>Diet Type:</h3>
                                        {details.createdInDb ? details.diets.map((e, i) => <h2 key={i} className={s.contentFirst}>{e.name}</h2>)
                                            : <h4 className={s.contentFirst}>{details.diets}</h4>
                                        }
                                    </div>

                                    <div className={s.column}>
                                        <h3 className={s.textFirst}>dish Types:</h3>
                                        <h3 className={s.contentFirst}>{details.dishTypes}</h3>
                                    </div>

                                    <div className={s.column}>
                                        <h3 className={s.textFirst}>Healthiness points:</h3>
                                        <h3 className={s.contentFirst}>{details.healthyScore}% </h3>
                                    </div>
                                </div>
                            </section>

                            <div className={s.column}>
                                <h4 className={s.textFirst}>Steps:</h4>
                                {Array.isArray(details.steps) ? details.steps.map(e => <li className={s.contentSecond} key={e.number}>{e.step}</li>)
                                    : <li className={s.contentSecond}>{details.steps}</li>
                                }
                            </div>
                        </div>

                    </div>

                ) : (!details.name !== 'undefined' && loading ? <Loading />:<Loading />)
 
            }

        </>)

}

export default RecipesDetail