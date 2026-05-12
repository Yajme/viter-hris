import { devNavUrl } from "./functions-general"

export const checkRoleToRedirect = (navigate,data) => {
    navigate(`${devNavUrl}/${data.role_name.toLowerCase()}`);
}