import React, { useState, } from 'react';
import "../../styles/ButtonDelete/ButtonDelete.scss"
import { Modal, } from "react-bootstrap";
import { axios, } from "../../config/index"
import { useDispatch, useSelector} from "react-redux"
import { 
	FETCH_RECRUIT_DATA, 
} from '../../redux/recruit/recruitActionType';
import { 
	FETCH_MY_RECRUIT_DATA, 
} from '../../redux/myRecruit/myRecruitActionType';

export default function ButtonDelete ({ header = "Yêu cầu tuyển dụng", id }) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
	
	const { index, pageSize, all } = useSelector(state => state.recruit)
	const { index: myIndex, pageSize: myPageSize, } = useSelector(state => state.myRecruit)
	const dispatch = useDispatch();
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleDelete = async () => {
		
		const url = `/api/recruits/requests/${id}`
		const response = await axios.delete(url)
		if (!response.data.success) return;
		fetchData()
		handleClose();
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
				<i className="bi bi-trash-fill table__rows__behavior__button__icon"/>
			</button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				className="modal"
			>
				<Header>
					<Title>{"Xóa yêu cầu tuyển dụng"}</Title>
					<button className="btn shadow-none" onClick={handleClose}><i className="bi bi-x-lg"></i></button>
				</Header>
				<Body className="button__delete button__delete__body">
					Bạn có muốn xóa bỏ yêu cầu này không?
				</Body>
				<Footer className="gap-2">
					<button className="btn button__delete shadow-none"><span className="button__delete__text" onClick={handleDelete}>Xóa</span></button>
					<button className="btn button__delete__cancel shadow-none" onClick={handleClose}><span className="button__delete__text__cancel">Hủy</span></button>
				</Footer>
			</Modal>

		</div>

	)
}