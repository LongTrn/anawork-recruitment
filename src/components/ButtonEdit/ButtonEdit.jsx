import React, { useState, useRef, } from 'react';
import "../../styles/ButtonEdit/ButtonEdit.scss"
import { Modal, } from "react-bootstrap";
import { ModalRequestRecruit, } from "../index"
import { useDispatch, useSelector} from "react-redux"
import { 
	FETCH_RECRUIT_DATA, 
} from '../../redux/recruit/recruitActionType';
import { 
	FETCH_MY_RECRUIT_DATA, 
} from '../../redux/myRecruit/myRecruitActionType';

export default function ButtonEdit ({ header = "Yêu cầu tuyển dụng", id}) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
	const buttonRef = useRef();
	
	const { index, pageSize, all } = useSelector(state => state.recruit)
	const { index: myIndex, pageSize: myPageSize, } = useSelector(state => state.myRecruit)
	const dispatch = useDispatch();
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSubmit = async (event) => {
		
		const response = await buttonRef.current.edit()
		if (!response) return handleClose()
		else {
			fetchData()
			handleClose()
			return;
		}
	}

	const fetchData = () => {
		dispatch({ type: FETCH_RECRUIT_DATA, payload: { input: { all, index, size: pageSize}}})
		dispatch({ type: FETCH_MY_RECRUIT_DATA, payload: { input: { index: myIndex, size: myPageSize}}})
	}

	return (
		<div>
			<button
				type="button"
				className="btn table__rows__behavior__button table__rows__behavior__button--editable button--borderless shadow-none"
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
				<Header>
					<Title className="modal-preview-recruit__header__text text-nowrap">{header||"Yêu cầu tuyển dụng"}</Title>
					<button className="btn shadow-none" onClick={handleClose}><i className="bi bi-x-lg"></i></button>
				</Header>
				<Body>
					<ModalRequestRecruit id={id} ref={buttonRef} />
				</Body>
				<Footer className="gap-2">
					<button className="btn btn-primary button__edit shadow-none"><span className="button__edit__text" onClick={handleSubmit}>Chỉnh sửa</span></button>
					<button className="btn btn-white button__edit__cancel shadow-none" onClick={handleClose}><span className="button__edit__text__cancel">Hủy bỏ</span></button>
				</Footer>
			</Modal>

		</div>

	)
}