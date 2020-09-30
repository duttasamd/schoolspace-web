import React from "react";
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

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Set the loading state
    setLoading(true);

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        // const startRow = pageSize * pageIndex;
        // const endRow = startRow + pageSize;
        console.log("fetching users..");
        fetch(
          process.env.REACT_APP_SCHOOLSPACE_API_URL +
            "/teachers?" +
            new URLSearchParams({
              pageIndex: pageIndex,
              pageSize: pageSize,
            }),
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + CookieService.get("access_token"),
            },
          }
        )
          .then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }

            setData(data.data);
            setPageCount(Math.ceil(parseInt(data.recordsTotal) / pageSize));
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });

        // Your server could send back total page count.
        // For now we'll just fake it, too

        setLoading(false);
      }
    });
  }, []);

  return (
    <Styles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </Styles>
  );
}
