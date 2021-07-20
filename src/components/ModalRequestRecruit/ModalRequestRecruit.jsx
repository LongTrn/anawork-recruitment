import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from "react";
import "../../styles/ModalRequestRecruit/ModalRequestRecruit.scss";
import { Container, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import { axios } from "../../config/index";
import { v4 as uuid, } from "uuid";

import {
	MenuItem,
	Select,
	FormControl,
	FormHelperText,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import { TypeRecruit, } from "../../models/index";

import ReactSummernote from "react-summernote";

import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";
window.jQuery = $;
require("bootstrap");

const { Text } = Form;

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
		width: "100%",
		borderColor: "#ccc",
		"&:before": {
			borderColor: "#ccc",
		}
	},
	selectIcon: {
		fill: "#ccc",
	},
	selectError: {
		height: 20,
		fontSize: 13,
		color: "rgb(211, 84, 84)",
		width: "100%",
	},
	selectItem: {

		paddingLeft: 0,
		fontFamily: "Roboto",
		fontSize: 13,
		width: "100%",
		minWidth: "100%",
		
		"div": {
			
			width: "100%",
			minWidth: "100%",
		}
	},
	datePicker: {
		height: 40,
		maxWidth: "auto",
		border: "none",
	},
}));

export default forwardRef(function ModalRequestRecruit ({ onSubmit, id }, ref) {
	const [state, setState] = useState({
		name: "",
		category_id: {name: "", value: ""},
		quantity: 1,
		extend_position_name: {name: "", value: ""},
		job_description: "",
		salary: "",
		plan_start: "",
		plan_finish: "",
		extend_approver_fullname_email: {name: "", value: ""},
		// code: "",
	});
	const [touched, setTouched] = useState({
		name: false,
		category_id: false,
		quantity: false,
		extend_position_name: false,
		job_description: false,
		salary: false,
		plan_start: false,
		plan_finish: false,
		extend_approver_fullname_email: false,
		// code: false,
	});
	const {
		name,
		category_id,
		extend_position_name,
		job_description,
		salary,
		plan_start,
		plan_finish,
		quantity,
		extend_approver_fullname_email,
		// code,
	} = state;
	const [error, setError] = useState({});
	const [content, setContent] = useState("");
	const matClasses = useStyles();
	const heightControlError = 60;
	const [model, setModel] = useState({
		categories: [],
		managers: [],
	})

	// const formatter = new Intl.NumberFormat('vi-VN', {style: 'decimal',});

	const handleChange = (event) => {
		setState((prev) => {
			return {
				...prev,
				[event.target.name]: event.target.value,
			};
		});
	};

	const handleClick = (event) => {
		setTouched((prev) => {
			return {
				...prev,
				[event.target.name]: true,
			};
		});
	};

	const changeDescriptionEditor = (content) => {
		setContent(content);
		setState((prev) => {
			return {
				...prev,
				job_description: content,
			};
		});
	};

	const validDateTime = (date, minDate = "") => {
		if (minDate)
			return (
				!date.isBefore(moment(minDate).format("YYYY-MM-DDTHH:mm:ss")) &&
				date.isBefore(moment().add(1, "years").format("YYYY-MM-DDTHH:mm:ss")) &&
				date.isAfter(moment().subtract(1, "days").format("YYYY-MM-DDTHH:mm:ss"))
			);
		return (
			date.isBefore(moment().add(1, "years").format("YYYY-MM-DDTHH:mm:ss")) &&
			date.isAfter(moment().subtract(1, "days").format("YYYY-MM-DDTHH:mm:ss"))
		);
	};

	const validation = () => {
		const {
			name,
			category_id,
			extend_position_name,
			salary,
			plan_start,
			plan_finish,
			quantity,
			extend_approver_fullname_email,
			// code,
		} = state;

		if (touched.name) {
			if (!name || name === "") {
				setError((prev) => {
					return {
						...prev,
						name: "Tên yêu cầu là bắt buộc",
					};
				});
			} else setError(({ name, ...prev }) => prev);
		}

		if (touched.category_id) {
			if (!category_id.name || category_id.name === "") {
			// if (!category_id || isNaN(parseInt(category_id))) {
				setError((prev) => {
					return {
						...prev,
						category_id: "Loại tuyển dụng là bắt buộc",
					};
				});
			} else setError(({ category_id, ...prev }) => prev);
		}

		if (touched.extend_position_name) {
			if (!extend_position_name.name || extend_position_name.name === "") {
				setError((prev) => {
					return {
						...prev,
						extend_position_name: "Chức vụ là bắt buộc",
					};
				});
			} else setError(({ extend_position_name, ...prev }) => prev);
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
				setError((prev) => {
					return {
						...prev,
						quantity: "Số lượng bắt buộc là số",
					};
				});
			} else if (
				Number.isInteger(parseInt(quantity)) &&
				parseInt(quantity) < 1
			) {
				setError((prev) => {
					return {
						...prev,
						quantity: "Số lượng lớn hơn 0 ",
					};
				});
			} else setError(({ quantity, ...prev }) => prev);
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
			if (
				salary &&
				isNaN(parseInt(salary)) &&
				!Number.isInteger(parseInt(salary))
			) {
				setError((prev) => {
					return {
						...prev,
						salary: "Mức lương sai định dạng",
					};
				});
			} else if (Number.isInteger(parseInt(salary)) && parseInt(salary) < 0) {
				setError((prev) => {
					return {
						...prev,
						salary: "Mức lương phải lớn hơn 0",
					};
				});
			} else if (
				Number.isInteger(parseInt(salary)) &&
				parseInt(salary) % 500 !== 0
			) {
				setError((prev) => {
					return {
						...prev,
						salary: "Mức lương phải phù hợp",
					};
				});
			} else setError(({ salary, ...prev }) => prev);
		}

		if (touched.plan_start) {
			if (!plan_start || plan_start === "") {
				setError((prev) => {
					return {
						...prev,
						plan_start: "Ngày bắt đầu là bắt buộc",
					};
				});
			} else if (moment(moment(plan_start).format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD"))) {
				setError((prev) => {
					return {
						...prev,
						plan_start: "Ngày bắt đầu không hợp lệ",
					};
				});
			} 
			else if (!moment(plan_start).isValid()) {
				setError((prev) => {
					return {
						...prev,
						plan_start: "Ngày bắt đầu không phù hợp định dạng",
					};
				});
			}
			else setError(({ plan_start, ...prev }) => prev);
		}

		if (touched.plan_finish) {
			if (!touched.plan_start) {
				setError((prev) => {
					return {
						...prev,
						plan_finish: "Ngày bắt đầu không tồn tại",
					};
				});
			} else if (!plan_finish || plan_finish === "") {
				setError((prev) => {
					return {
						...prev,
						plan_finish: "Ngày kết thúc là bắt buộc",
					};
				});
			} else if (moment(moment(plan_finish).format("YYYY-MM-DD")).isBefore(moment(moment(plan_start).format("YYYY-MM-DD")))) {
				setError((prev) => {
					return {
						...prev,
						plan_finish: "Ngày kết thúc không hợp lệ",
					};
				});
			} else if (!moment(plan_finish).isValid()) {
				setError((prev) => {
					return {
						...prev,
						plan_finish: "Ngày kết thúc không phù hợp định dạng",
					};
				});
			}
		}

		if (touched.extend_approver_fullname_email) {
			if (
				!extend_approver_fullname_email ||
				extend_approver_fullname_email.value === "" ||
				extend_approver_fullname_email.name === ""
			) {
				setError((prev) => {
					return {
						...prev,
						extend_approver_fullname_email: "Người duyệt là bắt buộc",
					};
				});
			} else setError(({ extend_approver_fullname_email, ...prev }) => prev);
		}
	};

	const fetchData = async (id) => {
		const response = await axios.get(`/api/recruits/requests/${id}`);

		if (!response.data.success) return;
		
		const {
			name: nameRequest,
			category_id: cateRequest,
			extend_position_name: positionName,
			position_id: positionId,
			quantity: quantityRequest,
			salary: salaryRequest,
			plan_start: startRequest,
			plan_finish: finishRequest,
			extend_approver_fullname_email: approverName,
			approver_id,
			job_description,
			// code: codeRequest,
		} = response.data.data;
		const types = await TypeRecruit.find(({ id }) => id === cateRequest)

		setState((prev) => {
			return {
				name: nameRequest,
				category_id: {name: types.name, value: cateRequest},
				extend_position_name: { name: positionName, value: positionId},
				quantity: quantityRequest,
				salary: salaryRequest,
				plan_start: startRequest,
				plan_finish: finishRequest,
				extend_approver_fullname_email: {name: approverName, value: approver_id},
				job_description,
				// code: codeRequest,
			};
		});
	};

	const loadManager = async () => {
		const response = await axios.get(`/api/myManagers`)
		if (!response.data.success) return;
		setModel(prev => {return ({...prev, managers: response.data.data})})
	}
	
	const loadCategoryId = async () => {
		const response = await axios.get(`/api/hrPosition?Filters=&Sorts=&Page=1&PageSize=999`)
		if (!response.data.success) return;
		setModel(prev => {return ({...prev, categories: response.data.data.collection})})
	}

	const loadModel = async () => {
		loadManager();
		loadCategoryId();
	}

	useImperativeHandle(ref, () => ({
		submit: async () => {
			const id = uuid();
			const submitState = {
				approved_date: null,
				approved_status_id: "cae086d1-38bb-40ac-bb12-708fc3c60959",
				// approver_id: "42f588d5-ea71-42e3-ba3c-8add71bd91b5",
				approver_id: extend_approver_fullname_email.value,
				// category_id: 1,
				category_id: category_id.value,
				// code: "recruitmentRequest20210717T173452HDOUP",
				code: "",
				// created_at: "2021-07-17T10:36:02.4871516Z",
				// created_by: "28fcfd7a-ce37-4b88-827f-08468c3b805e",
				created_at: moment().format("YYYY-MM-DDTHH:mm:ss"),
				created_by: "28fcfd7a-ce37-4b88-827f-08468c3b805e",
				description: null,
				// id: "8f585b91-acd0-49de-9af6-c6868460f999",
				id,
				is_replace: null,
				// job_description: null,
				job_description,
				// modified_at: "2021-07-17T10:36:02.4953358Z",
				// modified_by: "28fcfd7a-ce37-4b88-827f-08468c3b805e",
				modified_at: "",
				modified_by: "",
				// name: "demo",
				name,
				// plan_finish: "2021-07-16T17:00:00Z",
				// plan_start: "2021-07-16T17:00:00Z",
				plan_finish,
				plan_start,
				// position_id: "85c24464-ee70-4e14-ac8b-8989dde4998b",
				position_id: extend_position_name.value,
				// quantity: 1,
				quantity,
				recruit_process_id: null,
				// salary: "",
				salary,
			}
			console.group("submit State");
			console.log(submitState)
			console.groupEnd();
			/**
				approved_date: null,
				approved_status_id: "cae086d1-38bb-40ac-bb12-708fc3c60959",
				approver_id: "42f588d5-ea71-42e3-ba3c-8add71bd91b5",
				approver_id: extend_approver_fullname_email.value,
				category_id: 1,
				category_id: category_id.value,
				code: "recruitmentRequest20210717T173452HDOUP",
				code: "",
				created_at: "2021-07-17T10:36:02.4871516Z",
				created_by: "28fcfd7a-ce37-4b88-827f-08468c3b805e",
				created_at: moment().format("YYYY-MM-DDTHH:mm:ss"),
				created_by: "28fcfd7a-ce37-4b88-827f-08468c3b805e",
				description: null,
				id: "8f585b91-acd0-49de-9af6-c6868460f999",
				id,
				is_replace: null,
				job_description: null,
				job_description,
				modified_at: "2021-07-17T10:36:02.4953358Z",
				modified_by: "28fcfd7a-ce37-4b88-827f-08468c3b805e",
				modified_at: "",
				modified_by: "",
				name: "demo",
				plan_finish: "2021-07-16T17:00:00Z",
				plan_start: "2021-07-16T17:00:00Z",
				position_id: "85c24464-ee70-4e14-ac8b-8989dde4998b",
				position_id: extend_position_name.value,
				quantity: 1,
				quantity,
				recruit_process_id: null,
				salary: "",
				salary,
			 */

			const url = `/api/recruits/requests`;
			const response = await axios.post(url, submitState)

			if (!response) {
				console.log("Fail to add new request")
				return false
			}
			if (!response.data.success) {
				console.log("Failed to load")
				return false
			}
			return true;
		},
		
		edit: async () => {
			// const id = uuid();
			const {
				name: nameState,
				category_id: category_idRequest,
				extend_position_name: extend_position_nameRequest,
				job_description: job_descriptionRequest,
				salary: salaryRequest,
				plan_start: plan_startRequest,
				plan_finish: plan_finishRequest,
				quantity: quantityRequest,
				extend_approver_fullname_email: extend_approver_fullname_emailRequest,
				// code: codeRequest,
			} = state;
			const editState = {
				// approved_date: null,
				// approved_status_id: "cae086d1-38bb-40ac-bb12-708fc3c60959",
				// approver_id: "42f588d5-ea71-42e3-ba3c-8add71bd91b5",
				approver_id: extend_approver_fullname_emailRequest.value,
				// category_id: 1,
				category_id: category_idRequest.value,
				// code: "recruitmentRequest20210717T173452HDOUP",
				// code: "",
				// created_at: "2021-07-17T10:36:02.4871516Z",
				// created_by: "28fcfd7a-ce37-4b88-827f-08468c3b805e",
				created_at: moment().format("YYYY-MM-DDTHH:mm:ss"),
				created_by: "28fcfd7a-ce37-4b88-827f-08468c3b805e",
				description: null,
				// id: "8f585b91-acd0-49de-9af6-c6868460f999",
				// id,
				is_replace: null,
				// job_description: null,
				job_description: job_descriptionRequest,
				// modified_at: "2021-07-17T10:36:02.4953358Z",
				// modified_by: "28fcfd7a-ce37-4b88-827f-08468c3b805e",
				modified_at: moment().format("YYYY-MM-DDTHH:mm:ss"),
				modified_by: "28fcfd7a-ce37-4b88-827f-08468c3b805e",
				// name: "demo",
				name: nameState,
				// plan_finish: "2021-07-16T17:00:00Z",
				// plan_start: "2021-07-16T17:00:00Z",
				plan_finish: plan_finishRequest,
				plan_start: plan_startRequest,
				// position_id: "85c24464-ee70-4e14-ac8b-8989dde4998b",
				position_id: extend_position_nameRequest.value,
				// quantity: 1,
				quantity: quantityRequest,
				// recruit_process_id: null,
				// salary: "",
				salary: salaryRequest,
			}
			console.group("edit State");
			console.log(editState)
			console.groupEnd();
			const url = `/api/recruits/requests/${id}`
			const response = await axios.put(url, editState)
			
			console.group(`Edit request id: ${id}`)
			console.log(response)
			console.groupEnd()
			
			if (!response) {
				console.log(`Fail to edit current request with id: ${id}`)
				return false
			}
			if (!response.data.success) {
				console.log("Failed to load")
				return false
			}
			return true;
		}
	}));

	useEffect(() => {
		loadModel()
		if (id) fetchData(id);
		return () => null;
	}, [id]);
	

	useEffect(() => {
		const { plan_finish, plan_start } = state;
		if (plan_start !== "" && plan_finish === "") {
			return setState((prev) => {
				return {
					...prev,
					plan_finish: moment(plan_start).add(1, "days").format("YYYY-MM-DDTHH:mm:ss"),
				};
			});
		}
		return () => null;
	}, [plan_start, plan_finish]);

	useEffect(() => { }, [content]);

	useEffect(() => {
		validation();
		return () => setError({});
	}, [state, touched]);

	useEffect(() => {
		if (Object.keys(error).length > 0) console.log("validation", error);
	}, [error]);

	return (
		<>
			<Container className="request-recruit">
				<Row className="request-recruit__row">
					<Col sm={2} className="request-recruit__col">
						<label htmlFor="name" className="label--right text-nowrap">
							Tên yêu cầu*:
						</label>
					</Col>
					<Col sm={10} className="request-recruit__col">
						<div
							className={
								error && error.name ? "input__div__error " : "input__div"
							}
						>
							<input
								required={true}
								id="name"
								type="text"
								className={
									error && error.name
										? "input--borderless name__input label__error"
										: "input--borderless name__input"
								}
								name="name"
								onClick={(event) => handleClick(event)}
								onChange={(event) => handleChange(event)}
								value={name}
								placeholder="Tên yêu cầu tuyển dụng"
							/>
						</div>
						{
							<Text className="text-muted">
								<span className="error-message">{error.name}</span>
							</Text>
						}
					</Col>
				</Row>
				<Row className="request-recruit__row">
					<Col sm={2} className="request-recruit__col">
						<label htmlFor="category_id">
							<b className="label--right text-nowrap">Loại tuyển dụng*:</b>
						</label>
					</Col>
					<Col sm={4} className="request-recruit__col">
						<FormControl
							className={
								!error.category_id
									? matClasses.formControl
									: { ...matClasses.formControl, height: heightControlError }
							}
						>
							<Select
								labelId="category_id-select-label"
								id="category_id-select"
								name="category_id"
								value={category_id.value}
								displayEmpty={true}
								renderValue={() => {
									return category_id.name ||"Loại tuyển dụng"
								}}
								onClick={() =>
									setTouched((prev) => {
										return {
											...prev,
											category_id: true,
										};
									})
								}
								inputProps={{
									classes: {
										icon: matClasses.selectIcon,
									},
								}}
								onChange={async (event) => {
									const category = TypeRecruit.find(({ id }) => id === event.target.value)
									setState((prev) => {
										return {
											...prev,
											category_id:{
												value: category.id,
												name: category.name,	
											},
										};
									});
								}}
								// className={matClasses.select}
								className={
									error && error.category_id
										? `${matClasses.select} ${matClasses.selectError}`
										: `${matClasses.select}`
								}
							>
								{TypeRecruit.map((category_id) => (
									<MenuItem
										key={category_id.id}
										value={category_id.id}
										className={matClasses.selectItem}
									>
										{category_id.name}
									</MenuItem>
								))}
								{/* <MenuItem value={2} className={matClasses.selectItem}>Thay thế</MenuItem> */}
							</Select>
							{
								<FormHelperText>
									<span className="error-message">{error.category_id}</span>
								</FormHelperText>
							}
						</FormControl>
					</Col>
					<Col sm={2} className="request-recruit__col">
						<label
							htmlFor="extend_position_name"
							className="label--right text-nowrap "
						>
							<b className="label--right text-nowrap">Chức vụ*:</b>
						</label>
					</Col>
					<Col sm={4} className="request-recruit__col">
						<FormControl
							className={
								!error.category_id
									? matClasses.formControl
									: { ...matClasses.formControl, height: heightControlError }
							}
						>
							<Select
								labelId="extend_position_name-select-label"
								id="extend_position_name-select"
								name="extend_position_name"
								value={extend_position_name.value}
								displayEmpty={true}
								renderValue={ () => {
									return extend_position_name.name || "Chọn chức vụ";
								}}
								className={
									error && error.extend_position_name
										? `${matClasses.select} ${matClasses.selectError}`
										: `${matClasses.select}`
								}
								onClick={() =>
									setTouched((prev) => {
										return {
											...prev,
											extend_position_name: true,
										};
									})
								}
								inputProps={{
									classes: {
										icon: matClasses.selectIcon,
									},
								}}
								onChange={async (event) => {
									const target = await model.categories.find(({ id }) => id === event.target.value);
									setState((prev) => {
										return {
											...prev,
											extend_position_name: {
												name:	target.name,
												value:	target.id,
											},
										};
									});
								}}
							>
								{model.categories.map(category => {
									return(<MenuItem key={category.id} value={category.id} className={matClasses.selectItem} >{category.name}</MenuItem>)}
								)}
							</Select>
							{
								<FormHelperText>
									<span className="error-message">
										{error.extend_position_name}
									</span>
								</FormHelperText>
							}
						</FormControl>
					</Col>
				</Row>
				<Row className="request-recruit__row">
					<Col sm={2} className="request-recruit__col">
						<label htmlFor="quantity">
							<b className="label--right text-nowrap">Số lượng*:</b>
						</label>
					</Col>
					<Col sm={4} className="request-recruit__col">
						<div
							className={
								error && error.quantity ? "input__div__error " : "input__div"
							}
						>
							<input
								id="quantity"
								type="number"
								value={quantity}
								min={1}
								className="input--borderless label__error"
								name="quantity"
								onClick={(event) => handleClick(event)}
								placeholder="Số lượng tuyển dụng"
								onChange={(event) => handleChange(event)}
							/>
						</div>
						{
							<Text className="text-muted">
								<span className="error-message">{error.quantity}</span>
							</Text>
						}
					</Col>
					<Col sm={2} className="request-recruit__col">
						<label htmlFor="salary">
							<b className="label--right text-nowrap">Mức lương đề xuất:</b>
						</label>
					</Col>
					<Col sm={4} className="request-recruit__col">
						<div className={"input__div"}>
							<input
								id="salary"
								type="text"
								value={salary}
								min={1}
								className="input--borderless"
								name="salary"
								onClick={(event) => handleClick(event)}
								placeholder="vd: 10.000.000"
								onChange={(event) => {
									setState((prev) => {
										return {
											...prev,
											salary: event.target.value
												.replace(/\D/g, "")
												.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
												.replace(/^0/g, ""),
										};
									});
								}}
							/>
						</div>
						{/* <div className={error&&error.salary?"input__div__warn ":"input__div"}> */}
						{/* {(<Text className="text-muted"><span className="warn-message">{error.salary}</span></Text>)} */}
					</Col>
				</Row>
				<Row>
					<Col sm={2} className="request-recruit__col">
						<label htmlFor="date-start">
							<b className="label--right text-nowrap">Từ ngày*:</b>
						</label>
					</Col>
					<Col sm={4} className="request-recruit__col">
						{/* <div className={error&&error.plan_start?"input__div__error ":"input__div"}>
						<input type="date" id="date-start" className={error&&error.plan_start?"error__input":""} name="plan_start" value={plan_start} min={moment().format("YYYY-MM-DDTHH:mm:ss")} max={"2023-12-31"} onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)}/>
					</div> */}
						<Datetime
							dateFormat="DD/MM/YYYY"
							timeFormat={false}
							input={true}
							value={moment(moment(plan_start).format("YYYY-MM-DDTHH:mm"))}
							isValidDate={(date) => validDateTime(date)}
							closeOnSelect
							minValue={moment().format("YYYY-MM-DDTHH:mm:ss")}
							onChange={(date) =>
								setState((prev) => {
									return {
										...prev,
										plan_start: moment(date).format("YYYY-MM-DDTHH:mm:ss"),
									};
								})
							}
							className={
								error && error.plan_start ? "picker error__input" : "picker"
							}
							renderInput={(props) => (
								<>
									<input
										{...props}
										placeholder={"DD/MM/YYYY"}
										className={error && error.plan_start ? "error__input" : ""}
										onClick={() =>
											setTouched((prev) => {
												return { ...prev, plan_start: true };
											})
										}
									/>
								</>
							)}
						/>
						{
							<Text className="text-muted">
								<span className="error-message">{error.plan_start}</span>
							</Text>
						}
					</Col>
					<Col sm={2} className="request-recruit__col">
						<label htmlFor="date-end">
							<b className="label--right text-nowrap">Đến ngày*:</b>
						</label>
					</Col>
					<Col sm={4} className="request-recruit__col">
						{/* <div className={error&&error.plan_finish?"input__div__error ":"input__div"}>
						<input type="date" id="date-end" className={error&&error.plan_finish?"error__input":""}  name="plan_finish" value={plan_finish} min={moment().add(1, 'days').format("YYYY-MM-DDTHH:mm:ss")} max={"2023-12-31"} onClick={(event) => handleClick(event)} onChange={(event) => handleChange(event)} />
					</div> */}
						<Datetime
							dateFormat="DD/MM/YYYY"
							timeFormat={false}
							input={true}
							value={moment(moment(plan_finish).format("YYYY-MM-DDTHH:mm"))}
							isValidDate={(date) => validDateTime(date, plan_start)}
							closeOnSelect
							onChange={(date) =>
								setState((prev) => {
									return {
										...prev,
										plan_finish: moment(date).format("YYYY-MM-DDTHH:mm:ss"),
									};
								})
							}
							className={
								error && error.plan_finish ? "picker error__input" : "picker"
							}
							renderInput={(props) => (
								<>
									<input
										{...props}
										placeholder={"DD/MM/YYYY"}
										className={error && error.plan_finish ? "error__input" : ""}
										onClick={() =>
											setTouched((prev) => {
												return { ...prev, plan_finish: true };
											})
										}
									/>
								</>
							)}
						/>
						{
							<Text className="text-muted">
								<span className="error-message">{error.plan_finish}</span>
							</Text>
						}
					</Col>
				</Row>
				<Row className="request-recruit__row">
					<Col sm={2} className="request-recruit__col">
						<label htmlFor="extend_approver_fullname_email">
							<b className="label--right text-nowrap">Người duyệt*:</b>
						</label>
					</Col>
					<Col sm={10} className="request-recruit__col">
						<FormControl
							className={
								!error.extend_approver_fullname_email
									? matClasses.formControl
									: { ...matClasses.formControl, height: heightControlError }
							}
						>
							<Select
								labelId="extend_approver_fullname_email-select-label"
								id="extend_approver_fullname_email-select"
								name="extend_approver_fullname_email"
								value={extend_approver_fullname_email.value}
								displayEmpty={true}
								renderValue={() =>
									extend_approver_fullname_email.name || "Cấp trên duyệt yêu cầu"
								}
								className={
									error && error.extend_approver_fullname_email
										? `${matClasses.select} ${matClasses.selectError} test`
										: `${matClasses.select}`
								}
								onClick={() =>
									setTouched((prev) => {
										return {
											...prev,
											extend_approver_fullname_email: true,
										};
									})
								}
								inputProps={{
									classes: {
										icon: matClasses.selectIcon,
									},
								}}
								onChange={async (event) => {
									const target = await model.managers.find(({ id }) => id === event.target.value);
									if (target === undefined) {
										setState((prev) => {
											return {
												...prev,
												extend_approver_fullname_email: {
													name:	"",
													value:	"",
												},
											};
										});
									} else {
										setState((prev) => {
											return {
												...prev,
												extend_approver_fullname_email: {
													name:	target.extend_user_name_email,
													value:	target.id,
												},
											};
										});
									}
								}}
							>
								<MenuItem value="" className={matClasses.selectItem}> --- Bỏ chọn --- </MenuItem>
								{model.managers.map(manager => {
									return(<MenuItem key={manager.id} value={manager.id} className={matClasses.selectItem}>{manager.extend_user_name_email}</MenuItem>)
								})}
							</Select>
							{
								<FormHelperText>
									<span className="error-message">
										{error.extend_approver_fullname_email}
									</span>
								</FormHelperText>
							}
						</FormControl>
					</Col>
				</Row>
				<Row className="request-recruit__row">
					<Col sm={2} className="request-recruit__col">
						<label htmlFor="job_description">
							<b className="label--right text-nowrap">Mô tả yêu cầu:</b>
						</label>
					</Col>
					<Col
						sm={10}
						className="request-recruit__col  request-recruit__col__description"
					>
						<ReactSummernote
							value={job_description}
							options={{
								// lang: 'ru-RU',
								height: 200,
								dialogsInBody: true,
								styleTags: [
									"p",
									{
										title: "Blockquote",
										tag: "blockquote",
										className: "blockquote",
										value: "blockquote",
									},
									"pre",
									"h1",
									"h2",
									"h3",
									"h4",
									"h5",
									"h6",
								],
								placeholder: "Nhập một số mô tả",
								disableDragAndDrop: true,
								fontNames: [
									"Helvetica",
									"sans-serif",
									"Arial",
									"Arial Black",
									"Comic Sans MS",
									"Courier New",
								],
								fontNamesIgnoreCheck: [
									"Helvetica",
									"sans-serif",
									"Arial",
									"Arial Black",
									"Comic Sans MS",
									"Courier New",
								],
								fontSizes: [2, 4, 6, 8, 10, 12, 13, 14],
								fontSizeUnits: ["px", "pt"],
								lineHeights: [
									"0.2",
									"0.3",
									"0.4",
									"0.5",
									"0.6",
									"0.8",
									"1.0",
									"1.2",
									"1.4",
									"1.5",
									"2.0",
									"3.0",
								],
								toolbar: [
									["style", ["bold", "italic", "underline", "clear"]],
									["font", ["strikethrough", "superscript", "subscript"]],
									["fontname", ["fontname"]],
									["fontsize", ["fontsize"]],
									["color", ["color"]],
									["para", ["ul", "ol", "paragraph"]],
									["height", ["height"]],
								],
							}}
							onClick={(event) => handleClick(event)}
							onChange={changeDescriptionEditor}
						/>
					</Col>
				</Row>
				{/* <Row className="request-recruit__row">
				<Col sm={2} className="request-recruit__col" ><label htmlFor="job_description" ><b className="label--right text-nowrap">Tệp đính kèm:</b></label></Col>
				<Col sm={10} className="request-recruit__col" >Danh sách tệp đính kèm</Col>
			</Row> */}
			</Container>
		</>
	);
})