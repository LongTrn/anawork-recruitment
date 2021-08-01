import React, { useState, } from 'react';
import "../../styles/ButtonView/ButtonView.scss"
import { Modal, } from "react-bootstrap";

export default function withRecruitment(WrappedButton, WrappedTitleModal, WrappedModalBody, WrappedModalFooter ) {

	return function WithRecruitment () {
		const { Header, Title, Body, Footer, } = Modal;
		const [show, setShow] = useState(false);
	  
		const handleClose = () => setShow(false);
		const handleShow = () => setShow(true);
	
		return (
			<div>
				<WrappedButton />
	
				<Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
					className="modal"
				>
					<Header>
						<WrappedTitleModal />
						<button className="btn shadow-none" onClick={handleClose}><i className="bi bi-x-lg"></i></button>
					</Header>
					<Body>
						<WrappedModalBody view={true} id={0}/>
					</Body>
					<Footer>
						<WrappedModalFooter />
					</Footer>
				</Modal>
			</div>
		)
	}
}