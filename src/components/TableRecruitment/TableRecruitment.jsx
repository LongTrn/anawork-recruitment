import React from 'react';
import "../../styles/TableRecruitment/TableRecruitment.scss"

export default function TableRecruitment (props) {

	return (
		
		<div className="table--padding">
			<table class="table table-borderless table__data">
				<thead>
					<tr>
						<th 
							scope="col"
							className="table__header__name"
						>Yêu cầu tuyển dụng</th>
						<th 
							scope="col"
							className="table__header__description"
						>Mô tả yêu cầu</th>
						<th 
							scope="col"
							className="table__header__creator"
						>Người tạo</th>
						<th 
							scope="col"
							className="table__header__date-start"
						>Bắt đầu</th>
						<th 
							scope="col"
							className="table__header__date-end"
						>Kết thúc</th>
						<th 
							scope="col"
							className="table__header__count table--text-center"
						>Số lượng</th>
						<th 
							scope="col"
							className="table__header__behavior table--text-center"
						>Thao tác</th>
					</tr>
				</thead>
				<tbody>
					<tr className="table__rows status__pending">
						<td className="table__rows__name status__item">Tuyển dụng nhân viên kiểm thử</td>
						<td className="table__rows__description">Tuyển dụng nhân viên kiểm thử</td>
						<td className="table__rows__creator">Nguyễn Lữ Thế</td>
						<td className="table__rows__date-start">20/11/2020</td>
						<td className="table__rows__date-end">20/11/2020</td>
						<td className="table__rows__count table--text-center">2</td>
						<td className="table__rows__behavior table--item-center">
							<button
								type="button"
								className="btn btn-outline-primary table__rows__behavior__button text-nowrap 
								"
							>
								<i class="bi bi-list-ul table__rows__behavior__button__icon"/>
								Xem chi tiết</button></td>
					</tr>
				</tbody>					
			</table>
		</div>
	)
}