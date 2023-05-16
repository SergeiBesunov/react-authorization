import { Navigate } from 'react-router-dom';
import { useAuth } from "../hooks/use-auth";

function Home() {

// Если пользователь не авторизован, перекидываем на страницу атворизации
const {isAuth} = useAuth()
if (!isAuth) return <Navigate to="/auth/login" />;

   return (
      <div className="home">
         <div className="container">
            <div className="home__inner">
               <h2 className='home-title'>Главная</h2>
            </div>
         </div>
      </div>
   );
}

export default Home;
