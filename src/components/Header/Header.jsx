import React from 'react'
import "../../styles/Header/Header.scss"

export default function Header (props) {
	
	const { main, sub, flag = false } = props
	const classHeader = flag? "header header--margin": "header"

	return(
		<div className={classHeader}>
			<div className="header__item">
				<span className="header__main text-nowrap"><b>{main}</b></span>
				<span className="spacing-xs"></span>
			</div>
			{sub&&(
				<div className="text-nowrap header__item header__item--center">
					<span className="header__line">|</span>
					<span className="spacing-xs"></span>
					<span className="header__sub">{sub}</span>
				</div>
			)}
		</div>
	)

}