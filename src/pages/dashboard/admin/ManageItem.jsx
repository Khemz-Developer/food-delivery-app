import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useState } from "react";
const ManageItem = () => {
  const [menu, loading, refetch] = useMenu();

  const axiosSecure = useAxiosSecure();
 
  console.log(menu);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const handleDeleteItem = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);

        if (res.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
      refetch();
    });
  };
  //pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menu.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="my-4 text-2xl font-semibold">
        Manage All <span className="text-green">Menu Items</span>
      </h2>

      {/** Table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table mx-auto mt-5">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Prices</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 mask mask-squircle">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button className="text-white bg-orange-500 btn btn-ghost btn-xs">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-xs text-red"
                    >
                      <FaTrashAlt />
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
            length: Math.ceil(menu.length / itemsPerPage),
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

export default ManageItem;
