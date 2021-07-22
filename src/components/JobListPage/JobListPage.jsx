import React from 'react'
import { JobList } from '../index' 
import "../../styles/JobListPage/JobListPage.scss"

export default function JobListPage (props) {

	return (
		<div className="job-list-page">
			<JobList />
		</div>
	)
}