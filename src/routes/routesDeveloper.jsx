import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import Roles from "../pages/dev/settings/roles/Roles.jsx";
export const routesDeveloper = [
  {
    path: `${devNavUrl}/${urlDeveloper}/`,
    element: <></>,
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/users/role`,
    element: (
      <>
        <Roles />
      </>
    ),
  },
];
