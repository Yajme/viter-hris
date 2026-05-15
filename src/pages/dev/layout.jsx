import ModalSuccess from "#partials/modals/ModalSuccess";
import { useContext } from "react";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import { getNavList } from "./nav-functions.jsx";
import { StoreContext } from "#store/StoreContext";
const Layout = ({ children, menu, submenu }) => {
  const { store } = useContext(StoreContext);
  const navList = getNavList();
  return (
    <>
      {/* Header */}
      <Header />
      {/* Navigation */}
      <Navigation navigationList={navList} menu={menu} submenu={submenu} />
      {/* Body */}
      <div className={`wrapper ${store.isShow ? "ml-56" : ""}`}>{children}</div>
      {/* Footer */}

      {store.success && <ModalSuccess />}
    </>
  );
};

export default Layout;
