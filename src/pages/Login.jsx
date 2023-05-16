import { getAuth, signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';

import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { setUser } from '../redux/slices/auth-user';
import { useDispatch } from 'react-redux';

import LoginForm from '../components/authorization/LoginForm';
import LoadedSkeleton from '../components/common/LoadedSkeleton';

function Login() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isAuth, initStatus } = useAuth();

   // Если по пользователь авторизован перекидывает на главную страницу
   if (initStatus === 'sucsess' && isAuth) return <Navigate to="/" />;


   //При успешной авторизации обновляем redux и перекидываем на главную страницу
   const handleSignIn = (email, password) => {
      const auth = getAuth();
      
      signInWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
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
            const errorCode = error.code;
            alert(errorCode);
         });
   };

   const handleAnonymousSignIn = () => {
      const auth = getAuth();
      signInAnonymously(auth)
         .then(({ user }) => {
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
            const errorCode = error.code;
            alert(errorCode);
         });
   };

   return (
      <>
         {initStatus === 'pending' ? (
            <LoadedSkeleton />
         ) : (
            <LoginForm signIn={handleSignIn} anonSignIn={handleAnonymousSignIn} />
         )}
      </>
   );
}

export default Login;
