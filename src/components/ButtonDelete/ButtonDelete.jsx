import React, { useState, } from 'react';
import "../../styles/ButtonDelete/ButtonDelete.scss"
import { Button, Modal, } from "react-bootstrap";

export default function ButtonDelete ({ header = "Yêu cầu tuyển dụng", }) {
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
				<i class="bi bi-trash-fill table__rows__behavior__button__icon"/>
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
					<Title>{"Xóa yêu cầu tuyển dụng"}</Title>
				</Header>
				<Body>
					Bạn có muốn xóa bỏ yêu cầu này không?
				</Body>
				<Footer>
					<Button variant="danger">Xóa</Button>
					<Button variant="secondary" onClick={handleClose}>Không</Button>
				</Footer>
			</Modal>

		</div>

	)
}