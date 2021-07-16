import React, { useState, useEffect, } from 'react'
import "../../styles/ModalRequestRecruit/ModalRequestRecruit.scss"
import { Container, Row, Col, Form} from "react-bootstrap"
import moment from "moment";
import { axios } from "../../config/index"

import {
	MenuItem,
	Select,
	FormControl,
	FormHelperText,
	TextField
} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles';

import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

import { TypeRecruit, PositionRecruit, } from "../../models/index"

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
	},
	datePicker: {
		// background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		height: 40,
		maxWidth: "auto",
		border: "none",
		// display: "flex",
		// alignItems: "flex-start",
	}
}))

export default function ModalRequestRecruit ({ onSubmit, id}) {
	// const [state, setState] = useState({ 
	// 	name: "",
	// 	category_id: 1,
	// 	extend_position_name: "",
	// 	quantity: 1,
	// 	salary: "",
	// 	plan_start: moment().format('YYYY-MM-DD'),
	// 	plan_end: moment().format('YYYY-MM-DD'),
	// 	extend_approver_fullname_email: "",
	// 	job_description: "",
	// 	code: "",
	// })
	// const { 
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
	// } = state
	const [state, setState] = useState({
		name: '', 
		category_id: 0,
		quantity: 1, 
		extend_position_name: 0,
		job_description: '', 
		salary: '', 
		plan_start: '', 
		plan_end: '', 
		extend_approver_fullname_email: '',
		code: '',
	})
	const [touched, setTouched] = useState({
		name: false, 
		category_id: false,
		quantity: false, 
		extend_position_name: false,
		job_description: false, 
		salary: false, 
		plan_start: false, 
		plan_end: false, 
		extend_approver_fullname_email: false, 
		code: false,
	})
	const { name, category_id, extend_position_name, job_description, salary, plan_start, plan_end, quantity, extend_approver_fullname_email, code} = state
	const [error, setError] = useState({});
    const [content, setContent] = useState('');
	const matClasses = useStyles()
	const heightControlError = 60

	// const formatter = new Intl.NumberFormat('vi-VN', {style: 'decimal',});

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
			job_description: content,
		})})
	}
	
	const validDateTime = (date, minDate = "") => {
		if (minDate) return !date.isBefore(moment(minDate).format("yyyy-MM-DD")) && (date.isBefore(moment().add(1, "years").format("YYYY-MM-DD")) && date.isAfter(moment().subtract(1, "days").format("YYYY-MM-DD")));
		return date.isBefore(moment().add(1, "years").format("YYYY-MM-DD")) && date.isAfter(moment().subtract(1, "days").format("YYYY-MM-DD"));
	}

	const validation = () => {
		const {name, category_id, extend_position_name, job_description, salary, plan_start, plan_end, quantity, extend_approver_fullname_email, code} = state

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

		if (touched.category_id) {
			if (!category_id || isNaN(parseInt(category_id))) {
				setError(prev=> {
					return({
						...prev,
						category_id: "Loại tuyển dụng là bắt buộc",
					})
				})
			} else setError(({category_id, ...prev}) => prev)
		}

		if (touched.extend_position_name) {
			if (!extend_position_name || isNaN(parseInt(extend_position_name))) {
				setError(prev=> {
					return({
						...prev,
						extend_position_name: "Chức vụ là bắt buộc",
					})
				})
			} else setError(({extend_position_name, ...prev}) => prev)
		}

		// if (touched.extend_position_name) {
		// 	if (!extend_position_name || extend_position_name === "") {
		// 		setError(prev=> {
		// 			return({
		// 				...prev,
		// 				extend_position_name: "Chức vụ là bắt buộc"
		// 			})
		// 		})
		// 	} else setError(({extend_position_name, ...prev}) => prev)
		// } 

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
						salary: "Mức lương sai định dạng"
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

		if (touched.plan_start) {
			if (!plan_start || plan_start === "") {
				setError(prev=> {
					return({
						...prev,
						plan_start: "Ngày bắt đầu là bắt buộc"
					})
				})
			} else if (!moment(plan_start).isValid() || moment(plan_start).isBefore(moment().format("YYYY-MM-DD"))) {
				setError(prev=> {
					return({
						...prev,
						plan_start: "Ngày bắt đầu không hợp lệ"
					})
				})
			} else if (plan_start !== moment(plan_start).format('YYYY-MM-DD')) {
				setError(prev=> {
					return({
						...prev,
						plan_start: "Ngày bắt đầu không phù hợp định dạng"
					})
				})
			} 
		}

		if (touched.plan_end) {
			if (!touched.plan_start) {
				setError(prev=> {
					return({
						...prev,
						plan_end: "Ngày bắt đầu không tồn tại"
					})
				})
			} else if (!plan_end || plan_end === "") {
				setError(prev=> {
					return({
						...prev,
						plan_end: "Ngày kết thúc là bắt buộc"
					})
				})
			} else if (!moment(plan_end).isValid() || moment(plan_end).isBefore(plan_start)) {
				setError(prev=> {
					return({
						...prev,
						plan_end: "Ngày kết thúc không hợp lệ"
					})
				})
			} else if (plan_end !== moment(plan_end).format('YYYY-MM-DD')) {
				setError(prev=> {
					return({
						...prev,
						plan_end: "Ngày kết thúc không phù hợp định dạng"
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
	}
	
	// useEffect(() => {

	// 	setState(prev => {return({
	// 		...prev,
	// 		plan_start: moment().format('YYYY-MM-DD'),
	// 		plan_end: moment().add(1, "days").format("YYYY-MM-DD"),
	// 	})})
	// }, [])
	
	useEffect(() => {

		if (id) fetchData(id)
	}, [id,])

	useEffect(() => {
		const {plan_end, plan_start} = state;
		if (plan_start !== "" && plan_end === "") {
			return setState(prev=> {
				return({
					...prev,
					plan_end: moment(plan_start).add(1, "days").format("YYYY-MM-DD"),
				})
			})
		}
	}, [ plan_start, plan_end ])

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
					</div>
					{(<Text className="text-muted"><span className="error-message">{error.name}</span></Text>)}
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="category_id" ><b className="label--right text-nowrap">Loại tuyển dụng*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<FormControl className={!error.category_id?matClasses.formControl:{...matClasses.formControl, height: heightControlError}}>
						<Select
							labelId="category_id-select-label"
							id="category_id-select"
							name="category_id"
							value={category_id}
							onClick={() => 
								setTouched(prev => {return({
									...prev,
									category_id: true,
								})})
							} 
							renderValue={() => category_id || "Loại tuyển dụng"}
							onChange={(event) => {
								setState(prev => {return({
									...prev,
									category_id: TypeRecruit.find(({id}) => id === event.target.value).id
								})})
							}}
							className={matClasses.select}
						>
							{TypeRecruit.map(category_id => (
								<MenuItem value={category_id.id} className={matClasses.selectItem}>{category_id.name}</MenuItem>
							))}
							{/* <MenuItem value={2} className={matClasses.selectItem}>Thay thế</MenuItem> */}
						</Select>
						{<FormHelperText><span className="error-message">{error.category_id}</span></FormHelperText>}
					</FormControl>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="extend_position_name" className="label--right text-nowrap "><b className="label--right text-nowrap">Chức vụ*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<FormControl className={!error.category_id?matClasses.formControl:{...matClasses.formControl, height: heightControlError}}>
						<Select
							labelId="extend_position_name-select-label"
							id="extend_position_name-select"
							name="extend_position_name"
							value={extend_position_name}
							displayEmpty={true}
							renderValue={(e) => {
								console.log(e)
								// const display = PositionRecruit.find(({id}) => id === event.target.value).id
								return extend_position_name || "Chọn chức vụ"
							}}
							className={(error&&error.extend_position_name)? `${matClasses.select} ${matClasses.selectError}`:`${matClasses.select}`}
							onClick={() => 
								setTouched(prev => {return({
									...prev,
									extend_position_name: true,
								})})
							} 
							onChange={(event) => {
								setState(prev => {return({
									...prev,
									extend_position_name: PositionRecruit.find(({id}) => id === event.target.value).id
								})})
							}}
						>
							{PositionRecruit.map(extend_position_name => (
								<MenuItem value={extend_position_name.id} className={matClasses.selectItem}>{extend_position_name.name}</MenuItem>
							))}
							{/* <MenuItem value={"Nhân viên"} className={matClasses.selectItem}>Nhân viên</MenuItem>
							<MenuItem value={"Chức vụ 1"} className={matClasses.selectItem}>Chức vụ 1</MenuItem>
							<MenuItem value={"Chức vụ 2"} className={matClasses.selectItem}>Chức vụ 2</MenuItem> */}
						</Select>
						{<FormHelperText><span className="error-message">{error.extend_position_name}</span></FormHelperText>}
					</FormControl>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="quantity"  ><b className="label--right text-nowrap">Số lượng*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<div className={error&&error.quantity?"input__div__error ":"input__div"}>
						<input id="quantity" type="number" value={quantity} min={1} className="input--borderless label__error" name="quantity" onClick={(event) => handleClick(event)} placeholder="Số lượng tuyển dụng" onChange={(event) => handleChange(event)}/>
					</div>
					{(<Text className="text-muted"><span className="error-message">{error.quantity}</span></Text>)}
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="salary" ><b className="label--right text-nowrap">Mức lương đề xuất:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<div className={"input__div"}>
						<input id="salary" type="text" value={salary} min={1} className="input--borderless" name="salary" onClick={(event) => handleClick(event)} placeholder="vd: 10.000.000" 
							onChange={(event) => {
								setState(prev => {return({
									...prev, 
									// salary: event.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									// salary: event.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/\b0(?=(\d{1,3}))/g, "")
									salary: event.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/^0/g, "")
								})})
							}
							}/>
					</div>
					{/* <div className={error&&error.salary?"input__div__warn ":"input__div"}> */}
					{/* {(<Text className="text-muted"><span className="warn-message">{error.salary}</span></Text>)} */}
				</Col>
			</Row>
			<Row>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="date-start"  ><b className="label--right text-nowrap">Từ ngày*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					{/* <div className={error&&error.plan_start?"input__div__error ":"input__div"}>
						<input type="date" id="date-start" className={error&&error.plan_start?"error__input":""} name="plan_start" value={plan_start} min={moment().format("YYYY-MM-DD")} max={"2023-12-31"} onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)}/>
					</div> */}
					<Datetime 
						dateFormat="DD/MM/YYYY"
						timeFormat={false}
						input={true}
						value={plan_start}
						isValidDate={(date) => validDateTime(date)}
						closeOnSelect
						minValue={moment().format("YYYY-MM-DD")}
						onChange={(date) => setState(prev => {return({ ...prev, plan_start: moment(date).format("YYYY-MM-DD")})})}
						className={error&&error.plan_start?"picker error__input":"picker"}
						renderInput={(props) => (<><input 
							{...props}
							placeholder={"DD/MM/YYYY"}
							className={error&&error.plan_start?"error__input":""}
							onClick={() => setTouched(prev => {return({...prev, plan_start: true})})}
							/></>)}
							/>
					{/* <LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
						value={plan_start}
							openTo="day"
							views={["year", "month", "day"]}
							classes={matClasses.datePicker}
							onChange={(newValue) => {
								setState(prev => {return({...prev, plan_start: newValue})});
							}}
							renderInput={renderDatePicker}
							/>
					</LocalizationProvider> */}
					{(<Text className="text-muted"><span className="error-message">{error.plan_start}</span></Text>)}
				</Col>
				<Col sm={3} className="request-recruit__col" ><label htmlFor="date-end" ><b className="label--right text-nowrap">Đến ngày*:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					{/* <div className={error&&error.plan_end?"input__div__error ":"input__div"}>
						<input type="date" id="date-end" className={error&&error.plan_end?"error__input":""}  name="plan_end" value={plan_end} min={moment().add(1, 'days').format("YYYY-MM-DD")} max={"2023-12-31"} onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)} />
					</div> */}
					<Datetime 
						dateFormat="DD/MM/YYYY"
						timeFormat={false}
						input={true}
						value={plan_end}
						isValidDate={(date) => validDateTime(date, plan_start)}
						closeOnSelect
						onChange={(date) => setState(prev => {return({ ...prev, plan_end: moment(date).format("YYYY-MM-DD")})})}
						className={error&&error.plan_end?"picker error__input":"picker"}
						renderInput={(props) => (<><input 
							{...props}
							placeholder={"DD/MM/YYYY"}
							className={error&&error.plan_end?"error__input":""}
							onClick={() => setTouched(prev => {return({...prev, plan_end: true})})}
							/></>)}
					/>
					{/* <LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							variant="outlined"
							value={plan_end}
							openTo="day"
							views={["year", "month", "day"]}
							className={{notchedOutline:matClasses.datePicker}}
							onChange={(newValue) => {
								setState(prev => {return({...prev, plan_end: newValue})});
							}}
							// renderInput={(params) => <TextField {...params} />}
							renderInput={renderDatePicker}
							InputProps={{
								// startAdornment: <AccountCircle />, // <== adjusted this
								disableUnderline: false, // <== added this
								classes: { notchedOutline: matClasses.datePicker }
							  }}
							  classes={{ notchedOutline: matClasses.datePicker }}
						/>
					</LocalizationProvider> */}
					{(<Text className="text-muted"><span className="error-message">{error.plan_end}</span></Text>)}
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="extend_approver_fullname_email" ><b className="label--right text-nowrap">Người duyệt*:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >
					<FormControl className={!error.extend_approver_fullname_email?matClasses.formControl:{...matClasses.formControl, height: heightControlError}}>
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
				<Col sm={3} className="request-recruit__col" ><label htmlFor="job_description" ><b className="label--right text-nowrap">Mô tả yêu cầu:</b></label></Col>
				<Col sm={9} className="request-recruit__col  request-recruit__col__description" >
					<ReactSummernote
						value="Default value"
						options={{
							// lang: 'ru-RU',
							height: 100,
							dialogsInBody: true,
							styleTags: [
								'p',
									{ title: 'Blockquote', tag: 'blockquote', className: 'blockquote', value: 'blockquote' },
									'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
							],
							placeholder: "Nhập một số mô tả",
							disableDragAndDrop: true,
							fontNames: ["Helvetica", "sans-serif", "Arial", "Arial Black", "Comic Sans MS", "Courier New"],
							fontNamesIgnoreCheck: ["Helvetica", "sans-serif", "Arial", "Arial Black", "Comic Sans MS", "Courier New"],
							fontSizes: [2, 4, 6, 8, 10, 12, 13, 14],
							fontSizeUnits: ['px', 'pt'],
							lineHeights: ['0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
							toolbar: [
								['style', ['bold', 'italic', 'underline', 'clear']],
								['font', ['strikethrough', 'superscript', 'subscript']],
								['fontname', ['fontname']],
								['fontsize', ['fontsize']],
								['color', ['color']],
								['para', ['ul', 'ol', 'paragraph']],
								['height', ['height']]
							],
						}}
						onClick={(event) => handleClick(event)} onChange={changeDescriptionEditor}
					/>
				</Col>
			</Row>
			{/* <Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label htmlFor="job_description" ><b className="label--right text-nowrap">Tệp đính kèm:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >Danh sách tệp đính kèm</Col>
			</Row> */}
		</Container>
		</>
	)
}