import React, { useState, } from 'react';
import "../../styles/ButtonDelete/ButtonDelete.scss"
import { Modal, } from "react-bootstrap";

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
				<Body className="button__delete">
					Bạn có muốn xóa bỏ yêu cầu này không?
				</Body>
				<Footer classNamem="gap-2">
					<button className="btn btn-danger button__delete "><span className="button__delete__text">Chỉnh sửa</span></button>
					<button className="btn btn-primary button__delete__cancel" onClick={handleClose}><span className="button__delete__text__cancel">Hủy bỏ</span></button>
				</Footer>
			</Modal>

		</div>

	)
}