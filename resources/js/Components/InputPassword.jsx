import { useState } from "react";

const InputPassword = ({ passwordValue, id, name, border, onValueChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showPassword ? 'text' : 'password';

    const primaryBorderClass = border ? 'border-primary' : '';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`input-group ${primaryBorderClass}`}>
            <span className="input-group-text"><i className='bx bxs-key'></i></span>
            <input
                id={id}
                value={passwordValue} // Use value for controlled components
                type={inputType}
                className={`form-control ${primaryBorderClass}`}
                name={name}
                placeholder="············"
                aria-describedby="password"
                onChange={(e) => onValueChange(e.target.value)}
            />
            <button
                className={`input-group-text ${primaryBorderClass}`}
                type="button"
                onClick={togglePasswordVisibility}
            >
                <i className={`bx ${showPassword ? 'bx-show' : 'bx-hide'}`}></i>
            </button>
        </div>
    );
};

export default InputPassword;
