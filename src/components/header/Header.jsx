import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

import AuthUserInfo from './AuthUserInfo';

import logo from '../../assets/logo.png';

function Header() {
   const DOCUMENT_NAV = React.useRef(null);
   const user = useAuth();

   const setActive = ({ isActive }) => (isActive ? 'nav-link--active' : '');

   const handleClickBurder = () => {
      DOCUMENT_NAV.current.classList.toggle('mobile--active');
   };

   const closeMobileNavMenu = () => {
      if (DOCUMENT_NAV.current.classList.contains(`mobile--active`))
         DOCUMENT_NAV.current.classList.remove('mobile--active');
   };


   // Логика закрытия мобильного меню при клике вне него
   React.useEffect(() => {
      const handleСlickToCloseMobileMenu = (e) => {
         if (
            DOCUMENT_NAV.current.classList.contains(`mobile--active`) &&
            !e.target.closest('.header__nav-list') &&
            !e.target.closest('.burger-container')
         ) {
            closeMobileNavMenu();
         }
      };

      document.body.addEventListener('click', handleСlickToCloseMobileMenu);

      return () => {
         document.body.removeEventListener(`click`, handleСlickToCloseMobileMenu);
      };
   }, []);

   return (
      <header className="header">
         <div className="header-container">
            <div className="header__inner">
               <div className="header__menu">
                  <div className="header-logo">
                     <img src={logo} alt="logo" />
                  </div>

                  <div className="burger-container" onClick={handleClickBurder}>
                     <div className="burger">
                        <div></div>
                        <div></div>
                        <div></div>
                     </div>
                  </div>

                  <nav className="header__nav" ref={DOCUMENT_NAV}>
                     <ul className="header__nav-list">
                        <li>
                           <NavLink to="/" className={setActive} onClick={closeMobileNavMenu}>
                              Главная
                           </NavLink>
                        </li>
                        <li>
                           <NavLink
                              to="/profile"
                              className={setActive}
                              onClick={closeMobileNavMenu}>
                              Профиль
                           </NavLink>
                        </li>
                     </ul>
                  </nav>
               </div>

               <AuthUserInfo
                  photoUrl={user.photoUrl}
                  email={user.email}
                  id={user.id}
                  anonymous={user.isAnonymous}
               />
            </div>
         </div>
      </header>
   );
}

export default Header;
