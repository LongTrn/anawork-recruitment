import React, { useState, } from 'react';
import "../../styles/ButtonView/ButtonView.scss"
import { Button, Modal, } from "react-bootstrap";
import { ModalPreviewRecruit, } from "../index"

export default function ButtonView ({ header = "Yêu cầu tuyển dụng", data }) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<button
				type="button"
				className="btn table__rows__behavior__button text-nowrap button--borderless"
				onClick={handleShow}
			>
				<i class="bi bi-list-ul table__rows__behavior__button__icon"/>
				{/* <span className="table__rows__behavior__button__text">Xem chi tiết</span> */}
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
					<ModalPreviewRecruit data={data} view={true}/>
				</Body>
				<Footer>
					<button className="btn btn-primary button__detail " onClick={handleClose}><span className="button__text button__text">Xong</span></button>
				</Footer>
			</Modal>
		</div>

	)
}