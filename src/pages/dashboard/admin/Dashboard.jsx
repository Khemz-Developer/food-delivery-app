import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCog } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import DefaultChart from "./DefaultChart"
// import DefaultChartForApplications from "./DefaultChartForApplications";


const Dashboard = () => {
  const axiosSecure = useAxiosSecure();
  // Total Users  count
  const { refetch, data: userscount } = useQuery({
    queryKey: ["userscount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/user-count`);
      return res.data;
    },
  });

  // Total Admin count
  const { data: admincount } = useQuery({
    queryKey: ["admincount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin-count`);
      return res.data;
    },
  });

  // Total Earnings
  const { data: earnings } = useQuery({
    queryKey: ["earnings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin-earnings`);
      return res.data;
    },
  });

  //Total Pending Clearence
  const { data: pendingclearence } = useQuery({
    queryKey: ["pendingclearence"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin-pending-earnings`);
      return res.data;
    },
  });

  return (
    <div>
      <div className="my-2">
        <h2 className="px-2 font-semibold text-start text-dark">
          Admin DashBooard
        </h2>
      </div>

      <div className="flex gap-2 mt-5 lg:flex-row">
        <div className="px-5 py-6 text-center transition-all duration-300 bg-white rounded-md shadow-md cursor-pointer w-72 hover:-translate-y-4">
          <div className="flex items-center justify-center w-full mx-auto font-medium">
            <div className="bg-[#C1F1C6] rounded-full w-28 h-28 px-9 py-8">
              <FaUser size={40} />
            </div>
          </div>
          <div className="mt-5 space-y-1 ">
            <h5 className="font-semibold font-md text-red">
              Total Users : {userscount}
            </h5>
          </div>
        </div>

        <div className="px-5 py-6 text-center transition-all duration-300 bg-white rounded-md shadow-md cursor-pointer w-72 hover:-translate-y-4">
          <div className="flex items-center justify-center w-full mx-auto">
            <div className="bg-[#C1F1C6] rounded-full w-28 h-28 px-9 py-7 font-medium">
              <FaUserCog size={48} /> {/* Increase icon size to 48 pixels */}
            </div>
          </div>
          <div className="mt-5 space-y-1 ">
            <h5 className="font-semibold text-red">
              Total Admin : {admincount}
            </h5>
          </div>
        </div>

        <div className="px-5 py-6 text-center transition-all duration-300 bg-white rounded-md shadow-md cursor-pointer w-72 hover:-translate-y-4">
          <div className="flex items-center justify-center w-full mx-auto">
            <div className="bg-[#C1F1C6] rounded-full w-28 h-28 px-8 py-7 font-medium">
              <FaMoneyBillWave size={48} />
            </div>
          </div>
          <div className="mt-5 space-y-1 ">
            <h5 className="font-semibold font-md text-red">
              WithDraw $ :{earnings}
            </h5>
          </div>
        </div>

        <div className="px-5 py-6 text-center transition-all duration-300 bg-white rounded-md shadow-md cursor-pointer w-72 hover:-translate-y-4">
          <div className="flex items-center justify-center w-full mx-auto">
            <div className="bg-[#C1F1C6] rounded-full w-28 h-28 px-8 py-7 font-medium">
              <AiOutlineClockCircle size={48} />
            </div>
          </div>
          <div className="mt-5 space-y-1 ">
            <h5 className="font-semibold text-red">
              Pending Clearence $ :
              <span className="font-bold text-red">{pendingclearence}</span>
            </h5>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="mx-20 mt-10 font-semibold text-start text-dark">Total Categories and Total number of Food Items in Each Category !</h2>
        <span className="mt-0"><DefaultChart/></span>
      </div>
   
    </div>
  );
};

export default Dashboard;
