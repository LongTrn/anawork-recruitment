import React, { useState, } from 'react';
import "../../styles/ButtonEdit/ButtonEdit.scss"
import { Button, Modal, } from "react-bootstrap";
import { ModalPreviewRecruit, } from "../index"

export default function ButtonEdit ({ header = "Yêu cầu tuyển dụng", }) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<button
				type="button"
				className="btn table__rows__behavior__button table__rows__behavior__button--editable button--borderless"
				onClick={handleShow}
			>
				<i class="bi bi-pencil-fill table__rows__behavior__button__icon"></i>
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