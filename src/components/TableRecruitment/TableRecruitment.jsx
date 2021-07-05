import React, { useState, useEffect, } from 'react';

import "../../styles/TableRecruitment/TableRecruitment.scss"
import {  ButtonDetail, } from "../index"

export default function TableRecruitment ({ data }) {
	const [list, setList] = useState([])

	useEffect(() => {
		setList(data.slice(0, 5))
	}, [data])

	return (
		
		<div className="table--padding">
			<table class="table table-borderless table__data">
				<thead>
					<tr>
						<th 
							scope="col"
							className="table__header__name"
						>Yêu cầu tuyển dụng</th>
						<th 
							scope="col"
							className="table__header__description"
						>Mô tả yêu cầu</th>
						<th 
							scope="col"
							className="table__header__creator"
						>Người tạo</th>
						<th 
							scope="col"
							className="table__header__date-start"
						>Bắt đầu</th>
						<th 
							scope="col"
							className="table__header__date-end"
						>Kết thúc</th>
						<th 
							scope="col"
							className="table__header__count table--text-center"
						>Số lượng</th>
						<th 
							scope="col"
							className="table__header__behavior table--text-center"
						>Thao tác</th>
					</tr>
				</thead>
				<tbody>
					{/* <tr className="table__rows status__pending">
						<td className="table__rows__name status__item">Tuyển dụng nhân viên kiểm thử</td>
						<td className="table__rows__description">Tuyển dụng nhân viên kiểm thử</td>
						<td className="table__rows__creator">Nguyễn Lữ Thế</td>
						<td className="table__rows__date-start">20/11/2020</td>
						<td className="table__rows__date-end">20/11/2020</td>
						<td className="table__rows__count table--text-center">2</td>
						<td className="table__rows__behavior ">
							<button
								type="button"
								className="btn btn-outline-primary table__rows__behavior__button text-nowrap 
								"
							>
								<i class="bi bi-list-ul table__rows__behavior__button__icon"/>
								Xem chi tiết</button>
						</td>
					</tr> */}
					{
						list.map(({status, name, description, creator, dateStart, dateEnd, count,}) => (
							<tr className={"table__rows status__" + status}>
								<td className="table__rows__name status__item">{name}</td>
								<td className="table__rows__description">{description}</td>
								<td className="table__rows__creator">{creator}</td>
								<td className="table__rows__date-start">{dateStart}</td>
								<td className="table__rows__date-end">{dateEnd}</td>
								<td className="table__rows__count table--text-center">{count}</td>
								<td className="table__rows__behavior ">
									<ButtonDetail />
								</td>
							</tr>))
					}
				</tbody>					
			</table>
		</div>
	)
}