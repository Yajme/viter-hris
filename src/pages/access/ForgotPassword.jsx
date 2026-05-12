import { queryData } from "#functions/custom-hooks/queryData";
import { InputText } from "#components/form-inputs/FormInputs";
import { apiVersion, devNavUrl } from "#functions/functions-general";
import ButtonSpinner from "#partials/spinners/ButtonSpinner";
import {
  setError,
  setForgotPassSuccess,
  setMessage,
} from "#store/StoreAction";
import { StoreContext } from "#store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaCheck } from "react-icons/fa";
import * as Yup from "yup";

const ForgotPassword = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`${apiVersion}/controllers/dev/settings/users/reset-password.php`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["other"] });
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        setIsSuccess(true);
      }
    },
  });

  const initVal = {
    item: "",
  };

  const yupSchema = Yup.object({
    item: Yup.string().trim().required("Required"),
  });

  React.useEffect(() => {
    dispatch(setForgotPassSuccess(true));
  }, []);

  return (
    <>
      <div
        className="flex justify-center items-center "
        style={{ transform: "translateY(clamp(5rem,12vw,8rem))" }}
      >
        <div className="w-96 p-6">
          <div className="flex justify-center items-center flex-col">

          </div>

          {isSuccess ? (
            <>
              <FaCheck className="h-16 w-16 fill-success mx-auto mt-8" />
              <h2 className="mb-4 mt-2 text-lg text-center uppercase">
                Success!
              </h2>
              <p className="text-sm mb-6 text-justify">
                We have sent instructions to reset your password. If you haven't
                received the email, please check your spam or junk folder as
                well.
              </p>

              <p className="mt-3 text-sm">
                Go back to{" "}
                <a href={`${devNavUrl}/`} className="w-full text-primary">
                  <u> login</u>
                </a>
              </p>
            </>
          ) : (
            <>
              <p className="mt-8 mb-5 text-lg font-bold text-center">
                RESET PASSWORD
              </p>
              <Formik
                initialValues={initVal}
                validationSchema={yupSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  // mutate data
                  mutation.mutate(values);
                }}
              >
                {(props) => {
                  return (
                    <Form className="text-sm">
                      <div className="relative mb-4">
                        <InputText
                          label="Email"
                          type="text"
                          name="item"
                          disabled={mutation.isPending}
                        />
                      </div>

                      {store.error && (
                        <div className="bg-red-50 p-2 rounded-sm mb-3 border-b border-b-red-600">
                          <p className="m-0 text-red-600">
                            Invalid email.
                            <br />
                            <br /> In case you forgot your account,
                            <br /> please contact{" "}

                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-1 pt-3">
                        <button
                          type="submit"
                          disabled={mutation.isPending || !props.dirty}
                          className="btn-modal-submit relative"
                        >
                          {mutation.isPending ? <ButtonSpinner /> : "Submit"}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              <p className="mt-3 text-sm">
                Go back to{" "}
                <a href={`${devNavUrl}/login`} className="w-full text-primary">
                  <u> login</u>
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
