import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useSelector } from 'react-redux';
import { toggleModalSelectedAvatar } from '../redux/slices/modals';

import Header from '../components/header/Header';
import ModalCanvas from '../components/common/ModalCanvas';
import SelectedAvatar from '../components/common/SelectedAvatar';

function Layout() {
   const { isAuth } = useAuth();
   const { activeSelectedAvatar } = useSelector((state) => state.modals); // булевый флаг открыто/закрыто модальное окно 

   return (
      <>
         {isAuth && <Header />}

         <main className="main">
            <Outlet />
         </main>

         <ModalCanvas active={activeSelectedAvatar} setActive={toggleModalSelectedAvatar}>
            <SelectedAvatar />
         </ModalCanvas>
      </>
   );
}

export default Layout;
