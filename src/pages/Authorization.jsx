import { Outlet } from 'react-router-dom';

function Authorization() {
   return (
      <div className="authorization">
         <div className="container">
            <div className="authorization-block">
               <Outlet />
            </div>
         </div>
      </div>
   );
}

export default Authorization;
