import React from 'react'
import "../../styles/Recruit/Recruit.scss"
import { ButtonRecruit, } from "../index"

export default function Recruit (props) {

	return (
		<div className="recruit">
			<div>
				<div className="recruit__action__container">
					<div className="recruit__action__header">Tuyển dụng của bạn</div>
					<ButtonRecruit 
						header="Thêm yêu cầu tuyển dụng"
					/>
				</div>
				<div className="recruit__navigators">
					<div className="recruit__navigators__links">Link kết nhanh:</div>
					<div>
						<i className="bi bi-newspaper recruit__navigators__icon"/>
						<span 
							href="localhost"
							className="recruit__navigators__news__text"
							>Tin tuyển dụng</span>
					</div>
					<div>
						<i className="bi bi-person-fill recruit__navigators__icon"></i>
						<span 
							href="localhost"
							className="recruit__navigators__interview__text "
							>Phỏng vấn ứng viên</span>
					</div>
				</div>
			</div>
		</div>
	)
}