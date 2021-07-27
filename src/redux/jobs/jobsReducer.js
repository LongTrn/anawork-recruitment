import {
	FETCH_JOB_DATA,
	FETCH_JOB_FAILED,
	FETCH_JOB_SUCCESS,

	FETCH_JOB_DETAIL,
	FETCH_JOB_DETAIL_FAILED,
	FETCH_JOB_DETAIL_SUCCESS,

	SET_JOB_PAGE,
	SET_JOB_PAGE_SIZE,
} from "./jobsActionType"

const initial = {
	index: 1,
	pageSize: 10,
	total: 0,
	data: {},
	collection: [],
	isLoading: false,
	error: null,
}

export const jobsReducer = (state = initial, action) => {

	switch (action.type) {
		case FETCH_JOB_DATA:
			return {
				...state,
				isLoading: true,
			}
			
		case FETCH_JOB_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload.error,
			}
			
		case FETCH_JOB_SUCCESS:
			return {
				...state,
				isLoading: false,
				index: action.payload.index,
				pageSize: action.payload.pageSize,
				total: action.payload.total,
				collection: action.payload.data,
			}
			
		case FETCH_JOB_DETAIL:
			return {
				...state,
				isLoading: true,
			}
			
		case FETCH_JOB_DETAIL_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload.error,
			}
			
		case FETCH_JOB_DETAIL_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload.data,
			}			

		case SET_JOB_PAGE:
			return {
				...state,
				index: action.payload.index,
			}

		case SET_JOB_PAGE_SIZE:
			return {
				...state,
				pageSize: action.payload.pageSize,
			}
	
		default:
			return state
	}
}