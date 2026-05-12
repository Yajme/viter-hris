import { checkLocalStorage } from "#functions/CheckLocalStorage";
import { apiVersion } from "#functions/functions-general";
import { checkRoleToRedirect } from "#functions/login-functions";
import { setIsLogin } from "#store/StoreAction";
import { StoreContext } from "#store/StoreContext";
import React from "react";
import { queryData } from "./queryData";

const userLogin = (navigate) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loginLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const fetchLogin = async () => {
      const login = await queryData(`${apiVersion}/controllers/dev/settings/users/token.php`, "post", {
        token: checkLocalStorage().token,
      });

      if (typeof login === "undefined" || !login?.success) {
        localStorage.removeItem("hristoken");
        setLoading(false);
      } else {
        checkRoleToRedirect(navigate, login.data);
        // setLoading(false);
      }
    };
    if (
      checkLocalStorage() !== null &&
      checkLocalStorage().token !== undefined
    ) {
      fetchLogin();
      dispatch(setIsLogin(false));
    } else {
      setLoading(false);
      dispatch(setIsLogin(true));
    }
  }, []);

  return { loginLoading };
};

export default userLogin;
