import React from 'react';
import "../../styles/JobListItem/JobListItem.scss"
import { Link, } from "react-router-dom"
import { Container, Row, Col,} from 'react-bootstrap';
import moment from 'moment';

export default function JobListItem ({ id, name, extend_position_name, created_at, salary }) {

	const jobDetailURL = `/job-list/job-detail/${id}`

	return (
		<div className="job-item">
			<div className="job-item__info">
				<Container>
					<Row className="job-item__info--flex-end">
						<Col className="job-item__info--modified"> 
							<Link 
								replace={true}
								to={jobDetailURL} 
								className="text-decoration-none text-uppercase job-item__info__header"
							>{ name }</Link>
						</Col>
					</Row>
					<Row className="job-item__info--flex-end job-item__info__sub">
						<Col className="job-item__info--modified"> 
							<div>
								<div className="job-item__info__text"><span className="job-item__info__label">Vị trí:</span> {extend_position_name}</div>
							</div>
						</Col>
						<Col className="job-item__info--modified">
							<div className="job-item__info__text"><span className="job-item__info__label">Ngày đăng:</span> {moment(created_at).format("DD/MM/YYYY")}</div> 
						</Col>
						<Col className="job-item__info--modified">
							<div className="job-item__info__text"><span className="job-item__info__label">Mức lương:</span > <span className="job-item__info--gold">{salary}</span></div>
						</Col>
					</Row>
				</Container>
			</div>
			<div className="job-item__action">
				<Link 
					replace={true}
					to={jobDetailURL} 
					className="text-decoration-none text-uppercase"
				>
					<button
						type="button"
						// className="btn btn-outline-primary job-item__action__button shadow-none text-uppercase"
						className="btn job-item__action__button shadow-none text-uppercase"
					>Nộp hồ sơ</button>
				</Link>
			</div>
		</div>
	)
}