import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  isAuth: boolean;
}

const NotAuthRoutes = ({ isAuth }: Props) => {
  useEffect(() => {
    !isAuth && alert('로그인 후 이용해주세요!');
  }, [isAuth]);
  return !isAuth ? <Navigate to={'/'} /> : <Outlet />;
};
export default NotAuthRoutes;
