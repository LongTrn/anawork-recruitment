import React, { useState, } from 'react';
import "../../styles/ButtonDetail/ButtonDetail.scss"
import { Modal, } from "react-bootstrap";
import { ModalPreviewRecruit, } from "../index"

export default function ButtonDetail ({ header = "Yêu cầu tuyển dụng", data}) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<button
				type="button"
				className="btn btn-outline-primary table__rows__behavior__button text-nowrap "
				onClick={handleShow}
			>
				<i class="bi bi-list-ul table__rows__behavior__button__icon"/>
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
					closeVariant="success"
					className="modal-preview-recruit__header"
				>
					<Title className="modal-preview-recruit__header__text">{header||"Yêu cầu tuyển dụng"}</Title>
				</Header>
				<Body>
					<ModalPreviewRecruit data={data} view/>
				</Body>
				<Footer classNamem="gap-2">
					<button className="btn btn-white button__cancel" onClick={handleClose}><span className="button__detail__text__cancel">Từ chối</span></button>
					<button className="btn btn-primary button__detail "><span className="button__detail__text">Duyệt yêu cầu</span></button>
				</Footer>
			</Modal>
		</div>

	)
}