import { login, logout } from "../../../../context/store/session";
import { useAppDispatch } from "../../../../context/store/utils/store_utils";


function Account() {
  const dispatch = useAppDispatch();

  return (
    <section className="nav_menu_options fade_in">
      <button
        type="button"
        name="Login"
        className="button asyncButton fade_in"
        onClick={() =>
          dispatch(login({ credential: "demo@user.io", password: "password" }))
        }
      >
        Login
      </button>
      <button
        type="button"
        name="Logout"
        className="button asyncButton fade_in"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </section>
  );
}

export default Account;