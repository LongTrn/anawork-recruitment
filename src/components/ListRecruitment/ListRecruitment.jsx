import React, { useState, useEffect, } from 'react';
import "../../styles/ListRecruitment/ListRecruitment.scss"
import { Header, TableRecruitment, Pagination, } from "../index"
import { ListRecruitmentModel } from "../../models/index"

export default function ListRecruitment (props) {

	const [state, setState] = useState([])
	const [page, setPage] = useState({

		offset: 0,
		range: 5,
		number: 10,
	})
	const { offset, range, number } = page;
	
	const select = (value) => {

		if (!value) return;

		console.log("selected value", value)
		setPage(prev => {return ({
			...prev,
			range: value,
		})})
	}

	const first = () => {

		console.log("first button")

	}

	const previous = () => {

		console.log("previous button")

	}

	const next = () => {

		console.log("next button")

	}

	const last = () => {

		console.log("last button")

	}

	useEffect(() => {
		// get API here
		const data = ListRecruitmentModel // fetch data here  
		setState(prev => data)
		setPage(prev =>{return({
			...prev,
			number: data.length
		})})
		
	}, [])

	// useEffect(() => {

	// 	if (range && state.length) {

	// 		console.log("mutable range ", state.slice(offset, range))
	// 		setState(prev => {return ({...state.slice(offset, range)})})
	// 	}

	// }, [ range, ])

	return (
		<div className="list">
			<div className="list__header">
				<div className="list__header--left-padding">
					<div className="list__header__text">
						<Header main="Duyệt yêu cầu tuyển dụng" />
					</div>
					<div className="list__header__button">
						<label for="list-show-all-request" className="list__header__button__text">Hiện tất cả</label>
						<input id="list-show-all-request" type="checkbox" className="list__header__button__checkbox"/>
					</div>
				</div>
			</div>
			<TableRecruitment data={state} offset={offset} range={range} />
			
			<Pagination 
				offset={offset} 
				range={range} 
				number={number} 
				select={select}
				first={first}
				previous={previous}
				next={next}
				last={last}
			/>
		</div>
	)
}