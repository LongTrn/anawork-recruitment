import React, { useState, } from 'react';
import "../../styles/ButtonDetail/ButtonDetail.scss"
import { Button, Modal, } from "react-bootstrap";
import { ModalPreviewRecruit, } from "../index"

export default function ButtonDetail ({ header = "Yêu cầu tuyển dụng", }) {
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
				>
					<Title>{header||"Modal title"}</Title>
				</Header>
				<Body>
					<ModalPreviewRecruit/>
				</Body>
				<Footer>
					<Button variant="primary">Thêm</Button>
					<Button variant="secondary" onClick={handleClose}>Hủy</Button>
				</Footer>
			</Modal>

		</div>

	)
}