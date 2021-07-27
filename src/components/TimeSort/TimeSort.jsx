import React, {} from 'react'
import "../../styles/TimeSort/TimeSort.scss"

export default function TimeSort ({year, nextYear, previousYear,}) {

	return(
		<div className="timeline timeline--middle-vertically">
			<button
				className="btn timeline__button__arrows shadow-none"
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
				className="btn timeline__button__arrows shadow-none"
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