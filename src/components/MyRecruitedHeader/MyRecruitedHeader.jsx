import React, { useEffect, } from 'react';
import "../../styles/MyRecruited/MyRecruited.scss"
import { Header, } from "../index"

import { useDispatch, } from "react-redux"
import { 
	FETCH_MY_RECRUIT_DATA, 
} from '../../redux/myRecruit/myRecruitActionType';
import { withRecruitment, } from "../index"

function MyRecruitedHeader () {

	const dispatch = useDispatch();
	const fetchData = async ( all = false, index = 1, size = 10, ) => {
		dispatch({ type: FETCH_MY_RECRUIT_DATA, payload: { input: {all, index, size}}})
	}
	
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className="my-list__header my-list__header--left-padding">
			<div className="my-list__header--left-padding">
				<div className="my-list__header__text">
					<Header main="Tuyển dụng của tôi"/>
				</div>
			</div>
		</div>
	)
}
export default withRecruitment(MyRecruitedHeader, {type: "myRecruit"})