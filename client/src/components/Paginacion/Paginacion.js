import React from 'react'
import s from '../Paginacion/Paginacion.module.css'

const Paginacion = ({ recipes, couPerPage, paginado }) => {
	const pageNumber = []

	for (let i = 1; i <= Math.ceil(recipes / couPerPage); i++) {
		pageNumber.push(i)
	}

	return (
		<nav className={s.nave} >
			<ul>
				{pageNumber &&
					pageNumber.map((n) => (
						<li key={n}>
							<span onClick={() => paginado(n)}>{n}</span>
						</li>
					))}
			</ul>
		</nav>
	)
}

export default Paginacion