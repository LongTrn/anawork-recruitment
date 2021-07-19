import React, { useState, } from 'react';
import "../../styles/ButtonDelete/ButtonDelete.scss"
import { Modal, } from "react-bootstrap";
import { axios, } from "../../config/index"

export default function ButtonDelete ({ header = "Yêu cầu tuyển dụng", id }) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleDelete = async () => {
		
		const url = `/api/recruits/requests/${id}`
		const response = await axios.delete(url)

		console.log(response)
		handleClose();
	}

	return (
		<div>
			<button
				type="button"
				className="btn table__rows__behavior__button table__rows__behavior__button--editable button--borderless"
				onClick={handleShow}
			>
				<i className="bi bi-trash-fill table__rows__behavior__button__icon"/>
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
				<Body className="button__delete button__delete__body">
					Bạn có muốn xóa bỏ yêu cầu này không?
				</Body>
				<Footer className="gap-2">
					<button className="btn button__delete "><span className="button__delete__text" onClick={handleDelete}>Xóa</span></button>
					<button className="btn button__delete__cancel" onClick={handleClose}><span className="button__delete__text__cancel">Hủy bỏ</span></button>
				</Footer>
			</Modal>

		</div>

	)
}