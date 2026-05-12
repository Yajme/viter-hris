import { FaCogs } from "react-icons/fa";
import { FaNoteSticky, FaUsers } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { devNavUrl, urlDeveloper,currentUserRole } from "#functions/functions-general";
export const navList = [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    menu: "dashboard",
    submenu: "",
    path: `${devNavUrl}/${currentUserRole()}/`,
  },
  {
    label: "Employees",
    icon: <FaUsers />,
    menu: "employees",
    submenu: "",
    path: `${devNavUrl}/${currentUserRole()}/employees`,
  },
  {
    label: "Settings",
    icon: <FaCogs />,
    menu: "settings",
    submenu: "",
    subNavList: [
      {
        label: "Role",
        path: `${devNavUrl}/${currentUserRole()}/settings/roles`,
      },
      {
        label: "users",
        path: `${devNavUrl}/${currentUserRole()}/settings/users`,
      },
      {
        label: "department",
        path: `${devNavUrl}/${currentUserRole()}/settings/department`,
      },
      {
        label: "notifications",
        path: `${devNavUrl}/${currentUserRole()}/settings/notifications`,
      },
    ],
  },
  {
    label: "Memo",
    icon: <FaNoteSticky />,
    menu: "memo",
    submenu: "",
    path: `${devNavUrl}/${currentUserRole()}/memo`,
  },
];
