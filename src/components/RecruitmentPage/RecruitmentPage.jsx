import React from 'react'
import '../../styles/RecruitmentPage/RecruitmentPage.scss';
import { Header, Recruitment, ListRecruitment,MyRecruited } from "../index"

export default function RecruitmentPage () {
	return(
		<div className="recruitment-page">
			<div className="hanging">
				<Header
					main="Tuyển dụng"
					sub="Yêu cầu tuyển dụng của tôi"
				/>
			</div>
			<div className="hanging"><Recruitment /></div>
			<div className="hanging"><ListRecruitment /></div>
			<div className="hanging"><MyRecruited /></div>
		</div>
	)
}