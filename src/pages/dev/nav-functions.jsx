import { FaCogs } from "react-icons/fa";
import { FaNoteSticky, FaUsers } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { devNavUrl, urlDeveloper, useCurrentUserRole } from "#functions/functions-general";

export const getNavList = () => {
  const userRole = useCurrentUserRole();
  return [
    {
      label: "Dashboard",
      icon: <MdDashboard />,
      menu: "dashboard",
      submenu: "",
      path: `${devNavUrl}/${userRole}/`,
    },
    {
      label: "Employees",
      icon: <FaUsers />,
      menu: "employees",
      submenu: "",
      path: `${devNavUrl}/${userRole}/employees`,
    },
    {
      label: "Settings",
      icon: <FaCogs />,
      menu: "settings",
      submenu: "",
      subNavList: [
        {
          label: "Role",
          path: `${devNavUrl}/${userRole}/settings/roles`,
        },
        {
          label: "users",
          path: `${devNavUrl}/${userRole}/settings/users`,
        },
        {
          label: "department",
          path: `${devNavUrl}/${userRole}/settings/department`,
        },
        {
          label: "notifications",
          path: `${devNavUrl}/${userRole}/settings/notifications`,
        },
      ],
    },
    {
      label: "Memo",
      icon: <FaNoteSticky />,
      menu: "memo",
      submenu: "",
      path: `${devNavUrl}/${userRole}/memo`,
    },
  ];
};
