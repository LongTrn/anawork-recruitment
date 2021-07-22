import React, { useState, useEffect, } from 'react';
import "../../styles/Pagination/Pagination.scss"
import { useDispatch, useSelector, } from "react-redux"
import { 
	SET_RECRUIT_PAGE, 
	SET_RECRUIT_PAGE_SIZE,
} from '../../redux/recruit/recruitActionType';
import { 
	SET_MY_RECRUIT_PAGE, 
	SET_MY_RECRUIT_PAGE_SIZE,
} from '../../redux/myRecruit/myRecruitActionType';

export default function Pagination ({ mine = false ,classes }) {

	const { index, total, pageSize, all } = useSelector(state => mine? state.myRecruit : state.recruit)
	const numbersList = [ 5, 10 , 20 , 100];
	const [ranging, setRanging] = useState(index * pageSize)
	const dispatch = useDispatch();

	
	const handlePage = (index) => {
		if (mine) {
			dispatch({ type: SET_MY_RECRUIT_PAGE, payload: { input: { index, size: pageSize}}})
		} else {
			dispatch({ type: SET_RECRUIT_PAGE, payload: { input: { all, index, size: pageSize}}})
		}
	}
	
	const handlePageSize = (size) => {
		if (mine) {
			dispatch({ type: SET_MY_RECRUIT_PAGE_SIZE, payload: { input: { index, size}}})
		} else {
			dispatch({ type: SET_RECRUIT_PAGE_SIZE, payload: { input: { all, index, size}}})
		}
	}

	useEffect(() => { 
		setRanging(parseInt(index * pageSize))
	}, [ index, pageSize, ])

	useEffect(() => {}, [ mine ])

	return (
		<div className={classes? "page center" :"page"}>
			<div className="page__item">
				<span className="page__text">Số dòng trên mỗi trang: </span>
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
					<span className="page__number ">{(index - 1) * pageSize + 1} - {ranging > total? total: ranging} của {total}</span>
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