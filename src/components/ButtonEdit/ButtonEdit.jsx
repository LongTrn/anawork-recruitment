import React, { useState, } from 'react';
import "../../styles/ButtonEdit/ButtonEdit.scss"
import { Button, Modal, } from "react-bootstrap";
import { ModalPreviewRecruit, } from "../index"

export default function ButtonEdit ({ header = "Yêu cầu tuyển dụng", data}) {
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
					<Title>{header||"Yêu cầu tuyển dụng"}</Title>
				</Header>
				<Body>
					<ModalPreviewRecruit data={data}/>
				</Body>
				<Footer classNamem="gap-2">
					<button className="btn btn-primary button__edit "><span className="button__edit__text">Chỉnh sửa</span></button>
					<button className="btn btn-white button__cancel" onClick={handleClose}><span className="button__edit__text__cancel">Hủy bỏ</span></button>
				</Footer>
			</Modal>

		</div>

	)
}