import { Link } from 'react-router-dom'
import s from '../Cards/Cards.module.css'

const Card = ({ id, name, image, healthyScore, diets}) => {

    return (
    //    <div>estoy en cards</div> 
        <div className={s.grid}>

            <div className={s.conteiner}>

                <Link to={`/recipe/${id}`}>
                    <p className={s.name}>{name}</p>
                </Link>
                <img width={240} className={s.image} height={240} src={image} alt="" />
                <p className={s.score}>Score: {healthyScore}</p>
                 <p className={s.diets}>{diets}</p>
            </div>

        </div>
    )
}

export default Card