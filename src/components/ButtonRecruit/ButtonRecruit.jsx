import React, { useState, useRef, } from 'react'
import "../../styles/ButtonRecruit/ButtonRecruit.scss"
import { Button, Modal, } from "react-bootstrap";
import { ModalRequestRecruit, } from "../index"
import { useDispatch, useSelector } from "react-redux"
import { 
	FETCH_RECRUIT_DATA, 
} from '../../redux/recruit/recruitActionType';
import { 
	FETCH_MY_RECRUIT_DATA, 
} from '../../redux/myRecruit/myRecruitActionType';

export default function ButtonRecruit ({ header, }) {
	const buttonRef = useRef();
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
	
	const { index, pageSize, all } = useSelector(state => state.recruit)
	const { index: myIndex, pageSize: myPageSize, } = useSelector(state => state.myRecruit)
	const dispatch = useDispatch();
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onSubmit = async (data) => {
		// call api here
		const response = await buttonRef.current.submit()
		if (!response) {
			handleClose();
			return;
		}
		fetchData()
		handleClose();
	}
	
	const fetchData = () => {
		dispatch({ type: FETCH_RECRUIT_DATA, payload: { input: { all, index, size: pageSize}}})
		dispatch({ type: FETCH_MY_RECRUIT_DATA, payload: { input: { index: myIndex, size: myPageSize}}})
	}

	return (
		<div>
			<Button 
				type="button" 
				className="button button--padding  button__container shadow-none button-recruit text-nowrap"
				// Trigger Modal
				onClick={handleShow}
				>
					<i className="bi bi-plus" />
					<span className="button__recruit__text text-nowrap">YÊU CẦU TUYỂN DỤNG</span>
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				className="modal"
			>
				<Header 
					// closeButton
					// closeLabel=""
				>
					<Title className="modal-request-recruit__header__text text-nowrap">{header||"Modal title"}</Title>
					<button className="btn shadow-none" onClick={handleClose}><i className="bi bi-x-lg"></i></button>
				</Header>
				<Body>
					<ModalRequestRecruit ref={buttonRef} onSubmit={onSubmit}/>
				</Body>
				<Footer className="gap-2">
					<button className="btn btn-primary button__recruit shadow-none"><span className="button__recruit__text" onClick={onSubmit}>Thêm</span></button>
					<button className="btn btn-white button__recruit__cancel shadow-none" onClick={handleClose}><span className="button__recruit__text__cancel">Hủy</span></button>
				</Footer>
			</Modal>
		</div>

	)
}