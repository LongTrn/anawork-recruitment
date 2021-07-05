import React from 'react'
import "../../styles/Recruit/Recruit.scss"
import { ButtonRecruit, } from "../index"

export default function Recruit (props) {

	return (
		<div className="recruit">
			<div>
				<div className="recruit__action__header">Tuyển dụng của bạn</div>
				{/* class text-nowrap for avoiding drops few words */}
				{/* <button 
					type="button" 
					className="recruit__action recruit__action--padding  "
					// Trigger Modal
					data-bs-toggle="modal" 
					data-bs-target="#staticBackdrop"
					onClick={() => console.log("click to opoen modal")}
					>
						<svg 
							xmlns="http://www.w3.org/2000/svg" 
							width="16" height="16" 
							fill="#fff" 
							class="bi bi-plus-lg recruit__action__svg " 
							viewBox="0 0 16 16">
								<path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
						</svg>
						<div className="recruit__action__text text-nowrap">YÊU CẦU TUYỂN DỤNG</div>
				</button> */}
				<ButtonRecruit 
					header="Thêm yêu cầu tuyển dụng"
				/>
			</div>
			<div>
				<div className="recruit__navigators__links">Link kết nhanh:</div>
				<div>
					<i class="bi bi-newspaper recruit__navigators__news"/>
					<span 
						href="localhost"
						className="recruit__navigators__news__text"
						>Tin tuyển dụng</span>
				</div>
				<div>
					<i class="bi bi-person-fill recruit__navigators__interview"></i>
					<span 
						href="localhost"
						className="recruit__navigators__interview__text "
						>Phỏng vấn ứng viên</span>
				</div>
			</div>
			
		</div>
	)
}