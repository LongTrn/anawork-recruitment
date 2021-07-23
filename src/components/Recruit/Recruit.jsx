import React from 'react'
import "../../styles/Recruit/Recruit.scss"
import { ButtonRecruit, } from "../index"
import {
  Link,
} from "react-router-dom";

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
					<div className="recruit__navigators__links text-nowrap">Link kết nhanh:</div>
					<div className="recruit__navigators--modified">
						<i className="bi bi-newspaper recruit__navigators__icon"/>
						<Link 
							to="/job-list"
							className="text-decoration-none text-nowrap recruit__navigators__news__text"
							>Tin tuyển dụng</Link>
					</div>
					<div className="recruit__navigators--modified">
						<i className="bi bi-person-fill recruit__navigators__icon"></i>
						<Link 
							to="/"
							className="text-decoration-none text-nowrap recruit__navigators__interview__text "
							>Phỏng vấn ứng viên</Link>
					</div>
				</div>
			</div>
		</div>
	)
}