import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import AddressModal from "../dashboard/admin/AddressModal";

const RejectedOrders = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const navigate = useNavigate(); // useNavigate hook for navigation

  // Check if user exists and has an email, if not, redirect to signup
  useEffect(() => {
    if (!user || !user.email) {
      navigate("/signup"); // Redirect to signup page
    }
  }, [user, navigate]);

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/payment/rejected-orders/${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      //const res = await fetch(`http://localhost:3000/cart?email=${user?.email}`);

      return res.json();
    },
  });

  const formatedDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };
  console.log(orders);

  //pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="container mx-auto bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
          <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-center">
                <h2 className="text-4xl font-bold md:text-4xl">
                  Rejected <span className="text-green">Orders!</span>
                </h2>
                <h2 className="mt-10 text-3xl font-bold text-green">Notice</h2>
                <h5
                  className="mt-10 font-medium text-1xl"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Once your payment is not successfully processed, your order
                  status will reject by the shop.Then status of Order updated as{" "}
                  <span className="font-bold text-red">'Reject'</span>.Please
                  make sure to use correct Payment Way !
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*table*/}
      <div className="container mx-auto">
        <div>
          {orders.length > 0 ? (
            <div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="text-white rounded-sm bg-green">
                    <tr>
                      <th># </th>
                      <th>Order Date </th>
                      <th>TransitionId</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Order Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatedDate(item.createdAt)}</td>
                        <td className="font-medium">{item.transitionId}</td>
                        <td>${item.price}</td>
                        <td>{item.status}</td>
                        <td>
                          <button
                            className="mx-5 text-white bg-yellow-300 btn btn-ghost btn-xs"
                            onClick={() =>
                              document
                                .getElementById(`my_modal_${index}`)
                                .showModal()
                            }
                          >
                            <FaEye />
                          </button>

                          <AddressModal item={item} modalId={`my_modal_${index}`} />
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
            </div>
          ) : (
            <div className="mt-20 text-center">
              <p>Nothing Have Rejected !</p>
              <Link to="/menu">
                <button className="mt-3 text-white btn bg-green">
                  Back to Menu
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RejectedOrders;
