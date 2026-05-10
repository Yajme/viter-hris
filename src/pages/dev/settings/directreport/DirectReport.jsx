import { FaPlus } from "react-icons/fa6";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import Layout from "#pages/dev/layout";
import DirectReportList from "./DirectReportList";
import React from "react";
import ModalAddDirectReport from "./ModalAddDirectReport";
const DirectReport = () => {
    const { store, dispatch } = React.useContext(StoreContext);
    const [itemEdit, setItemEdit] = React.useState(null);

    const handleAdd = () => {
        dispatch(setIsAdd(true));
        setItemEdit(null);
    };
    return (
        <>
            <Layout menu="settings" submenu="roles">
                {/* Page Header */}
                {/*<div className="bg-white h-dvw w-dvh">*/}

                {/*</div>*/}
                <div className="flex items-center justify-between w-full">
                    <h1>DirectReport</h1>
                    <div>
                        <button
                            className="flex items-center gap-1 hover:underline"
                            type="button"
                            onClick={handleAdd}
                        >
                            <FaPlus className="text-primary" />
                            Add
                        </button>
                    </div>
                </div>
                {/*Page Content*/}
                <div>
                    <DirectReportList
                        setItemEdit={setItemEdit}
                        itemEdit={itemEdit}
                    />
                </div>
            </Layout>

            {store.isAdd && (
                <>
                    <ModalAddDirectReport itemEdit={itemEdit} />
                </>
            )}
        </>
    );
};

export default DirectReport;
