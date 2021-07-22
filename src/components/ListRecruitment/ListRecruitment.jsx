import React, { useState, useEffect, } from 'react';
import "../../styles/ListRecruitment/ListRecruitment.scss"
import { Header, TableRecruitment, Pagination, } from "../index"
// import { ListRecruitmentModel } from "../../models/index"
// import { axios } from "../../config/index"

import { useDispatch, useSelector, } from "react-redux"
import { 
	FETCH_RECRUIT_DATA, 
	SET_RECRUIT_ALL_REQUESTS,
} from '../../redux/recruit/recruitActionType';

export default function ListRecruitment (props) {

	const [state, setState] = useState([])
	const [allRequest, setAllRequest] = useState(false)
	const { 
		index,
		pageSize,
		total,
		data,
		all,
	} = useSelector(state => state.recruit)
	const dispatch = useDispatch();

	const fetchData = async ( all = false, index = 1, size = 10, ) => {
		dispatch({ type: FETCH_RECRUIT_DATA, payload: { input: {all, index, size}}})
	}

	const handleAllRequest = () => {
		setAllRequest(prev =>!prev)
	}

	useEffect(() => {
		setState(data)
	}, [ data ])

	useEffect(() => {
		setAllRequest(prev=>all)
	} , [ all, ])

	useEffect(() => {
		fetchData(allRequest, index, pageSize)
	}, [ allRequest,])

	return (
		<div className="list">
			<div className="list__header list__header--left-padding">
				<div className="list__header--left-padding">
					<div className="list__header__text">
						<Header main="Duyệt yêu cầu tuyển dụng" />
					</div>
					<div className="list__header__button" >
						<button className="btn list__header__button shadow-none" ><span className="list__header__button__text" onClick={() => handleAllRequest()}>Hiện tất cả</span></button>
						<input id="list-show-all-request" type="checkbox" className="btn list__header__button__checkbox shadow-none"  checked={allRequest} />
					</div>
				</div>
			</div>
			<TableRecruitment data={state} index={index} pageSize={pageSize} all={allRequest} />
			<Pagination />
		</div>
	)
}