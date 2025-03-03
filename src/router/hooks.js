import { useLocation, useNavigate } from'react-router-dom';
import { useSelector } from'react-redux'; // 如果使用 Redux 管理状态
import React from 'react';

const useAuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // 假设 Redux 中有一个 auth 状态管理登录状态

  React.useEffect(() => {
    if (!isAuthenticated && location.pathname!== '/login') {
      navigate('/login');
    }
  }, [isAuthenticated, location, navigate]);

  return isAuthenticated;
};

export default useAuthCheck;