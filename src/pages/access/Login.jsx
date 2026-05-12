import { queryData } from "#functions/custom-hooks/queryData";
import useOtherLogin from "#functions/custom-hooks/userLogin";
import { InputText } from "#components/form-inputs/FormInputs";
import {
  apiVersion,
  devNavUrl,
  setStorageRoute,
} from "#functions/functions-general";
import { checkRoleToRedirect } from "#functions/login-functions";
import ButtonSpinner from "#partials/spinners/ButtonSpinner";
import FetchingSpinner from "#partials/spinners/FetchingSpinner";
import {
  setCredentials,
  setError,
  setIsLogin,
  setMessage,
  setSuccess,
} from "#store/StoreAction";
import { StoreContext } from "#store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [passwordShown, setPasswordShown] = React.useState(false);
  const navigate = useNavigate();
  const { loginLoading } = useOtherLogin(navigate);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`${apiVersion}/controllers/dev/settings/users/login.php`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["other"] });

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        if (store.isLogin) {
          delete data.data["0"].users_password;
          delete data.data["0"].role_description;
          delete data.data["0"].role_created;
          delete data.data["0"].role_datetime;

          dispatch(setError(false));
          dispatch(setMessage(""));
          dispatch(setCredentials(data.data["0"]));
          setStorageRoute(data.data.token);
          dispatch(setIsLogin(false));
          checkRoleToRedirect(navigate, data.data[0]);
        }
      }
    },
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const initVal = {
    user_other_email: "",
    password: "",
  };

  const yupSchema = Yup.object({
    user_other_email: Yup.string()
      .trim()
      .required("Required")
      .email("Invalid email"),
    password: Yup.string().trim().required("Required"),
  });

  React.useEffect(() => {
    dispatch(setError(false));
    dispatch(setSuccess(false));
    dispatch(setMessage(""));
  }, []);

  return (
    <>
      {loginLoading ? (
        <FetchingSpinner />
      ) : (
        <div
          className="flex justify-center items-center "
          style={{ transform: "translateY(clamp(5rem,12vw,8rem))" }}
        >
          <div className="w-96 p-6">
            <div className="flex justify-center items-center flex-col">
              Logo
            </div>

            <p className="mt-8 mb-5 text-lg font-bold uppercase text-center">
              Admin LOGIN
            </p>
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // mutate data
                mutation.mutate(values);
                dispatch(setError(false));
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
                    <div className="relative mb-6">
                      <InputText
                        label="Password"
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        required={false}
                        disabled={mutation.isPending}
                      />
                      {props.values.password && (
                        <span
                          className="text-base absolute bottom-1/2 right-2 translate-y-1/2 cursor-pointer"
                          onClick={togglePassword}
                        >
                          {passwordShown ? (
                            <FaEyeSlash className="fill-gray-400" />
                          ) : (
                            <FaEye className="fill-gray-400" />
                          )}
                        </span>
                      )}
                    </div>

                    {store.error && (
                      <div className="bg-red-50 p-2 rounded-sm mb-3 border-b border-b-red-600">
                        <p className="m-0 text-red-600">
                          Invalid email or password.
                          <br />
                          <br /> In case you forgot your password,
                          <br /> please reset your password by clicking the
                          reset password link below.
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-1 pt-3">
                      <button
                        type="submit"
                        disabled={mutation.isPending || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isPending ? <ButtonSpinner /> : "Login"}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            {/* <p className="mt-5 mb-1 text-sm">
              Need an Account?{" "}
              <a
                href={`${devNavUrl}/create-account`}
                className="w-full text-primary"
              >
                <u> Create an Account</u>
              </a>
            </p> */}
            <p className="mt-5 text-sm">
              Did you forget your password?{" "}
              <a
                href={`${devNavUrl}/forgot-password`}
                className="w-full text-primary"
              >
                <u> Reset password</u>
              </a>
            </p>
            <br />
            <p className="text-sm">
              Go back to{" "}
              <a
                href={`/`}
                className="w-full text-primary"
              >
                <u> Home page</u>
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
