import { FaEye } from "react-icons/fa";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import useAcceptedOrders from "../../../hooks/useAcceptedOrders";
import { FaCheckCircle } from "react-icons/fa";
import AddressModal from "./AddressModal";
const OrderTracking = () => {
  const [accepted, loading, refetch] = useAcceptedOrders();

  const axiosSecure = useAxiosSecure();

  console.log(accepted);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const handleComfirmDelivery = async (item) => {
    await axiosSecure
      .patch(`/payment/comfirm-delivery/${item._id}`)
      .then(() => {
        Swal.fire("Order Delivery Comfirmed", "", "success");
      });
    refetch();
  };
  //pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accepted.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="my-4 text-2xl font-semibold">
        Confirming Delivery of <span className="text-green">Orders !</span>
      </h2>

      {/** Table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table mx-auto mt-5">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction Id</th>
                <th>Name of the Customer</th>
                <th>Amount</th>
                <th>Check Address</th>
                <th>Comfirm Delivery</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.transitionId}</td>
                  <td>{item.name}</td>
                  <td>$ {item.price}</td>
                  <td>
                    <button
                      className="mx-5 text-white bg-yellow-300 btn btn-ghost btn-xs"
                      onClick={() =>
                        document.getElementById(`my_modal_${index}`).showModal()
                      }
                    >
                      <FaEye />
                    </button>

                    <AddressModal item={item} modalId={`my_modal_${index}`} />
                  </td>
                  <td>
                    <button
                      onClick={() => handleComfirmDelivery(item)}
                      className="btn btn-ghost btn-xs text-red"
                    >
                      <FaCheckCircle />
                      Comfirm?
                    </button>
                  </td>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
        {/*pagination section*/}
        <div className="flex justify-center mt-5">
          {Array.from({
            length: Math.ceil(accepted.length / itemsPerPage),
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
      </div>
    </div>
  );
};

export default OrderTracking;
