import React, { useState, useEffect, useRef,} from "react";
import "../../styles/CVForm/CVForm.scss"
import ReCAPTCHA from "react-google-recaptcha";
import moment from "moment";
import { axios, } from "../../config/index"

export default function CVForm ({recruit_id}) {

	const [state, setState] = useState({
		name: "",
		phone: "",
		mail: "",
		captcha: ""
	})

	const [files, setFiles] = useState([])
	const uploadFileButton = useRef();
	const removeRef = useRef();

	const openUploader = () => {

		uploadFileButton.current.click();
	}

	const handleFile = async (event) => {
		
		// const newFiles = Array.from(event.target.files).map(file => {
		// 	console.log(file)
		// 	console.log(typeof file)
		// 	uploadCV(file)
		// 	return {
		// 		_id: moment().format("x"),
		// 		name: file.name,
		// 		size: file.size,
		// 		type: file.type, 
		// 		lastModified: moment(file.lastModifiedDate).format("x"), 
		// 		lastModifiedDate: moment(file.lastModifiedDate).format("LLLL"),
		// 		webkitRelativePath: file.webkitRelativePath,
		// 	}
		// })
		// files.push(...newFiles);

		const newFiles = (event.target.files)
		files.push(...newFiles);
		setFiles(prev => ([...files]))
	}

	const handleValidReCaptcha = (value) => {

		console.log(value)
		setState(prev => ({...prev, captcha: value}))
	}

	const handleRemove = (event) => {
		
		console.log("remove Item", event)
		removeRef.current.click();
		// setFiles(prev => {console.log(newFiles); return [...newFiles]})
	}

	const removeFile = (event) => {

		console.log("event", event)
		console.log("event", event.target.id)
		// console.log(event.target)
		// setFiles(prev => files.filter(file => file._id))
	}

	const submitCV = async () => {

		const url = `/api/recruitCvSubmitted`
		const submitState = {

			attachment_name: null,
			email: state.mail,
			first_name: state.name,
			is_proceed: false,
			last_name: "",
			phone: state.phone,
			physical_path: null,
			recruit_id,
		}
		const response = await axios.post(url, submitState)

		if (!response) { console.group("Can't Submit CV"); console.groupEnd(); return;}
		if (!response.data.success) { console.group("Submit CV Failed"); console.groupEnd(); return;}

		const { id, } = response.data.data
		files.map(file => {

			uploadCV(id, file)
			return null;
		})
		/*
		 	created_at: "2021-07-28T09:53:44.2221429Z"
			email: "mail@gm.com"
			first_name: "Bảo Long"
			id: "ce42ec7c-654b-4f55-a5c0-f8a355d9e867"
			is_proceed: false
			last_name: "Trần"
			phone: "12312312123"
		*/
	}

	const uploadCV = async (id, file) => {

		const url = `/api/myRecruitCvSubmitted/${id}/upload`
		const formData = new FormData();
		formData.append('file', file);
		
		const response = await axios.put(url, formData)
		
		if (!response) { console.group("Can't Upload CV"); console.groupEnd(); return;}
		if (!response.data.success) { console.group("Upload CV Failed"); console.groupEnd(); return;}

		/**
			created_at: "2021-07-28T10:53:44.222142+01:00"
			email: "mail@gm.com"
			first_name: "Bảo Long"
			id: "ce42ec7c-654b-4f55-a5c0-f8a355d9e867"
			is_proceed: false
			last_name: "Trần"
			phone: "12312312123"
			recruit_: null
			recruit_cv_attachments: [,…]
			0: {id: "8480381c-ffc5-4c7c-ac15-7d3e209f155a", candidate_id: "ce42ec7c-654b-4f55-a5c0-f8a355d9e867",…}
				attachment_name: "REPORT_KTCN_BM02_PhieuDiemDanh_DoanhNghiep_27-07-2021.docx"
				attachment_path: "/cvs/2807202109534453429563"
				candidate_id: "ce42ec7c-654b-4f55-a5c0-f8a355d9e867"
				created_at: "2021-07-28T09:53:44.5524491Z"
				id: "8480381c-ffc5-4c7c-ac15-7d3e209f155a"
			recruit_id: "7b7e24ab-cd9b-4cbb-a07c-3328fdb54b2d"
			message: "Upload file successfully"

		*/
	}

	useEffect(() => {
	
		// console.log("test files", files)
	}, [files])

	return (
		<div className="cv">
			<div className="text-uppercase cv__header">nộp hồ sơ ứng tuyển</div>
			<div className="cv__form">
				<div className="cv__form__info">
					<input type="text" className="cv__form__info__input" onChange={(e) => setState(prev => ({...prev, [e.target.name]: e.target.value}))} value={state.name} name="name" placeholder="Họ và tên"/>
					<input type="text" className="cv__form__info__input" onChange={(e) => setState(prev => ({...prev, [e.target.name]: e.target.value}))} value={state.phone} name="phone" placeholder="Số điện thoại"/>
					<input type="text" className="cv__form__info__input" onChange={(e) => setState(prev => ({...prev, [e.target.name]: e.target.value}))} value={state.mail} name="mail" placeholder="E-mail"/>
				</div>
				<button 
					className={(files.length?"cv__form__action--modified cv__form__action__preview ":"") + " cv__form__action btn-block" }
					// onClick={() => openUploader()}
				>
					<input 
						type="file" 
						value=""
						ref={uploadFileButton} 
						onChange={(event) => handleFile(event)}
						className="cv__form__action__uploader" 
						multiple 
						accept={".pdf, .doc, .docx, .png, .jpg, .xls, .xlsx"}
						/>
					{files.length?
						files.map( file => { 
							return (
								<div 
									key={file._id} 
									className="cv__form__action__preview__child "
									// onClick={(event) => removeFile(event)} 
								>
									<div className="cv__form__action__preview__child__text">
										<i className="bi bi-x-lg"/>
										{file.name}
									</div>
									<div 
										id={file._id}
										className="cv__form__action__preview__child__button" 
										onClick={(event) => removeFile(event)}
										ref={removeRef}
									><i className="bi bi-x-lg"/></div>
								</div>
							)
						})
						:
						(<>
							<div className="text-nowrap cv__form__action__text cv__form__action__icon">
								<i className="bi bi-cloud-upload"></i>
							</div>
							<div className="text-nowrap cv__form__action__text">Tải CV của bạn lên</div>
							<div className="text-nowrap cv__form__action__text">(.pdf, .doc, .docx, .xls, .jpg, .png)</div>
						</>)
					}	
				</button>
			</div>
			<div className="cv__verify">
				<ReCAPTCHA 
					sitekey={"6LcbG7IbAAAAABqgvWBVLNdMmRQI28TxSUeOcAwn"} 
					onChange={(value) => handleValidReCaptcha(value)}
				/>
			</div>
			<div className="cv__submit">
				<button type="button" onClick={() => submitCV()} className="text-uppercase shadow-none text-nowrap cv__submit__button">gửi hồ sơ</button>
			</div>
			{/* <div>
				<input type="file" className="cv__form__action__form" placeholder="Testing"/>
			</div> */}
		</div>
	)
}