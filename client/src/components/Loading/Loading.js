import React from 'react'
import s from '../Loading/Loading.module.css'
const Loading = () => {
  return (
    <div className={s.letra}>
      <h4>Loading...</h4>
      <div className={s.loader}>
        <span></span>
      </div>
      <svg>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default Loading