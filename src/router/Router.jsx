import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import Modal from "../components/Modal";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import User from "../pages/dashboard/admin/User";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItem from "../pages/dashboard/admin/ManageItem";
import UpdateMenuItem from "../pages/dashboard/admin/UpdateMenuItem";

import Payment from "../pages/shop/Payment";
import Order from "../pages/shop/Order";
import ManageOrder from "../pages/dashboard/admin/ManageOrder";
import AcceptedOrder from "../pages/shop/AcceptedOrder";
import RejectedOrders from "../pages/shop/RejectedOrders";

import Address from "../pages/shop/Address";
import OrderTracking from "../pages/dashboard/admin/OrderTracking";
import Feedback from "../components/FeedBack";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
           path:"/menu",
           element:<Menu/>
        },
        {
          path:"/update-profile",
          element:<UpdateProfile/>
        },
        {
          path:"/cart-page",
          element:<PrivateRouter><CartPage/></PrivateRouter>
        },
        {
          path : "process-checkout",
          element:<Payment/>
        },
        {
          path:"/order",
          element:<Order/>
        },
        {
          path:"/accepted-orders",
          element:<AcceptedOrder/>
        },
        {
          path:"/rejected-orders",
          element:<RejectedOrders/>
        },
        {
          path:"/about",
          element:<Feedback/>
        },
        {
          path:"/address",
          element:<Address/>
        }
      ] 
    },
    {
      path: "/signup",
      element :<Signup/>
    },
    {
      path:"/login",
      element:<Modal/>
    },
    // admin routes
    {
      path:"/dashboard",
      element:<PrivateRouter><DashboardLayout/></PrivateRouter>,
      children:[
        {
          path:"",
          element:<Dashboard />
        },
        {
          path:"users",
          element:<User/>
        },
        {
          path:"add-menu",
          element:<AddMenu/>
        },
        {
          path:"manage-item",
          element:<ManageItem/>
        },
        {
          path: "update-menu/:id",
          element: <UpdateMenuItem />,
          //loader: ({ params }) => axios.get(`http://localhost:3000/menu/${params.id}`)
         loader: ({params}) => fetch(`http://localhost:3000/menu/${params.id}`)
        },
        {
          path:"update-order-status",
          element:<ManageOrder/>
        },
        {
          path:"order-tracking",
          element:<OrderTracking/>
        }
      ]
    }
  ]);

  export default router;