import { queryData } from "@/components/custom-hooks/queryData";
import { InputCode } from "@/components/helpers/FormInputs";
import {
  apiVersion,
  setStorageRoute,
} from "@/components/helpers/functions-general";
import { checkRoleToRedirect } from "@/components/helpers/login-functions";
import {
  setCredentials,
  setError,
  setIsLogin,
  setMessage,
  setSuccess,
} from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const VerifyCodeFormik = ({ loading, setLoading, navigate }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();

  const handleSubmit = async (code) => {
    setLoading(true);
    const data = await queryData(`${apiVersion}/other/login-donor`, "post", {
      password: code,
      user_other_email: window.sessionStorage.getItem("donor_email"),
      update_time: window.sessionStorage.getItem("update_time"),
    });
    queryClient.invalidateQueries({ queryKey: ["read-email-donor"] });

    if (!data.success) {
      dispatch(setError(true));
      dispatch(setMessage(data.error));
    } else {
      if (store.isLogin) {
        delete data.data[0].user_other_password;
        delete data.data[0].role_description;
        delete data.data[0].role_created;
        delete data.data[0].role_datetime;

        dispatch(setError(false));
        dispatch(setMessage(""));
        sessionStorage.removeItem("verifiy_code");
        sessionStorage.removeItem("update_time");
        sessionStorage.removeItem("timer");
        sessionStorage.removeItem("donor_email");

        dispatch(setCredentials(data.data[0]));
        setStorageRoute(data.data[1]);
        dispatch(setIsLogin(false));
        checkRoleToRedirect(navigate, data.data[0]);
      }
    }
    setTimeout(() => setLoading(false), 1000);
  };

  // Initialize timer to 10 minutes (10 * 60 seconds)
  const [secondsLeft, setSecondsLeft] = React.useState(
    window.sessionStorage.getItem("timer")
  );

  React.useEffect(() => {
    // Exit if timer reaches 0
    if (secondsLeft <= 0) return;

    // Set interval to decrease secondsLeft by 1 every second
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
      sessionStorage.removeItem("timer");
      sessionStorage.setItem("timer", secondsLeft);
    }, 1000);

    // Cleanup interval on unmount or when secondsLeft changes
    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  // Convert seconds back to minutes and seconds for display
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  React.useEffect(() => {
    dispatch(setError(false));
    dispatch(setSuccess(false));
    dispatch(setMessage(""));
  }, []);

  return (
    <>
      <div className="relative mb-6 text-sm">
        <p>
          Login Verification Code
          <strong className="ml-3">
            (
            {secondsLeft > 0
              ? `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
                  2,
                  "0"
                )}`
              : "Verification code is already expired!"}
            )
          </strong>
        </p>
        <div className="flex justify-center">
          <InputCode
            length={6}
            label="Verify code"
            loading={loading}
            className="block w-9.5 text-center border-gray-200 rounded-md sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            onComplete={(code) => handleSubmit(code)}
          />
        </div>
      </div>
      {store.error && (
        <div className="bg-red-50 p-2 rounded-sm mb-3 border-b border-b-red-600">
          <p className="m-0 text-red-600">
            Invalid verification code.
            <br />
            <br /> The verification code you entered is invalid or has expired.
            Please request a new code and try again.
          </p>
        </div>
      )}
      <p className="mt-5 text-sm">
        Didn't receive a code? <br /> Request a new verification code. <br />
        <a
          href={""}
          onClick={() => {
            sessionStorage.removeItem("verifiy_code");
            sessionStorage.removeItem("update_time");
            sessionStorage.removeItem("timer");
            sessionStorage.removeItem("donor_email");
          }}
          className="w-full text-primary"
        >
          <u> Send verification code</u>
        </a>
      </p>
    </>
  );
};

export default VerifyCodeFormik;
