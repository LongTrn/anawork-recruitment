import React, { useState, useEffect, } from 'react'
import "../../styles/Chart/Chart.scss"
import { Bar, defaults } from "react-chartjs-2"
import { useDispatch, useSelector } from "react-redux";
import { FETCH_CHART_DATA } from "../../redux/chart/chartActionType"
import {chartConstant} from "../../constants/index"


defaults.font.family = "Roboto"
const {ORANGE_BAR, DODGER_BLUE_BAR} = chartConstant
export default function Chart ({  }) {

	const [state, setState] = useState({
		labels: ['Kế toán', ],
		datasets: [
			{
				barThickness: 16,
				barPercentage: 0.5,
				label: 'Cần Tuyển',
				data: [1,],
				backgroundColor: [
					ORANGE_BAR,
				],
				borderWidth: 1,
			},
			{
				barThickness: 16,
				barPercentage: 0.5,
				label: 'Đã Tuyển',
				data: [1, ],
				backgroundColor: [
					DODGER_BLUE_BAR,
				],
				borderWidth: 1,
			},
		],
	});
	const { year, data, labels } = useSelector(state => state.chart)
	const dispatch = useDispatch();

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			yAxes: {
				display: true,
				min: 0,
				max: 20,	
				ticks: {
					beginAtZero: true,
					reverse: false,
					stepSize: 10,
					maxTicksLimit: 10,
				},
			},
		},
		plugins: {

			title:{
				display: false,
				text: "Số lượng nhân viên cần tuyển / đã tuyển",
				fontSize:25,
			},
			legend:{
				display: true,
				position: 'bottom',
				labels: {
					fontColor: "#000"
				}
			},
		},
	}

	const fetchData = (year) => {
		dispatch({ type: FETCH_CHART_DATA, payload: { input: year }})
	}

	useEffect(() => {
		fetchData(year)
		// test()
	}, [ year ])
	useEffect(() => setState({ labels, datasets: data }), [ data, labels  ])

	return(
		<div className="chart">
			<div className="chart__table">
				<Bar
					data={state}
					options={options}
					// width={801}
					// height={100}
				/>
			</div>
		</div>
	)

}