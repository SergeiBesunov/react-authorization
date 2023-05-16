import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/auth-user';
import { useAuth } from '../hooks/use-auth';

import RegistrationForm from '../components/authorization/RegistrationForm';
import LoadedSkeleton from '../components/common/LoadedSkeleton';

function Registration() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isAuth, initStatus } = useAuth();

   // Если по пользователь авторизован перекидывает на главную страницу
   if (initStatus === 'sucsess' && isAuth) return <Navigate to="/" />;


   // При успешной регистрации сразу обновляем аватар, обновляем redux, и перекидываем на главную страницу
   const handleRegistration = (email, password, photoUrl) => {
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            
            updateProfile(auth.currentUser, {
               photoURL: photoUrl,
            })
               .then(() => {
                  const userData = {
                     email: user.email,
                     token: user.accessToken,
                     id: user.uid,
                     photoUrl: user.photoURL,
                     isAnonymous: user.isAnonymous,
                  };
                  dispatch(setUser(userData));
                  navigate('/');
               })
               .catch((error) => {
                  alert(error);
               });
         })
         .catch((error) => {
            const errorCode = error.code;
            alert(errorCode);
         });
   };

   return (
      <>
         {initStatus === 'pending' ? (
            <LoadedSkeleton />
         ) : (
            <RegistrationForm register={handleRegistration} />
         )}
      </>
   );
}

export default Registration;
