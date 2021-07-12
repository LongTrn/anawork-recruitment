import React, { useState, useEffect, } from 'react'
import "../../styles/ModalRequestRecruit/ModalRequestRecruit.scss"
import { Container, Row, Col, } from "react-bootstrap"
// import { EditorState, ContentState, convertToRaw } from 'draft-js';
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import { TextEditorToolbarOption } from "../../models/index"
import ReactSummernote from 'react-summernote';
import SummerNote from '../SummerNote/SummerNote';
import $ from "jquery";
window.jQuery = $;

export default function ModalRequestRecruit (props) {
	const [state, setState] = useState({
		name: '', 
		description: '', 
		creator: '', 
		salary: '', 
		dateStart: '', 
		dateEnd: '', 
		count: '', 
		files: '',
	})
	const { name, description, creator, salary, dateStart, dateEnd, count, files} = state

	const time = new Date();
	const [currentDay, currentMonth, currentYear] = [time.getDate(), time.getMonth(), time.getFullYear()]
	const today = `${currentYear}-${(currentMonth + 1).length > 1? currentMonth + 1: `0${currentMonth + 1}`}-${currentDay.length > 1? currentDay:`0${currentDay}`}`
	
	// const contentBlock = htmlToDraft(description);
	// const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
	// const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
    const [content, setContent] = useState('');
	
	// const handleChangeEditorState = (newState) => {
	// 	setEditorState(newState);
	// 	setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
	// }

	const handleChange = (event) => {
		setState(prev => {return({
			...prev,
			[event.target.name]: event.target.value
		})})
	}
	const changeDescriptionEditor = (content) => {
		console.log("change des ", content);
	}

	useEffect(() => {
		
	}, [])

	return (
		<Container className="request-recruit">
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="name" className="label--right text-nowrap">Tên yêu cầu:</label></Col>
				<Col sm={9} className="request-recruit__col" ><input id="name" type="text" className="input--borderless" name="name" onChange={handleChange} value={name}/></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="type" ><b className="label--right text-nowrap">Loại tuyển dụng:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="type" id="type-select" className="input--borderless" value={1} onChange={handleChange}>
						<option value="1">Tuyển mới</option>
						<option value="2">Thay thế</option>
					</select>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="position" className="label--right text-nowrap "><b className="label--right text-nowrap">Chức vụ:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="position" id="type-select" className="input--borderless" value={0} onChange={handleChange}>
						<option value="0">Nhân viên</option>
						<option value="1">Chức vụ 1</option>
						<option value="2">Chức vụ 2</option>
					</select>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="count"  ><b className="label--right text-nowrap">Số lượng:</b></label></Col>
				<Col sm={3} className="request-recruit__col" ><input id="count" type="number" value={count||1} min={0} className="input--borderless" name="count" onChange={handleChange}/></Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="salary" ><b className="label--right text-nowrap">Mức lương đề xuất:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="salary" id="type-select" value={salary} value={0} onChange={handleChange}>
						<option value="0">Không hỗ trợ</option>
						<option value="1">2,000,000</option>
						<option value="2">4,000,000</option>
						<option value="3">6,000,000</option>
						<option value="4">9,000,000</option>
					</select>
				</Col>
			</Row>
			<Row>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="date-start"  ><b className="label--right text-nowrap">Từ ngày:</b></label></Col>
				<Col sm={3} className="request-recruit__col" ><input type="date" id="date-start" name="dateStart" value={dateStart||today} minvalue="2018-01-01" maxvalue="2018-12-31"  onChange={handleChange} /></Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="date-end" ><b className="label--right text-nowrap">Đến ngày:</b></label></Col>
				<Col sm={3} className="request-recruit__col" ><input type="date" id="date-start" name="dateEnd" value={dateEnd||today} minvalue="2018-01-01" maxvalue="2018-12-31"  onChange={handleChange} /></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="creator" ><b className="label--right text-nowrap">Người duyệt:</b></label></Col>
				<Col sm={9} className="request-recruit__col" ><input id="creator" type="text" className="input--borderless" value={creator} name="creator" onChange={handleChange}/></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="description" ><b className="label--right text-nowrap">Mô tả yêu cầu:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >
					{/* <Editor 
						editorState={editorState} 
						onEditorStateChange={handleChangeEditorState}
						toolbar={TextEditorToolbarOption} /> */}
						{/* <ReactSummernote
							value="Default value"
							options={{
							lang: 'ru-RU',
							height: 350,
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
						/> */}
						{/* <ReactSummernote /> */}
						{/* <SummerNote/> */}
						{/* <div class="summernote">summernote 1</div> */}
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="description" ><b className="label--right text-nowrap">Tệp đính kèm:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >Danh sách tệp đính kèm</Col>
			</Row>
		</Container>
	)
}