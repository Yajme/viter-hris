import { FaPlus } from "react-icons/fa6";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import Layout from "#pages/dev/layout";
import UsersList from "./UsersList";
import React from "react";
import ModalAddUsers from "./ModalAddUsers";
import { apiVersion } from "#functions/functions-general";
import useQueryData from "#functions/custom-hooks/useQueryData";
import ButtonSpinner from "#partials/spinners/ButtonSpinner";
const Users = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const {
    isLoading,
    isFetching,
    data: dataRoles,
  } = useQueryData(
    `${apiVersion}/controllers/dev/settings/roles/roles.php`,
    "get",
    "roles",
    );
  
  const filterArrayActiveRoles = dataRoles?.data.filter((item) => item.role_is_active === 1);
 
  
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Layout menu="settings" submenu="users">
        {/* Page Header */}
        {/*<div className="bg-white h-dvw w-dvh">*/}

        {/*</div>*/}
        <div className="flex items-center justify-between w-full">
          <h1>Users</h1>
          <div>
            {isLoading ? <ButtonSpinner /> :

             ( <button
                className="flex items-center gap-1 hover:underline"
                type="button"
                onClick={handleAdd}
              >
                <FaPlus className="text-primary" />
                Add
              </button>)}
          </div>
        </div>
        {/*Page Content*/}
        <div>
          <UsersList setItemEdit={setItemEdit} itemEdit={itemEdit} activeRole={filterArrayActiveRoles}/>
        </div>
      </Layout>

      {store.isAdd && (
        <>
          <ModalAddUsers itemEdit={itemEdit} activeRoles={filterArrayActiveRoles} />
        </>
      )}
    </>
  );
};

export default Users;
