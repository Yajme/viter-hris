import { devNavUrl, urlDeveloper } from "#functions/functions-general";
import Roles from "#pages/dev/settings/roles/Roles";
import Employees from "#pages/dev/employees/Employees";
import Dashboard from "#pages/dev/dashboards/Dashboard";
import Users from "#pages/dev/settings/users/Users";
import Memo from "#pages/dev/memo/Memo";
import Department from "#pages/dev/settings/department/Department";
const BASE_URL = `${devNavUrl}/${urlDeveloper}`;
export const routesDeveloper = [
    {
        path: `${BASE_URL}/`,
        element: <></>,
    },
    {
        path: `${BASE_URL}/dashboard`,
        element: (
            <>
                <Dashboard />
            </>
        ),
    },
    {
        path: `${BASE_URL}/employees`,
        element: (
            <>
                <Employees />
            </>
        ),
    },
    {
        path: `${BASE_URL}/settings/roles`,
        element: (
            <>
                <Roles />
            </>
        ),
    },
    {
        path: `${BASE_URL}/settings/users`,
        element: (
            <>
                <Users />
            </>
        ),
    },
    {
        path: `${BASE_URL}/settings/department`,
        element: (
            <>
                <Department />
            </>
        ),
    },
    {
        path: `${BASE_URL}/memo`,
        element: (
            <>
                <Memo />
            </>
        ),
    },
];
