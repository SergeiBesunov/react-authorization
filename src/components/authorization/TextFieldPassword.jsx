import React from 'react';

import eyeIconHide from '../../assets/eye.svg';
import eyeIconShow from '../../assets/eye1.svg';

function TextFieldPassword({ name, value, onChange, error, label }) {

const [showPassword, setShowPassword] = React.useState(false)

const handleClickEye = () => {
    setShowPassword((prev)=> !prev)
}

   return (
      <div className="form-auth__item">
         <div className="textfield-wrapper">
            <input
               className="textfield"
               name={name}
               type={showPassword ? "text" : "password"}
               value={value}
               placeholder={label}
               onChange={onChange}
            />
           
            <div className="textfield-pass-hidden">
                <img src={showPassword ? eyeIconShow :eyeIconHide} alt="icon" onClick={handleClickEye}/>
            </div>
            
         </div>
         <p className="textfield-error">{error && error}</p>
      </div>
   );
}

export default TextFieldPassword;