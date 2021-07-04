import React from 'react'
import '../../styles/Recruitment/Recruitment.scss';
import Header from "../Header/Header"
import Statistics from "../Statistics/Statistics"
import Recruit from "../Recruit/Recruit"
import ListRecruitment from "../ListRecruitment/ListRecruitment"
import MyRecruited from "../MyRecruited/MyRecruited"

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
			<ListRecruitment></ListRecruitment>
			<MyRecruited></MyRecruited>

			<div></div>

		</div>
	)

}