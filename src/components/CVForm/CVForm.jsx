import React, { useState, useEffect,} from "react";
import "../../styles/CVForm/CVForm.scss"
import ReCAPTCHA from "react-google-recaptcha";

export default function CVForm (props) {

	const [state, setState] = useState({
		name: "",
		phone: "",
		mail: "",
	})

	return (
		<div className="cv">
			<div className="text-uppercase cv__header">nộp hồ sơ ứng tuyển</div>
			<div className="cv__form">
				<div className="cv__form__info">
					<input type="text" className="cv__form__info__input" name="name" placeholder="Họ và tên"/>
					<input type="text" className="cv__form__info__input" name="phone" placeholder="Số điện thoại"/>
					<input type="text" className="cv__form__info__input" name="mail" placeholder="E-mail"/>
				</div>
				<button className="cv__form__action btn-block" onClick={()=> alert("test")}>
					<div className="text-nowrap cv__form__action__text cv__form__action__icon">
						<i className="bi bi-cloud-upload"></i>
					</div>
					<div className="text-nowrap cv__form__action__text">Tải CV của bạn lên</div>
					<div className="text-nowrap cv__form__action__text">(.pdf, .doc, .docx, .xls, .jpg, .png)</div>
				</button>
				{/* <input type="file" /> */}
			</div>
			<div className="cv__verify"><ReCAPTCHA sitekey={"6LcbG7IbAAAAABqgvWBVLNdMmRQI28TxSUeOcAwn"} onChange={(e) => console.log("Recaptcha",e.target.value)}/></div>
			<div className="cv__submit">
				<button className="text-uppercase shadow-none text-nowrap cv__submit__button">gửi hồ sơ</button>
			</div>
		</div>
	)
}