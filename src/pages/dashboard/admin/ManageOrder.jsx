import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { FcAcceptDatabase, FcCheckmark } from "react-icons/fc";
import { FiXOctagon } from "react-icons/fi";
import { MdDoneAll, MdOutlineDoneOutline } from "react-icons/md";

const ManageOrder = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  const axiosSecure = useAxiosSecure();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const formatedDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/payment/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      //const res = await fetch(`http://localhost:3000/cart?email=${user?.email}`);
      return res.json();
    },
  });

  //handle accept order
  const handleAcceptOrder = async (order) => {
    await axiosSecure.patch(`/payment/accept/${order._id}`).then(() => {
      Swal.fire("Order Accepted", "", "success");
    });
    refetch();
  };

  //handle reject order
  const handleRejectOrder = async (order) => {
    await axiosSecure.patch(`/payment/reject/${order._id}`).then(() => {
      Swal.fire("Order Rejected", "", "success");
    });
    refetch();
  };

  //pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      
        <div className="w-full md:w-[870px] px-4 mx-auto">
        <h2 className="my-4 text-2xl font-semibold">
          Manage <span className="text-green">Order Status !</span>
        </h2>

        {/** Table */}
       {orders.length >0 ? ( <div>
          <div className="overflow-x-auto">
            <table className="table mx-auto mt-5 ">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-base font-bold">#</th>
                  <th className="text-base font-bold">Order Date</th>
                  <th className="text-base font-bold">TransitionId</th>
                  <th className="text-base font-bold">Prices</th>
                  <th className="text-base font-bold">Status</th>
                  <th className="text-base font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((order, index) => (
                  <tr key={order._id}>
                    <th>{index + 1}</th>
                    <td>{formatedDate(order.createdAt)}</td>
                    <td className="font-medium">{order.transitionId}</td>
                    <td>${order.price}</td>
                    <td>{order.status}</td>
                    <td>
                      <button
                        className="mx-1 text-white btn btn-xs bg-green"
                        onClick={() => handleAcceptOrder(order)}
                      >
                        <MdOutlineDoneOutline />
                      </button>
                      <button
                        className="mx-1 font-bold text-white bg-red btn btn-ghost btn-xs"
                        onClick={() => handleRejectOrder(order)}
                      >
                        <FiXOctagon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/*pagination section*/}
          <div className="flex justify-center mt-5">
            {Array.from({
              length: Math.ceil(orders.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`py-1 px-4 mx-1 rounded-full ${
                  currentPage === index + 1
                    ? "bg-green text-white"
                    : "bg-grey-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>): (
            <div className="flex flex-col text-start ">
              <p className="font-medium text-md ">No New Orders  for Manage the Status of the Order !.</p>
              <Link to="/dashboard">
                <button className="mt-3 text-white btn bg-green btn-sm">
                  Back to DashBoard
                </button>
              </Link>
            </div>
          )}
      </div>
      
    </div>
  );
};

export default ManageOrder;
