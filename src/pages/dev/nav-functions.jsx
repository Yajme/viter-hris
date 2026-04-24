import { FaCogs } from "react-icons/fa";
import { FaNoteSticky, FaUsers } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { devNavUrl, urlDeveloper } from "#functions/functions-general";
export const navList = [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    menu: "dashboard",
    submenu: "",
    path: `${devNavUrl}/${urlDeveloper}/dashboard`,
  },
  {
    label: "Employees",
    icon: <FaUsers />,
    menu: "employees",
    submenu: "",
    path: `${devNavUrl}/${urlDeveloper}/employees`,
  },
  {
    label: "Settings",
    icon: <FaCogs />,
    menu: "settings",
    submenu: "",
    subNavList: [
      {
        label: "Role",
        path: `${devNavUrl}/${urlDeveloper}/settings/roles`,
      },
      {
        label: "users",
        path: `${devNavUrl}/${urlDeveloper}/settings/users`,
      },
      {
        label: "department",
        path: `${devNavUrl}/${urlDeveloper}/settings/department`,
      },
      {
        label: "notifications",
        path: `${devNavUrl}/${urlDeveloper}/settings/notifications`,
      },
    ],
  },
  {
    label: "Memo",
    icon: <FaNoteSticky />,
    menu: "memo",
    submenu: "",
    path: `${devNavUrl}/${urlDeveloper}/memo`,
  },
];
