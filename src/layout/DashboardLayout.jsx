

import { Link, Outlet } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { BiSolidShoppingBag } from "react-icons/bi";
import { BiSolidFoodMenu } from "react-icons/bi";
import { TbSitemap } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { FaLocationArrow, FaRegQuestionCircle } from "react-icons/fa";
import Signup from "../components/Signup";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <BiSolidDashboard />
        Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaCartShopping />
        Menu
      </Link>
    </li>
    <li>
      <Link to="order-tracking">
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaRegQuestionCircle />
        Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const {loading} = useAuth();
  const [isAdmin,isAdminLoading] = useAdmin();
  return (
   
    <div>
     {
       isAdmin ? <div className="drawer sm:drawer-open">
       <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
       <div className="flex flex-col sm:justify-start sm:items-start drawer-content">
         {/* Page content here */}
         <div className="flex items-center justify-between m-4">
           <label
             htmlFor="my-drawer-2"
             className="btn btn-primary drawer-button sm:hidden"
           >
             <RxDashboard />
           </label>
           <button className="flex items-center gap-2 text-white rounded-full btn bg-green sm:hidden">
             <AiOutlineUser />
             Logout
           </button>
         </div>
         <div className="mx-4 mt-4 md:mt-2">
           <Outlet />
         </div>
       </div>
       <div className="drawer-side">
         <label
           htmlFor="my-drawer-2"
           aria-label="close sidebar"
           className="drawer-overlay"
         ></label>
         <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
           {/* Sidebar content here */}
           <div className="flex justify-start mb-3">
             <li>
               <Link to="/dashboard">
                 <p className="text-xl text-bold" style={{ width: "170px" }}>
                   <span className="text-xl text-bold text-green">Khemz</span>
                   Kitchen
                 </p>
                 <span className=" badge badge-secondary badge-outline">
                   admin
                 </span>
               </Link>
             </li>
           </div>

           <hr className="border-2" />

           <li className="mt-2">
             <Link to="/dashboard">
               <BiSolidDashboard />
               Dashboard
             </Link>
           </li>
           <li>
             <Link to="/dashboard/update-order-status">
               <BiSolidShoppingBag />
               Manage Bookings
             </Link>
           </li>
           <li>
             <Link to="/dashboard/add-menu">
               <BiSolidFoodMenu />
               Add Menu
             </Link>
           </li>
           <li>
             <Link to="/dashboard/manage-item">
               <TbSitemap />
               Manage Items
             </Link>
           </li>
           <li className="mb-5">
             <Link to="/dashboard/users">
               <FiUsers />
               All Users
             </Link>
           </li>

           <hr className="border-2" />
           {/* Shared links */}
           {sharedLinks}
         </ul>
       </div>
     </div> : (loading ? <Signup/> : <div className="flex items-center justify-center h-screen"><Link to="/"><button className="text-white btn bg-green">Back to Home</button></Link></div>) 
     }
    </div>
   
  );
};

export default DashboardLayout;
