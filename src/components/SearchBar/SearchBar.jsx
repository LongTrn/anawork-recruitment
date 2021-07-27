import React, { useState, } from 'react';
import "../../styles/SearchBar/SearchBar.scss"
export default function SearchBar (props) {

	return (
		<div className="search-bar__wrapper">
            <div className="search-bar">
				<button type="submit" className="btn shadow-none search-bar__button"><i className="bi bi-search"></i></button>
                <input
                    placeholder="Nhập tìm kiếm..."
                    type="text"
                    className="search-bar__term"
                    id="input_text"
                />
            </div>
        </div>
	)
}