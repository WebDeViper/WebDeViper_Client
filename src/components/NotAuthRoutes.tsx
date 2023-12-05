import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  isAuth: boolean;
}

const NotAuthRoutes = ({ isAuth }: Props) => {
  useEffect(() => {
    !isAuth && toast.info('로그인 후 이용해주세요.', { type: 'error' });
  }, [isAuth]);
  return !isAuth ? <Navigate to={'/'} /> : <Outlet />;
};
export default NotAuthRoutes;
