function TextFieldForm({ name, value, onChange, error, label }) {
   return (
      <div className="form-auth__item">
         <div className="textfield-wrapper">
            <input
               className="textfield"
               name={name}
               type="text"
               value={value}
               placeholder={label}
               onChange={onChange}
            />
         </div>
         <p className="textfield-error">{error && error}</p>
      </div>
   );
}

export default TextFieldForm;
