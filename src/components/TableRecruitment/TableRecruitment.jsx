import React, { useState, useEffect, } from 'react';

import "../../styles/TableRecruitment/TableRecruitment.scss"
import {  ButtonDetail, ButtonView, ButtonEdit, ButtonDelete, } from "../index"
import moment from "moment"
import { axios } from "../../config/index"

export default function TableRecruitment ({ data, pageIndex, pagesize, editable = false, all = false}) {
	const [list, setList] = useState([])


	const fetchData = async ( index = 1, size = 10, ) => {
		
		const url = `/api/recruits/${!editable?`pendingRequests?Filters=${encodeURIComponent("extend_request_status==Chờ duyệt")}&`:`myPendingRequest?Filters=&`}Sorts=&Page=${index}&PageSize=${size}`
		const response = await axios.get(url)
		
		if (!response.data.success) { return []}
		
		const { collection } = response.data.data
		setList(collection)
	}

	useEffect(() => {
		
		setList(data)
	}, [ data, ])

	useEffect(() => {

		if (pagesize && data.length) {

			// let tmp =  data.slice(pageIndex, pagesize);
			// console.log("mutable pagesize ", tmp)
			setList(data)
		}

		fetchData(pageIndex, pagesize)
		// console.log(list)

	}, [ pagesize, ])

	useEffect(() => { 
	
		setList(data) 
	}, [ all,])

	// useEffect(() => console.log(moment().format()), [])

	return (
		<>
			<div className="table--padding">
				<table className="table table-borderless">
					<thead className="table-recruit__header">
						<tr className="table-recruit__header__rows">
							<th 
								scope="col"
								className={editable? "text-nowrap table__header__name col-span--2":"text-nowrap table__header__name"}
								colSpan={editable? 2:1}
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
					{
						list.length?
						<tbody className={editable? "my-list-scrollable" : "list-scrollable"}>
							{
								list.filter(data => all || editable || (!all && (data.extend_request_status === "Chờ duyệt"))).map((data) => {
									const { id, extend_request_status, name, description, extend_creator_fullname, plan_start, plan_end, quantity, } = data
									const status = extend_request_status !== "Chờ duyệt"? extend_request_status === "Duyệt"? "accepted" : "rejected": "pending"
									const dateStart = moment(plan_start).format('DD-MM-YYYY')
									const dateEnd = moment(plan_end).format('DD-MM-YYYY')

									return (
										<React.Fragment key={id}>
											<tr className={"table__rows status__" + status }>
												<td className={editable?"table__rows__name status__item col-span--2" : "table__rows__name status__item"} colSpan={editable? 2:1}><span className="table__rows__text">{name}</span></td>
												{/* {<td className={editable? "table__rows__name status__item col-span--2" : "table__rows__name status__item"} colSpan={editable? 2:1}><span className="table__rows__text">{name}</span></td>} */}
												{!editable&&<td className="table__rows__description"><span className="table__rows__text">{description}</span></td>}
												<td className="table__rows--align-text table__rows__creator"><span className="table__rows__text">{extend_creator_fullname}</span></td>
												<td className="table__rows--align-text table__rows__date-start"><span className="table__rows__text">{dateStart}</span></td>
												<td className="table__rows--align-text table__rows__date-end"><span className="table__rows__text">{dateEnd}</span></td>
												<td className="table__rows--align-text table__rows__count table--text-center"><span className="table__rows__text">{quantity}</span></td>
												<td className="table__rows--align-text table__rows__behavior ">
													{
													editable? 
														status === "pending"? 
															<>
																<ButtonEdit id={id}/>
																<ButtonDelete id={id}/>
															</>
															:
															<ButtonView id={id}/>
														:
														<ButtonDetail id={id}/>}
												</td>
											</tr>
										</React.Fragment>
									)}
								)
							}
						</tbody>
						:
						null
					}
				</table>
			</div>
			{!list.length&& (<div className="no-content">{"Không có dữ liệu"}</div>)}
		</>

	)
}