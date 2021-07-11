import React, { useState, useEffect, } from 'react';
import "../../styles/Pagination/Pagination.scss"

export default function Pagination ({ pageIndex, total, pageSize, select, first, previous, next, last, classes }) {

	const [state, setState] = useState({
		pageIndexes: pageIndex || 1,
		pageSizes: pageSize || 5,
		totals: total || 5,
		numbersList: [5, 10, 20, 100]
	})
	const { pageIndexes, totals, pageSizes, numbersList } = state;
	const [ranging, setRanging] = useState(pageIndexes * pageSizes)

	useEffect(() => {
		setState(prev =>{return({
			...prev,
			pageIndexes: pageIndex,
		})})
	}, [ pageIndex ])

	useEffect(() => {
		setState(prev =>{return({
			...prev,
			pageSizes: pageSize,
		})})
	}, [ pageSize ])

	useEffect(() => {
		setState(prev =>{return({
			...prev,
			totals: total,
		})})
	}, [ total ])

	useEffect(() => { 

		setRanging(parseInt(pageIndexes * pageSizes))

	}, [pageIndexes, pageSizes, ])

	return (
		<div className={classes? "page center" :"page"}>
			<span className="page__text">Số dòng trên mỗi trang: </span>
			<select 
				name="type" 
				className="page__pageSize page__pageSize__value"
				id="paging__ListRecruitment"
				onChange={e => select(e.target.value)}
				value={pageSizes}
			>
				{numbersList.map(val => (
					<option value={val} key={val} className="page__pageSize__value">{val}</option>
				))}
			</select>
			<span className="page__number ">{(pageIndexes - 1) * pageSizes + 1} - {ranging > totals? totals: ranging} của {totals}</span>
			<span className="page__buttons">
				<button className="btn" disabled={!(pageIndex - 1)}> <b><i className="bi bi-chevron-bar-left page__buttons__first" onClick={first}/></b></button>
				<button className="btn" disabled={!(pageIndex - 1)}><i className="bi bi-chevron-compact-left page__buttons__previous" onClick={previous}/></button>
				<button className="btn" disabled={ranging > totals}><i className="bi bi-chevron-compact-right page__buttons__next" onClick={next}/></button>
				<button className="btn" disabled={ranging > totals}><i className="bi bi-chevron-bar-right page__buttons__last" onClick={last}/></button>
			</span>
		</div>
	)
}