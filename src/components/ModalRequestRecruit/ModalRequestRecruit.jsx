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
		files: '',
	})
	const { name, type, position, description, creator, salary, dateStart, dateEnd, quantity, files} = state
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
		// console.log({
		// 	[event.target.name]: event.target.value
		// }, state)
		setState(prev => {return({
			...prev,
			[event.target.name]: event.target.value
		})})
	}

	const changeDescriptionEditor = (content) => {

		setContent(content)
	}

	// useEffect(() => {
	// 	console.group("editorState")
	// 	console.log("content", content)
	// 	console.groupEnd()	
	// }, [content])
	
	const validation = () => {

		if (!state) {
			// setError(prev=> {
			// 	return({
			// 		...prev,
			// 		all:"Bắt buộc"
			// 	})
			// })
			console.log("anh", !state)
			// console.log(state)
		}
		console.log("em", !state)

		const {name, description, creator, salary, dateStart, dateEnd, quantity, files} = state

		if (!name || name === "") {
			return setError(prev=> {
				return({
					...prev,
					name: "Tên yêu cầu là bắt buộc"
				})
			})
			// setError("Tên yêu cầu là bắt buộc")
			// return false
		}
		// else if (!description) return false
		// else if (!creator) return false
		// else if (!salary) return false
		// else if (!dateStart) return false
		// else if (!dateEnd) return false
		// else if (!quantity) return false
		// else if (!files) return false
		// return true
			
		setError({})
	}
	
	useEffect(() => {

	}, [ content ])

	useEffect(() => {

		console.log("state", state)
		if (state) {

			// const isValid = validation(state);
			// if (!isValid) {
			
			// 	console.log("not valid")
			// 	console.log(error)
			// }
			// else {
			// 	console.log("valid");
			// 	console.log(state);
							
			// 	setError(null)
			// }
			validation()
		}
	}, [ state ])

	useEffect(() => {
		// if (error) {

		// 	console.log("error", error, state)
		// }
        if (Object.keys(error).length > 0) {
			// setForm(prev=>{return{
				//     ...prev,
				//     submitable: false,
				// }})
			console.log("error", error, state)
        }
        else {
            // setForm(prev=>{return{
            //     ...prev,
            //     submitable: true,
            // }})
        }
	}, [ error ])

	return (
		<>
		<Container className="request-recruit">
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="name" className="label--right text-nowrap">Tên yêu cầu*:</label></Col>
				<Col sm={9} className="request-recruit__col" >
					{/* <div className="name__div"> 
						<input required={true} id="name" type="text" className="input--borderless name__input" name="name" onChange={(event) => handleChange(event)} value={name} placeholder="test"/>
						<label htmlFor="name" className="name__input__label">Tên yêu cầu</label>
					</div> */}
					{/* <Control type="text" placeholder="Tên yêu cầu tuyển dụng"/> */}
					<div className={error&&error.name?"input__div__error ":"input__div"}>
						<input required={true} id="name" type="text" className={error&&error.name?"input--borderless name__input label__error" : "input--borderless name__input"} name="name" onChange={(event) => handleChange(event)} value={name} placeholder="Tên yêu cầu tuyển dụng"/>
						{(<Text className="text-muted"><span className="error-message">{error.name}</span></Text>)}
					</div>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="type" ><b className="label--right text-nowrap">Loại tuyển dụng*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="type" id="type-select" className="input--borderless" value={type} onChange={(event) => handleChange(event)}>
						{/* <option value="">--- Chọn chức vụ ---</option> */}
						<option value="1">Tuyển mới</option>
						<option value="2">Thay thế</option>
					</select>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="position" className="label--right text-nowrap "><b className="label--right text-nowrap">Chức vụ*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="position" id="type-select" className="input--borderless" value={position} onChange={(event) => handleChange(event)}>
						<option value="">--- Chọn chức vụ ---</option>
						<option value="Nhân viên">Nhân viên</option>
						<option value="Chức vụ 1">Chức vụ 1</option>
						<option value="Chức vụ 2">Chức vụ 2</option>
					</select>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="quantity"  ><b className="label--right text-nowrap">Số lượng*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" ><input id="quantity" type="number" value={quantity} min={1} className="input--borderless" name="quantity" onChange={(event) => handleChange(event)}/></Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="salary" ><b className="label--right text-nowrap">Mức lương đề xuất:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="salary" id="type-select" value={salary} onChange={(event) => handleChange(event)}>
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
					<input type="date" id="date-start" name="dateStart" value={dateStart||today} min="2018-01-01" max="2021-12-31"  onChange={(event) => handleChange(event)} 
					/>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="date-end" ><b className="label--right text-nowrap">Đến ngày*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<input type="date" id="date-end" name="dateEnd" value={dateEnd||today} min={moment(dateStart).add(1, 'days').format("YYYY-MM-DD")} max="2021-12-31"  onChange={(event) => handleChange(event)} 
					/>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="creator" ><b className="label--right text-nowrap">Người duyệt*:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >
					<select name="creator" id="type-select" value={creator} onChange={(event) => handleChange(event)}>
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
							onChange={changeDescriptionEditor}
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