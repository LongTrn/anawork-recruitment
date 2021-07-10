import React, { useState, useEffect, } from 'react';
import "../../styles/MyRecruited/MyRecruited.scss"
import { Header, TableRecruitment, Pagination, } from "../index"
// import { MyRecruitedModel,} from "../../models/index"
import { axios } from "../../config/index"

export default function MyRecruited (props) {

	const [state, setState] = useState([])
	const [page, setPage] = useState({

		pageIndex: 0,
		pagesize: 0,
		total: 0,
	})
	const { pageIndex, pagesize, total } = page;
	
	const select = (value) => {

		if (!value) return;

		// console.log("selected value", value)
		setPage(prev => {return ({
			...prev,
			pagesize: value,
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
		
		const response = await axios.get(`/api/recruits/myPendingRequest?Filters=&Sorts=&Page=${index}&PageSize=${size}`)

		if (!response.data.success) { return []}

		const { pageIndex, pagesize, total, collection } = response.data.data
		setPage({
			pageIndex, pagesize, total,
		})
		
		setState(prev => collection)
	}

	useEffect(() => {
		
		// get API here
		fetchData()
		// const data = MyRecruitedModel // fetch data here  
	}, [])

	return (
		<div className="my-list">
			<div className="my-list__header">
				<div className="my-list__header--left-padding">
					<div className="my-list__header__text">
						<Header main="Tuyển dụng của tôi"/>
					</div>
				</div>
			</div>
			<TableRecruitment editable data={state} pageIndex={pageIndex} pagesize={pagesize} />
			<Pagination 
				pageIndex={pageIndex} 
				pageSize={pagesize} 
				total={total} 
				select={select}
				first={first}
				previous={previous}
				next={next}
				last={last}
				classes={"center"}
			/>
		</div>
	)
}