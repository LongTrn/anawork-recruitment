import { all, } from 'redux-saga/effects'

import { 
	watchChart,
	watchRecruit,
	watchMyRecruit,

} from "./watcher/index"

export default function* saga() {
	yield all([
		watchChart(),
		watchRecruit(),
		watchMyRecruit(),
	])
}