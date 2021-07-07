import React from 'react'
import "../../styles/TimeSort/TimeSort.scss"

export default function TimeSort (props) {

	return(
		<div className="timeline timeline--middle-vertically">
			<img 
				alt="previousTime"
				src="img/chevron-left.svg"
				class="arrow__left"/>
			<span className="timeline__value">{2020}</span>
			<img 
				alt="forwardTime"
				src="img/chevron-left.svg"
				class="arrow__right"/>
		</div>
	)

}