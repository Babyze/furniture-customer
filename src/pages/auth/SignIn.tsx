import { Input } from '@src/components/ui/Input';
import { ROUTES } from '@src/constants/routes';
import { useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import './Auth.css';
import { useAuth } from '@src/hooks/useAuth';
import { Button } from '@src/components/ui/Button';
import { ErrorResponse } from '@src/models/response.model';
import { Link } from 'react-router';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await login(formData.email, formData.password);
    } catch (error) {
      alert((error as ErrorResponse).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-image">
          <img src="/sign-in-image.png" alt="Furniture" />
        </div>
        <div className="auth-form-container">
          <div className="auth-form-content">
            <Link to="/" className="auth-back-to-home">
              <IoMdArrowRoundBack /> <p>Back to home</p>
            </Link>
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-subtitle">
              Don't have an account yet?{' '}
              <Link to={ROUTES.AUTH.SIGN_UP} className="auth-link">
                Sign Up
              </Link>
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <Input
                  type="email"
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
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="auth-submit"
                isLoading={isSubmitting}
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
