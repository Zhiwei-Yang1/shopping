import React from 'react';
import { useRoutes } from 'react-router-dom'

import Router from './router/Router';

function App() {

  const outlet = useRoutes(Router);
  return (
    <div>
      {outlet}
    </div>
  );
}

export default App;
