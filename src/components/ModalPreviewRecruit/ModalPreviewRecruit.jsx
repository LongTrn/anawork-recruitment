import React, { useState, useEffect, } from 'react'
import "../../styles/ModalPreviewRecruit/ModalPreviewRecruit.scss"
import { Container, Row, Col, } from "react-bootstrap"
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor, } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
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

	const handleDateChange = (event) => {
		console.log(event.target.name)
		setDay(prev => {
			return({
				...prev,
				[event.target.name]: event.target.value,
			})
		})
	};

	const handleChange = (event) => {

		console.log('handleChange', event.target.name, event.target.value);
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
		
		// console.log({
		// 	name,
		// 	category_id,
		// 	extend_position_name,
		// 	quantity,
		// 	salary,
		// 	plan_start,
		// 	plan_end,
		// 	extend_approver_fullname_email,
		// 	job_description,
		// 	code,
		// })
		// console.log(state)
		
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
	}, [ state, ])

	useEffect(() => {
		fetchData(id)
		console.log(data)
	}, [])

	return (
		<Container className="request-recruit">
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="name" className="label--right text-nowrap">Tên yêu cầu:</label></Col>
				<Col sm={9} className="request-recruit__col" ><input id="name" type="text" className="input--borderless" value={ name || ""} name="name" onChange={handleChange} disabled={view}/></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="type" ><b className="label--right text-nowrap">Loại tuyển dụng:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					{view?
						(<input type="text" className="input--borderless" disabled={true} >{category_id}</input>)
						:
						(<select name="type" id="type-select" className="input--borderless" value={1} onChange={handleChange}>
							<option value="1">Tuyển mới</option>
							<option value="2">Thay thế</option>
						</select>)
					}
				</Col>
				<Col sm={3} className="request-recruit__col" ><label for="position" className="label--right text-nowrap "><b className="label--right text-nowrap">Chức vụ:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >

					<select name="position" id="type-select" className="input--borderless" disabled={view} onChange={handleChange}>
					{/* <select name="position" id="type-select" className="input--borderless" disabled={view} value={extend_position_name} onChange={handleChange}> */}
						<option value="0">Nhân viên</option>
						<option value="1">Chức vụ 1</option>
						<option value="2">Chức vụ 2</option>
					</select>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="quantity"  ><b className="label--right text-nowrap">Số lượng:</b></label></Col>
				<Col sm={3} className="request-recruit__col" ><input id="quantity" type="number" className="input--borderless" disabled={view} name="quantity" min={0} onChange={handleChange}/></Col>
				{/* <Col sm={3} className="request-recruit__col" ><input id="quantity" type="number" value={parseInt(quantity)} className="input--borderless" disabled={view} name="quantity" min={0} onChange={handleChange}/></Col> */}
				<Col sm={3} className="request-recruit__col" ><label for="salary" ><b className="label--right text-nowrap">Mức lương đề xuất:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					{/* <select name="salary" id="type-select" onChange={handleChange} value={salary} disabled={view}> */}
					<select name="salary" id="type-select" value={0} onChange={handleChange} disabled={view}>
						<option value="0">Không hỗ trợ</option>
						<option value="1">2,000,000</option>
						<option value="2">4,000,000</option>
						<option value="3">6,000,000</option>
						<option value="4">9,000,000</option>
					</select>
				</Col>
			</Row>
			<Row>
				<Col sm={3} className="request-recruit__col" ><label for="date-start"  ><b className="label--right text-nowrap">Từ ngày:</b></label></Col>
				<Col sm={3} className="request-recruit__col" ><input type="date" id="date-start" name="startDay" value={startDay || today} minValue="2021-01-01" maxValue="2018-12-31" onChange={handleDateChange} disabled={view}/></Col>
				<Col sm={3} className="request-recruit__col" ><label for="date-end" ><b className="label--right text-nowrap">Đến ngày:</b></label></Col>
				<Col sm={3} className="request-recruit__col" ><input type="date" id="date-end" name="endDay" value={endDay || today} minValue="2021-01-01" maxValue="2021-12-31" onChange={handleDateChange} disabled={view}/></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="creator" ><b className="label--right text-nowrap">Người duyệt:</b></label></Col>
				<Col sm={9} className="request-recruit__col" ><input id="creator" type="text" className="input--borderless" name="creator" onChange={handleChange} disabled={view}/></Col>
				{/* <Col sm={9} className="request-recruit__col" ><input id="creator" type="text" className="input--borderless" value={extend_approver_fullname_email} name="creator" onChange={handleChange} disabled={view}/></Col> */}
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="description" ><b className="label--right text-nowrap">Mô tả yêu cầu:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >
					{/* <Editor 
						readOnly={view}
						editorState={editorState} 
						toolbar={TextEditorToolbarOption} 
						onEditorStateChange={handleChangeEditorState}/> */}
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="files" ><b className="label--right text-nowrap">Tệp đính kèm:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >{"code"}</Col>
				{/* <Col sm={9} className="request-recruit__col" >{code}</Col> */}
			</Row>
		</Container>
	)
}