import React, { useState, useEffect, } from 'react'
import "../../styles/ModalRequestRecruit/ModalRequestRecruit.scss"
import { Container, Row, Col, Form} from "react-bootstrap"
// import { EditorState, ContentState, convertToRaw } from 'draft-js';
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import { TextEditorToolbarOption } from "../../models/index"
import moment from "moment";
import {
	makeStyles,
	InputLabel,
	MenuItem,
	Select,
	FormControl,
	FormHelperText,
} from '@material-ui/core'

import ReactSummernote from 'react-summernote';

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
window.jQuery = $;
require('bootstrap');

const { Text, } = Form;

const useStyles = makeStyles((theme) => ({
	formControl: {
		height: 30,
		width: "100%",
	},
	label: {
		padding: 0, 
		margin: 0,
		marginBottom: 20,
		height: 20,
	},
	select: {
		height: 20,
		fontSize: 13,
	},
	selectError: {
		height: 20,
		fontSize: 13,
		color: "rgb(211, 84, 84)",
	},
	selectItem: {
		paddingLeft: 0,
		fontFamily: "Roboto",
		fontSize: 13,
	}
}))

export default function ModalRequestRecruit ({ onSubmit, }) {
	
	const [state, setState] = useState({
		name: '', 
		type: 1,
		quantity: 1, 
		position: "",
		description: '', 
		creator: '', 
		salary: '', 
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
	const [error, setError] = useState({});
    const [content, setContent] = useState('');
	const matClasses = useStyles()
	const heightControlError = 60
	const formatter = new Intl.NumberFormat('vi-VN', {style: 'decimal',});

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
				setError(prev=> {
					return({
						...prev,
						name: "Tên yêu cầu là bắt buộc"
					})
				})
			} else setError(({name, ...prev}) => prev)
		} 

		if (!type || isNaN(parseInt(type))) {
			setError(prev=> {
				return({
					...prev,
					type: "Loại tuyển dụng là bắt buộc"
				})
			})
		} 

		if (touched.position) {
			if (!position || position === "") {
				setError(prev=> {
					return({
						...prev,
						position: "Chức vụ là bắt buộc"
					})
				})
			} else setError(({position, ...prev}) => prev)
		} 

		if (touched.quantity) {
			if (!quantity || isNaN(parseInt(quantity))) {
				setError(prev=> {
					return({
						...prev,
						quantity: "Số lượng bắt buộc là số"
					})
				})
			} else if (Number.isInteger(parseInt(quantity)) && parseInt(quantity) < 1) {
				setError(prev=> {
					return({
						...prev,
						quantity: "Số lượng lớn hơn 0 "
					})
				})
			} else setError(({quantity, ...prev}) => prev)
		} 

		if (touched.salary) {
			// const salaryValue = salary.split(".").join()
			// if (salary !== formatter.format(salaryValue) && salary !== "") {
			// 	setError(prev=> {
			// 		return({
			// 			...prev,
			// 			salary: "Mức lương phải đúng định dạng"
			// 		})
			// 	})
			// } else 
			if ((salary && isNaN(parseInt(salary))) &&!Number.isInteger(parseInt(salary))) {
				setError(prev=> {
					return({
						...prev,
						salary: "Mức lương phải đúng định dạng"
					})
				})
			} else if (Number.isInteger(parseInt(salary)) && parseInt(salary) < 0) {
				setError(prev=> {
					return({
						...prev,
						salary: "Mức lương phải lớn hơn 0"
					})
				})
			} else if (Number.isInteger(parseInt(salary)) && parseInt(salary) % 500 !== 0) {
				setError(prev=> {
					return({
						...prev,
						salary: "Mức lương phải phù hợp"
					})
				})
			} else setError(({salary, ...prev}) => prev)
		} 

		if (touched.dateStart) {
			if (!dateStart || dateStart === "") {
				setError(prev=> {
					return({
						...prev,
						dateStart: "Ngày bắt đầu là bắt buộc"
					})
				})
			} else if (!moment(dateStart).isValid()) {
				setError(prev=> {
					return({
						...prev,
						dateStart: "Ngày bắt đầu không hợp lệ"
					})
				})
			} else if (dateStart !== moment(dateStart).format('YYYY-MM-DD')) {
				setError(prev=> {
					return({
						...prev,
						dateStart: "Ngày bắt đầu không phù hợp định dạng"
					})
				})
			} 
		}

		if (touched.dateEnd) {
			if (!touched.dateStart) {
				setError(prev=> {
					return({
						...prev,
						dateEnd: "Ngày bắt đầu không tồn tại"
					})
				})
			} else if (!dateEnd || dateEnd === "") {
				setError(prev=> {
					return({
						...prev,
						dateEnd: "Ngày kết thúc là bắt buộc"
					})
				})
			} else if (!moment(dateEnd).isValid()) {
				setError(prev=> {
					return({
						...prev,
						dateEnd: "Ngày kết thúc không hợp lệ"
					})
				})
			} else if (dateEnd !== moment(dateEnd).format('YYYY-MM-DD')) {
				setError(prev=> {
					return({
						...prev,
						dateEnd: "Ngày kết thúc không phù hợp định dạng"
					})
				})
			} 
		}

		if (touched.extend_approver_fullname_email) {
			if (!extend_approver_fullname_email || extend_approver_fullname_email === "") {
				setError(prev=> {
					return({
						...prev,
						extend_approver_fullname_email: "Người duyệt là bắt buộc"
					})
				})
			} else setError(({extend_approver_fullname_email, ...prev}) => prev)
		} 
	}
	
	useEffect(() => {
		const {dateEnd, dateStart} = state;
		if (dateStart !== "" && dateEnd === "") {
			return setState(prev=> {
				return({
					...prev,
					dateEnd: moment(dateStart).add(1, "days").format("YYYY-MM-DD"),
				})
			})
		}
	}, [ dateStart, dateEnd ])

	useEffect(() => {

	}, [ content ])

	useEffect(() => {

		validation()
		return () => setError({})
	}, [ state, touched ])

	useEffect(() => {
        if (Object.keys(error).length > 0) console.log("validation", error)
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
					<FormControl className={!error.type?matClasses.formControl:{...matClasses.formControl, height: heightControlError}}>
						<Select
							labelId="type-select-label"
							id="type-select"
							name="type"
							value={type}
							onClick={() => 
								setTouched(prev => {return({
									...prev,
									type: true,
								})})
							} 
							onChange={(event) => handleChange(event)}
							className={matClasses.select}
						>
							<MenuItem value={1} className={matClasses.selectItem}>Tuyển mới</MenuItem>
							<MenuItem value={2} className={matClasses.selectItem}>Thay thế</MenuItem>
						</Select>
						{<FormHelperText><span className="error-message">{error.type}</span></FormHelperText>}
					</FormControl>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="position" className="label--right text-nowrap "><b className="label--right text-nowrap">Chức vụ*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<FormControl className={!error.type?matClasses.formControl:{...matClasses.formControl, height: heightControlError}}>
						<Select
							labelId="position-select-label"
							id="position-select"
							name="position"
							value={position}
							displayEmpty={true}
							renderValue={() => position || "Chọn chức vụ"}
							// className={matClasses.select}
							className={(error&&error.position)? `${matClasses.select} ${matClasses.selectError}`:`${matClasses.select}`}
							onClick={() => 
								setTouched(prev => {return({
									...prev,
									position: true,
								})})
							} 
							onChange={(event) => handleChange(event)}
						>
							<MenuItem value={"Nhân viên"} className={matClasses.selectItem}>Nhân viên</MenuItem>
							<MenuItem value={"Chức vụ 1"} className={matClasses.selectItem}>Chức vụ 1</MenuItem>
							<MenuItem value={"Chức vụ 2"} className={matClasses.selectItem}>Chức vụ 2</MenuItem>
						</Select>
						{<FormHelperText><span className="error-message">{error.position}</span></FormHelperText>}
					</FormControl>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="quantity"  ><b className="label--right text-nowrap">Số lượng*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<div className={error&&error.quantity?"input__div__error ":"input__div"}>
						<input id="quantity" type="number" value={quantity} min={1} className="input--borderless label__error" name="quantity" onClick={(event) => handleClick(event)} placeholder="Số lượng là bắt buộc" onChange={(event) => handleChange(event)}/>
						{(<Text className="text-muted"><span className="error-message">{error.quantity}</span></Text>)}
					</div>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="salary" ><b className="label--right text-nowrap">Mức lương đề xuất:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<div className={error&&error.salary?"input__div__warn ":"input__div"}>
						<input id="salary" type="text" value={salary} min={1} className="input--borderless" name="salary" onClick={(event) => handleClick(event)} placeholder="vd: 10.000.000" onChange={(event) => handleChange(event)}/>
						{(<Text className="text-muted"><span className="warn-message">{error.salary}</span></Text>)}
					</div>
				</Col>
			</Row>
			<Row>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="date-start"  ><b className="label--right text-nowrap">Từ ngày*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<div className={error&&error.dateStart?"input__div__error ":"input__div"}>
						<input type="date" id="date-start" className={error&&error.dateStart?"error__input":""} name="dateStart" value={dateStart} min="2018-01-01" max="2021-12-31" onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)} />
						{(<Text className="text-muted"><span className="error-message">{error.dateStart}</span></Text>)}
					</div>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="date-end" ><b className="label--right text-nowrap">Đến ngày*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<div className={error&&error.dateEnd?"input__div__error ":"input__div"}>
						<input type="date" id="date-end" className={error&&error.dateEnd?"error__input":""}  name="dateEnd" value={dateEnd} min={moment(dateStart).add(1, 'days').format("YYYY-MM-DD")} max="2021-12-31"  onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)} />
						{(<Text className="text-muted"><span className="error-message">{error.dateEnd}</span></Text>)}
					</div>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="extend_approver_fullname_email" ><b className="label--right text-nowrap">Người duyệt*:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >
					<FormControl className={!error.type?matClasses.formControl:{...matClasses.formControl, height: heightControlError}}>
						<Select
							labelId="extend_approver_fullname_email-select-label"
							id="extend_approver_fullname_email-select"
							name="extend_approver_fullname_email"
							value={extend_approver_fullname_email}
							displayEmpty={true}
							renderValue={() => extend_approver_fullname_email || "Cấp trên duyệt yêu cầu"}
							className={(error&&error.extend_approver_fullname_email)? `${matClasses.select} ${matClasses.selectError}`:`${matClasses.select}`}
							onClick={() => 
								setTouched(prev => {return({
									...prev,
									extend_approver_fullname_email: true,
								})})
							} 
							onChange={(event) => handleChange(event)}
						>
							<MenuItem value="" className={matClasses.selectItem}>--- Bỏ chọn ---</MenuItem>
							<MenuItem value={"Phượng Thị Minh Nguyễn | phuongnguyen@meu-solutions.com"} className={matClasses.selectItem}>Phượng Thị Minh Nguyễn | phuongnguyen@meu-solutions.com</MenuItem>
							<MenuItem value={"Thiên Đình Võ | thienvo@meu-solutions.com"} className={matClasses.selectItem}>Thiên Đình Võ | thienvo@meu-solutions.com</MenuItem>
						</Select>
						{<FormHelperText><span className="error-message">{error.extend_approver_fullname_email}</span></FormHelperText>}
					</FormControl>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="description" ><b className="label--right text-nowrap">Mô tả yêu cầu:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >
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