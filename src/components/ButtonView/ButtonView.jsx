import React, { useState, } from 'react';
import "../../styles/ButtonView/ButtonView.scss"
import { Modal, } from "react-bootstrap";
import { ModalPreviewRecruit, } from "../index"

export default function ButtonView ({ header = "Yêu cầu tuyển dụng", id }) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<button
				type="button"
				className="btn table__rows__behavior__button text-nowrap button--borderless shadow-none"
				onClick={handleShow}
			>
				<i className="bi bi-list-ul table__rows__behavior__button__icon"/>
			</button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				className="modal"
			>
				<Header>
					<Title className="modal-preview-recruit__header__text text-nowrap">{header||"Yêu cầu tuyển dụng"}</Title>
					<button className="btn shadow-none" onClick={handleClose}><i className="bi bi-x-lg"></i></button>
				</Header>
				<Body>
					<ModalPreviewRecruit view={true} id={id}/>
				</Body>
				<Footer>
					<>
						<button className="btn btn-primary button__view shadow-none" onClick={handleClose}><span className="button__view__text button__text">Đóng</span></button>
					</>
				</Footer>
			</Modal>
		</div>
	)
}