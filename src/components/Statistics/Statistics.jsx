import React, { useState, useEffect } from 'react'
import "../../styles/Statistics/Statistics.scss"
import { Header, TimeSort, Chart } from "../index"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux";
import { SET_YEAR } from '../../redux/chart/chartActionType';

export default function Statistics(props) {
	const { header, } = props
	const currentYear = moment().format('YYYY');
	const [year, setYear] = useState(parseInt(currentYear))
	const dispatch = useDispatch();
	const { chart, } = useSelector(state => state)

	const handleTime = (year) => {
		dispatch({ type: SET_YEAR, payload: { input: year } })
	}

	useEffect(() => {
		setYear(prev => chart.year)
	}, [ chart.year ])

	return (
		<div className="stats">
			<div className="stats__header">
				<div className="stats__header--left-padding">
					<div className="stats__header__text">
						<Header main={header} flag={false} />
					</div>
					<div className="stats__header--middle-vertically">
						<TimeSort
							year={year}
							nextYear={() => handleTime(year + 1)}
							previousYear={() => handleTime(year - 1)}
						/>
					</div>
				</div>
			</div>
			<div className="stats__charts">
				<Chart className="stats__charts__design"/>
			</div>
		</div>
	)

}