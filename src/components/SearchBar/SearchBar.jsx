import React, { useState, useEffect, } from 'react';
import "../../styles/SearchBar/SearchBar.scss"
import { useDispatch, useSelector, } from "react-redux"
import {
    FETCH_JOB_DATA,
} from "../../redux/jobs/jobsActionType"

export default function SearchBar() {

    const [search, setSearch] = useState("")
    const { index, pageSize, } = useSelector(state => state.jobs)
    const dispatch = useDispatch();

    useEffect(() => dispatch({ type: FETCH_JOB_DATA, payload: { input: { search, index, size: pageSize, } } }), [search])

    return (
        <div className="search-bar__wrapper">
            <div className="search-bar">
                <button type="submit" className="btn shadow-none search-bar__button"><i className="bi bi-search"></i></button>
                <input
                    placeholder="Nhập tìm kiếm..."
                    type="text"
                    value={search}
                    onChange={e => setSearch(prev => e.target.value)}
                    className="search-bar__term"
                    id="input_text"
                />
            </div>
        </div>
    )
}