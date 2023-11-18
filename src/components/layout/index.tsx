import { Outlet } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <ToastContainer position="top-center" theme="light" pauseOnHover autoClose={1500} />
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
}
