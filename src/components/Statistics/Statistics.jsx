import React from 'react'
import "../../styles/Statistics/Statistics.scss"
import { Header, TimeSort, Chart } from "../index"

export default function Statistics (props) {
	const { header, } = props
	return(
		<div className="stats">
			<div className="stats__header">
				<div className="stats__header--left-padding">
					<div className="stats__header__text">
						<Header main={header} flag={false}/>	
					</div>
					<div className="stats__header--middle-vertically stats__header__time-sort">
						<TimeSort/>
					</div>
				</div>
			</div>
			<div className="stats__charts">
			 	<Chart className="stats__charts__design"/>
			</div>
		</div>
	)

}