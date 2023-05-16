const validatorConfig = {
    email:{
        isRequired:{
            message: "E-mail Обязательно для заполнения"
        },
        isEmail:{
        message: "E-mail Введен некорректно"
        }
    },
    password:{
        isRequired:{
            message: "Password Обязательно для заполнения"
        },

        min:{
            message: "Mинимальный размер пароля 8 символов"
        } 
    },
  
}

export default validatorConfig