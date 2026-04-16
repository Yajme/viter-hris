import { queryDataInfinite } from "#functions/custom-hooks/queryDataInfinite";
import { apiVersion } from "#functions/functions-general";
import NoData from "#partials/NoData";
import ServerError from "#partials/ServerError";
import FetchingSpinner from "#partials/spinners/FetchingSpinner";
import TableLoading from "#partials/TableLoading";
import { StoreContext } from "#store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";

import React from "react";
import { useInView } from "react-intersection-observer";

export default function EmployeesList({ itemEdit, setItemEdit }) {
  const { store, dispatch } = React.useContext(StoreContext);

  // page
  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState(null);
  const [onSearch, setOnSearch] = React.useState(false);
  const [searchValue] = React.useState("");
  const { ref, inView } = useInView();
  let counter = 1;
  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["employees", searchValue, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${apiVersion}/employees/search`, // search endpoint
        `${apiVersion}/employees/page/${pageParam}`, // list endpoint
        // store.isSearch || isFilter, // search boolean, // search boolean
        false,
        {
          searchValue,
        },
        `post`,
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      // if (lastPage.page < lastPage.total && lastPage.count != 0) {
      //   return lastPage.page + lastPage.per_page;
      // }
      return;
    },
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      <div className="relative pt-4 rounded-md">
        {status !== "pending" && isFetching && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Employee Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {!error &&
              (status == "pending" || result?.pages[0]?.count == 0) && (
                <tr>
                  <td colSpan={"100%"} className="p-10">
                    {status == "pending" ? (
                      <TableLoading cols={2} count={20} />
                    ) : (
                      <NoData />
                    )}
                  </td>
                </tr>
              )}
            {error && (
              <tr>
                <td colSpan={"100%"} className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
