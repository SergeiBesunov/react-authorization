export default function validator(data, config) {
   const errors = {};

   function validate(validMethod, data, config) {
      let statusValidate;
      switch (validMethod) {
         case 'isRequired': {
            if (typeof data === 'boolean') {
               statusValidate = !data;
            } else {
               statusValidate = data.trim() === '';
            }
            break;
         }

         case 'isEmail':
            const emailRegExp = /^\S+@\S+\.\S+$/g;
            statusValidate = !emailRegExp.test(data);
            break;

         case 'min':
            statusValidate = data.length < 8;
            break;

         default:
            break;
      }

      if (statusValidate) return config.message;
   }

   for (const FieldName in data) {
      for (const validMethod in config[FieldName]) {
         const error = validate(validMethod, data[FieldName], config[FieldName][validMethod]);
         if (error && !errors[FieldName]) {
            errors[FieldName] = error;
         }
      }
   }

   return errors;
}
