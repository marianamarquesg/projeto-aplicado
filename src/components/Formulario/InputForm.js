import '../../components/Formulario/InputForm.css';

function InputForm({ label, value, className, onChange, type = 'text', ...rest }) {
  return (
    <div className={className} >
      <label className='form-label'>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

export default InputForm;
