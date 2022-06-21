import { Link } from 'react-router-dom'
import s from '../Cards/Cards.module.css'

const Card = ({ id, name, image, healthyScore, diets }) => {

    return (
        //    <div>estoy en cards</div> 
        <div className={s.card}>
            <Link to={`/recipe/${id}`}>
                <div className={s.cardHeader}>
                    <img src={image} alt="" />
                </div>
                <div className={s.cardBody}>
                    <span className={`${s.tag} ${s.tagTeal}`}>Score: {healthyScore}% </span>
                    <h4 className={s.name}>{name}</h4>
                    <p>{diets}</p>
                </div>
            </Link>
        </div>
    )
}

export default Card