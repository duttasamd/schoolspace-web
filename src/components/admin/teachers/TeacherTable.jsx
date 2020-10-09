import React from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import CookieService from "../../../services/CookieService";
import Table from "../../ReactTable";

const Styles = styled.div`
	padding: 1rem;

	table {
		border-spacing: 0;
		border: 1px solid black;

		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}
		}

		th,
		td {
			margin: 0;
			padding: 0.5rem;
			border-bottom: 1px solid black;
			border-right: 1px solid black;

			:last-child {
				border-right: 0;
			}
		}
	}

	.pagination {
		padding: 0.5rem;
	}
`;

export default function TeacherTable() {
	const columns = React.useMemo(
		() => [
			{
				Header: "First Name",
				accessor: "firstname",
			},
			{
				Header: "Last Name",
				accessor: "lastname",
			},
		],
		[]
	);

	// We'll start our table without any data
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [pageCount, setPageCount] = React.useState(0);
	const fetchIdRef = React.useRef(0);

	const fetchData = React.useCallback(
		({ pageSize, pageIndex, search }) => {
			const fetchId = ++fetchIdRef.current;

			// Set the loading state
			setLoading(true);

			if (fetchId === fetchIdRef.current) {
				fetch(
					process.env.REACT_APP_SCHOOLSPACE_API_URL +
						"/teachers?" +
						new URLSearchParams({
							pageIndex: pageIndex,
							pageSize: pageSize,
							search: search,
						}),
					{
						method: "GET",
						headers: {
							Accept: "application/json",
							Authorization:
								"Bearer " + CookieService.get("access_token"),
						},
					}
				)
					.then(async (response) => {
						const data = await response.json();
						if (!response.ok) {
							const error =
								(data && data.message) || response.status;
							return Promise.reject(error);
						}
						setData(data.data);

						setPageCount(
							Math.ceil(parseInt(data.recordsTotal) / pageSize)
						);
					})
					.catch((error) => {
						console.error("There was an error!", error);
					})
					.finally(() => {
						setLoading(false);
					});
			}
		},
		[setLoading]
	);

	return (
		<>
			<div className='spinner'>
				<ClipLoader size={150} color={"#123abc"} loading={loading} />
			</div>
			<div className={loading ? "spinner-parent" : ""}>
				<Styles>
					<Table
						columns={columns}
						data={data}
						fetchData={fetchData}
						pageCount={pageCount}
					/>
				</Styles>
			</div>
		</>
	);
}
