import React from 'react';
import "../../styles/ListRecruitment/ListRecruitment.scss"
import Header from "../Header/Header"
import TableRecruitment from "../TableRecruitment/TableRecruitment"

export default function ListRecruitment (props) {

	return (
		<div className="list">
			<div className="list__header">
				<div className="list__header--left-padding">
					<div className="list__header__text">
						<Header main="Duyệt yêu cầu tuyển dụng" />
					</div>
				</div>
			</div>
			<TableRecruitment/>
		</div>
	)
}