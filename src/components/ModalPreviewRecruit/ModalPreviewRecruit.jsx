import React, { useState, useEffect, } from 'react'
import "../../styles/ModalPreviewRecruit/ModalPreviewRecruit.scss"
import { Container, Row, Col, } from "react-bootstrap"
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor, } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { TextEditorToolbarOption } from "../../models/index"

export default function ModalPreviewRecruit ({ data, view = false, }) {
	const [state, setState] = useState({
		...data,
		salary: "",
		view,
	})
	const { name, description, creator, salary, dateStart, dateEnd, count, files} = state
	
	const [day, setDay] = useState({
		startDay: dateStart.split("/").reverse().join("-"),
		endDay: dateEnd.split("/").reverse().join("-"),
	})
	const {startDay, endDay} = day;
	
	const time = new Date();
	const [currentDay, currentMonth, currentYear] = [time.getDate(), time.getMonth(), time.getFullYear()]
	const today = `${currentYear}-${(currentMonth + 1).length > 1? currentMonth + 1: `0${currentMonth + 1}`}-${currentDay.length > 1? currentDay:`0${currentDay}`}`

	// 1 create new without data
    // const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
	// 2 create new with existing data
	const contentBlock = htmlToDraft(description);
	const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
	const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
    const [content, setContent] = useState('');
	
	const handleChangeEditorState = (newState) => {
		setEditorState(newState);
		setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
	}

	const handleDateChange = (event) => {
		console.log(event.target.name)
		setDay(prev => {return({
			...prev,
			[event.target.name]: event.target.value,
		})})
	}

	const handleChange = (event) => {

		console.log('handleChange', event.target.name, event.target.value);
		setState(prev => {return({
			...prev,
			[event.target.name]: event.target.value
		})})
	}
	
	
	// /** Convert html string to draft JS */
	// const contentBlock = htmlToDraft(response.data.blog.content);
	// const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
	// const editorState = EditorState.createWithContent(contentState);
	// setEditorState(editorState);

	useEffect(() => {
		// setEditorState("")

	}, [editorState])

	useEffect(() => {

	}, [ day, ])

	return (
		<Container className="request-recruit">
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="name" className="label--right text-nowrap">Tên yêu cầu:</label></Col>
				<Col sm={9} className="request-recruit__col" ><input id="name" type="text" className="input--borderless" value={ name || ""} name="name" onChange={handleChange} disabled={view}/></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="type" ><b className="label--right text-nowrap">Loại tuyển dụng:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="type" id="type-select" className="input--borderless" disabled={view} onChange={handleChange}>
						<option value="0" selected>Tuyển mới</option>
						<option value="1">Thực tập</option>
						<option value="2">Chính thức</option>
					</select>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label for="position" className="label--right text-nowrap "><b className="label--right text-nowrap">Chức vụ:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="position" id="type-select" className="input--borderless" disabled={view} onChange={handleChange}>
						<option value="0" selected>Nhân viên</option>
						<option value="1">Chức vụ 1</option>
						<option value="2">Chức vụ 2</option>
					</select>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="count"  ><b className="label--right text-nowrap">Số lượng:</b></label></Col>
				<Col sm={3} className="request-recruit__col" ><input id="count" type="number" value={count} className="input--borderless" disabled={view} name="count" min={0} onChange={handleChange}/></Col>
				<Col sm={3} className="request-recruit__col" ><label for="salary" ><b className="label--right text-nowrap">Mức lương đề xuất:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="salary" id="type-select" onChange={handleChange} value={salary} disabled={view}>
						<option value="0" selected>Không hỗ trợ</option>
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
				<Col sm={9} className="request-recruit__col" ><input id="creator" type="text" className="input--borderless" value={creator} name="creator" onChange={handleChange} disabled={view}/></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="description" ><b className="label--right text-nowrap">Mô tả yêu cầu:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >
					<Editor 
						readOnly={view}
						editorState={editorState} 
						toolbar={TextEditorToolbarOption} 
						onEditorStateChange={handleChangeEditorState}/></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="files" ><b className="label--right text-nowrap">Tệp đính kèm:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >{files}</Col>
			</Row>
		</Container>
	)
}