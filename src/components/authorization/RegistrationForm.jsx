import React from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalSelectedAvatar } from '../../redux/slices/modals';
import validator from '../../utils/validator';
import validatorConfig from '../../utils/validatorConfig';

import TextFieldForm from './TextFieldForm';
import TextFieldPassword from './TextFieldPassword';

function RegistrationForm({register}) {
   const dispatch = useDispatch();

   const { photoUrl } = useSelector((state) => state.authUser);

   const [stateForm, setStateForm] = React.useState({email:'', password:''});
   const [errors, setErrors] = React.useState({});

   const openModal = (e) => {
      e.preventDefault();
      dispatch(toggleModalSelectedAvatar(true));
   };
   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setStateForm((prev) => ({ ...prev, [name]: value }));
   };
   const resetStateForm = () => {
      setStateForm({email: '', password: ''})
   }
   const validate = () => {
      const errors = validator(stateForm, validatorConfig);
      setErrors(errors);
      return Object.keys(errors).length === 0;
   };
   const handleSubmit = (e) => {
      e.preventDefault()
      const valid = validate()
      if(!valid) return
      resetStateForm()
      register(stateForm.email, stateForm.password, photoUrl)
  }

   return (
      <form className="form-auth form-sign-in" onSubmit={handleSubmit}>
         <div className="form-auth-title">Регистрация</div>

         <div className="form-auth__item">
            <p className="form-label-avatar">Выберите аватар</p>

            <button className="form-auth-avatar" type='button' onClick={openModal}>
               <img src={photoUrl} alt="img" />
            </button>
         </div>

         <TextFieldForm
            name={'email'}
            value={stateForm.email}
            onChange={handleChange}
            error={errors.email}
            label={'Введите ваш email'}
         />

         <TextFieldPassword
            name={'password'}
            value={stateForm.password}
            onChange={handleChange}
            error={errors.password}
            label={'Придумайте пароль'}
         />

         <button className="form-auth-button" type='submit'>Зарегистрироваться</button>

         <Link to="/auth/login" className="form-auth-switch">
            Уже есть аккаунт? Войти
         </Link>
      </form>
   );
}

export default RegistrationForm;
