import { getAuth, deleteUser } from 'firebase/auth';

import { toggleModalSelectedAvatar } from '../redux/slices/modals';

import { resetUser } from '../redux/slices/auth-user';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

function Profile() {
   const dispatch = useDispatch();
   const { isAuth, isAnonymous, photoUrl, id, email } = useAuth();
   if (!isAuth) return <Navigate to="/auth/login" />;

   const handleAccountDeletion = () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (window.confirm('Вы действительно хотите удалить аккаунт?')) {
         deleteUser(user)
            .then(() => {
               dispatch(resetUser());
               alert("Аккаунт успешно удален")
            })
            .catch((error) => {
               alert("Выйдите из аккаунта и авторизуйтесь снова, затем повторите операцию по удалению аккаунта")
            });
      }
   };

   const openModal = (e) => {
      e.preventDefault();
      dispatch(toggleModalSelectedAvatar(true));
   };


   return (
      <div className="profile">
         <div className="container">
            <div className="profile__inner">
               <div className="profile__user">
                  <h2 className="profile-title">Мой профиль</h2>

                  {!isAnonymous && (
                     <div className="profile__avatar">
                        <button className="profile__avatar-avatar" onClick={openModal}>
                           <img src={photoUrl} alt="avatar" />
                        </button>
                     </div>
                  )}

                  <div className="profile__info">
                     <div className="profile__info-row">
                        <div className="profile__info-col">ID:</div>
                        <div className="profile__info-col">{id}</div>
                     </div>
                     <div className="profile__info-row">
                        <div className="profile__info-col">E-mail:</div>
                        <div className="profile__info-col">{email ? email : '-'}</div>
                     </div>
                     <div className="profile__info-row">
                        <div className="profile__info-col">Тип учетной записи:</div>
                        <div className="profile__info-col">
                           {isAnonymous ? 'Гость' : 'Пользователь'}
                        </div>
                     </div>
                  </div>

                  {!isAnonymous && (
                     <button className="profile__user-delete-but" onClick={handleAccountDeletion}>
                        Удалить аккаунт
                     </button>
                  )}

                  <div className="profile__content"></div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Profile;
