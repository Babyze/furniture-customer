import { useState } from 'react';
import './Input.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, type = 'text', className = '', ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div className="input-field-wrapper">
        <input
          type={isPassword && showPassword ? 'text' : type}
          className={`input-field ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="input-password-toggle"
            onClick={togglePassword}
            tabIndex={-1}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        )}
      </div>
    </div>
  );
};
