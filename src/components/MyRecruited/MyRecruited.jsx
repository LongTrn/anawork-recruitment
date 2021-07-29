import React, { useState, useEffect, } from 'react';
import "../../styles/MyRecruited/MyRecruited.scss"
import { Header, TableRecruitment, Pagination, } from "../index"

import { useDispatch, useSelector, } from "react-redux"
import { 
	FETCH_MY_RECRUIT_DATA, 
} from '../../redux/myRecruit/myRecruitActionType';

export default function MyRecruited (props) {

	const [state, setState] = useState([])
	const { 
		index,
		pageSize,
		// total,
		data,
	} = useSelector(state => state.myRecruit)
	const dispatch = useDispatch();

	const fetchData = async ( all = false, index = 1, size = 10, ) => {
		dispatch({ type: FETCH_MY_RECRUIT_DATA, payload: { input: {all, index, size}}})
	}

	useEffect(() => {
		setState(data)
	}, [ data ])
	
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className="my-list">
			<div className="my-list__header my-list__header--left-padding">
				<div className="my-list__header--left-padding">
					<div className="my-list__header__text">
						<Header main="Tuyển dụng của tôi"/>
					</div>
				</div>
			</div>
			{/* <TableRecruitment editable data={state} index={index} pageSize={pageSize} /> */}
			<TableRecruitment editable page={{type: "myRecruit"}} />
			<Pagination page={{type: "myRecruit"}} />
		</div>
	)
}