import React, { useState, useEffect, } from 'react';
import "../../styles/JobList/JobList.scss"
import { SearchBar, JobListItem, } from "../index"
import Pagination from '../Pagination/Pagination';
import { useDispatch, useSelector, } from "react-redux"
import {
	FETCH_JOB_DATA,
} from "../../redux/jobs/jobsActionType"

export default function JobList({ header = "Vị trí cần tuyển", modified = false, except }) {

	const [list, setList] = useState([])
	const state = useSelector(state => state.jobs)
	const { index, pageSize, collection, } = state
	const dispatch = useDispatch();


	useEffect(() => {
		// get api
		if (except) dispatch({type: FETCH_JOB_DATA, payload: { input: { id: except, index: 1, size: 10, }}})
		else dispatch({type: FETCH_JOB_DATA, payload: { input: {index: 1, size: 10}}})
	}, [])

	useEffect(() => {
		// get api
		dispatch({type: FETCH_JOB_DATA, payload: { input: { id: except, index, size: pageSize, }}})
	}, [ except, ])

	useEffect(() => {
		
		setList(collection)
	}, [ state, ])

	return (
		<div className={modified?"job-list job-list--modified" :"job-list"}>
			<div className="job-list__header">
				<div className="text-nowrap job-list__header__text"><b>{header}</b></div>
				{!except && (<div className="job-list__header__search-bar"><SearchBar /></div>)}
			</div>
			<div className="job-list__body">
				{list.length?
					list.map(item => {
						const { id, name, extend_position_name, created_at, salary, } = item;
						return (<JobListItem 
							key={id}
							id={id} 
							name={name}
							extend_position_name={extend_position_name}
							created_at={created_at}
							salary={salary}
						/>)})
						:
						(<div className="no-content">{"Không có dữ liệu"}</div>)
				} 
			</div>
			<div className="job-list__footer">
				{/* <Pagination page={"jobs"} /> */}
				<Pagination page={{type: "jobs", payload: { input: modified? "otherJobs":"jobs"}}} />
			</div>

		</div>
	)
}