import { Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import Home from '../pages/Home/Home';
import UserDetail from '../pages/UserDetail/UserDetail';
import List from '../pages/List/List';
import OrderDetail from '../pages/OrderDetail/OrderDetail'
import Register from '../pages/Register/Register';
import OrderManage from '../pages/OrderManage/OrderManage';
import UserManage from '../pages/UserManage/UserManage'
import Cart from '../pages/Cart/Cart'
import Payment from '../pages/Payment/Payment'

const Router = [
    {
        path: '/',
        element: <Navigate to='/login' />
    }, {
        path: '/login',
        element: <Login />
    }, {
        path: '/register',
        element: <Register />
    }, {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'list',
                element: <List />,
            }, {
                path: 'myorder',
                element: <UserDetail />
            }, {
                path: 'cart',
                element: <Cart />
            }, {
                path: 'payment',
                element: <Payment />
            }, {
                path: 'ordermanage',
                element: <OrderManage />
            }, {
                path: 'usermanage',
                element: <UserManage />
            }, {
                path: 'orderdetail',
                element: <OrderDetail />,
            }
        ]
    }
];

export default Router;