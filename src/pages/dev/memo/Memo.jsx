import React from "react";
import Layout from "#pages/dev/layout";
import { FaPlus } from "react-icons/fa6";
import { StoreContext } from "#store/StoreContext";
import { setIsAdd } from "#store/StoreAction";
import MemoList from "./MemoList";
import ModalAddMemo from "./ModalAddMemo";
import ModalShowMemo from "./ModalShowMemo";
export default function Memo() {
    const { store, dispatch } = React.useContext(StoreContext);
    const [itemEdit, setItemEdit] = React.useState(null);
    const handleAdd = (item) => {
        dispatch(setIsAdd(true));
        setItemEdit(item);
    };

    return (
        <>
            <Layout menu="memo" submenu="">
                {/* Page Header */}

                {/*</div>*/}
                <div className="flex items-center justify-between w-full">
                    <h1>Memo</h1>
                    <div>
                        <button
                            className="flex items-center gap-1 hover:underline"
                            type="button"
                            onClick={() => handleAdd(null)}
                        >
                            <FaPlus className="text-primary" />
                            Add
                        </button>
                    </div>
                </div>
                {/*Page Content*/}
                <div>
                    <MemoList setItemEdit={setItemEdit} itemEdit={itemEdit} />
                </div>
            </Layout>
            {store.isMemoOpen && (
                <>
                    <ModalShowMemo itemEdit={itemEdit} />
                </>
            )}
            {store.isAdd && (
                <>
                    <ModalAddMemo itemEdit={itemEdit} />
                </>
            )}
        </>
    );
}
