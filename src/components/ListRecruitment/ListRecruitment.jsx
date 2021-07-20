import React, { useState, useEffect, } from 'react';
import "../../styles/ListRecruitment/ListRecruitment.scss"
import { Header, TableRecruitment, Pagination, } from "../index"
// import { ListRecruitmentModel } from "../../models/index"
// import { axios } from "../../config/index"

import { useDispatch, useSelector, } from "react-redux"
import { 
	FETCH_RECRUIT_DATA, 
} from '../../redux/recruit/recruitActionType';

export default function ListRecruitment (props) {

	const [state, setState] = useState([])
	const [allRequest, setAllRequest] = useState(false)
	const { 
		index,
		pageSize,
		total,
		data,
	} = useSelector(state => state.recruit)
	const dispatch = useDispatch();

	const fetchData = async ( all = false, index = 1, size = 10, ) => {
		dispatch({ type: FETCH_RECRUIT_DATA, payload: { input: {all, index, size}}})
	}

	const getAllRequest = () => {
		setAllRequest(prev=>!prev)
	}

	useEffect(() => {
	}, [ index, pageSize, total, data, ])


	useEffect(() => {
		setState(data)
	}, [ data ])

	useEffect(() => {
		fetchData(allRequest, index, pageSize)
	} , [ allRequest ])

	return (
		<div className="list">
			<div className="list__header list__header--left-padding">
				<div className="list__header--left-padding">
					<div className="list__header__text">
						<Header main="Duyệt yêu cầu tuyển dụng" />
					</div>
					<div className="list__header__button" >
						<button className="btn list__header__button" ><span className="list__header__button__text" onClick={getAllRequest}>Hiện tất cả</span></button>
						{/* <button htmlFor="list-show-all-request" className="btn " ><span className="list__header__button__text" onClick={getAllRequest}>Hiện tất cả</span></button> */}
						<input id="list-show-all-request" type="checkbox" className="btn list__header__button__checkbox" onClick={getAllRequest} onChange={getAllRequest} checked={allRequest} />
						{/* <input id="list-show-all-request" type="checkbox" className="list__header__button__checkbox" checked={allRequest} /> */}
					</div>
				</div>
			</div>
			<TableRecruitment data={state} index={index} pageSize={pageSize} all={allRequest} />
			<Pagination />
		</div>
	)
}