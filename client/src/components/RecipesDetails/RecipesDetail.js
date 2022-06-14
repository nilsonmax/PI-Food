import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Link, useParams } from 'react-router-dom'
import { cleanData, getDetail, Remove } from '../../redux/action/index'
import s from '../RecipesDetails/RecipesDetails.module.css'
import { useNavigate } from 'react-router-dom'

const RecipesDetail = () => {
   const {id}=useParams()
    const dispatch = useDispatch()
 let navigate= useNavigate()
    const details = useSelector((state)=> state.detail)
    //  console.log(details)
    
    useEffect(() => {
      dispatch(getDetail(id))
     return dispatch(cleanData(id))
    }, [dispatch,id])

    let handle = (e) => {
    e.preventDefault(e)
    dispatch(Remove(id))
    alert("successfully deleted")
    navigate("/home")
        return dispatch(cleanData(id))
    }

  return (
    <div className={s.contenedor}>
          <Link to="/home"><span className={s.backButton}>Back </span></Link>
        
    <div className={s.carto}>
        
  
        <div className={s.titlee}>
            {details.name ? <h1>{details.name}</h1> : <h1>Recipe not Found</h1>}
        </div>

        

        <div className={s.flexi}>
                  {details.Diets ?<button className={s.crux} onClick={(e)=> handle(e)}>Remove</button> : ""}
                <div>
                    <img className={s.im} src={details.image ? details.image : 
                    'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'} alt="Pic not found"/>
                </div>

                <div className={s.diet}>
                    <h3 className={s.textsss}>Diet Type:</h3> 
                   
                    { details.Diets ? details.Diets.map((e,i) => <h2 key={i} className={s.dishesanddiets}>{e.name}</h2>)
                    : <h4 className={s.dishesanddiets}>{details.type}</h4>
                    
                    }
                    
                </div>

                <div className={s.dish}>
                    <h3 className={s.disty}>dish Types:</h3>
                    <h3 className={s.h}>{details.dishTypes}</h3>
                </div>
                
                <div className={s.dish}>
                    <h3 className={s.disty}>Healthiness points:</h3>
                    <h3 className={s.h}>{details.healthyScore} ✔</h3>
               </div>
        </div>


  

        <div className={s.sum}>
           
           <div className={s.sumar}>
            <h4 className={s.tebla} >Summary:</h4>
            <p className={s.sm}>{details.summary ? details.summary.replace(/<[^>]*>/g, '') : "not found"}</p>

           </div>
            <div className={s.stepp}>
                <h4  className={s.tebla}>Steps:</h4>
                { Array.isArray(details.steps) ? details.steps.map(e => <li className={s.are} key={e.number}>{e.step}</li>)
                        : <li className={s.ares}>{details.steps}</li>
                    }
            </div>
        </div>
    </div>

    
</div>
  )
}

export default RecipesDetail





// <h1 className={s.text}>{details.name}</h1>
//         <div className={s.details}>            
//             <div className={s.divimg}>
//                 <img className={s.detailImg} src={details.image ? details.image : 
//                 'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'} alt="Pic not found"/>
//             </div>


//             <div className={s.dietcontainer}>
//                 { <div className={s.ddsh}>
//                     <h3 className={s.textsss}><span>Diet Type: </span></h3> 
//                     { details.Diets ? details.Diets.map(e => <h2 className={s.dishesanddiets} key={e.id}>{e.name}</h2>)
//                     : <h4 className={s.dishesanddiets}>{details.type}</h4>
                   
//                     }
//                 </div> }
// {/* 
//                 <div>
//                     {details.Diets ? details.Diets.map(c=> c.name + (' ')) : <span>{details.type}</span>}
//                 </div>
//                  */}
                                
                            
//                 <br/>










//                 <div className={s.ddsh}>
//                     <h3 className={s.texts}>Summary: </h3>
//                     <p className={s.summary}>{details.summary?.replace(/<[^>]*>/g, '')}</p>
//                 </div>
//                 <br />
//                 <div className={s.ddshh}>
//                     <h3><span>dish Types:</span>{details.dishTypes}</h3>
//                     <br />
//                     <h3 className={s.scoress}><span>Score:</span> {details.score} ✔</h3> 
//                     <br/>
//                     <h3 className={s.scores}><span>Healthiness points:</span>{details.healhyScore} ✔</h3>
//                 </div>   
//             </div>
//         </div>

//         <div className={s.stepContainer}>
//             <h3><span>Steps:</span> </h3>
//             <ul className={s.steps}>
//                 { Array.isArray(details.steps) ? details.steps.map(e => <li key={e.number}>{e.step}</li>)
//                     : <li>{details.steps}</li>
//                 }
//             </ul>
//         </div>
        
//     </div> 