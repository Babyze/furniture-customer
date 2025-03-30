import { Button } from '@src/components/ui/Button';
import { Input } from '@src/components/ui/Input';
import { Link } from 'react-router';
import { useState } from 'react';
import './Auth.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ROUTES } from '@src/constants/routes';
import { authService } from '@src/services/auth.service';
import { useNavigate } from 'react-router';
import { ErrorResponse } from '@src/models/response.model';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (formData.password !== formData.confirmPassword) {
        alert('Password and confirm password do not match');
        return;
      }

      const response = await authService.signUp(formData);
      if (response.user) {
        navigate(ROUTES.ROOT);
      }
    } catch (error) {
      alert((error as ErrorResponse).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-image">
          <img src="/public/sign-in-image.png" alt="Furniture" />
        </div>
        <div className="auth-form-container">
          <div className="auth-form-content">
            <Link to="/" className="auth-back-to-home">
              <IoMdArrowRoundBack /> <p>Back to home</p>
            </Link>
            <h1 className="auth-title">Sign Up</h1>
            <p className="auth-subtitle">
              Already have an account?{' '}
              <Link to={ROUTES.AUTH.SIGN_IN} className="auth-link">
                Sign In
              </Link>
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={handleChange}
                  label="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  label="Your email address"
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  label="Password"
                  autoComplete="true"
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  label="Confirm Password"
                  autoComplete="true"
                  required
                />
              </div>

              <span>
                By signing up, you agree to the{' '}
                <Link to="#" className="auth-link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="auth-link">
                  Privacy Policy
                </Link>
              </span>

              <Button
                type="submit"
                variant="primary"
                className="auth-submit"
                isLoading={isSubmitting}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
