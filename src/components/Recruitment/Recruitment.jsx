import React from 'react'
import '../../styles/Recruitment/Recruitment.scss';
import { Header, Statistics, Recruit, ListRecruitment,MyRecruited } from "../index"

export default function Recruitment () {
	return(
		<div className="recruitment">
			<Header
				main="Tuyển dụng"
				sub="Yêu cầu tuyển dụng của tôi"
				flag={true}
			/>
			<div className="hanging hanging__head">
				<Statistics
					header="Thống kê số lượng cần tuyển / đã tuyển"
				/>
				<Recruit/>
			</div>
			<div className="hanging"><ListRecruitment /></div>
			<div className="hanging"><MyRecruited /></div>

		</div>
	)

}