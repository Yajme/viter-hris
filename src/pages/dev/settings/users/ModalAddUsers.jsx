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
import { InputSelect, InputText, InputTextArea } from "#components/form-inputs/FormInputs";
import ButtonSpinner from "#partials/spinners/ButtonSpinner";
import MessageError from "#partials/MessageError";
const ModalAddUsers = ({ itemEdit , activeRoles = []}) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/dev/settings/users/users.php?id=${itemEdit.users_aid}`
          : `${apiVersion}/controllers/dev/settings/users/users.php`,
        itemEdit ? "PUT" : "POST",
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(
          setMessage(`Successfully ${itemEdit ? "updated" : "submitted"}`),
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
    users_first_name: itemEdit ? itemEdit.users_first_name : "",
    users_last_name: itemEdit ? itemEdit.users_last_name : "",
    users_email: itemEdit ? itemEdit.users_email : "",
    users_role_id: itemEdit ? itemEdit.users_role_id : "",
    users_password : itemEdit  ? itemEdit.users_password : "",
    users_email_old: itemEdit ? itemEdit.users_email_old : "",
  };

  const yupSchema = Yup.object({
    users_first_name: Yup.string().trim().required("First Name is required"),
    users_last_name: Yup.string().trim().required("Last Name is required"),
    users_email: Yup.string().trim().email("Invalid email").required("Email is required"),
    // users_password: Yup.string().trim().required("Password is required"),
    users_role_id: Yup.string().trim().required("Role is required"),
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
            {itemEdit ? "Update" : "Add"} User
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
            onSubmit={async (values, { setSubmitting, resetForm }) => {
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
                          label="First Name"
                          name="users_first_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mt-5 mb-6">
                        <InputText
                          label="Last Name"
                          name="users_last_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mt-5 mb-6">
                        <InputSelect
                          label="Role"
                          name="users_role_id"
                          type="text"
                          disabled={mutation.isPending}
                        >
                          <optgroup label="Select a role">
                            <option value="" hidden> --- </option>
                            {activeRoles.map((item,key) => {
                              return <option key={key} value={item.role_aid}>{item.role_name}</option>;
                           })}
                          </optgroup>
                          
                        </InputSelect>
                      </div>
                      <div className="relative mt-5 mb-6">
                        <InputText
                          label="Email"
                          name="users_email"
                          type="email"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mt-5 mb-6">
                        <InputText
                          label="Password"
                          name="users_password"
                          type="password"
                          disabled={mutation.isPending}
                        />
                      </div>
                      {store.error && <MessageError />}
                    </div>
                    <div className="modal-action">
                      <button
                        type="submit"
                        disabled={mutation.isPending || !props.dirty}
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

export default ModalAddUsers;
