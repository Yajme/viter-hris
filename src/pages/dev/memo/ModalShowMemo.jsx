import ModalWrapperCenter from "#partials/modals/ModalWrapperCenter";
import { setIsMemoOpen } from "#store/StoreAction";
import { StoreContext } from "#store/StoreContext";
import React from "react";

export default function ModalShowMemo({ itemEdit }) {
    const { store, dispatch } = React.useContext(StoreContext);
    const handleClose = () => {
        dispatch(setIsMemoOpen(false));
    };
    console.log(itemEdit);
    return (
        <ModalWrapperCenter
            handleClose={handleClose}
            className="w-[min(92vw,760px)] max-h-[90dvh] rounded-2xl bg-white shadow-2xl overflow-hidden px-6"
        >
            <div className="px-5 py-4 border-b border-b-gray-700">
                <dl className="grid grid-cols-[80px_1fr] gap-y-1 text-sm">
                    <dt className="font-bold text-gray-600">To:</dt>
                    <dd>{itemEdit.memo_to}</dd>

                    <dt className="font-bold text-gray-600">From:</dt>
                    <dd>{itemEdit.memo_from}</dd>

                    <dt className="font-bold text-gray-600">Date:</dt>
                    <dd>{itemEdit.memo_date}</dd>

                    <dt className="font-bold text-gray-600">Category:</dt>
                    <dd>{itemEdit.memo_category}</dd>
                </dl>
            </div>

            {/* avoid .modal-body (it has full-screen height in your index.css) */}
            <div className="px-5 py-4 overflow-y-auto max-h-[calc(90dvh-130px)]">
                {/* Memo reference block */}
                <div className="text-sm mb-4 space-y-0.5">
                    <p>
                        Memo No. {itemEdit.memo_date.split("-")[1]}
                        {itemEdit.memo_date.split("-")[2]}, Series{" "}
                        {itemEdit.memo_date.split("-")[0]}
                    </p>
                    <p>
                        TO:{" "}
                        <span className="uppercase">{itemEdit.memo_to}</span>
                    </p>
                    <p>
                        RE:{" "}
                        <span className="uppercase">
                            {itemEdit.memo_subject}
                        </span>
                    </p>
                </div>

                {/* Memo body - justified like a formal letter */}
                <div className="text-sm text-gray-800 leading-relaxed text-justify whitespace-pre-line">
                    {itemEdit.memo_text}
                </div>
            </div>

            <div className="px-5 py-4 bg-white flex gap-2 justify-end">
                <button
                    type="button"
                    className="btn-modal-cancel w-fit"
                    onClick={handleClose}
                >
                    Close
                </button>
            </div>
        </ModalWrapperCenter>
    );
}
