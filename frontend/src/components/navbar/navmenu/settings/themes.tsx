import { setTheme } from "../../../../util/theme";


function Themes() {

  return (
    <section className="nav_menu_options fade_in">
      <button
        type="button"
        name="Dark-Theme"
        className="button asyncButton fade_in"
        onClick={() => setTheme("theme-dark")}
      >
        Dark
      </button>

      <button
        type="button"
        name="Light-Theme"
        className="button asyncButton fade_in"
        onClick={() => setTheme("theme-light")}
      >
        Light
      </button>
    </section>
  );
}

export default Themes;