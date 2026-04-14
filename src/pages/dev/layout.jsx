import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import { navList } from "./nav-functions.jsx";
const layout = ({ children, menu, submenu }) => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Navigation */}
      <Navigation navigationList={navList} menu={menu} submenu={submenu} />
      {/* Body */}
      <div className="wrapper">{children}</div>
      {/* Footer */}
    </>
  );
};

export default layout;
