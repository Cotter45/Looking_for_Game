import { useState } from "react";
import { useAppSelector } from "../../../context/store/utils/store_utils";
import isProductionImage from "../../../util/is_production_image";
import Account from "./account";
import Settings from "./settings";

interface NavMenuProps {
  setIsOpen: Function;
}

function NavMenu({ setIsOpen }: NavMenuProps) {

  const [subMenu, setSubMenu] = useState('');

  const currentUser = useAppSelector(state => state.session.user);

  return (
    <section className="nav_bar_menu fade_in">
      {currentUser && (
        <section className="nav_menu_row fade_in">
          <img
            className="small_profile"
            src={isProductionImage() + currentUser.profile_picture_url}
            alt="Profile"
          />
          <div className="column">
            <label>{currentUser.username}</label>
            <label>{currentUser.email}</label>
          </div>
        </section>
      )}

      <section
        onClick={() => {
          subMenu !== "settings" && setSubMenu("settings");
          subMenu === "settings" && setSubMenu("");
        }}
        className="nav_menu_row"
      >
        <label>Settings</label>
        {subMenu !== "settings" && (
          <i className="fa-solid fa-angle-down fade_in"></i>
        )}
        {subMenu === "settings" && (
          <i className="fa-solid fa-angle-up fade_in"></i>
        )}
      </section>
      {subMenu === "settings" && <Settings />}

      <section
        onClick={() => {
          subMenu !== "account" && setSubMenu("account");
          subMenu === "account" && setSubMenu("");
        }}
        className="nav_menu_row"
      >
        <label>Account</label>
        {subMenu !== "account" && (
          <i className="fa-solid fa-angle-down fade_in"></i>
        )}
        {subMenu === "account" && (
          <i className="fa-solid fa-angle-up fade_in"></i>
        )}
      </section>
      {subMenu === "account" && <Account />}
    </section>
  );
}

export default NavMenu;