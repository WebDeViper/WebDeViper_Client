import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  isServiceAdmin: IsServiceAdmin;
}

const NotAdminRoutes = ({ isServiceAdmin }: Props) => {
  return isServiceAdmin === 'n' ? <Navigate to={'/'} /> : <Outlet />;
};

export default NotAdminRoutes;
