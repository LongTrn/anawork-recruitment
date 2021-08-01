import React from 'react';
import { TableRecruitment, Pagination, } from "../index"

export default function withRecruitment(WrapperComponent, page ) {

	return function WithRecruitment () {

		return (
			<div className={page.type === "recruit"? "list" : "my-list"}>
				<WrapperComponent />
				<TableRecruitment editable={page.type === "myRecruit"} page={{type: page.type}} />
				<Pagination page={{type: page.type}} />
			</div>
		)
	}
}