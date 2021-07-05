import React, { useEffect, } from 'react'
import "../../styles/ModalPreviewRecruit/ModalPreviewRecruit.scss"
import { Row, Col, } from "react-bootstrap"

export default function ModalPreviewRecruit (props) {
	const time = Date();
	const [currentDay, currentMonth, currentYear] = [time.getDate(), time.getMonth(), time.getFullYear()]
	const today = `${currentYear}-${(currentMonth + 1).length > 1? currentMonth + 1: `0${currentMonth + 1}`}-${currentDay.length > 1? currentDay:`0${currentDay}`}`
	
	useEffect(() => {
	}, [])

	return (
		<div>
			<Row>
				<Col sm={2} >
					<label for="name" className="label--right">Tên yêu cầu:</label>
				</Col>
				<Col sm={8}>
					<input id="name" type="text" className="input--borderless"/>
				</Col>
			</Row>
			<Row>
				<Col sm={2}>
					<label for="type" ><b className="label--right">Loại tuyển dụng:</b></label>
				</Col>
				<Col sm={4}>
					<select name="type" id="type-select" className="input--borderless">
						<option value="">--Chọn loại--</option>
						<option value="0" selected>Tuyển mới</option>
						<option value="1">Thực tập</option>
						<option value="2">Chính thức</option>
					</select>
				</Col>
				<Col sm={2}>
					<label for="position" className="label--right "><b className="label--right">Chức vụ:</b></label>
				</Col>
				<Col sm={4}>
					<select name="position" id="type-select" className="input--borderless">
						<option value="">--Chọn chức vụ--</option>
						<option value="0" selected>Nhân viên</option>
						<option value="1">Chức vụ 1</option>
						<option value="2">Chức vụ 2</option>
					</select>
				</Col>
			</Row>
			<Row>
				<Col sm={2}>
					<label for="count"  ><b className="label--right">Số lượng:</b></label>
				</Col>
				<Col sm={4}>
					<input id="count" type="number" value={1} className="input--borderless"/>
				</Col>
				<Col sm={2}>
					<label for="salary" ><b className="label--right">Mức lương đề xuất:</b></label>
				</Col>
				<Col sm={4}>
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
				<Col sm={2}>
					<label for="date-start"  ><b className="label--right">Từ ngày:</b></label>
				</Col>
				<Col sm={4}>
					<input type="date" id="date-start" name="date-start"
						value={today}
						minValue="2018-01-01" maxValue="2018-12-31"
						/>
				</Col>
				<Col sm={2}>
					<label for="date-end" ><b className="label--right">Đến ngày:</b></label>
				</Col>
				<Col sm={4}>
					<input type="date" id="date-start" name="date-start"
						value={today}
						minValue="2018-01-01" maxValue="2018-12-31"
						/>
				</Col>
			</Row>
			<Row>
				<Col sm={2}>
					<label for="creator" ><b className="label--right">Người duyệt:</b></label>
				</Col>
				<Col sm={10}>
					<input id="creator" type="text" className="input--borderless"/>
				</Col>
			</Row>
			<Row>
				<Col sm={2}>
					<label for="description" ><b className="label--right">Mô tả yêu cầu:</b></label>
				</Col>
				<Col sm={10}>
					<textarea id="description" type="text" />
				</Col>
			</Row>
			<Row>
				<Col sm={2}>
					<label for="description" ><b className="label--right">Tệp đính kèm:</b></label>
				</Col>
			</Row>
			
		</div>
	)
}