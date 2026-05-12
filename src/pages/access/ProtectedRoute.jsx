import { queryData } from "#functions/custom-hooks/queryData";
import {
  apiVersion,
  devNavUrl,
  urlAdmin,
  urlDeveloper,
} from "#functions/functions-general";
import PageNotFound from "#partials/PageNotFound";
import FetchingSpinner from "#partials/spinners/FetchingSpinner";
import { setCredentials } from "#store/StoreAction";
import { StoreContext } from "#store/StoreContext";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState("");
  const [pageStatus, setPageStatus] = React.useState(false);
  const wfstoken = JSON.parse(localStorage.getItem("hristoken"));
  const currentPath =
    location.pathname.split("/")[1] === devNavUrl.replace("/", "")
      ? location.pathname.split("/")[2]
      : location.pathname.split("/")[1];
  const isRolePath = location.pathname.split("/")[2] == urlAdmin;

  React.useEffect(() => {
    const fetchLogin = async () => {
      const login = await queryData(
        `${apiVersion}/controllers/dev/settings/users/token.php`,
        "post",
        {
          token: wfstoken.token,
        },
      );
        
      const isUserKeyMatched =
        login?.success == true && login.data.user_is_key_matched;
      // check if the password from database is matched
      // to the password used to login
      // if not, logout the user

     
      if (isUserKeyMatched === false) {
        setLoading(false);
        setIsAuth("456");
        localStorage.removeItem("hristoken");
        return;
      }

      if (typeof login == "undefined" || !login.success) {
        setIsAuth("456");
        setLoading(false);
      } else {
        dispatch(
          setCredentials({
            ...login.data,
          }),
        );
        setIsAuth("123");
        setLoading(false);
        delete login.data.users_password;
        delete login.data.users_key;
        delete login.data.role_description;
        delete login.data.role_created;
        delete login.data.role_datetime;
        console.log(login);
      }

      if (
        !login.success ||
        login.data.role.toLowerCase() !== login.data.role_name.toLowerCase()  // CHECK ALL ROLE AND LIMIT PAGE TO ONLY ROLE
        // currentPath !== login.data.role.toLowerCase() ||
       
      ) {
        setPageStatus(true);

      }
      if (
        isRolePath &&
        (!login.success ||
          login.data.role.toLowerCase() !== login.data.role_name.toLowerCase())
      ) {
        setPageStatus(true);
         console.log('2')
      }
      if (
        isRolePath &&
        !location.pathname.includes(
          login.data.role.toLowerCase().replaceAll(" ", "-"),
        )
      ) {
        setPageStatus(true);
         console.log('3')
      }
    };

    
    if (wfstoken !== null) {
      setLoading(true);
      fetchLogin();
    } else {
      setIsAuth("456");
      setLoading(false);
      localStorage.removeItem("hristoken");
    }
  }, [dispatch]);

  if (pageStatus) {
    return <PageNotFound />;
  } else {
    return (
      <>
        {loading ? (
          <FetchingSpinner />
        ) : isAuth === "123" ? (
          children
        ) : (
          <Navigate to={`${devNavUrl}/`} />
        )}
      </>
    );
  }
};

export default ProtectedRoute;
