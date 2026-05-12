import { devNavUrl, urlDeveloper } from "#functions/functions-general";
import CreatePasswordOther from "#pages/access/CreatePassword";
import ForgotPassword from "#pages/access/ForgotPassword";
import Login from "#pages/access/Login";
import VerifyEmailUser from "#pages/access/VerifyEmailUser";
const BASE_URL = `${devNavUrl}/${urlDeveloper}`;


export const routesAccess = [
    {
        path: `${devNavUrl}/create-password`,
        element: <CreatePasswordOther/>
    },
    {
        path: `${devNavUrl}/`,
        element: <Login/>
    },
    {
        path: `${devNavUrl}/login`,
        element: <Login/>
    },
    {
        path: `${devNavUrl}/verify-email`,
        element: <VerifyEmailUser/>
    },
    {
        path: `${devNavUrl}/forgot-password`,
        element: <ForgotPassword/>
    }
]