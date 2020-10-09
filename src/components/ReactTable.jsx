import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useTable, usePagination } from "react-table";
import "./reacttable.css";

export default function Table({
	columns,
	data,
	fetchData,
	loading,
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

	React.useEffect(() => {
		fetchData({ pageIndex, pageSize });
	}, [fetchData, pageIndex, pageSize]);

	return (
		<>
			<div className='float-left w-25'>{addmodal}</div>
			<div class='input-group mb-3 float-right w-50'>
				<div class='input-group-prepend'>
					<span class='input-group-text'>
						<FontAwesomeIcon icon={faSearch} />
					</span>
				</div>
				<input
					type='text'
					class='form-control'
					placeholder='search'
					aria-label='search'
					aria-describedby='basic-addon1'
				/>
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
						{loading ? (
							// Use our custom loading state to show a loading indicator
							<td colSpan='10000'>Loading...</td>
						) : (
							<td colSpan='10000'>
								Showing {page.length} of ~
								{controlledPageCount * pageSize} results
							</td>
						)}
					</tr>
				</tbody>
			</table>
			{/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
			<div className='pagination'>
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{"<<"}
				</button>{" "}
				<button
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					{"<"}
				</button>{" "}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{">"}
				</button>{" "}
				<button
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					{">>"}
				</button>{" "}
				<span>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{" "}
				</span>
				<span>
					| Go to page:{" "}
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
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</>
	);
}
