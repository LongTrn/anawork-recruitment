import React, { useState, useEffect, } from 'react';
import { Header, } from "../index"
import { useDispatch, useSelector, } from "react-redux"
import { 
	FETCH_RECRUIT_DATA, 
	SET_RECRUIT_ALL_REQUESTS,
} from '../../redux/recruit/recruitActionType';
import { withRecruitment, } from "../index"

function ListRecruitmentHeader () {
	const [allRequest, setAllRequest] = useState(false)
	const { 
		pageSize,
		isLoading,
		all,
	} = useSelector(state => state.recruit)
	const dispatch = useDispatch();

	const fetchData = async ( getAll = false, size = 10, ) => {
		if (getAll) {
			dispatch({ type: SET_RECRUIT_ALL_REQUESTS, payload: { input: { all: getAll, index: 1, size}}})
		} else dispatch({ type: FETCH_RECRUIT_DATA, payload: { input: { index: 1, size}}})
	}
	
	const handleAllRequest = () => {
		if(isLoading) return;
		setAllRequest(prev =>!prev)
	}

	useEffect(() => {
		setAllRequest(prev=>all)
	} , [ all, ])

	useEffect(() => {
		fetchData(allRequest, pageSize)
	}, [ allRequest,])

	return (
		<div className="list__header list__header--left-padding">
			<div className="list__header--left-padding">
				<div className="list__header__text">
					<Header main="Duyệt yêu cầu tuyển dụng" />
				</div>
				<label className="list__header__button" >
						<button className="text-nowrap btn list__header__button shadow-none" ><span className="list__header__button__text" onClick={() => handleAllRequest()}>Hiện tất cả</span></button>
						<span className="checkmark checkmark_container">
							{allRequest?
								(<>
									<span className="checkmark__ripple"><span className="checkmark__ripple__element"></span></span>
									<span className="checkmark__frame"></span>
									<span className="checkmark__background"><i className="bi bi-check-lg"></i></span>
								</>)
								:
								<input id="list-show-all-request" type="checkbox" className="btn list__header__button__checkbox shadow-none checkmark__input"  onChange={() => setAllRequest(prev =>!prev)} checked={allRequest} />
							}
						</span>
				</label>
			</div>
		</div>
	)
}
export default withRecruitment(ListRecruitmentHeader, {type: "recruit"})