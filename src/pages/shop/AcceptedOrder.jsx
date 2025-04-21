
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import AddressModal from "../dashboard/admin/AddressModal";

const AcceptedOrder = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [selectedCategory, setSelectedCategory] = useState("all");
  // Check if user exists and has an email, if not, redirect to signup
  useEffect(() => {
    if (!user || !user.email) {
      navigate("/signup"); // Redirect to signup page
    }
  }, [user, navigate]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/payment/accepted-orders/${user?.email}`,
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

  // Filtered orders based on status
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const filterOrders = (category) => {
    let filtered = [];

    switch (category) {
      case "all":
        // Fetch all orders with status "Success" and "Delivered"
        filtered = orders.filter(
          (order) => order.status === "Success" || order.status === "Delivered"
        );
        break;
      case "Success":
        // Fetch orders with status "Success"
        filtered = orders.filter((order) => order.status === "Success");
        break;
      case "Delivered":
        // Fetch orders with status "Delivered"
        filtered = orders.filter((order) => order.status === "Delivered");
        break;
      default:
        break;
    }

    setFilteredOrders(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="container mx-auto bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
          <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-center">
                <h2 className="text-4xl font-bold md:text-4xl">
                  Accepted <span className="text-green">Orders!</span>
                </h2>
                <h2 className="m-5 text-3xl font-bold text-green">Notice</h2>
                <h2
                  className="mt-5 font-medium text-1xl"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Once your payment is successfully processed, your order status
                  will show as <span className="text-red">'Success'</span>. When
                  the shop delivers your product, the status will change to{" "}
                  <span className="text-red">'Delivered'</span> !
                </h2>
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
              <div className="gap-5 mx-2 mb-5">
                {/* filtered and sorting*/}
                <div className="flex flex-col flex-wrap items-center md:justify-between md:flex-row">
                  {/* all category buttons */}
                  <div className="flex flex-row flex-wrap justify-start gap-4 mt-5 md:items-center">
                    {/* Filter buttons */}
                    <div className="flex flex-row flex-wrap justify-start gap-4 mt-5 md:items-center">
                      <button
                        onClick={() => filterOrders("all")}
                        className={
                          selectedCategory === "all" ? "active text-green" : ""
                        }
                      >
                        All
                      </button>
                      <button
                        onClick={() => filterOrders("Success")}
                        className={
                          selectedCategory === "Success"
                            ? "active text-green"
                            : ""
                        }
                      >
                        Success
                      </button>
                      <button
                        onClick={() => filterOrders("Delivered")}
                        className={
                          selectedCategory === "Delivered"
                            ? "active text-green"
                            : ""
                        }
                      >
                        Delivered
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table
                  className="container table mb-2"
                  style={{ width: "100%" }}
                >
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
                        <td>{item.status} </td>
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

                          <AddressModal
                            item={item}
                            modalId={`my_modal_${index}`}
                          />
                        </td>
                        <td></td>
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
              <p>Nothing Have Accepted !. Please Buy Some Products!.</p>
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

export default AcceptedOrder;
