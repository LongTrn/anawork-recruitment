import {
	createStore, 
	applyMiddleware,
	combineReducers,
} from "redux"
import createSagaMiddleware from "@redux-saga/core"

import { 
	chartReducer as chart,
	jobsReducer as jobs,
	recruitReducer as recruit,
	myRecruitReducer as myRecruit,
} from "./index"

import saga from "../saga/saga"

const sagaMiddleware = createSagaMiddleware()
const reducers = combineReducers({
	chart,
	jobs,
	recruit,
	myRecruit,

})

const store = createStore(
	reducers,
	applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(saga)

export default store
