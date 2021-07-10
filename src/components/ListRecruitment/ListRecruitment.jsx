import React, { useState, useEffect, } from 'react';
import "../../styles/ListRecruitment/ListRecruitment.scss"
import { Header, TableRecruitment, Pagination, } from "../index"
// import { ListRecruitmentModel } from "../../models/index"
import { axios } from "../../config/index"

export default function ListRecruitment (props) {

	const [state, setState] = useState([])
	const [page, setPage] = useState({

		pageIndex: 0,
		pagesize: 0,
		total: 0,
	})
	const { pageIndex, pagesize, total } = page;
	const [allRequest, setAllRequest] = useState(false)
	
	const select = (value) => {

		if (!value) return;

		setPage(prev => {return ({
			...prev,
			pagesize: (value),
		})})
	}

	const first = () => {

		fetchData(1, pagesize);
		console.log("first button", page)

	}

	const previous = () => {

		fetchData(pageIndex - 1, pagesize);
		console.log("previous button", page)

	}

	const next = () => {

		fetchData(pageIndex + 1, pagesize);
		console.log("next button", page)

	}

	const last = () => {

		const lastPage = Math.ceil(total / pagesize)
		fetchData(lastPage, pagesize)
		console.log("last button", page)

	}

	const fetchData = async ( index = 1, size = 10, ) => {
		
		const response = await axios.get(`/api/recruits/pendingRequests?Filters=${encodeURIComponent("extend_request_status==Chờ duyệt")}&Sorts=&Page=${index}&PageSize=${size}`)

		if (!response.data.success) { return []}

		const { pageIndex, pagesize, total, collection } = response.data.data
		setPage({
			pageIndex, pagesize, total,
		})
		
		setState(prev => collection)
	}

	const fetchAllData = async ( index = 1, size = 10, ) => {
		const response = await axios.get(`/api/recruits/pendingRequests`)
		
		if (!response.data.success) { return []}

		const { pageIndex, pagesize, total, collection } = response.data.data
		setPage({
			pageIndex, pagesize, total,
		})
		
		setState(prev => collection)
	}

	const getAllRequest = ()=>{
		setAllRequest(prev=>!prev)
		
	}

	useEffect(() => {

		// get API here
		fetchData();
		// const data = ListRecruitmentModel // fetch data here
	}, [])

	// useEffect(() => {
	// }, [state])

	useEffect(() => {

		if (allRequest) fetchAllData()
		else fetchData()
	} , [allRequest])

	return (
		<div className="list">
			<div className="list__header">
				<div className="list__header--left-padding">
					<div className="list__header__text">
						<Header main="Duyệt yêu cầu tuyển dụng" />
					</div>
					<div className="list__header__button" >
						<label htmlFor="list-show-all-request" className="list__header__button__text" >Hiện tất cả</label>
						<input id="list-show-all-request" type="checkbox" className="list__header__button__checkbox" onClick={getAllRequest} />
						{/* <input id="list-show-all-request" type="checkbox" className="list__header__button__checkbox" checked={allRequest} /> */}
					</div>
				</div>
			</div>
			<TableRecruitment data={state} pageIndex={pageIndex} pagesize={pagesize} all={allRequest} />
			<Pagination 
				pageIndex={pageIndex} 
				pageSize={pagesize} 
				total={total} 
				select={select}
				first={first}
				previous={previous}
				next={next}
				last={last}
			/>
		</div>
	)
}