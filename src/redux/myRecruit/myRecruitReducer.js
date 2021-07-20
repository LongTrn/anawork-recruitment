import {
	FETCH_MY_RECRUIT_DATA,
	FETCH_MY_RECRUIT_FAILED,
	FETCH_MY_RECRUIT_SUCCESS,
	SET_MY_RECRUIT_PAGE,
	SET_MY_RECRUIT_PAGE_SIZE,
} from "./myRecruitActionType"

const initial = {
	index: 1,
	pageSize: 10,
	total: 0,
	data: [],
	isLoading: false,
	error: null,
}

export const myRecruitReducer = (state = initial, action) => {

	switch (action.type) {
		case FETCH_MY_RECRUIT_DATA:
			return {
				...state,
				isLoading: true,
			}
			
		case FETCH_MY_RECRUIT_FAILED: 
			return {
				...state,
				error: action.payload.error,
			}
			
		case FETCH_MY_RECRUIT_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload.data,
				index: action.payload.index,
				pageSize: action.payload.pageSize,
				total: action.payload.total,
			}
		case SET_MY_RECRUIT_PAGE:
			return {
				...state,
				index: action.payload.index,
			}

		case SET_MY_RECRUIT_PAGE_SIZE:
			return {
				...state,
				pageSize: action.payload.pageSize,
			}


		default:
			return state
	}
}