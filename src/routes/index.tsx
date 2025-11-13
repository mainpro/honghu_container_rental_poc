import React from 'react';
import { createHashRouter } from 'react-router-dom';
import App from '../App';
import RentalOrderDetail from '../pages/RentalOrderDetail';

const router = createHashRouter([
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