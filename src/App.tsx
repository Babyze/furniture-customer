import { Outlet } from 'react-router';
import Navbar from '@src/components/layouts/Navbar/Navbar';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
