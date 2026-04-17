import React from "react";
import Layout from "#pages/dev/layout";
import { FaPlus } from "react-icons/fa6";
import { StoreContext } from "#store/StoreContext";
import { setIsAdd } from "#store/StoreAction";
import EmployeesList from "./EmployeesList";
import ModalAddEmployees from "./ModalAddEmployees";
export default function Employees() {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = (item) => {
    console.log("employees.jsx", item);
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  return (
    <>
      <Layout menu="employees" submenu="">
        {/* Page Header */}
        {/*<div className="bg-white h-dvw w-dvh">*/}

        {/*</div>*/}
        <div className="flex items-center justify-between w-full">
          <h1>Employees</h1>
          <div>
            <button
              className="flex items-center gap-1 hover:underline"
              type="button"
              onClick={()=>handleAdd(null)}
            >
              <FaPlus className="text-primary" />
              Add
            </button>
          </div>
        </div>
        {/*Page Content*/}
        <div>
          <EmployeesList setItemEdit={setItemEdit} itemEdit={itemEdit} />
        </div>
      </Layout>

      {store.isAdd && (
      <>
        {" "}
        <ModalAddEmployees itemEdit={itemEdit} />
      </>
    )}
    </>
  );
}
