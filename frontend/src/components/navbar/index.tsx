import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../../context/store/session';
import { useAppDispatch, useAppSelector } from '../../context/store/utils/store_utils';
import NavMenu from './navmenu';

import './navbar.css';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const main = document.querySelector('.main_container');

    const handleClick = () => {
      setIsOpen(false);
    }

    if (main) main.addEventListener('click', handleClick);
  })

  return (
    <nav className='nav_bar_container'>
      <section className="nav_bar">
        <h2 
          className='title'
          onClick={() => navigate("/")}
        >LFG</h2>
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
      {isOpen && <NavMenu setIsOpen={setIsOpen} />}
    </nav>
  )
}

export default NavBar;