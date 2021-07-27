import React, { useState, useEffect, } from 'react'
import "../../styles/ModalPreviewRecruit/ModalPreviewRecruit.scss"
import { Container, Row, Col, } from "react-bootstrap"
import moment from 'moment';
import { axios } from "../../config/index"

import ReactSummernote from 'react-summernote';

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
window.jQuery = $;
require('bootstrap');

export default function ModalPreviewRecruit ({ data, view = false, id}) {
	const [state, setState] = useState({ 
		name: "",
		category_id: 1,
		extend_position_name: "",
		quantity: 1,
		salary: "",
		plan_start: moment().format('YYYY-MM-DD'),
		plan_end: moment().format('YYYY-MM-DD'),
		extend_approver_fullname_email: "",
		job_description: "",
		// code: "",
	})
	const { 
		name,
		category_id,
		extend_position_name,
		quantity,
		salary,
		plan_start,
		plan_end,
		extend_approver_fullname_email,
		job_description,
		// code,
	} = state

	const [day, setDay] = useState({
		startDay: moment(plan_start).format('YYYY-MM-DD'),
		endDay: moment(plan_end).format('YYYY-MM-DD'),
	})

	const {startDay, endDay} = day;
	
    const [content, setContent] = useState('');

	const changeDescriptionEditor = (content) => {

		setContent(content)
		setState(prev => {return({
			...prev,
			description: content,
		})})
	}

	const fetchData = async ( id ) => {
		const response = await axios.get(`/api/recruits/requests/${id}`)
		
		if (!response.data.success) { return []}
		// console.log(response.data)

		const {
			name,
			category_id,
			extend_position_name,
			quantity,
			salary,
			plan_start,
			plan_end,
			extend_approver_fullname_email,
			job_description,
			// code,
		} = response.data.data

		setState(prev => {return{
			name,
			category_id,
			extend_position_name,
			quantity,
			salary,
			plan_start,
			plan_end,
			extend_approver_fullname_email,
			job_description,
			// code,
		}})
	}
	
	useEffect(() => {

	}, [ day, ])

	useEffect(() => {
		setDay({
			startDay: moment(state.plan_start).format('YYYY-MM-DD'),
			endDay: moment(state.plan_end).format('YYYY-MM-DD'),
		})
	}, [ state, ])

	useEffect(() => {

		if (id) fetchData(id)
	}, [id,])

	return (
		<Container className="preview-recruit">
			<Row className="preview-recruit__row preview-recruit__row__label">
				<Col sm={12} className="preview-recruit__col" ><label htmlFor="name" className="label--left text-nowrap">Tên yêu cầu:</label></Col>
			</Row>
			<Row className="preview-recruit__row">
				<Col sm={12} className="preview-recruit__col preview-recruit__col--end-section " ><div className="preview-recruit__col__value">{name}</div></Col>
			</Row>
			<Row className="preview-recruit__row preview-recruit__row__label">
				<Col sm={6} className="preview-recruit__col preview-recruit__col__label--margin-bottom" ><label htmlFor="type" className="label--left text-nowrap" >Loại tuyển dụng:</label></Col>
				<Col sm={6} className="preview-recruit__col preview-recruit__col__label--margin-bottom" ><label htmlFor="position" className="label--left text-nowrap ">Chức vụ:</label></Col>
			</Row>
			<Row className="preview-recruit__row">
				<Col sm={6} className="preview-recruit__col preview-recruit__col__value--margin-bottom" ><div className="preview-recruit__col__value">{category_id?category_id === 1?"Tuyển mới": "Thay thế":""}</div></Col>
				<Col sm={6} className="preview-recruit__col preview-recruit__col__value--margin-bottom preview-recruit__col--end-section" ><div className="preview-recruit__col__value">{extend_position_name}</div></Col>
			</Row>
			<Row className="preview-recruit__row preview-recruit__row__label">
				<Col sm={6} className="preview-recruit__col preview-recruit__col__label--margin-bottom" ><label htmlFor="count"  className="label--left text-nowrap">Số lượng:</label></Col>
				<Col sm={6} className="preview-recruit__col preview-recruit__col__label--margin-bottom" ><label htmlFor="salary" className="label--left text-nowrap">Mức lương đề xuất:</label></Col>
			</Row>
			<Row className="preview-recruit__row">
				<Col sm={6} className="preview-recruit__col preview-recruit__col__value--margin-bottom" ><div className="preview-recruit__col__value">{quantity}</div></Col>
				<Col sm={6} className="preview-recruit__col preview-recruit__col__value--margin-bottom preview-recruit__col--end-section" ><div className="preview-recruit__col__value">{salary || "---"}</div></Col>
			</Row>
			<Row className="preview-recruit__row preview-recruit__row__label">
				<Col sm={6} className="preview-recruit__col preview-recruit__col__label--margin-bottom" ><label htmlFor="date-start"  className="label--left text-nowrap">Từ ngày:</label></Col>
				<Col sm={6} className="preview-recruit__col preview-recruit__col__label--margin-bottom" ><label htmlFor="date-end" className="label--left text-nowrap">Đến ngày:</label></Col>
			</Row>
			<Row className="preview-recruit__row">
				<Col sm={6} className="preview-recruit__col preview-recruit__col__value--margin-bottom" ><div className="preview-recruit__col__value">{moment(startDay).format('DD/MM/YYYY') || "DD/MM/YYYY"}</div></Col>
				<Col sm={6} className="preview-recruit__col preview-recruit__col__value--margin-bottom preview-recruit__col--end-section" ><div className="preview-recruit__col__value">{moment(endDay).format("DD/MM/YYYY") || "DD/MM/YYYY"}</div></Col>
			</Row>
			<Row className="preview-recruit__row preview-recruit__row__label">
				<Col sm={12} className="preview-recruit__col" ><label htmlFor="creator" className="label--left text-nowrap">Người duyệt:</label></Col>
			</Row>
			<Row className="preview-recruit__row">
				<Col sm={6} className="preview-recruit__col" ><div className="preview-recruit__col__value preview-recruit__col--end-section text-wrap">{extend_approver_fullname_email}</div></Col>
			</Row>
			<Row className="preview-recruit__row preview-recruit__row__label">
				<Col sm={12} className="preview-recruit__col" ><label htmlFor="description" className="label--left text-nowrap">Mô tả yêu cầu:</label></Col>
			</Row>
			<Row className="preview-recruit__row">
				<Col sm={12} className="preview-recruit__col" >
					<ReactSummernote
						disabled
						value={job_description || ""}
						options={{
							height: 200,
							dialogsInBody: true,
							toolbar: [
								['style', ['style']],
								['font', ['bold', 'underline', 'clear']],
								['fontname', ['fontname']],
								['para', ['ul', 'ol', 'paragraph']],
								['table', ['table']],
								['insert', ['link', 'picture', 'video']],
								['view', ['fullscreen', 'codeview']]
						]
						}}
						onChange={changeDescriptionEditor}
					/>
				</Col>
			</Row>
			{/* <Row className="preview-recruit__row preview-recruit__row__label">
				<Col sm={12} className="preview-recruit__col" ><label htmlFor="description" className="label--left text-nowrap">Tệp đính kèm:</label></Col>
			</Row>
			<Row className="preview-recruit__row">
				<Col sm={12} className="preview-recruit__col" >{!code || "Danh sách tệp đính kèm"}</Col>
			</Row> */}
		</Container>
	)
}