import React, { useState, useEffect,} from "react";
import "../../styles/JobDetail/JobDetail.scss"
import { Container, Row, Col,} from 'react-bootstrap';

export default function JobDetail (props) {


	return (
		<div className="job-detail">
			<div className="job-detail__header">
				<div className="job-detail__header__section">
				<div className="job-detail__header__text text-uppercase">Title</div>
				<div className="job-detail__header__sub">
					<Container fluid>
						<Row className="job-detail__header__sub--modified">
							<Col className="job-detail__header__sub--no-padding"><div className="text-nowrap job-detail__header__sub__text"><span className="job-detail__header__sub__label">Vị trí:</span> {"position"}</div> </Col>
							<Col className="job-detail__header__sub--no-padding"><div className="text-nowrap job-detail__header__sub__text"><span className="job-detail__header__sub__label">Ngày đăng:</span> {"posted Date"}</div> </Col>
							<Col className="job-detail__header__sub--no-padding"><div className="text-nowrap job-detail__header__sub__text"><span className="job-detail__header__sub__label">Mức lương:</span > <span className="job-item__info--gold">{"salary"}</span></div></Col>
						</Row>
					</Container>
				</div>
				</div>
				
				<div className="job-detail__header__action">
					<button className="btn btn-primary text-uppercase shadow-none job-detail__header__action__button">
						<span className="job-detail__header__action__button__text">nộp hồ sơ</span>
					</button>
				</div>
			</div>
			
			<div className="job-detail__body">
				body
			</div>
		</div>
	)
}