import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../context/store/session';
import { useAppDispatch, useAppSelector } from '../context/store/utils/store_utils';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(state => state.session.user);
  console.log(user)

  useEffect(() => {
    const main = document.querySelector('.main_container');

    const handleClick = () => {
      setIsOpen(false);
    }

    if (main) {
      main.addEventListener('click', handleClick);
    }
  })

  return (
    <nav className='nav_bar_container'>
      <section className="nav_bar">
        <h2 
          className='title'
          onClick={() => navigate("/")}
        >{user ? 'User' : 'None'}</h2>
        <button 
          type='button' 
          aria-label='Menu Button'
          className={isOpen ? 'hamburger active' : 'hamburger'}
          onClick={(e) => setIsOpen(!isOpen)}
        >
          <span className='line'></span>
          <span className='line'></span>
          <span className='line'></span>
        </button>
      </section>
      {isOpen && (
        <section className='nav_bar_menu fade_in'>
          <button 
            type='button' 
            name='Login'
            className='link fade_in'
            onClick={() => {
              dispatch(
                login({ credential: "demo@user.io", password: "password" })
              );
            }}
          >
            Login
          </button>
          <button 
            type='button' 
            name='Logout'
            className='link fade_in'
            onClick={() => {
              const data = dispatch(
                logout()
              );
              console.log(data);
            }}
          >
            Logout
          </button>
        </section>
      )}
    </nav>
  )
}

export default NavBar;