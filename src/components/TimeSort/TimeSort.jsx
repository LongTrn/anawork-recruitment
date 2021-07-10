import React from 'react'
import "../../styles/TimeSort/TimeSort.scss"

export default function TimeSort ({year, nextYear, previousYear,}) {

	return(
		<div className="timeline timeline--middle-vertically">
			<img 
				alt="previousTime"
				src="img/chevron-left.svg"
				className="arrow__left"
				onClick={previousYear}/>
			<span className="timeline__value">{year}</span>
			<img 
				alt="forwardTime"
				src="img/chevron-left.svg"
				className="arrow__right"
				onClick={nextYear}/>
		</div>
	)

}