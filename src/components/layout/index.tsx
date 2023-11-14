import { Outlet } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
}
