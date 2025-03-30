import { Outlet } from 'react-router';
import './MainLayout.css';
import Navbar from './Navbar/Navbar';
const MainLayout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
