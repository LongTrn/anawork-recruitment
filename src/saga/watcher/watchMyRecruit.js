import { put, takeEvery, } from 'redux-saga/effects'
import {axios} from '../../config/index'

import {
	FETCH_MY_RECRUIT_DATA,
	FETCH_MY_RECRUIT_FAILED,
	FETCH_MY_RECRUIT_SUCCESS,
	SET_MY_RECRUIT_PAGE,
	SET_MY_RECRUIT_PAGE_SIZE,
} from "../../redux/myRecruit/myRecruitActionType"

function* fetchData(size, index = 1,) {

	const url = `/api/recruits/myRequests?Filters=&Sorts=&Page=${index}&PageSize=${size}`
	const response = yield axios.get(url)
	
	if (!response.data.success) throw new Error("Fetch My List Recruits Failed")
	return response.data.data
}

function* workerMyRecruit (action) {
	try {
		const { index, size } = action.payload.input
		let response = yield fetchData(size, index);
		
		if (size >= response.total) response = yield fetchData(size)

		const { pageIndex, pagesize, total, collection } = response
		yield put({ type: FETCH_MY_RECRUIT_SUCCESS, payload: { index: pageIndex, pageSize: pagesize, total, data: collection} })		
	} catch (error) {
		console.group("Watcher My Recruit")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_MY_RECRUIT_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerPaging(action) {
	try {
		const input = action.payload.input
		yield put({type: FETCH_MY_RECRUIT_DATA, payload: {input}})
		
	} catch (error) {
		console.group("Watcher Recruit Paging")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_MY_RECRUIT_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerPageSizing(action) {
	try {
		const input = action.payload.input
		yield put({type: FETCH_MY_RECRUIT_DATA, payload: {input}})
		
	} catch (error) {
		console.group("Watcher My Recruit Paging Size")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_MY_RECRUIT_FAILED,
            payload : {
                error
            }
        })
	}
}

export function* watchMyRecruit(action){
	yield takeEvery(SET_MY_RECRUIT_PAGE, workerPaging)
	yield takeEvery(SET_MY_RECRUIT_PAGE_SIZE, workerPageSizing)
    yield takeEvery(FETCH_MY_RECRUIT_DATA, workerMyRecruit)
}