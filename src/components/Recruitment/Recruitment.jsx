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
			<div className="hanging">
				<Statistics
					header="Thống kê số lượng cần tuyển / đã tuyển"
				/>
				<Recruit/>
			</div>
			<ListRecruitment />
			<MyRecruited />

			<div></div>

		</div>
	)

}