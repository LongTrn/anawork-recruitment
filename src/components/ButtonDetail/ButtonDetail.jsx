import React, { useState, useEffect, } from 'react';
import "../../styles/ButtonDetail/ButtonDetail.scss"
import { Modal, } from "react-bootstrap";
import { ModalPreviewRecruit, } from "../index"
import { axios } from "../../config/index"
export default function ButtonDetail ({ header = "Yêu cầu tuyển dụng", id, }) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
	const [data, setData] = useState({});
  
	const handleClose = () => setShow(false);
	const handleShow = (event) => {
		console.log(event.target)
		setShow(true)
	};

	const fetchData = async ( id ) => {
		const response = await axios.get(`/api/recruits/requests/${id}`)
		
		if (!response.data.success) { return []}
		console.log(response.data)

		const {
			name,
			category_id,
			extend_position_name,
			quantity,
			salary,
			plan_start,
			plan_end,
			extend_approver_fullname_email,
			job_description,
			code,
		} = response.data.data

		setData(prev => {return{
			name,
			category_id,
			extend_position_name,
			quantity,
			salary,
			plan_start,
			plan_end,
			extend_approver_fullname_email,
			job_description,
			code,
		}})
		console.log({
			name,
			category_id,
			extend_position_name,
			quantity,
			salary,
			plan_start,
			plan_end,
			extend_approver_fullname_email,
			job_description,
			code,
		})
		console.log(data)
		
	}
	
	useEffect(() => {
		
		console.log(data)
		if (show) {
			
			fetchData(id)
		}
	}, [show])

	return (
		<div>
			<button
				type="button"
				className="btn btn-outline-primary table__rows__behavior__button text-nowrap "
				onClick={handleShow}
				id={id}
			>
				<i id={id} className="bi bi-list-ul table__rows__behavior__button__icon" />
				<span id={id} className="table__rows__behavior__button__text">Xem chi tiết</span>
			</button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				className="modal"
			>
				<Header 
					closeButton
					closeLabel=""
					closeVariant="success"
					className="modal-preview-recruit__header"
				>
					<Title className="modal-preview-recruit__header__text">{header||"Yêu cầu tuyển dụng"}</Title>
				</Header>
				<Body>
					<ModalPreviewRecruit id={id} view/>
				</Body>
				<Footer classNamem="gap-2">
					<button className="btn btn-white button__cancel" onClick={handleClose}><span className="button__detail__text__cancel">Từ chối</span></button>
					<button className="btn btn-primary button__detail "><span className="button__detail__text">Duyệt yêu cầu</span></button>
				</Footer>
			</Modal>
		</div>

	)
}