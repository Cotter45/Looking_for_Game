import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavMenu from './navmenu';

import './navbar.css';
import isProductionImage from '../../util/is_production_image';

function NavBar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const main = document.querySelector('.main_container');

    const handleClick = () => {
      setIsOpen(false);
    }

    if (main) main.addEventListener('click', handleClick);
  })

  return (
    <nav className="nav_bar_container">
      <section className="nav_bar">
        <section onClick={() => navigate("/")} className="splash_header">
          <img
            src={isProductionImage() + "/static/trip_gif.webp"}
            alt="trippy background"
          />
          <h1 className="splash_title"
          >
            LFG
          </h1>
        </section>
        <button
          type="button"
          aria-label="Menu Button"
          className={isOpen ? "hamburger active" : "hamburger"}
          onClick={(e) => setIsOpen(!isOpen)}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </section>
      {isOpen && <NavMenu setIsOpen={setIsOpen} />}
    </nav>
  );
}

export default NavBar;