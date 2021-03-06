import React, { useState, useEffect, } from 'react';
import "../../styles/Pagination/Pagination.scss"
import { useDispatch, useSelector, } from "react-redux"
import { useParams, } from "react-router-dom";
import { 
	SET_RECRUIT_PAGE, 
	SET_RECRUIT_PAGE_SIZE,
} from '../../redux/recruit/recruitActionType';
import { 
	SET_MY_RECRUIT_PAGE, 
	SET_MY_RECRUIT_PAGE_SIZE,
} from '../../redux/myRecruit/myRecruitActionType';

import { 
	FETCH_JOB_DATA, 

	SET_JOB_PAGE, 
	SET_JOB_PAGE_SIZE,
} from '../../redux/jobs/jobsActionType';

export default function Pagination ({ classes, page }) {

	const state = useSelector(state => state[page.type])
	const { index, total, pageSize, all } = state
	const numbersList = [ 5, 10 , 20 , 100];
	const [ranging, setRanging] = useState(index * pageSize)
	const [allRequest, setAllRequest] = useState(false)
	const dispatch = useDispatch();
	const { idJobDetail: exceptJobID }= useParams();
	
	const handlePage = (index) => {

		switch (page.type) {

			case "jobs":
				if (page.payload.input === "otherJobs") return dispatch({ type: SET_JOB_PAGE, payload: { input: { target: FETCH_JOB_DATA, id: exceptJobID, index, size: pageSize}}});
				else return dispatch({ type: SET_JOB_PAGE, payload: { input: { target: FETCH_JOB_DATA, index, size: pageSize}}});

			case "recruit":
				return dispatch({ type: SET_RECRUIT_PAGE, payload: { input: { all: allRequest, index, size: pageSize}}});
			
			case "myRecruit":
				return dispatch({ type: SET_MY_RECRUIT_PAGE, payload: { input: { index, size: pageSize}}});
			
			default:
				return;
		}
	}
	
	const handlePageSize = (size) => {
		
		switch (page.type) {

			case "jobs":
				if (page.payload.input === "otherJobs") return dispatch({ type: SET_JOB_PAGE_SIZE, payload: { input: { target: FETCH_JOB_DATA, id: exceptJobID , index, size}}});
				else return dispatch({ type: SET_JOB_PAGE_SIZE, payload: { input: { target: FETCH_JOB_DATA, index, size}}});

			case "recruit":
				return dispatch({ type: SET_RECRUIT_PAGE_SIZE, payload: { input: { all: allRequest, index, size}}});
				
			case "myRecruit":
				return dispatch({ type: SET_MY_RECRUIT_PAGE_SIZE, payload: { input: { index, size}}});
			
			default:
				return;
		}
	}

	useEffect(() => { 
		setRanging(parseInt(index * pageSize))
	}, [ index, pageSize, ])

	useEffect(() => {
	}, [ page, state ])

	useEffect(() => { 
		setAllRequest(prev=>all)
	}, [ all, ])

	return (
		<div className={classes? "page center" :"page"}>
			<div className="page__item">
				<span className="page__text">S??? d??ng tr??n m???i trang: </span>
				<select 
					name="type" 
					className="page__pageSize page__pageSize__value"
					id="paging__ListRecruitment"
					onChange={(e) => handlePageSize(e.target.value)}
					value={pageSize}
				>
					{numbersList.map(val => (
						<option value={val} key={val} className="page__pageSize__value">{val}</option>
					))}
				</select>
			</div>
			<div className="page__item">
				<div>
					<span className="page__number text-nowrap">{(index - 1) * pageSize + 1 > total? parseInt(total/pageSize) * pageSize + 1: (index - 1) * pageSize + 1 || " "} - {ranging > total? total: ranging || " "} c???a {total}</span>
				</div>
				<div className="page__buttons">
					<button className="btn page__buttons--size shadow-none" disabled={!(index - 1)}><i className="bi bi-chevron-bar-left page__buttons__first" onClick={() => handlePage(1)}/></button>
					<button className="btn page__buttons--size shadow-none" disabled={!(index - 1)}><i className="bi bi-chevron-compact-left page__buttons__previous" onClick={() => handlePage(index - 1)}/></button>
					<button className="btn page__buttons--size shadow-none" disabled={ranging > total}><i className="bi bi-chevron-compact-right page__buttons__next" onClick={() => handlePage(index + 1)}/></button>
					<button className="btn page__buttons--size shadow-none" disabled={ranging > total}><i className="bi bi-chevron-bar-right page__buttons__last" onClick={() => handlePage(Math.ceil(total / pageSize))}/></button>
				</div>
			</div>
		</div>
	)
}