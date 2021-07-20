import { call, put, takeEvery, select, takeLatest } from 'redux-saga/effects'
import {axios} from '../../config/index'

import {
	SET_YEAR,
	FETCH_CHART_DATA,
	FETCH_CHART_FAILED,
	FETCH_CHART_SUCCESS,
} from "../../redux/chart/chartActionType"
import {
	chartConstant
} from "../../constants/index"
const { ORANGE_BAR, DODGER_BLUE_BAR} = chartConstant

function* workerChart (action) {
	try {
		const year = action.payload.input;
		const url = "/api/recruits/rescruitStatistic?year=" + year
		const response = yield axios.get(url)
		if(!response.data.success) { throw new Error("Fetch Chart Failed")}
        const data = response.data.data
		const labels = data.map(label => label.job_title)
		const datasets = Object.keys(data[0]).slice(1).map(type => {
			const label = type==="recruited_quantity"? 'Đã Tuyển': 'Cần Tuyển'
			const tempData = data.map(job => {
				return job[type]
			})
			const bgColor = type==="recruited_quantity"? ORANGE_BAR: DODGER_BLUE_BAR;
			return {
				barThickness: 16,
				barPercentage: 0.5,
				label,
				data: tempData,
				backgroundColor: [
					bgColor,
				],
				borderWidth: 1,
			}
		})
		yield put({ type : FETCH_CHART_SUCCESS, payload: { data : datasets, labels}})
	} catch (error) {
		console.group("Watcher Chart")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_CHART_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerSetYear (action) {
	try {
		const  input = action.payload.input
        yield put({ type : FETCH_CHART_DATA, payload: {input}})
		
	} catch (error) {
		console.group("Watcher Chart")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_CHART_FAILED,
            payload : {
                error
            }
        })
	}
}

export function* watchChart(action){
    yield takeEvery(SET_YEAR, workerSetYear)
    yield takeEvery(FETCH_CHART_DATA, workerChart)
}