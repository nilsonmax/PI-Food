import React from 'react'
import { Link } from 'react-router-dom'
import s from '../LeadingPage/LeadingPage.module.css'
import platos from "../../images/nutricion.jpg"

const LeadingPage = () => {
  return (
    <div className={s.fondo}>

      <div className={s.column2}>
        <img className={s.img} src={platos} alt="" />
      </div>
      <div className={s.wrapper}>
        <div className={s.columns}>
          <div className={s.column}>
            <p className={s.p}>Good food choices are good investments.</p>
            <p className={s.p1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum amet leo.</p>
            <Link to="/home">
              <button className={`${s.box} ${s.rainbowButton} `} alt="login"></button>
            </Link>
          </div>
          {/* <div className={s.column}>
          </div> */}
          {/* <div className={s.column}> 
          <img className={s.img} src={platos} alt="" />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default LeadingPage