import React, { useState, useEffect,} from "react";
import "../../styles/JobDetail/JobDetail.scss"
import { Container, Row, Col,} from 'react-bootstrap';
import { useParams, } from "react-router-dom"
import { useDispatch, useSelector, } from "react-redux"
import { FETCH_JOB_DETAIL, } from '../../redux/jobs/jobsActionType';
import moment from 'moment';

export default function JobDetail (props) {
	
	const { idJobDetail: id } = useParams()
	const dispatch = useDispatch();
	const { data } = useSelector(state => state.jobs);
	const {
		name,
		extend_position_name,
		created_at,
		salary,
		job_description
	} = data;
	const renderHtml = () => ({__html: job_description})

	useEffect(() => {

		console.log(id)
		dispatch({type: FETCH_JOB_DETAIL, payload: { input: { id }}})
	}, [ id ])

	return (
		<div className="job-detail">
			<div className="job-detail__header">
				<div className="job-detail__header__section">
				<div className="job-detail__header__text text-uppercase">{name}</div>
				<div className="job-detail__header__sub">
					<Container fluid>
						<Row className="job-detail__header__sub--modified">
							<Col className="job-detail__header__sub--no-padding"><div className="text-nowrap job-detail__header__sub__text"><span className="job-detail__header__sub__label">Vị trí:</span> {extend_position_name}</div> </Col>
							<Col className="job-detail__header__sub--no-padding"><div className="text-nowrap job-detail__header__sub__text"><span className="job-detail__header__sub__label">Ngày đăng:</span> {moment(created_at).format("DD/MM/YYYY")}</div> </Col>
							<Col className="job-detail__header__sub--no-padding"><div className="text-nowrap job-detail__header__sub__text"><span className="job-detail__header__sub__label">Mức lương:</span > <span className="job-item__info--gold">{salary}</span></div></Col>
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
			<div className="job-detail__body" dangerouslySetInnerHTML={renderHtml()}></div>
		</div>
	)
}