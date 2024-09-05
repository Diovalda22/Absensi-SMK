import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './router/RouteList';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ParticlesComponent from './components/Particles';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <ParticlesComponent />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
