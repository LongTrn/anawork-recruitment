import React, { useState, useEffect, } from 'react'
import "../../styles/ModalRequestRecruit/ModalRequestRecruit.scss"
import { Container, Row, Col, Form} from "react-bootstrap"
// import { EditorState, ContentState, convertToRaw } from 'draft-js';
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import { TextEditorToolbarOption } from "../../models/index"
import moment from "moment";

import ReactSummernote from 'react-summernote';
// import SummerNote from '../SummerNote/SummerNote';
// import $ from "jquery";
// window.jQuery = $;

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
window.jQuery = $;
require('bootstrap');

const {Control, Text, } = Form;

export default function ModalRequestRecruit ({ onSubmit, }) {
	
	const [state, setState] = useState({
		name: '', 
		type: 1,
		quantity: 1, 
		position: "",
		description: '', 
		creator: '', 
		salary: 0, 
		dateStart: '', 
		dateEnd: '', 
		extend_approver_fullname_email: '',
		files: '',
	})
	const [touched, setTouched] = useState({
		name: false, 
		type: false,
		quantity: false, 
		position: false,
		description: false, 
		creator: false, 
		salary: false, 
		dateStart: false, 
		dateEnd: false, 
		extend_approver_fullname_email: false, 
		files: false,
	})
	const { name, type, position, description, creator, salary, dateStart, dateEnd, quantity, extend_approver_fullname_email, files} = state
	const today = moment().format('YYYY-MM-DD');

	const [error, setError] = useState({});

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

	const handleClick = (event) => {
		setTouched(prev => {return({
			...prev,
			[event.target.name]: true,
		})})
	}

	const changeDescriptionEditor = (content) => {

		setContent(content)
		setState(prev => {return({
			...prev,
			description: content,
		})})
	}
	
	const validation = () => {
		const {name, type, position, description, creator, salary, dateStart, dateEnd, quantity, extend_approver_fullname_email, files} = state

		if (touched.name) {
			if (!name || name === "") {
				return setError(prev=> {
					return({
						...prev,
						name: "Tên yêu cầu là bắt buộc"
					})
				})
			} else return setError(({name, ...prev}) => prev)
		} else if (!type || isNaN(type)) {
			return setError(prev=> {
				return({
					...prev,
					type: "Loại tuyển dụng là bắt buộc"
				})
			})
		} else if (!quantity || isNaN(parseInt(quantity))) {
			return setError(prev=> {
				return({
					...prev,
					quantity: "Số lượng bắt buộc là số"
				})
			})
		} else if (Number.isInteger(parseInt(quantity))) {
			if (parseInt(quantity) < 1) {
				return setError(prev=> {
					return({
						...prev,
						quantity: "Số lượng lớn hơn 0 "
					})
				})
			} else return setError(({quantity, ...prev}) => prev)
		} else if (!dateStart || dateStart === "") {
			return setError(prev=> {
				return({
					...prev,
					dateStart: "Ngày bắt đầu là bắt buộc"
				})
			})
		} else if (!moment(dateStart).isValid()) {
			return setError(prev=> {
				return({
					...prev,
					dateStart: "Ngày bắt đầu không hợp lệ"
				})
			})
		} else if (dateStart !== moment(dateStart).format('YYYY-MM-DD')) {
			return setError(prev=> {
				return({
					...prev,
					dateStart: "Ngày bắt đầu không phù hợp định dạng"
				})
			})
		} else if (!dateEnd || dateEnd === "") {
			return setError(prev=> {
				return({
					...prev,
					dateEnd: "Ngày kết thúc là bắt buộc"
				})
			})
		} else if (!moment(dateEnd).isValid()) {
			return setError(prev=> {
				return({
					...prev,
					dateEnd: "Ngày kết thúc không hợp lệ"
				})
			})
		} else if (dateEnd !== moment(dateEnd).format('YYYY-MM-DD')) {
			return setError(prev=> {
				return({
					...prev,
					dateEnd: "Ngày kết thúc không phù hợp định dạng"
				})
			})
		} else if (!extend_approver_fullname_email || extend_approver_fullname_email === "") {
			return setError(prev=> {
				return({
					...prev,
					extend_approver_fullname_email: "Người duyệt là bắt buộc"
				})
			})
		}
		
		return setError({})
	}
	
	useEffect(() => {

	}, [ content ])

	useEffect(() => {

		validation()
	}, [ touched,  ])

	useEffect(() => {

		validation()
	}, [ state,  ])

	useEffect(() => {
        // if (Object.keys(error).length > 0) {
        // }
        // else {
        // }
		console.log(error)
	}, [ error ])

	return (
		<>
		<Container className="request-recruit">
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="name" className="label--right text-nowrap">Tên yêu cầu*:</label></Col>
				<Col sm={9} className="request-recruit__col" >
					<div className={error&&error.name?"input__div__error ":"input__div"}>
						<input required={true} id="name" type="text" className={error&&error.name?"input--borderless name__input label__error" : "input--borderless name__input"} name="name" onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)} value={name} placeholder="Tên yêu cầu tuyển dụng"/>
						{(<Text className="text-muted"><span className="error-message">{error.name}</span></Text>)}
					</div>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="type" ><b className="label--right text-nowrap">Loại tuyển dụng*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="type" id="type-select" className="input--borderless" value={type} onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)}>
						<option value="1">Tuyển mới</option>
						<option value="2">Thay thế</option>
					</select>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="position" className="label--right text-nowrap "><b className="label--right text-nowrap">Chức vụ*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="position" id="type-select" className="input--borderless" value={position} onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)}>
						<option value="">--- Chọn chức vụ ---</option>
						<option value="Nhân viên">Nhân viên</option>
						<option value="Chức vụ 1">Chức vụ 1</option>
						<option value="Chức vụ 2">Chức vụ 2</option>
					</select>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="quantity"  ><b className="label--right text-nowrap">Số lượng*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<div className={error&&error.quantity?"input__div__error ":"input__div"}>
						<input id="quantity" type="number" value={quantity} min={1} className="input--borderless label__error" name="quantity" onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)}/>
						{(<Text className="text-muted"><span className="error-message">{error.quantity}</span></Text>)}
					</div>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="salary" ><b className="label--right text-nowrap">Mức lương đề xuất:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="salary" id="type-select" value={salary} onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)}>
						<option value="0">Không hỗ trợ</option>
						<option value="2,000,000">2,000,000</option>
						<option value="4,000,000">4,000,000</option>
						<option value="6,000,000">6,000,000</option>
						<option value="9,000,000">9,000,000</option>
					</select>
				</Col>
			</Row>
			<Row>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="date-start"  ><b className="label--right text-nowrap">Từ ngày*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<input type="date" id="date-start" name="dateStart" value={dateStart} min="2018-01-01" max="2021-12-31"  onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)} 
					/>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="date-end" ><b className="label--right text-nowrap">Đến ngày*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<input type="date" id="date-end" name="dateEnd" value={dateEnd} min={moment(dateStart).add(1, 'days').format("YYYY-MM-DD")} max="2021-12-31"  onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)} 
					/>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="extend_approver_fullname_email" ><b className="label--right text-nowrap">Người duyệt*:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >
					<select name="extend_approver_fullname_email" id="extend_approver_fullname_email" value={extend_approver_fullname_email} onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)}>
						<option value="">--- Bỏ chọn ---</option>
						<option value="0">Phượng Thị Minh Nguyễn | phuongnguyen@meu-solutions.com</option>
						<option value="1">Thiên Đình Võ | thienvo@meu-solutions.com</option>
					</select>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="description" ><b className="label--right text-nowrap">Mô tả yêu cầu:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >
					{/* <Editor 
						editorState={editorState} 
						onEditorStateChange={handleChangeEditorState}
						toolbar={TextEditorToolbarOption} 
					/> */}
						<ReactSummernote
							value="Default value"
							options={{
							// lang: 'ru-RU',
							height: 100,
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
							onClick={(event) => handleClick(event)} onChange={changeDescriptionEditor}
						/>
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
		</>
	)
}