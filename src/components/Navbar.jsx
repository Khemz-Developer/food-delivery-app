import { useEffect, useState } from "react";
// import logo from "/logo.png";
// import mylogo from "/MyLogo.png";
// import { BiPhoneCall } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const [cart, refetch] = useCart();
  // auth context
  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <a className="text-black" href="/">
          Home
        </a>
      </li>
      <li>
        <a className="text-black" href="/menu">
          Menu
        </a>
      </li>
      {/* <li>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li>
              <a href="/menu">All</a>
            </li>
            <li>
              <a>Salad</a>
            </li>
            <li>
              <a>Pizza</a>
            </li>
          </ul>
        </details>
      </li> */}
      <li>
        <details>
          <summary>Orders</summary>
          <ul className="p-2">
            <li>
              <a href="/order">Pending Orders</a>
            </li>
            <li>
              <a href="/accepted-orders">Accepted Orders</a>
            </li>
            <li>
              <a href="/rejected-orders">Rejected Orders</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a href="/about">Feedback</a>
      </li>
    </>
  );
  return (
    <header
      className={`container mx-auto max-w-screen-2xl ${
        isSticky ? "sticky top-0 bg-white z-10 shadow" : ""
      }`}
    >
      <div className="navbar xl:px-24 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <a href="/">
            <p className="text-2xl text-bold" style={{ width: "200px" }}>
              <span className="text-2xl text-bold text-green">Khemz</span>
              Kitchen
            </p>
          </a>
          {/* <a href="/">
            <img src={logo}></img>
          </a> */}
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 menu menu-horizontal">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {/*search btn */}
          <button className="hidden btn btn-ghost btn-circle lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/*cart items*/}
          <Link to="/cart-page">
            <div
              tabIndex={0}
              role="button"
              className="items-center justify-center hidden mr-3 lg:flex btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart.length}
                </span>
              </div>
            </div>
          </Link>
          {/*login btn */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="flex items-center gap-2 px-6 text-white rounded-full btn bg-green"
            >
              <FaRegUser />
              Login
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
