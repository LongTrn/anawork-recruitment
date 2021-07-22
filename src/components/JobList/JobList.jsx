import React, { useState, useEffect, } from 'react';
import "../../styles/JobList/JobList.scss"
import { SearchBar, JobListItem, } from "../index"
import Pagination from '../Pagination/Pagination';

export default function JobList(props) {

	const [list, setList] = useState([])

	useEffect(() => {
		// get api
		setList([])
	}, [  ])

	return (
		<div className="job-list">
			<div className="job-list__header">
				<div className="job-list__header__text text-nowrap">
					Vị trí cần tuyển
				</div>
				<div className="job-list__header__search-bar">
					<SearchBar />
				</div>
			</div>
			<div className="job-list__body">
				{list.length?
					list.map(item => (
					<JobListItem 
						key={1}
						id={1} 
						title="title"
						positionName="position name"
						postDate="DD/MM/YYYY"
						salary="Thương lượng"
					/>))
					:
					(<div className="no-content">{"Không có dữ liệu"}</div>)
				}
			</div>
			<div className="job-list__footer">
				<Pagination />
			</div>

		</div>
	)
}