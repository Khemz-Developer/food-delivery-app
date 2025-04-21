import { useQuery } from "@tanstack/react-query";

import {  FaUsers } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";

const User = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user`);
      return res.data;
    },
  });
  
  const handleMakeAdmin = async (user) => {
    await axiosSecure.patch(`/user/admin/${user._id}`).then(()=>{
      alert(`${user.name} is now an admin`);
    });
    refetch();
  };

  const handleDeleteUser = async (user) => {
    await axiosSecure.delete(`/user/${user._id}`).then(()=>{
      alert(`${user.name} is deleted`);
    });
    refetch();
  }
  
  console.log(users);
  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Users </h5>
        <h5>Total Users : {users.length}</h5>
      </div>

      {/*table */}
      <div>
        <div className="ml-2 overflow-x-auto">
          <table className="table md:w-[870px]">
            {/* head */}
            <thead className="text-white rounded-lg bg-green">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              
              {
                users.map((user,index)=>(
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {
                      user.role === "admin" ? "Admin" : <button onClick={()=> handleMakeAdmin(user)} className="text-white bg-indigo-500 btn btn-xs btn-circle"><FaUsers/></button>
                    }
                  </td>
                  <td>
                    <button onClick={() => handleDeleteUser(user)} className="text-white bg-orange-500 btn btn-xs">
                      <FaTrashAlt />
                    </button>
                  </td>
                  </tr>
                ))
              
              }
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
