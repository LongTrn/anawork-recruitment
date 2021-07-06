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
		// <button
		// 	type="button"
		// 	className="btn btn-outline-primary table__rows__behavior__button text-nowrap 
		// 	"
		// >
		// 	<i class="bi bi-list-ul table__rows__behavior__button__icon"/>
		// 	<span className="table__rows__behavior__button__text">Xem chi tiết</span>
		// </button>
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
					<ModalPreviewRecruit data={data}/>
				</Body>
				<Footer>
					<button className="btn btn-white button__cancel" onClick={handleClose}><span className="button__text__cancel">Từ chối</span></button>
					<button className="btn btn-primary button__detail "><span className="button__text button__text">Duyệt yêu cầu</span></button>
				</Footer>
			</Modal>
		</div>

	)
}