import React from 'react'
import {Link}from 'react-router-dom'
import s from '../LeadingPage/LeadingPage.module.css'
const LeadingPage = () => {
  return (
    <div className={s.fondo}>
       <div className={s.flex}>
        <Link to="/home">
            <button>
                <span className={s.box}>Bienvendido</span>
            </button>
            </Link>
       </div>
    </div>
  )
}

export default LeadingPage