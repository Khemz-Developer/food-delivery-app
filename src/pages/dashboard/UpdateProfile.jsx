import  { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { updateuserProfile } = useContext(AuthContext);
  //redirecting to homepage or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    updateuserProfile({ name, photoURL })
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h3 className="font-bold"> Update Your Profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="your name"
              className="input input-bordered"
              {...register("name")}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="text"
              placeholder="photoURL"
              className="input input-bordered"
              {...register("photoURL")}
              required
            />
            {/* TODO : Uploading Image will be later */}
            {/* <input type="file" className="w-full max-w-xs file-input" /> */}
          </div>
          <div className="mt-6 form-control">
            <button className="text-white btn bg-green">Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
