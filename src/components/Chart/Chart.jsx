import React, { useState, useEffect, } from 'react'
import "../../styles/Chart/Chart.scss"
import { Bar, defaults } from "react-chartjs-2"
import {axios} from "../../config/index"

defaults.font.family = "Roboto"
const orangeBar = "#ffa12d";
const dodgerBlueBar = "#1399fb";

export default function Chart ({year}) {

	const [state, setState] = useState({
		labels: ['Kế toán', ],
		datasets: [
			{
				barThickness: 16,
				barPercentage: 0.5,
				label: 'Cần Tuyển',
				data: [1,],
				backgroundColor: [
					orangeBar,
				],
				borderWidth: 1,
			},
			{
				barThickness: 16,
				barPercentage: 0.5,
				label: 'Đã Tuyển',
				data: [1, ],
				backgroundColor: [
					dodgerBlueBar,
				],
				borderWidth: 1,
			},
		],
	});

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

	const fetchData = async (year) => {
		const response = await axios.get(`/api/recruits/rescruitStatistic?year=${year}`)
		if(!response.data.success) { return []}
		let data = (response.data.data)
		const labelList = data.map(label => label.job_title)
		const datasets = Object.keys(data[0]).slice(1).map(type => {
			const label = type==="recruited_quantity"? 'Đã Tuyển': 'Cần Tuyển'
			const tempData = data.map(job => {
				return job[type]
			})
			const bgColor = type==="recruited_quantity"? orangeBar: dodgerBlueBar;
			return {
				barThickness: 16,
				barPercentage: 0.5,
				label,
				data: tempData,
				backgroundColor: [
					bgColor,
				],
				borderWidth: 1,
			}
		})
		setState({
			labels: labelList,
			datasets
		})
	}

	useEffect(() => {
		fetchData(year)
	}, [ year ])

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