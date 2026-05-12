import { devNavUrl, urlAdmin } from "#functions/functions-general";
import ProtectedRoute from "#pages/access/ProtectedRoute";
import Dashboard from "#pages/dev/dashboards/Dashboard";
const BASE_URL = `${devNavUrl}/${urlAdmin}`;


export const routesAdmin = [ 
    {path: `${BASE_URL}/`, 
    
    element: <ProtectedRoute>
        <Dashboard/>
    </ProtectedRoute>
    
},

]

