import React, { useState, useEffect, } from 'react';
import "../../styles/Pagination/Pagination.scss"

export default function Pagination ({ offset, number, range, select, first, previous, next, last}) {

	const [state, setState] = useState({
		offsets: offset || 0,
		ranges: range || 5,
		numbers: number || 1,
		numbersList: [5, 10, 20]
	})
	const { offsets, numbers, ranges, numbersList } = state;
	let ranging = parseInt(offsets + ranges);

	useEffect(() => {
		console.log("Child, range", range);
		setState(prev =>{return({
			...prev,
			ranges: range,
		})})
	}, [ range ])

	useEffect(() => {
		console.log("Child, number", number);
		setState(prev =>{return({
			...prev,
			numbers: number,
		})})
	}, [ number ])

	return (
		<div className="page">
			<span className="page__text">Số dòng trên mỗi trang: </span>
			<select 
				name="type" 
				className="page__range"
				id="paging__ListRecruitment"
				onChange={e => select(e.target.value)}
			>
				{numbersList.map(val => (
					<option value={val} selected={val === ranges} key={val}>{val}</option>
				))}
			</select>
			<span className="page__number ">{offsets} - {(ranging) > numbers? numbers: ranging} của {numbers}</span>
			<span className="page__buttons">
				<i className="bi bi-chevron-bar-left page__buttons__first" onClick={first}/>
				<i className="bi bi-chevron-compact-left page__buttons__previous" onClick={previous}/>
				<i className="bi bi-chevron-compact-right page__buttons__next" onClick={next}/>
				<i className="bi bi-chevron-bar-right page__buttons__last" onClick={last}/>
			</span>
		</div>
	)
}