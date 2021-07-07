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
							className="text-nowrap table__header__name"
							colspan={editable? 2:1}
						><span className="table__header__text">Yêu cầu tuyển dụng</span></th>
						{
							!editable && (
								<th 
									scope="col"
									className="text-nowrap table__header__description"
								><span className="table__header__text">Mô tả yêu cầu</span></th>
							)
						}
						<th 
							scope="col"
							className="text-nowrap table__header__creator"
						><span className="table__header__text">Người tạo</span></th>
						<th 
							scope="col"
							className="text-nowrap table__header__date-start"
						><span className="table__header__text">Bắt đầu</span></th>
						<th 
							scope="col"
							className="text-nowrap table__header__date-end"
						><span className="table__header__text">Kết thúc</span></th>
						<th 
							scope="col"
							className="text-nowrap table__header__count table--text-center"
						><span className="table__header__text">Số lượng</span></th>
						<th 
							scope="col"
							className="text-nowrap table__header__behavior table--text-center"
						><span className="table__header__text">Thao tác</span></th>
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
										<td className="table__rows__name status__item" colspan={editable? 2:1}><span className="table__rows__text">{name}</span></td>
										{!editable&&<td className="table__rows__description"><span className="table__rows__text">{description}</span></td>}
										<td className="table__rows__creator"><span className="table__rows__text">{creator}</span></td>
										<td className="table__rows__date-start"><span className="table__rows__text">{dateStart}</span></td>
										<td className="table__rows__date-end"><span className="table__rows__text">{dateEnd}</span></td>
										<td className="table__rows__count table--text-center"><span className="table__rows__text">{count}</span></td>
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