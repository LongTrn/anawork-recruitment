import React, { useState, useEffect, } from 'react';
import "../../styles/MyRecruited/MyRecruited.scss"
import { Header, TableRecruitment, Pagination, } from "../index"
import { MyRecruitedModel,} from "../../models/index"

export default function MyRecruited (props) {

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
		const data = MyRecruitedModel // fetch data here  
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
		<div className="my-list">
			<div className="my-list__header">
				<div className="my-list__header--left-padding">
					<div className="my-list__header__text">
						<Header main="Tuyển dụng của tôi"/>
					</div>
				</div>
			</div>
			<TableRecruitment data={state} editable />
			
			<Pagination 
				offset={offset} 
				range={range} 
				number={number} 
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