import React, { useState, useEffect, } from 'react';
import "../../styles/ListRecruitment/ListRecruitment.scss"
import { Header, TableRecruitment, Pagination, } from "../index"
// import { ListRecruitmentModel } from "../../models/index"
import { axios } from "../../config/index"

export default function ListRecruitment (props) {

	const [state, setState] = useState([])
	const [page, setPage] = useState({

		pageIndex: 1,
		pagesize: 10,
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

		if (allRequest) fetchAllData(1, pagesize);
		else fetchData(1, pagesize);
		console.log("first button", page)

	}

	const previous = () => {

		if (allRequest) fetchAllData(pageIndex - 1, pagesize);
		else fetchData(pageIndex - 1, pagesize);
		console.log("previous button", page)

	}

	const next = () => {

		if (allRequest) fetchAllData(pageIndex + 1, pagesize)
		else fetchData(pageIndex + 1, pagesize)
		console.log("next button", page)

	}

	const last = () => {

		const lastPage = Math.ceil(total / pagesize)
		
		if (allRequest) fetchAllData(lastPage, pagesize)
		else fetchData(lastPage, pagesize)
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
		const response = await axios.get(`/api/recruits/pendingRequests?Filters=&Sorts=&Page=${index}&PageSize=${size}`)
		
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

	useEffect(() => {
		console.log("PAGE ", page)
	}, [page])

	useEffect(() => {

		if (allRequest) fetchAllData(pageIndex, pagesize)
		else fetchData(pageIndex, pagesize)

		console.log(allRequest)
	} , [allRequest])

	return (
		<div className="list">
			<div className="list__header">
				<div className="list__header--left-padding">
					<div className="list__header__text">
						<Header main="Duyệt yêu cầu tuyển dụng" />
					</div>
					<div className="list__header__button" >
						<button className="btn " ><span className="list__header__button__text" onClick={getAllRequest}>Hiện tất cả</span></button>
						{/* <button htmlFor="list-show-all-request" className="btn " ><span className="list__header__button__text" onClick={getAllRequest}>Hiện tất cả</span></button> */}
						<input id="list-show-all-request" type="checkbox" className="list__header__button__checkbox" onClick={getAllRequest} onChange={getAllRequest} checked={allRequest} />
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