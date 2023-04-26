import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useMember from './hooks/memberHook';
import './App.css';

import Home from './pages/home/home.component';
// import NotFound from '@/pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    // errorElement: <NotFound />,
  },
]);


export default function App() {
  const { isLoggedIn } = useMember(); 
  return (
    <div className="App">
      <div className={isLoggedIn ? 'page' : 'login'}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}


