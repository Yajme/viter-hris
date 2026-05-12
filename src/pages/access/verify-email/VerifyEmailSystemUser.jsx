import useQueryData from "@/components/custom-hooks/useQueryData";
import {
  apiVersion,
  devNavUrl,
  getUrlParam,
} from "@/components/helpers/functions-general";
import PageNotFound from "@/components/partials/PageNotFound";
import FetchingSpinner from "@/components/partials/spinners/FetchingSpinner";
import WfcLogoMd from "@/svg/WfsLogoMd";
import { FaCheck } from "react-icons/fa";

const VerifyEmailSystemUser = () => {
  const key = getUrlParam().get("key");

  const { data: changeEmail, isLoading } = useQueryData(
    `${apiVersion}/user-system/verify-email/${key}`,
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

            <p className="mt-2">
              Go back to{" "}
              <a
                href={`${devNavUrl}/developer/login`}
                className="w-full text-primary"
              >
                <u> login</u>
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyEmailSystemUser;
