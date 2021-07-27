import React, { useState, useEffect, } from 'react';
import "../../styles/ButtonDetail/ButtonDetail.scss"
import { Modal, } from "react-bootstrap";
import { ModalPreviewRecruit, } from "../index"
import { axios } from "../../config/index"
import { useDispatch, useSelector} from "react-redux"
import { 
	FETCH_RECRUIT_DATA, 
} from '../../redux/recruit/recruitActionType';
import { 
	FETCH_MY_RECRUIT_DATA, 
} from '../../redux/myRecruit/myRecruitActionType';

export default function ButtonDetail ({ header = "Yêu cầu tuyển dụng", id, }) {
	const { Header, Title, Body, Footer, } = Modal;
	const [show, setShow] = useState(false);
	const [state, setState] = useState("")
	
	const { index, total, pageSize, all } = useSelector(state => state.recruit)
	const { index: myIndex, total: myTotal, pageSize: myPageSize, all: myAll } = useSelector(state => state.myRecruit)
	const dispatch = useDispatch();
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleReject = async () => {
		const url =`/api/recruits/requests/${id}/reject`
		const response = await axios.put(url)
		if (!response.data.success) return handleClose()
		fetchDataAsync()
		console.log("Reject request id: ", id)
		handleClose()
	}

	const handleApprove = async () => {
		const url = `/api/recruits/requests/${id}/approve`
		const response = await axios.put(url)
		if (!response.data.success) return handleClose()
		fetchDataAsync()
		console.log("Approve request id: ", id)
		handleClose()
	}

	const fetchDataAsync = () => {
		dispatch({ type: FETCH_RECRUIT_DATA, payload: { input: { all, index, size: pageSize}}})
		dispatch({ type: FETCH_MY_RECRUIT_DATA, payload: { input: { index: myIndex, size: myPageSize}}})
	}

	const fetchData = async ( id ) => {
		const response = await axios.get(`/api/recruits/requests/${id}`)
		
		if (!response.data.success) { return []}
		const {extend_request_status,} = response.data.data
		setState(extend_request_status)
	}
	useEffect(() => {fetchData(id)}, [id])
	
	return (
		<div>
			<button
				type="button"
				className="btn btn-outline-primary table__rows__behavior__button text-nowrap shadow-none"
				onClick={handleShow}
			>
				<i className="bi bi-list-ul table__rows__behavior__button__icon" />
				<span className="table__rows__behavior__button__text">Xem chi tiết</span>
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
					className="modal-preview-recruit__header"
				>
					<Title className="modal-preview-recruit__header__text text-nowrap">{header||"Yêu cầu tuyển dụng"}</Title>
				</Header>
				<Body>
					<ModalPreviewRecruit id={id} view/>
				</Body>
				<Footer className="gap-2">
					{state !== "Chờ duyệt" ? 
						<>
							<button className="btn btn-primary button__detail shadow-none" onClick={handleClose}><span className="button__detail__text">Đóng</span></button>
						</>
						: (<>
							<button className="btn btn-primary button__detail shadow-none" onClick={handleApprove}><span className="button__detail__text">Duyệt yêu cầu</span></button>
							<button className="btn btn-white button__cancel shadow-none" onClick={handleReject}><span className="button__detail__text__cancel">Từ chối</span></button>
						</>)}
				</Footer>
			</Modal>
		</div>

	)
}