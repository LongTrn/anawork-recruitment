import React, { useState, useRef, } from 'react'
import "../../styles/ButtonRecruit/ButtonRecruit.scss"
import { Button, Modal, } from "react-bootstrap";
import { ModalRequestRecruit, } from "../index"

export default function ButtonRecruit ({ header, }) {
	const buttonRef = useRef();
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onSubmit = (data) => {
		// call api here
		buttonRef.current.submit()
		handleClose();
	}

	return (
		<div>
			<Button 
				type="button" 
				className="button button--padding  button__container"
				// Trigger Modal
				onClick={handleShow}
				>
					<i className="bi bi-plus" />
					<span className="button__text text-nowrap">YÊU CẦU TUYỂN DỤNG</span>
			</Button>

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
				>
					<Title className="modal-request-recruit__header__text text-nowrap">{header||"Modal title"}</Title>
				</Header>
				<Body>
					<ModalRequestRecruit ref={buttonRef} onSubmit={onSubmit}/>
				</Body>
				<Footer className="gap-2">
					<button className="btn btn-primary button__recruit "><span className="button__recruit__text" onClick={onSubmit}>Thêm</span></button>
					<button className="btn btn-white button__recruit__cancel" onClick={handleClose}><span className="button__recruit__text__cancel">Hủy</span></button>
				</Footer>
			</Modal>
		</div>

	)
}