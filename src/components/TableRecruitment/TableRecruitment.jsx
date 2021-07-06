import React, { useState, useEffect, } from 'react';

import "../../styles/TableRecruitment/TableRecruitment.scss"
import {  ButtonDetail, ButtonView, ButtonEdit, ButtonDelete, } from "../index"

export default function TableRecruitment ({ data, offset, range, editable = false }) {
	const [list, setList] = useState([])

	useEffect(() => {
		
		setList(data.slice(0, 5))
	}, [ data, ])

	// useEffect(() => {

	// 	if (range && data.length) {

	// 		console.log("mutable range ", data.slice(offset, range))
	// 		setList(prev => {return ({...data.slice(offset, range)})})
	// 	}

	// }, [ range, ])

	return (
		
		<div className="table--padding">
			<table class="table table-borderless">
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
					{
						list.map((data) => {
							const { status, name, description, creator, dateStart, dateEnd, count, } = data

							return (
								<>
									<div className="spacing-xs"/>
									<tr className={"table__rows status__" + status}>
										<td className="table__rows__name status__item">{name}</td>
										<td className="table__rows__description">{description}</td>
										<td className="table__rows__creator">{creator}</td>
										<td className="table__rows__date-start">{dateStart}</td>
										<td className="table__rows__date-end">{dateEnd}</td>
										<td className="table__rows__count table--text-center">{count}</td>
										<td className="table__rows__behavior ">
											{editable? 
												status === "pending"? 
													<>
														<ButtonEdit data={data}/>
														<ButtonDelete data={data}/>
													</>
													:
													<ButtonView data={data}/>
												:
												<ButtonDetail data={data}/>}
										</td>
									</tr>
								</>
							)}
						)
					}
				</tbody>					
			</table>
		</div>
	)
}