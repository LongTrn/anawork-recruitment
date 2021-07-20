import {
	FETCH_RECRUIT_DATA,
	FETCH_RECRUIT_FAILED,
	FETCH_RECRUIT_SUCCESS,
	SET_RECRUIT_PAGE,
	SET_RECRUIT_PAGE_SIZE,
} from "./recruitActionType"

const initial = {
	index: 1,
	pageSize: 10,
	total: 0,
	data: [],
	isLoading: false,
	error: null,
}

export const recruitReducer = (state = initial, action) => {

	switch (action.type) {
		case FETCH_RECRUIT_DATA:
			return {
				...state,
				isLoading: true,
			}
			
		case FETCH_RECRUIT_FAILED: 
			return {
				...state,
				error: action.payload.error,
			}
			
		case FETCH_RECRUIT_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload.data,
				index: action.payload.index,
				pageSize: action.payload.pageSize,
				total: action.payload.total,
			}
		case SET_RECRUIT_PAGE:
			return {
				...state,
				index: action.payload.index,
			}

		case SET_RECRUIT_PAGE_SIZE:
			return {
				...state,
				pageSize: action.payload.pageSize,
			}


		default:
			return state
	}
}