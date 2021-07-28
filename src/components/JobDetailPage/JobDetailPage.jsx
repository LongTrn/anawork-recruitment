import React, { useState, useEffect,} from "react";
import "../../styles/JobDetailPage/JobDetailPage.scss"
import { CVForm, JobDetail, JobList } from "../index"
import { useParams, } from "react-router-dom"

export default function JobDetailPage (props) {

	const { idJobDetail: id } = useParams()

	useEffect(() => {

	}, [ id, ])

	return (
		<div className="job-detail-page gap gap-2">
			<JobDetail />
			<CVForm recruit_id={id}/>
			<JobList except={id} header="Những vị trí khác" modified={true}/>
		</div>
	)
}