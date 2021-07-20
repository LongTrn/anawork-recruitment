import React, { useEffect, } from 'react'
import "../../styles/TimeSort/TimeSort.scss"
import { useSelector } from "react-redux";

export default function TimeSort ({year, nextYear, previousYear,}) {

	// const { year, } = useSelector(state => state.chart)

	// useEffect(() => {}, [ year ])
	return(
		<div className="timeline timeline--middle-vertically">
			<button
				className="btn timeline__button__arrows"
				onClick={previousYear}
				>
				<img 
					alt="previousTime"
					src="img/chevron-left.svg"
					className="arrow__left"
					/>
			</button>
			<span className="timeline__value">{year}</span>
			<button
				className="btn timeline__button__arrows"
				onClick={nextYear}
			>
				<img 
					alt="forwardTime"
					src="img/chevron-left.svg"
					className="arrow__right"
					/>
			</button>
		</div>
	)

}