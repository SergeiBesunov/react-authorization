import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authenticateUser } from './redux/slices/auth-user';

import app from './firebase';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Authorization from './pages/Authorization';

function App() {
   const dispatch = useDispatch();

// Смотеть описание функции в redux/slices/auth-user...
   React.useEffect(() => {
      dispatch(authenticateUser());
   }, []);

   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route path="/auth" element={<Authorization />}>
               <Route path="login" element={<Login />} />
               <Route path="registration" element={<Registration />} />
            </Route>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
         </Route>
      </Routes>
   );
}

export default App;
