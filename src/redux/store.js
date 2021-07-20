import {
	createStore, 
	applyMiddleware,
	combineReducers,
} from "redux"
import createSagaMiddleware from "@redux-saga/core"

import { 
	chartReducer as chart,
	recruitReducer as recruit,
	myRecruitReducer as myRecruit,
} from "./index"

import saga from "../saga/saga"

const sagaMiddleware = createSagaMiddleware()
const reducers = combineReducers({
	chart,
	recruit,
	myRecruit,

})

const store = createStore(
	reducers,
	applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(saga)

export default store
