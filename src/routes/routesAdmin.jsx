import { devNavUrl, urlAdmin } from "#functions/functions-general";
import ProtectedRoute from "#pages/access/ProtectedRoute";
import Dashboard from "#pages/dev/dashboards/Dashboard";
import Employees from "#pages/dev/employees/Employees";
const BASE_URL = `${devNavUrl}/${urlAdmin}`;


export const routesAdmin = [ 
    {
        path: `${BASE_URL}/`, 
    
    element: <ProtectedRoute>
        <Dashboard/>
</ProtectedRoute>
    
},
{
    path: `${BASE_URL}/employees`,
    element: <ProtectedRoute>
        <Employees/>
    </ProtectedRoute>   
}

]

