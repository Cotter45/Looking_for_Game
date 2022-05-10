import { useState } from "react";
import Themes from "./themes";


function Settings() {

  const [subMenu, setSubMenu] = useState('');

  return (
    <>
      <section
        onClick={() => {
          subMenu !== "theme" && setSubMenu("theme");
          subMenu === "theme" && setSubMenu("");
        }}
        className="nav_menu_sub_row fade_in"
      >
        <label>Theme</label>
        {subMenu !== "theme" && (
          <i className="fa-solid fa-angle-down fade_in"></i>
        )}
        {subMenu === "theme" && (
          <i className="fa-solid fa-angle-up fade_in"></i>
        )}
      </section>
      {subMenu === "theme" && <Themes />}
    </>
  );
}

export default Settings;