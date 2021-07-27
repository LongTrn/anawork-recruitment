import { put, takeEvery, } from 'redux-saga/effects'
import {axios} from '../../config/index'

import {
	FETCH_JOB_DATA,
	FETCH_JOB_FAILED,
	FETCH_JOB_SUCCESS,

	FETCH_JOB_DETAIL,
	FETCH_JOB_DETAIL_FAILED,
	FETCH_JOB_DETAIL_SUCCESS,
	
	SET_JOB_PAGE,
	SET_JOB_PAGE_SIZE,
} from "../../redux/jobs/jobsActionType"

function* workerJobs (action) {
	try {
		const { id, index, size } = action.payload.input
		const url = id? `/api/recruits/publicRequests?Filters=id!=${id}&Sorts=&Page=${index}&PageSize=${size}`
		:`/api/recruits/publicRequests?Sorts=&Page=${index}&PageSize=${size}`
		const response = yield axios.get(url)
		
		if (!response.data.success) throw new Error("Fetch List Jobs Failed")
		const { pageIndex, pagesize, total, collection } = response.data.data
		yield put({ type: FETCH_JOB_SUCCESS, payload: { index: pageIndex, pageSize: pagesize, total, data: collection} })		
	} catch (error) {
		console.group("Watcher Recruit")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_JOB_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerJobDetail (action) {
	try {
		const { id } = action.payload.input
		const url = `/api/recruits/requests/${id}`
		const response = yield axios.get(url)

		if (!response.data.success) throw new Error("Fetch Job Detail Failed")
		const data = response.data.data
		yield put({ type: FETCH_JOB_DETAIL_SUCCESS, payload: { data} })		
	} catch (error) {
		console.group("Watcher Recruit")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_JOB_DETAIL_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerPaging(action) {
	try {
		const { target, ...input } = action.payload.input
		switch (target) {

			case FETCH_JOB_DETAIL:
				yield put({type: FETCH_JOB_DETAIL, payload: {input}})
				break;
				
			default: 
				yield put({type: FETCH_JOB_DATA, payload: {input}})
		}
	} catch (error) {
		console.group("Watcher Recruit Paging")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_JOB_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerPageSizing(action) {
	try {
		// const input = action.payload.input
		// yield put({type: FETCH_RECRUIT_DATA, payload: {input}})
		const { target, ...input } = action.payload.input
		switch (target) {

			case FETCH_JOB_DETAIL:
				yield put({type: FETCH_JOB_DETAIL, payload: {input}})
				break;
				
			default: 
				yield put({type: FETCH_JOB_DATA, payload: {input}})
		}
		
	} catch (error) {
		console.group("Watcher Recruit Paging Size")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_JOB_FAILED,
            payload : {
                error
            }
        })
	}
}

export function* watchJobs(action){
	// yield takeEvery(SET_RECRUIT_ALL_REQUESTS, workerRecruit)
    // yield takeEvery(FETCH_RECRUIT_DATA, workerRecruit)
	yield takeEvery(FETCH_JOB_DATA, workerJobs)
	yield takeEvery(FETCH_JOB_DETAIL, workerJobDetail)
	yield takeEvery(SET_JOB_PAGE, workerPaging)
	yield takeEvery(SET_JOB_PAGE_SIZE, workerPageSizing)
}