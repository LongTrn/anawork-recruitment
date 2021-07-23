import React from 'react'
import '../../styles/Recruitment/Recruitment.scss';
import { Statistics, Recruit, } from "../index"

export default function Recruitment () {
	return(
		<div className="recruitment">
			<div className="recruitment__wrapper__left"><Statistics header="Thống kê số lượng cần tuyển / đã tuyển" /></div>
			<div className="recruitment__wrapper__right"><Recruit/></div>
		</div>
	)
}