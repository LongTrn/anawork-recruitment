import React, { useState, useRef, } from 'react';
import "../../styles/ButtonEdit/ButtonEdit.scss"
import { Modal, } from "react-bootstrap";
import { ModalRequestRecruit, } from "../index"

export default function ButtonEdit ({ header = "Yêu cầu tuyển dụng", id}) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
	const buttonRef = useRef();


	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSubmit = async (event) => {
		
		buttonRef.current.edit()
		handleClose()
	}

	return (
		<div>
			<button
				type="button"
				className="btn table__rows__behavior__button table__rows__behavior__button--editable button--borderless"
				onClick={handleShow}
			>
				<i className="bi bi-pencil-fill table__rows__behavior__button__icon"></i>
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
					// closeVariant="success"
				>
					<Title className="modal-preview-recruit__header__text text-nowrap">{header||"Yêu cầu tuyển dụng"}</Title>
				</Header>
				<Body>
					<ModalRequestRecruit id={id} ref={buttonRef}  handleSubmit={handleSubmit}/>
				</Body>
				<Footer className="gap-2">
					<button className="btn btn-primary button__edit "><span className="button__edit__text" onClick={handleSubmit}>Chỉnh sửa</span></button>
					<button className="btn btn-white button__cancel" onClick={handleClose}><span className="button__edit__text__cancel">Hủy bỏ</span></button>
				</Footer>
			</Modal>

		</div>

	)
}