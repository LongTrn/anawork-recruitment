import React, { useState, useEffect,} from "react";
import "../../styles/JobDetailPage/JobDetailPage.scss"
import { Container, Row, Col,} from 'react-bootstrap';
import { CVForm, JobDetail, JobList } from "../index"

export default function JobDetailPage (props) {

	return (
		<div className="job-detail-page gap gap-2">
			<JobDetail />
			<CVForm />
			{/* <div> </div> */}
			<JobList header="Những vị trí khác" modified={true}/>
		</div>
	)
}