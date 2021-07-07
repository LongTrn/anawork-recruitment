import React from 'react'
import "../../styles/Chart/Chart.scss"
import { Bar, defaults } from "react-chartjs-2"

defaults.font.family = "Roboto"

export default function Chart (props) {
	const data = {
		labels: ['Kế toán', 'Trưởng phòng kỹ thuật', 'Nhân viên kinh doanh', 'Hồ trợ kỹ thuật', 'Marketing', ],
		datasets: [
			{
				barThickness: 16,
				barPercentage: 0.5,
				label: 'Cần Tuyển',
				data: [12, 12, 12, 16, 2, ],
				backgroundColor: [
					"#ffa12d",
					"#ffa12d",
					"#ffa12d",
					"#ffa12d",
					"#ffa12d",
				],
				borderColor: [
					"#ffa12d",
					"#ffa12d",
					"#ffa12d",
					"#ffa12d",
					"#ffa12d",
				],
				borderWidth: 1,
			},
			{
				barThickness: 16,
				barPercentage: 0.5,
				label: 'Đã Tuyển',
				data: [6, 14, 13, 16, 6, ],
				backgroundColor: [
					"#1399fb",
					"#1399fb",
					"#1399fb",
					"#1399fb",
					"#1399fb",
				],
				borderColor: [
					"#1399fb",
					"#1399fb",
					"#1399fb",
					"#1399fb",
					"#1399fb",
				],
				borderWidth: 1,
			},
		],
	};

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

	return(
		<div className="chart">
			<div className="chart__table">
				<Bar
					data={data}
					options={options}
					width={801}
					height={180}
				/>
			</div>
		</div>
	)

}