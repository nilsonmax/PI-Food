import { useEffect, useState } from "react"
import { getRecipes } from "../../redux/action"
import { useDispatch, useSelector } from "react-redux"
import Card from "../Cards/Cards"
import s from "../Home/Home.module.css"
import Paginacion from '../Paginacion/Paginacion'
import Search from '../Search/Search'
import Options from '../Options/Options'
import Loading from '../Loading/Loading'
import NotFound from "../NotFound/NotFound"

const Home = () => {
    //efecto options para el navbar
    const [stickyClass, setStickyClass] = useState({})
    useEffect(() => {
        window.addEventListener('scroll', stickNavbar)
        return () => window.removeEventListener('scroll', stickNavbar)
    }, [])

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY
            // window height changed for the demo
            windowHeight > 300 ? setStickyClass(s.stickyNav) : setStickyClass(s.options)
        }
    }
    
    // para mostrar los recipes
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state.recipe)
    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    let [loading, setLoading] = useState(true);

    //paginacion
    const [currentPage, setCurrentPage] = useState(1)
    const [couPerPage] = useState(9)
    const indexlast = currentPage * couPerPage; // devuelve 9
    const indexFirst = indexlast - couPerPage; // 0
    const allpages = recipes.slice(indexFirst, indexlast)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    if (allpages.length > 0 && loading) {
        setLoading(false)
    }

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    const refres = (e) => {
        e.preventDefault()
        window.location.reload()
    }

    let estilo = {}
    estilo = stickyClass

    return (
        <>
            <div className={`${s.options} ${estilo}`}>
                <Options set={setCurrentPage} />

            </div>
            <div className={s.refres}>
                <button className={s.btn} onClick={refres}> <p className={s.na}>refresh</p>🍽</button>
              <div><Search /> </div> 

            </div>
            <Paginacion recipes={recipes.length}
                couPerPage={couPerPage}
                paginado={paginado} />
            <div className={s.flex}>

                {
                    allpages.length > 0 && !loading ? (

                        allpages?.map((r) => {
                            return (

                                <Card
                                    key={r.id}
                                    id={r.id}
                                    name={r.name}
                                    image={r.image}
                                    diets={r.type || r.Diets.map(e => e.name)}
                                    healthyScore={r.healthyScore}
                                />

                            )
                        })
                    ) : !allpages.length > 0 && loading ? (
                        <Loading />
                    ) : (
                        <NotFound />
                    )

                }

            </div>
            <Paginacion recipes={recipes.length}
                couPerPage={couPerPage}
                paginado={paginado} />
        </>
    )
}

export default Home