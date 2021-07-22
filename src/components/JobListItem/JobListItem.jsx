import React, { } from 'react';
import "../../styles/JobListItem/JobListItem.scss"
import { Link, } from "react-router-dom"
import { Container, Row, Col,} from 'react-bootstrap';

export default function JobListItem ({id, title="title", positionName="position name", postDate="DD/MM/YYYY", salary="Thương lượng"}) {

	const jobDetailURL = `job-detail/${id}`

	return (
		<div className="job-item">
			<div className="job-item__info">
				<Container>
					<Row className="job-item__info--flex-end">
						<Col> 
							<Link 
								to={jobDetailURL} 
								className="text-decoration-none text-uppercase job-item__info__header"
							>{title}</Link>
							<div>
								<div className="job-item__info__text"><span className="job-item__info__label">Vị trí:</span> {positionName}</div>
							</div>
						</Col>
						<Col>
							<div className="job-item__info__text"><span className="job-item__info__label">Ngày đăng:</span> {postDate}</div> 
						</Col>
						<Col>
							<div className="job-item__info__text"><span className="job-item__info__label">Mức lương:</span > <span className="job-item__info--gold">{salary}</span></div>
						</Col>
					</Row>
				</Container>
			</div>
			<div className="job-item__action">
				<Link 
					to={jobDetailURL} 
					className="text-decoration-none text-uppercase"
				>
					<button
						type="button"
						className="btn btn-outline-primary job-item__action__button shadow-none text-uppercase"
					>Nộp hồ sơ</button>
				</Link>
			</div>
		</div>
	)
}