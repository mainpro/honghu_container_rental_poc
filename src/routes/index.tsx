import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import RentalOrderDetail from '../pages/RentalOrderDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/rental-order-detail',
    element: <RentalOrderDetail />,
  },
]);

export default router;