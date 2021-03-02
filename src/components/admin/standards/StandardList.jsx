import StandardCard from "./StandardCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { useEffect, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import authAxios from '../../../utils/authAxios'

function Search({ setSearch }) {
	const [value, setValue] = React.useState([]);
	const onChange = (value) => {
		setSearch(value || "");
	};

	return (
		<input
			value={value || ""}
			type='text'
			className='form-control'
			placeholder='search'
			aria-label='search'
			aria-describedby='basic-addon1'
			onChange={(e) => {
				setValue(e.target.value);
				onChange(e.target.value);
			}}
		/>
	);
}

export default function StandardList(props) {
    const [standards, setStandards] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		authAxios.get("/standards")
		.then((response) => {
			setStandards(response.data);
		})
	}, [search]);

	return (
		<div className='container my-5 p-3'>
			<div className='input-group mb-3 float-right w-50'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>
						<FontAwesomeIcon icon={faSearch} />
					</span>
				</div>
				<Search setSearch={setSearch} />
			</div>
			<div className="row my-5 w-100">
				{standards.map((standard) => (
					<StandardCard standard={standard} setStandard={props.setStandard} key={standard.id}/>
				))}
			</div>
		</div>
	);
}