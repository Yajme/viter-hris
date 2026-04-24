import React from "react";
import * as Yup from "yup";
import { StoreContext } from "#store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "#functions/custom-hooks/queryData";
import { apiVersion } from "#functions/functions-general";
import { setError, setIsAdd, setMessage, setSuccess } from "#store/StoreAction";
import ModalWrapperSide from "#partials/modals/ModalWrapperSide";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText, InputTextArea } from "#components/form-inputs/FormInputs";
import ButtonSpinner from "#partials/spinners/ButtonSpinner";
import MessageError from "#partials/MessageError";
const ModalAddDepartment = ({ itemEdit }) => {
    const { store, dispatch } = React.useContext(StoreContext);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (values) =>
            queryData(
                itemEdit
                    ? `${apiVersion}/controllers/dev/settings/department/department.php?id=${itemEdit.department_aid}`
                    : `${apiVersion}/controllers/dev/settings/department/department.php`,
                itemEdit ? "PUT" : "POST",
                values,
            ),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["department"] });
            if (data.success) {
                dispatch(setSuccess(true));
                dispatch(
                    setMessage(
                        `Successfully ${itemEdit ? "updated" : "submitted"}`,
                    ),
                );
                dispatch(setIsAdd(false));
            }
            if (!data.success) {
                dispatch(setError(true));
                dispatch(setMessage(data.error));
            }
        },
    });

    const initVal = {
        ...itemEdit,
        department_name: itemEdit ? itemEdit.department_name : "",
        department_name_old: itemEdit ? itemEdit.department_name_old : "",
    };

    const yupSchema = Yup.object({
        department_name: Yup.string().trim().required("Name is required"),
    });

    const handleClose = () => {
        dispatch(setIsAdd(false));
    };
    React.useEffect(() => {
        dispatch(setError(false));
    }, []);
    console.log(itemEdit);
    return (
        <>
            <ModalWrapperSide
                handleClose={handleClose}
                className="transition-all ease-in-out transform duration-200"
            >
                {/* Header*/}
                <div className="modal-header relative mb-4">
                    <h3 className="text-dark text-sm">
                        {itemEdit ? "Update" : "Add"} Role
                    </h3>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="absolute top-0 right-4"
                    >
                        <FaTimes />
                    </button>
                </div>
                {/* Body*/}
                <div className="modal-body">
                    <Formik
                        initialValues={initVal}
                        validationSchema={yupSchema}
                        onSubmit={async (
                            values,
                            { setSubmitting, resetForm },
                        ) => {
                            mutation.mutate(values);
                            dispatch(setError(false));
                        }}
                    >
                        {(props) => {
                            return (
                                <Form className="h-full">
                                    <div className="modal-form-container">
                                        <div className="modal-container">
                                            <div className="relative mb-6">
                                                <InputText
                                                    label="Name"
                                                    name="department_name"
                                                    type="text"
                                                    disabled={
                                                        mutation.isPending
                                                    }
                                                />
                                            </div>
                                            {store.error && <MessageError />}
                                        </div>
                                        <div className="modal-action">
                                            <button
                                                type="submit"
                                                disabled={
                                                    mutation.isPending ||
                                                    !props.dirty
                                                }
                                                className="btn-modal-submit"
                                            >
                                                {mutation.isPending ? (
                                                    <ButtonSpinner />
                                                ) : itemEdit ? (
                                                    "Save"
                                                ) : (
                                                    "Add"
                                                )}
                                            </button>
                                            <button
                                                type="reset"
                                                className="btn-modal-cancel"
                                                onClick={handleClose}
                                                disabled={mutation.isPending}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </ModalWrapperSide>
        </>
    );
};

export default ModalAddDepartment;
