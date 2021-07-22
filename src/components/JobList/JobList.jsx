import React, { useState, useEffect, } from 'react';
import "../../styles/JobList/JobList.scss"
import { SearchBar } from "../index"
export default function JobList(props) {

	return (
		<div className="job-list">
			<div className="job-list__header">
				<div className="job-list__header__text text-nowrap">
					{/* <div> */}
					Vị trí cần tuyển
					{/* </div> */}
				</div>
				<div className="job-list__header__search-bar">
					<SearchBar />
				</div>
			</div>
			<div className="job-list__body"></div>

		</div>
	)
}