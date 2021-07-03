import React from 'react';
import "../../styles/MyRecruited/MyRecruited.scss"
import Header from "../Header/Header"

export default function MyRecruited (props) {

	return (
		<div className="my-list">
			<div className="my-list__header">
				<div className="my-list__header--left-padding">
					<div className="my-list__header__text">
						<Header main="Duyệt yêu cầu tuyển dụng"/>
					</div>
				</div>
			</div>
			<div>
				<table class="table table-borderless list__data">
					<thead>
						<tr>
							{/* <th 
								scope="col"
								className=""
							>Yêu cầu tuyển dụng</th>
							<th scope="col">Mô tả yêu cầu</th>
							<th scope="col">Người tạo</th>
							<th scope="col">Bắt đầu</th>
							<th scope="col">Kết thúc</th>
							<th scope="col">Số lượng</th>
							<th scope="col">Thao tác</th> */}
							
							<th 
								scope="col"
								className="list__data__header__name"
							>Yêu cầu tuyển dụng</th>
							<th 
								scope="col"
								className="list__data__header__description"
							>Mô tả yêu cầu</th>
							<th 
								scope="col"
								className="list__data__header__creator"
							>Người tạo</th>
							<th 
								scope="col"
								className="list__data__header__date-start"
							>Bắt đầu</th>
							<th 
								scope="col"
								className="list__data__header__date-end"
							>Kết thúc</th>
							<th 
								scope="col"
								className="list__data__header__count"
							>Số lượng</th>
							<th 
								scope="col"
								className="list__data__header__behavior"
							>Thao tác</th>
						</tr>
					</thead>
					<tbody>
						<tr >
							<td className="list__data__rows__name" scope="row">Tuyển dụng nhân viên kiểm thử</td>
							<td className="list__data__rows__description">Tuyển dụng nhân viên kiểm thử</td>
							<td className="list__data__rows__creator">Nguyễn Lữ Thế</td>
							<td className="list__data__rows__date-start">20/11/2020</td>
							<td className="list__data__rows__date-end">20/11/2020</td>
							<td className="list__data__rows__count">2</td>
							<td className="my-list__data__rows__action">
								<button
									type="button"
									className="btn btn-outline-primary list__data__action__button"
								>
									<i class="bi bi-list-ul"></i>
									<span className="spacing-xxs"/>
									Xem chi tiết
							</button></td>
						</tr>
						<tr className="my-list__data__rows">
							<td scope="row">Tuyển dụng nhân viên kiểm thử</td>
							<td>Tuyển dụng nhân viên kiểm thử</td>
							<td>Nguyễn Lữ Thế</td>
							<td>20/11/2020</td>
							<td>20/11/2020</td>
							<td>2</td>
							<td className="my-list__data__rows__action">
								<button
									type="button"
									className="btn btn-outline-primary list__data__action__button"
								>
									<i class="bi bi-list-ul"></i>
									<span className="spacing-xxs"/>
									Xem chi tiết
							</button></td>
						</tr>
						<tr className="my-list__data__rows">
							<td scope="row">Tuyển dụng nhân viên kiểm thử</td>
							<td>Tuyển dụng nhân viên kiểm thử</td>
							<td>Nguyễn Lữ Thế</td>
							<td>20/11/2020</td>
							<td>20/11/2020</td>
							<td>2</td>
							<td className="my-list__data__rows__action">
								<button
									type="button"
									className="btn btn-outline-primary list__data__action__button"
								>
									<i class="bi bi-list-ul"></i>
									<span className="spacing-xxs"/>
									Xem chi tiết
							</button></td>
						</tr>
						<tr className="my-list__data__rows">
							<td scope="row">Tuyển dụng nhân viên kiểm thử</td>
							<td>Tuyển dụng nhân viên kiểm thử</td>
							<td>Nguyễn Lữ Thế</td>
							<td>20/11/2020</td>
							<td>20/11/2020</td>
							<td>2</td>
							<td className="my-list__data__rows__action">
								<button
									type="button"
									className="btn btn-outline-primary list__data__action__button"
								>
									<i class="bi bi-list-ul"></i>
									<span className="spacing-xxs"/>
									Xem chi tiết 
							</button></td>
						</tr>
					</tbody>					
				</table>
			</div>
		</div>
	)
}