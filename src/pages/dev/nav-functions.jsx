import { FaCogs } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { devNavUrl, urlDeveloper } from "../../functions/functions-general";
export const navList = [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    menu: "dashboard",
    submenu: "",
    path: `${devNavUrl}/dashboard`,
  },
  {
    label: "Employees",
    icon: <FaUsers />,
    menu: "employees",
    submenu: "",
    path: `${devNavUrl}/employees`,
  },
  {
    label: "Settings",
    icon: <FaCogs />,
    menu: "settings",
    submenu: "",
    subNavList: [
      {
        label: "Role",
        path: `${devNavUrl}/${urlDeveloper}/settings/role`,
      },
      {
        label: "users",
        path: `${devNavUrl}/${urlDeveloper}/settings/users`,
      },
    ],
  },
];
