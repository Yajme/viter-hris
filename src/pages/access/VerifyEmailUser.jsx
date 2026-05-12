import useQueryData from "#functions/custom-hooks/useQueryData";
import {
  apiVersion,
  devNavUrl,
  getUrlParam,
} from "#functions/functions-general";
import PageNotFound from "#partials/PageNotFound";
import FetchingSpinner from "#partials/spinners/FetchingSpinner";
import { FaCheck } from "react-icons/fa";

export default function VerifyEmailUser () {
  const key = getUrlParam().get("key");

  const {
    isLoading,
    error,
    data: changeEmail,
  } = useQueryData(
    `${apiVersion}/other-user/verify-email/${key}`,
    "get", // method
    "change-email" // key
  );

  return (
    <>
      {changeEmail?.count === 0 || key === null || key === "" ? (
        <PageNotFound />
      ) : isLoading ? (
        <FetchingSpinner />
      ) : (
        <div
          className="relative flex justify-center items-center "
          style={{ transform: "translateY(clamp(5rem,12vw,8rem))" }}
        >
          <div className="w-96 p-6">
            <div className="flex justify-center items-center flex-col">
              <WfcLogoMd />
            </div>
            <FaCheck className="h-16 w-16 fill-success mx-auto mt-8" />
            <h2 className="mb-4 mt-2 text-lg text-center">Success!</h2>
            <p className="text-sm text-justify mb-6">
              Your email has been successfully changed! You can now login using
              your new email.
            </p>

            <p className="mt-2 text-sm">
              Go back to{" "}
              <a href={`${devNavUrl}/login`} className="w-full text-primary">
                <u> login</u>
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};


