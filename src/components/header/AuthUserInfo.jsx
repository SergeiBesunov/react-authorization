import { getAuth, signOut } from 'firebase/auth';
import { resetUser } from '../../redux/slices/auth-user';
import { useDispatch } from 'react-redux';

function AuthUserInfo({ photoUrl, email, id, anonymous }) {
   const dispatch = useDispatch();

   const logOutOfAccount = () => {
      if (window.confirm('Выйти из аккаунта?')) {
         const auth = getAuth();
         signOut(auth)
            .then(() => {
               dispatch(resetUser());
            })
            .catch((error) => {
               console.log(error);
            });
      }
   };

   // Фунция преобразования id в формат iKfwgta...
   const cropId = (id) => {
      if (id.length > 6) {
         let result = id.slice(0, 7) + '...';
         return result;
      } else {
         return id;
      }
   };

   return (
      <div className="header__user">
         
         {!anonymous && (
            <div className="header__user-avatar">
               <img src={photoUrl} alt="img" />
            </div>
         )}

         <div className="header__user-info">
            <p>{!anonymous ? email : cropId(id)}</p>

            <button className="header__user-logout header__user-logout" onClick={logOutOfAccount}>
               <svg
                  id="Outlined"
                  width="22px"
                  height="22px"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg">
                  <title />
                  <g id="Fill">
                     <path d="M25,2H16V4h9a1,1,0,0,1,1,1V27a1,1,0,0,1-1,1H16v2h9a3,3,0,0,0,3-3V5A3,3,0,0,0,25,2Z" />
                     <path d="M21.58,17V15H7l4-4L9.58,9.55l-5,5a2,2,0,0,0,0,2.83l5,5L11,21,7,17Z" />
                  </g>
               </svg>
               <span>Выйти</span>
            </button>
         </div>
      </div>
   );
}

export default AuthUserInfo;
