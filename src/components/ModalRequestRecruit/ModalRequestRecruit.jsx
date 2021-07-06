import React, { useEffect, } from 'react'
import "../../styles/ModalRequestRecruit/ModalRequestRecruit.scss"
import { Container, Row, Col, } from "react-bootstrap"
import { Editor } from "react-draft-wysiwyg";
import { TextEditorToolbarOption } from "../../models/index"

export default function ModalRequestRecruit (props) {
	const time = new Date();
	const [currentDay, currentMonth, currentYear] = [time.getDate(), time.getMonth(), time.getFullYear()]
	const today = `${currentYear}-${(currentMonth + 1).length > 1? currentMonth + 1: `0${currentMonth + 1}`}-${currentDay.length > 1? currentDay:`0${currentDay}`}`
	useEffect(() => {
		
	}, [])

	return (
		<Container className="request-recruit">
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="name" className="label--right text-nowrap">Tên yêu cầu:</label></Col>
				<Col sm={9} className="request-recruit__col" ><input id="name" type="text" className="input--borderless"/></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="type" ><b className="label--right text-nowrap">Loại tuyển dụng:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="type" id="type-select" className="input--borderless">
						<option value="">--Chọn loại--</option>
						<option value="0" selected>Tuyển mới</option>
						<option value="1">Thực tập</option>
						<option value="2">Chính thức</option>
					</select>
				</Col>
				<Col sm={3} className="request-recruit__col" ><label for="position" className="label--right text-nowrap "><b className="label--right text-nowrap">Chức vụ:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="position" id="type-select" className="input--borderless">
						<option value="">--Chọn chức vụ--</option>
						<option value="0" selected>Nhân viên</option>
						<option value="1">Chức vụ 1</option>
						<option value="2">Chức vụ 2</option>
					</select>
				</Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="count"  ><b className="label--right text-nowrap">Số lượng:</b></label></Col>
				<Col sm={3} className="request-recruit__col" ><input id="count" type="number" value={1} className="input--borderless"/></Col>
				<Col sm={3} className="request-recruit__col" ><label for="salary" ><b className="label--right text-nowrap">Mức lương đề xuất:</b></label></Col>
				<Col sm={3} className="request-recruit__col" >
					<select name="salary" id="type-select">
						<option value="">--Chọn mức lương--</option>
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
				<Col sm={3} className="request-recruit__col" ><input type="date" id="date-start" name="date-start" value={today} minValue="2018-01-01" maxValue="2018-12-31" /></Col>
				<Col sm={3} className="request-recruit__col" ><label for="date-end" ><b className="label--right text-nowrap">Đến ngày:</b></label></Col>
				<Col sm={3} className="request-recruit__col" ><input type="date" id="date-start" name="date-start" value={today} minValue="2018-01-01" maxValue="2018-12-31" /></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="creator" ><b className="label--right text-nowrap">Người duyệt:</b></label></Col>
				<Col sm={9} className="request-recruit__col" ><input id="creator" type="text" className="input--borderless"/></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="description" ><b className="label--right text-nowrap">Mô tả yêu cầu:</b></label></Col>
				<Col sm={9} className="request-recruit__col" ><Editor toolbar={TextEditorToolbarOption} /></Col>
			</Row>
			<Row className="request-recruit__row">
				<Col sm={3} className="request-recruit__col" ><label for="description" ><b className="label--right text-nowrap">Tệp đính kèm:</b></label></Col>
				<Col sm={9} className="request-recruit__col" >Danh sách tệp đính kèm</Col>
			</Row>
		</Container>
	)
}