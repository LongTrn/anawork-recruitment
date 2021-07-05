import React, { useState, useEffect, } from 'react';
import "../../styles/ListRecruitment/ListRecruitment.scss"
import { Header, TableRecruitment, } from "../index"
import { ListRecruitmentModel } from "../../models/index"

export default function ListRecruitment (props) {

	const [state, setState] = useState([])

	useEffect(() => {
		// get API here
		const data = ListRecruitmentModel // fetch data here  
		setState(data)
		
	}, [])

	return (
		<div className="list">
			<div className="list__header">
				<div className="list__header--left-padding">
					<div className="list__header__text">
						<Header main="Duyệt yêu cầu tuyển dụng" />
					</div>
				</div>
			</div>
			<TableRecruitment data={state} />
		</div>
	)
}