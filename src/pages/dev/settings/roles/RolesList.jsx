import useQueryData from "#functions/custom-hooks/useQueryData";
import { apiVersion, formatDate } from "#functions/functions-general";
import NoData from "#partials/NoData";
import FetchingSpinner from "#partials/spinners/FetchingSpinner";
import TableLoading from "#partials/TableLoading";
import { setIsAdd } from "#store/StoreAction";
import { StoreContext } from "#store/StoreContext";
import React from "react";
import { FaEdit } from "react-icons/fa";

const RolesList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const {
    isLoading,
    isFetching,
    data: dataRoles,
  } = useQueryData(
    `${apiVersion}/controllers/dev/settings/roles/roles.php`,
    "get",
    "roles",
  );
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  return (
    <>
      <div className="relative pt-6 rounded-md">
        {isFetching && !isLoading && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Role</th>
              <th>Description</th>
              <th>Created</th>
              <th>Date updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="100%" className="p-10">
                  <TableLoading cols={2} count={20} />
                </td>
              </tr>
            ) : dataRoles?.count === 0 ? (
              <tr>
                <td colSpan="100%" className="p-10">
                  <NoData />
                </td>
              </tr>
            ) : (
              dataRoles?.data.map((role, key) => {
                return (
                  <tr key={key}>
                    <td>{role.role_aid}</td>
                    <td>{role.role_name}</td>
                    <td>{role.role_description}</td>
                    <td>{formatDate(role.role_created, "--", "short-date")}</td>
                    <td>{formatDate(role.role_updated, "--", "short-date")}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        {role.role_is_active == 1 ? (
                          <>
                            <button
                              type="button"
                              className="tooltip-action-table"
                              data-tooltip="edit"
                              onClick={() => handleEdit(role)}
                            >
                              <FaEdit />
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RolesList;
