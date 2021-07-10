import React, { useState, useEffect } from 'react'
import "../../styles/Statistics/Statistics.scss"
import { Header, TimeSort, Chart } from "../index"
import moment from "moment"

export default function Statistics (props) {
	const { header, } = props
	const currentYear = moment().format('YYYY');   
	const [year, setYear] = useState(parseInt(currentYear))

	const previousYear = () => setYear(prev => year - 1)
	const nextYear = () => setYear(prev => year + 1)
	return(
		<div className="stats">
			<div className="stats__header">
				<div className="stats__header--left-padding">
					<div className="stats__header__text">
						<Header main={header} flag={false}/>	
					</div>
					<div className="stats__header--middle-vertically">
						<TimeSort 
							year={year} 
							nextYear={nextYear}
							previousYear={previousYear}
						/>
					</div>
				</div>
			</div>
			<div className="stats__charts">
			 	<Chart className="stats__charts__design" year={year}/>
			</div>
		</div>
	)

}