import React from 'react';
import "../../styles/MyRecruited/MyRecruited.scss"
import Header from "../Header/Header"

export default function MyRecruited (props) {

	return (
		<div className="my-list">
			<div className="my-list__header">
				<div className="my-list__header--left-padding">
					<div className="my-list__header__text">
						<Header main="Tuyển dụng của tôi"/>
					</div>
				</div>
			</div>
		</div>
	)
}