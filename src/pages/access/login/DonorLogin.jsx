import { queryData } from "@/components/custom-hooks/queryData";
import { InputText } from "@/components/helpers/FormInputs";
import { apiVersion, devNavUrl } from "@/components/helpers/functions-general";
import ButtonSpinner from "@/components/partials/spinners/ButtonSpinner";
import { setError, setMessage, setSuccess } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import WfcLogoMd from "@/svg/WfsLogoMd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import VerifyCodeFormik from "./VerifyCodeFormik";
import FetchingSpinner from "@/components/partials/spinners/FetchingSpinner";
import { useNavigate } from "react-router-dom";
import useOtherLogin from "@/components/custom-hooks/useOtherLogin";

const DonorLogin = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { loginLoading } = useOtherLogin(navigate);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`${apiVersion}/other/read-email-donor`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["read-email-donor"] });

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setSuccess(true));
        dispatch(setError(false));
        dispatch(setMessage(""));

        sessionStorage.setItem("verifiy_code", "true");
        sessionStorage.setItem("donor_email", data?.data[0]?.user_other_email);
        sessionStorage.setItem(
          "update_time",
          data?.data[0]?.user_other_datetime
        );
        sessionStorage.setItem("timer", 10 * 60);
      }
    },
  });

  const initVal = {
    user_other_email: "",
  };

  const yupSchema = Yup.object({
    user_other_email: Yup.string()
      .trim()
      .required("Required")
      .email("Invalid email"),
  });

  React.useEffect(() => {
    dispatch(setError(false));
    dispatch(setSuccess(false));
    dispatch(setMessage(""));
  }, []);

  return (
    <>
      {loading || loginLoading ? (
        <FetchingSpinner />
      ) : (
        <>
          <div
            className="flex justify-center items-center "
            style={{ transform: "translateY(clamp(5rem,12vw,8rem))" }}
          >
            <div className="w-96 p-6">
              <div className="flex justify-center items-center flex-col">
                <WfcLogoMd />
              </div>

              <p className="mt-8 mb-5 text-lg font-bold text-center">
                DONOR LOGIN
              </p>
              {window.sessionStorage.getItem("verifiy_code") === "true" ? (
                <VerifyCodeFormik
                  loading={loading || loginLoading}
                  setLoading={setLoading}
                  navigate={navigate}
                />
              ) : (
                <>
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
                          <div className="relative mb-6">
                            <InputText
                              label="Email"
                              type="text"
                              name="user_other_email"
                              required={false}
                              disabled={mutation.isPending}
                            />
                          </div>

                          {store.error ? (
                            <div className="bg-red-50 p-2 rounded-sm mb-3 border-b border-b-red-600">
                              <p className="m-0 text-red-600">
                                Invalid email.
                                <br />
                                <br /> The specified email address does not
                                exist in our records. Please check the email you
                                entered.
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="flex items-center gap-1 pt-3">
                            <button
                              type="submit"
                              disabled={mutation.isPending || !props.dirty}
                              className="btn-modal-submit relative"
                            >
                              {mutation.isPending ? (
                                <ButtonSpinner />
                              ) : (
                                "Send Verification Code"
                              )}
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                  <p className="mt-5 mb-1 text-sm">
                    Need an Account?{" "}
                    <a
                      href={`${devNavUrl}/create-account`}
                      className="w-full text-primary"
                    >
                      <u> Create an Account</u>
                    </a>
                  </p>
                  <br />
                </>
              )}
              <p className="text-sm">
                Go back to{" "}
                <a
                  href={`http://worldfocusinc.com/wf2025`}
                  className="w-full text-primary"
                >
                  <u> Home page</u>
                </a>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DonorLogin;
