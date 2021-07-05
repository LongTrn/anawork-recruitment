import React, { useState, } from 'react'
import "../../styles/ButtonRecruit/ButtonRecruit.scss"
import { Button, Modal, } from "react-bootstrap";
import { ModalRequestRecruit, } from "../index"

export default function ButtonRecruit ({ header, }) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<Button 
				type="button" 
				className="button button--padding  "
				// Trigger Modal
				onClick={handleShow}
				>
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						width="16" height="16" 
						fill="#fff" 
						class="bi bi-plus-lg button__svg " 
						viewBox="0 0 16 16">
							<path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
					</svg>
					{/* class text-nowrap for avoiding drops few words */}
					<div className="button__text text-nowrap">YÊU CẦU TUYỂN DỤNG</div>
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
					closeVariant="success"
				>
					<Title>{header||"Modal title"}</Title>
				</Header>
				<Body>
					<ModalRequestRecruit/>
				</Body>
				<Footer>
					<Button variant="primary">Thêm</Button>
					<Button variant="secondary" onClick={handleClose}>Hủy</Button>
				</Footer>
			</Modal>
		</div>

	)
}