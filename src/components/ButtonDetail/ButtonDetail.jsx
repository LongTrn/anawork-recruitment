import React, { useState, useEffect, } from 'react';
import "../../styles/ButtonDetail/ButtonDetail.scss"
import { Modal, } from "react-bootstrap";
import { ModalPreviewRecruit, } from "../index"
import { axios } from "../../config/index"
export default function ButtonDetail ({ header = "Yêu cầu tuyển dụng", id, }) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
	const [data, setData] = useState(null);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
					<button className="btn btn-white button__cancel" onClick={handleClose}><span className="button__detail__text__cancel">Từ chối</span></button>
					<button className="btn btn-primary button__detail "><span className="button__detail__text">Duyệt yêu cầu</span></button>
				</Footer>
			</Modal>
		</div>

	)
}