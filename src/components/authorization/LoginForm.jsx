import React from 'react';

import { Link } from 'react-router-dom';
import validator from '../../utils/validator';
import validatorConfig from '../../utils/validatorConfig';

import TextFieldForm from './TextFieldForm';
import TextFieldPassword from './TextFieldPassword';

function LoginForm({signIn, anonSignIn}) {
   const [stateForm, setStateForm] = React.useState({email:'', password:'' });
   const [errors, setErrors] = React.useState({});

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
      signIn(stateForm.email, stateForm.password)
  }

   return (
      <form className="form-auth" onSubmit={handleSubmit}>
         <div className="form-auth-title">Вход</div>

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
            label={'Введите ваш пароль'}
         />

         <button className="form-auth-button" type='submit'>Войти</button>

         <button className="form-auth-button form-auth-button-guest" type='button' onClick={anonSignIn}>Войти как гость</button>

         <Link to="/auth/registration" className="form-auth-switch">
            Зарегистрироваться
         </Link>
      </form>
   );
}

export default LoginForm;
