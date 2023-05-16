import { useDispatch } from 'react-redux';
import { updateAvatar } from '../../redux/slices/auth-user';
import { toggleModalSelectedAvatar } from '../../redux/slices/modals';

import { getAuth, updateProfile } from 'firebase/auth';

import avatars from '../../options/listAvatars';
import closeIcon from '../../assets/close.svg';
import AvatarImgCard from './AvatarImgCard';

function SelectedAvatar() {
   const dispatch = useDispatch();

   const closeModal = () => {
      dispatch(toggleModalSelectedAvatar(false));
   };

   // Если пользователь не авторизован (на этапе регистрации) то просто обработать выбор аватара 
   // обновлением redux, иначе (когда пользователь откроет окно выбора в профиле с целью изменить аватар) 
   // отправлять запрос на изменение аватарки, при успешном обновлении на стороне сервера обновить redux
   const selectAvatar = (url) => {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (user) {
         updateProfile(user, {
            photoURL: url,
         })
            .then(() => {
               dispatch(updateAvatar(url));
            })
            .catch((error) => {
               alert(error);
            });
      } else {
         dispatch(updateAvatar(url));
      }
   };

   const handleClickAvatar = (url) => {
      closeModal();
      selectAvatar(url);
   };

   return (
      <div className="selected-avatar">
         <div className="selected-avatar__closed">
            <div className="selected-avatar__closed-svg-wrapp">
               <img src={closeIcon} alt="close" onClick={closeModal} />
            </div>
         </div>

         <div className="selected-avatar__items">
            {avatars.map((url, i) => (
               <AvatarImgCard key={i} imgUrl={url} onClickAvatar={handleClickAvatar} />
            ))}
         </div>
      </div>
   );
}

export default SelectedAvatar;
