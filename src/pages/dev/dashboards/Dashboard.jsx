import React from "react";
import Layout from "#pages/dev/layout";
import { FaPlus } from "react-icons/fa6";
import { StoreContext } from "#store/StoreContext";
import { setIsAdd } from "#store/StoreAction";
import DashboardGrid from "./DashboardGrid";
export default function Dashboard({ setItemEdit }) {
    const { store, dispatch } = React.useContext(StoreContext);
    const handleAdd = (item) => {
        dispatch(setIsAdd(true));
        setItemEdit(item);
    };
    return (
        <>
            <Layout menu="dashboard">
                {/* Page Header */}
                {/*<div className="bg-white h-dvw w-dvh">*/}

                {/*</div>*/}
                <div className="flex items-center justify-between w-full">
                    <h1>Dashboard</h1>
                </div>
                {/*Page Content*/}
                <div>
                    <DashboardGrid />
                </div>
            </Layout>

            {/* {store.isAdd && (
      <>
        {" "}
        <ModalAddRoles itemEdit={itemEdit} />
      </>
    )}*/}
        </>
    );
}
