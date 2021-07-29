import React, { useState, useEffect, useRef} from 'react';
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

	const [allRequest, setAllRequest] = useState(false)
	const buttonRef = useRef();
	const { 
		index,
		pageSize,
		// total,
		isLoading,
		data,
		all,
	} = useSelector(state => state.recruit)
	const dispatch = useDispatch();

	const fetchData = async ( getAll = false, index = 1, size = 10, ) => {
		// dispatch({ type: FETCH_RECRUIT_DATA, payload: { input: {getAll, index, size}}})
		// console.log("tset getAll ", getAll)
		if (getAll) {

			dispatch({ type: SET_RECRUIT_ALL_REQUESTS, payload: { input: { all: getAll, index, size}}})
		} else dispatch({ type: FETCH_RECRUIT_DATA, payload: { input: { index, size}}})
	}
	
	const handleAllRequest = () => {
		if(isLoading) return;

		// fetchData(!all, index, pageSize)
		// fetchData(!allRequest, index, pageSize)
		setAllRequest(prev =>!prev)
		// setAllRequest(prev => !all)
	}

	useEffect(() => {
		// fetchData(all, index, pageSize)
		setAllRequest(prev=>all)
	} , [ all, ])

	useEffect(() => {
		fetchData(allRequest, index, pageSize)
	}, [ allRequest,])

	useEffect(() => {console.log("isLoading", isLoading)}, [ isLoading, ])

	return (
		<div className="list">
			<div className="list__header list__header--left-padding">
				<div className="list__header--left-padding">
					<div className="list__header__text">
						<Header main="Duyệt yêu cầu tuyển dụng" />
					</div>
					<label className="list__header__button" >
						{/* <span className="checkmark_container"> */}
							<button className="text-nowrap btn list__header__button shadow-none" ><span className="list__header__button__text" onClick={() => handleAllRequest()}>Hiện tất cả</span></button>
							<span className="checkmark checkmark_container">
								{allRequest?
									(<>
										<span className="checkmark__ripple"><span className="checkmark__ripple__element"></span></span>
										<span className="checkmark__frame"></span>
										<span className="checkmark__background"><i className="bi bi-check-lg"></i></span>
									</>)
									:
									<input id="list-show-all-request" ref={buttonRef} type="checkbox" className="btn list__header__button__checkbox shadow-none checkmark__input"  onChange={() => setAllRequest(prev =>!prev)} checked={allRequest} />
									// <input id="list-show-all-request" ref={buttonRef} type="checkbox" className="btn list__header__button__checkbox shadow-none checkmark__input"  onChange={() => handleAllRequest()} checked={allRequest} />
								}
							</span>
						{/* </span> */}
					</label>
				</div>
			</div>
			<TableRecruitment page={{type: "recruit"}} />
			<Pagination page={{type: "recruit"}} />
		</div>
	)
}