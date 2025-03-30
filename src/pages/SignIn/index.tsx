import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser } from '../../store/slices/authSlice';
import './styles.css';
import Button from '@src/components/ui/Button';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      setUser({
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
      }),
    );
    navigate('/');
  };

  return (
    <div className="sign-in">
      <div className="sign-in-container">
        <h1>Đăng nhập</h1>
        <p className="subtitle">Chào mừng bạn quay trở lại!</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Nhập email của bạn" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input type="password" id="password" placeholder="Nhập mật khẩu của bạn" required />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <a href="/forgot-password" className="forgot-password">
              Quên mật khẩu?
            </a>
          </div>

          <Button type="submit" fullWidth>
            Đăng nhập
          </Button>
        </form>

        <div className="sign-up-link">
          Chưa có tài khoản? <a href="/sign-up">Đăng ký ngay</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
