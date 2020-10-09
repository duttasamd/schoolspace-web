import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

import { useTable, usePagination, useAsyncDebounce } from "react-table";
import "./reacttable.css";

function Search({ setSearch, gotoPage }) {
	const [value, setValue] = React.useState([]);
	const onChange = useAsyncDebounce((value) => {
		setSearch(value || "");
		gotoPage(0);
	}, 500);

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

export default function Table({
	columns,
	data,
	fetchData,
	pageCount: controlledPageCount,
	addmodal,
}) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		// Get the state from the instance
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
			manualPagination: true,
			pageCount: controlledPageCount,
		},
		usePagination
	);

	const [search, setSearch] = useState("");

	React.useEffect(() => {
		fetchData({ pageIndex, pageSize, search });
	}, [fetchData, pageIndex, pageSize, search]);

	return (
		<>
			<div className='float-left w-25'>{addmodal}</div>
			<div className='input-group mb-3 float-right w-50'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>
						<FontAwesomeIcon icon={faSearch} />
					</span>
				</div>
				<Search setSearch={setSearch} gotoPage={gotoPage} />
			</div>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>
									{column.render("Header")}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? " 🔽"
												: " 🔼"
											: ""}
									</span>
								</th>
							))}
							<th></th>
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>
											{cell.render("Cell")}
										</td>
									);
								})}
								<td>
									<button className='btn btn-transparent'>
										<FontAwesomeIcon
											icon={faEdit}
											className='mx-auto'
										/>
									</button>
								</td>
							</tr>
						);
					})}
					<tr>
						<td colSpan='10000'>
							Showing {page.length} of ~
							{controlledPageCount * pageSize} results
						</td>
					</tr>
				</tbody>
			</table>
			{/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
			<div className='pagination inlineblock'>
				<div className='float-left left'>
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
						className='form-control'
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
				<div className='float-right right'>
					<span>
						Go to page:{" "}
						<input
							type='number'
							defaultValue={pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value
									? Number(e.target.value) - 1
									: 0;
								gotoPage(page);
							}}
							style={{ width: "100px" }}
						/>
					</span>{" "}
					<span>
						Page{" "}
						<strong>
							{pageIndex + 1} of {pageOptions.length}
						</strong>{" "}
					</span>
					<button
						onClick={() => gotoPage(0)}
						disabled={!canPreviousPage}
						className='btn btn-primary squaresides'
					>
						{"<<"}
					</button>{" "}
					<button
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
						className='btn btn-primary squaresides'
					>
						{"<"}
					</button>{" "}
					<button
						onClick={() => nextPage()}
						disabled={!canNextPage}
						className='btn btn-primary squaresides'
					>
						{">"}
					</button>{" "}
					<button
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
						className='btn btn-primary squaresides'
					>
						{">>"}
					</button>
				</div>
			</div>
		</>
	);
}
