import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";


const Modal = () => {
  {
    /* React hook form */
  }

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const { signUpWithGmail, loginWithEmail, signUpWithFacebook,signUpWithGithub } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  //redirecting to homepage or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
 
  const axiosPublic = useAxiosPublic();
  // google signin
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("/user", userInfo).then((response) => {
          // console.log(response);
          alert("SignIn successfully");
          navigate("/");
        });
      
        //alert("Login successfully");
        document.getElementById("my_modal_5").close();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
   // Facebook sign-in
   const handleFacebookLogin = () => {
    signUpWithFacebook()
      .then((result) => {
        const user = result.user;
        
        alert("Login with Facebook successfully");
        document.getElementById("my_modal_5").close();
      })
      .catch((error) => {
        console.log("Error signing in with Facebook:", error);
      });
  };

  
  const handleGithubLogin = () => {
    signUpWithGithub()
      .then((result) => {
        const user = result.user;
        if (user && user.email) {
          alert("Login with Github successfully");
        } else {
          alert("Login with Github successful, but email is not provided. Please provide an email.");
          
        }
        document.getElementById("my_modal_5").close();
      })
      .catch((error) => {
        console.log("Error signing in with Github:", error);
      });
  };
  
  
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    //console.log(email, password);
    loginWithEmail(email, password)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/user", userInfo).then(
          (response) => {
            // console.log(response);
            alert("SignIn successfully");
            navigate(from, { replace: true });
          });
        
       // alert("Login successfully");
        document.getElementById("my_modal_5").close();
       // navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrorMessage("Provide a correct email and password");
      });
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className=" modal-box">
        <div className="flex flex-col justify-center mt-0 modal-action">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="text-lg font-bold">Please Login!</h3>
            <div className="form-control">
              {/* mail */}
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register("password")}
              />

              {/* forget password */}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error */}
            {errorMessage ? (
              <p className="text-xs italic text-red">{errorMessage}</p>
            ) : (
              ""
            )}

            {/* login btn */}
            <div className="mt-6 form-control">
              <input
                type="submit"
                value="Login"
                className="text-white btn bg-green"
              />
            </div>

            <p className="my-2 text-center">
              Donot have an account?{" "}
              <Link className="ml-1 underline text-red" to="/signup">
                Signup Now
              </Link>
            </p>
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
            >
              ✕
            </button>
          </form>

          {/* social sign in */}
          <div className="mb-5 space-x-3 text-center">
            <button
              className="btn btn-circle hover:bg-green hover:text-white"
              onClick={handleLogin}
            >
              <FaGoogle />
            </button>

            <button
              className="btn btn-circle hover:bg-green hover:text-white"
              onClick={handleFacebookLogin}
            >
              <FaFacebookF />
            </button>

            <button className="btn btn-circle hover:bg-green hover:text-white"
            onClick={handleGithubLogin}>
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
