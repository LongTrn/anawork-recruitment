import { call, put, takeEvery, } from 'redux-saga/effects'
import {axios} from '../../config/index'

import {
	FETCH_RECRUIT_DATA,
	FETCH_RECRUIT_FAILED,
	FETCH_RECRUIT_SUCCESS,
	SET_RECRUIT_PAGE,
	SET_RECRUIT_PAGE_SIZE,
	SET_RECRUIT_ALL_REQUESTS,
} from "../../redux/recruit/recruitActionType"

function* workerRecruit (action) {
	try {
		const { all, index, size } = action.payload.input
		const url = all? `/api/recruits/requests?Filters=&Sorts=&Page=${index}&PageSize=${size}`
			: `/api/recruits/pendingRequests?Filters=${encodeURIComponent("extend_request_status==Chờ duyệt")}&Sorts=&Page=${index}&PageSize=${size}`
		const response = yield axios.get(url)
		
		if (!response.data.success) throw new Error("Fetch List Recruits Failed")
		const { pageIndex, pagesize, total, collection } = response.data.data
		yield put({ type: FETCH_RECRUIT_SUCCESS, payload: { index: pageIndex, pageSize: pagesize, total, data: collection} })		
	} catch (error) {
		console.group("Watcher Recruit")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_RECRUIT_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerPaging(action) {
	try {
		const input = action.payload.input
		yield put({type: FETCH_RECRUIT_DATA, payload: {input}})
		
	} catch (error) {
		console.group("Watcher Recruit Paging")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_RECRUIT_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerPageSizing(action) {
	try {
		const input = action.payload.input
		yield put({type: FETCH_RECRUIT_DATA, payload: {input}})
		
	} catch (error) {
		console.group("Watcher Recruit Paging Size")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_RECRUIT_FAILED,
            payload : {
                error
            }
        })
	}
}

export function* watchRecruit(action){
	yield takeEvery(SET_RECRUIT_PAGE, workerPaging)
	yield takeEvery(SET_RECRUIT_PAGE_SIZE, workerPageSizing)
	yield takeEvery(SET_RECRUIT_ALL_REQUESTS, workerRecruit)
    yield takeEvery(FETCH_RECRUIT_DATA, workerRecruit)
}