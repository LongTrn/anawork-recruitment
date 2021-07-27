import {
	SET_YEAR,
	FETCH_CHART_DATA,
	FETCH_CHART_FAILED,
	FETCH_CHART_SUCCESS,
} from "./chartActionType"
import moment from "moment"

const initial = {
	year: parseInt(moment().format("YYYY")),
	isLoading: false,
	data: [],
	labels: [],
	error: null
}

export const chartReducer = (state = initial, action) => {

	switch (action.type) {
		
		case SET_YEAR:
			return {
				...state, 
				year: action.payload.input,
			}

		case FETCH_CHART_DATA:
			return {
				...state,
				isLoading: true
			}

		case FETCH_CHART_FAILED:
			return {
				...state,
				error: action.payload.error
			}
		case FETCH_CHART_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload.data,
				labels: action.payload.labels
			}

		default:
			return state
	}
}