import React, { useState, useEffect, } from 'react';
import "../../styles/ButtonDetail/ButtonDetail.scss"
import { Modal, } from "react-bootstrap";
import { ModalPreviewRecruit, } from "../index"
import { axios } from "../../config/index"
export default function ButtonDetail ({ header = "Yêu cầu tuyển dụng", id, }) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
	const [state, setState] = useState("")
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleReject = async () => {
		const url =`/api/recruits/requests/${id}/reject`
		const response = await axios.put(url)
		if (!response.data.success) return handleClose()

		console.log("Reject request id: ", id)
		handleClose()
	}
	const handleApprove = async () => {
		const url = `/api/recruits/requests/${id}/approve`
		const response = await axios.put(url)
		if (!response.data.success) return handleClose()
		
		console.log("Approve request id: ", id)
		handleClose()
	}

	const fetchData = async ( id ) => {
		const response = await axios.get(`/api/recruits/requests/${id}`)
		
		if (!response.data.success) { return []}
		const {extend_request_status,} = response.data.data
		setState(extend_request_status)
	}
	useEffect(() => {fetchData(id)}, [id])
	
	return (
		<div>
			<button
				type="button"
				className="btn btn-outline-primary table__rows__behavior__button text-nowrap "
				onClick={handleShow}
			>
				<i className="bi bi-list-ul table__rows__behavior__button__icon" />
				<span className="table__rows__behavior__button__text">Xem chi tiết</span>
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
					className="modal-preview-recruit__header"
				>
					<Title className="modal-preview-recruit__header__text text-nowrap">{header||"Yêu cầu tuyển dụng"}</Title>
				</Header>
				<Body>
					<ModalPreviewRecruit id={id} view/>
				</Body>
				<Footer className="gap-2">
					{state !== "Chờ duyệt" ? 
						<>
							<button className="btn btn-primary button__detail " onClick={handleClose}><span className="button__detail__text">Xong</span></button>
						</>
						: (<>
							<button className="btn btn-primary button__detail " onClick={handleApprove}><span className="button__detail__text">Duyệt yêu cầu</span></button>
							<button className="btn btn-white button__cancel" onClick={handleReject}><span className="button__detail__text__cancel">Từ chối</span></button>
						</>)}
				</Footer>
			</Modal>
		</div>

	)
}