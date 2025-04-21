import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import useAxiosSecure from "../../hooks/useAxiosSecure";

const Address = () => {
  const { user } = useAuth();
  
  const axiosSecure = useAxiosSecure();
  //redirecting to homepage or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  
  console.log(user);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
        name: data.name,
        address: data.address,
        postalCode: data.postalCode,
    };
    
    axiosSecure.patch(`/payment/update/${user.email}`, userInfo)
        .then((response) => {
            alert("User account updated successfully");
            navigate(from, { replace: true }); // Assuming `from` is defined somewhere
        })
        .catch((error) => {
            console.error("Please Pay Your Order First, Then you can add Your Shipping Address", error);
            // Handle error here
        });
};


  return (
    <div>
      <div className="flex items-center justify-center w-full max-w-md mx-auto mt-20 bg-white shadow">
        <div className="flex flex-col justify-center mt-0 modal-action">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="text-lg font-bold">Add Your Shipping Address!</h3>

            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Your name"
                className="input input-bordered"
                {...register("name")}
              />
            </div>

            <div className="form-control">
              {/* mail */}
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="address"
                placeholder="address"
                className="input input-bordered"
                required
                {...register("address")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Postal Code</span>
              </label>
              <input
                type="postalCode"
                placeholder="number"
                className="input input-bordered"
                required
                {...register("postalCode")}
              />
            </div>

            {/* login btn */}
            <div className="mt-6 form-control">
              <input
                type="submit"
                value="Submit"
                className="text-white btn bg-green"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;
