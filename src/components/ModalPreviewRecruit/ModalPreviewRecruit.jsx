import React, { useState, useEffect, } from 'react'
import "../../styles/ModalPreviewRecruit/ModalPreviewRecruit.scss"
import { Container, Row, Col, } from "react-bootstrap"
// import { EditorState, ContentState, convertToRaw } from 'draft-js';
// import { Editor, } from "react-draft-wysiwyg";
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import { TextEditorToolbarOption } from "../../models/index"
import moment from 'moment';
import { axios } from "../../config/index"

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
		code: "",
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
		code,
	} = state

	const [day, setDay] = useState({
		startDay: moment(plan_start).format('YYYY-MM-DD'),
		endDay: moment(plan_end).format('YYYY-MM-DD'),
	})

	const {startDay, endDay} = day;
	
	// const time = new Date();
	// const [currentDay, currentMonth, currentYear] = [time.getDate(), time.getMonth(), time.getFullYear()]
	const today = moment().format("YYYY-MM-DD");

	// 1 create new without data
    // const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
	// 2 create new with existing data
	// const contentBlock = htmlToDraft(description);
	// const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
	// const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
    // const [content, setContent] = useState('');
	
	// const handleChangeEditorState = (newState) => {
		// setEditorState(newState);
		// setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
	// }
	const handleChange = (event) => {

		// console.log('handleChange', event.target.name, event.target.value);
		setState(prev => {
			return({
				...prev,
				[event.target.name]: event.target.value
			})
		})
	};

	const fetchData = async ( id ) => {
		const response = await axios.get(`/api/recruits/requests/${id}`)
		
		if (!response.data.success) { return []}
		console.log(response.data)

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
			code,
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
			code,
		}})
		console.log(state)
	}
	
	// /** Convert html string to draft JS */
	// const contentBlock = htmlToDraft(response.data.blog.content);
	// const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
	// const editorState = EditorState.createWithContent(contentState);
	// setEditorState(editorState);

	// useEffect(() => {
	// 	// setEditorState("")

	// }, [editorState])

	useEffect(() => {

	}, [ day, ])

	useEffect(() => {
		// console.log(data)
		setDay({
			startDay: moment(state.plan_start).format('YYYY-MM-DD'),
			endDay: moment(state.plan_end).format('YYYY-MM-DD'),
		})
	}, [ state, ])

	useEffect(() => {

		if (id) fetchData(id)
	}, [id,])

	return (
		<Container className="request-recruit">
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="name" className="label--right text-nowrap">Tên yêu cầu:</label></Col>
				{/* <Col sm={9} className="request-recruit__col" ><input id="name" type="text" className="input--borderless" name="name"  value={name}/></Col> */}
				<Col sm={9} className="request-recruit__col" ><p>{name}</p></Col>
				
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="type" ><b className="label--right text-nowrap">Loại tuyển dụng:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					{/* <select name="type" id="type-select" className="input--borderless" value={category_id} >
						<option value="1">Tuyển mới</option>
						<option value="2">Thay thế</option>
					</select> */}
					<p>{category_id === 1?"Tuyển mới": "Thay thế"}</p>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="position" className="label--right text-nowrap "><b className="label--right text-nowrap">Chức vụ:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					{/* <select name="position" id="type-select" className="input--borderless" value={extend_position_name} >
						<option value={extend_position_name}>{extend_position_name}</option>
					</select> */}
					<p>{extend_position_name}</p>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="count"  ><b className="label--right text-nowrap">Số lượng:</b></label></Col>
				{/* <Col sm={3} className="request-recruit__col" ><input id="count" type="number" value={quantity || 1} min={0} className="input--borderless" name="count" /></Col> */}
				<Col sm={3} className="request-recruit__col" ><p>{quantity}</p></Col>
				
				<Col sm={3} className="request-recruit__col" ><label htmlFor="salary" ><b className="label--right text-nowrap">Mức lương đề xuất:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					{/* <select name="salary" id="type-select" value={salary} >
						<option value="0">Không hỗ trợ</option>
						<option value="1">2,000,000</option>
						<option value="2">4,000,000</option>
						<option value="3">6,000,000</option>
						<option value="4">9,000,000</option>
					</select> */}
					<p>{salary || "---"}</p>
				</Col>
			</Row>
			<Row>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="date-start"  ><b className="label--right text-nowrap">Từ ngày:</b></label></Col>
				{/* <Col sm={3} className="request-recruit__col" ><input type="date" id="date-start" name="dateStart" value={startDay || today} minvalue="2018-01-01" maxvalue="2018-12-31"   /></Col> */}
				<Col sm={3} className="request-recruit__col" ><p>{moment(startDay).format('DD/MM/YYYY')}</p></Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="date-end" ><b className="label--right text-nowrap">Đến ngày:</b></label></Col>
				{/* <Col sm={3} className="request-recruit__col" ><input type="date" id="date-start" name="dateEnd" value={endDay || today} minvalue="2018-01-01" maxvalue="2018-12-31"   /></Col> */}
				<Col sm={3} className="request-recruit__col" ><p>{moment(endDay).format("DD/MM/YYYY")}</p></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="creator" ><b className="label--right text-nowrap">Người duyệt:</b></label></Col>
				<Col sm={9} className="request-recruit__col" ><input id="creator" type="text" className="input--borderless" value={extend_approver_fullname_email} name="creator" /></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="description" ><b className="label--right text-nowrap">Mô tả yêu cầu:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >
					{/* <Editor 
						editorState={editorState} 
						onEditorStateChange={handleChangeEditorState}
						toolbar={TextEditorToolbarOption} /> */}
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="description" ><b className="label--right text-nowrap">Tệp đính kèm:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >{!code || "Danh sách tệp đính kèm"}</Col>
			</Row>
		</Container>
	)
}