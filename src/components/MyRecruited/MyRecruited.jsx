import React, { useState, useEffect, } from 'react';
import "../../styles/MyRecruited/MyRecruited.scss"
import { Header, TableRecruitment } from "../index"
import { MyRecruitedModel } from "../../models/index"

export default function MyRecruited (props) {

	const [state, setState] = useState([])

	useEffect(() => {
		// get API here
		const data = MyRecruitedModel // fetch data here  
		setState(data)
		
	}, [])

	return (
		<div className="my-list">
			<div className="my-list__header">
				<div className="my-list__header--left-padding">
					<div className="my-list__header__text">
						<Header main="Tuyển dụng của tôi"/>
					</div>
				</div>
			</div>
			<TableRecruitment data={state} />
		</div>
	)
}