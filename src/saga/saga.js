import { all, } from 'redux-saga/effects'

import { 
	watchChart,
	watchJobs,
	watchRecruit,
	watchMyRecruit,

} from "./watcher/index"

export default function* saga() {
	yield all([
		watchChart(),
		watchJobs(),
		watchRecruit(),
		watchMyRecruit(),
	])
}