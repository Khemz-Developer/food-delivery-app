import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
//import axios from "axios";
import PropTypes from "prop-types";
import Swal from 'sweetalert2'
import axios from "axios";
import useCart from "../hooks/useCart";

const Cards = ({ item }) => {
  
  const { name, image, _id, recipe, category, price } = item;
  const [cart, refetch] = useCart();
  
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(AuthContext);
  //console.log(user);
  const [isHeartFillted, setIsHeartFillted] = useState(false);

  const handleHeartClick = (item) => {
    setIsHeartFillted(!isHeartFillted);
  };

  // //add to cart button

  // const handleAddtoCart = item => {
  //   console.log("Add to cart button clicked", item);
  //   if (user && user?.email) {
  //     const cartItem = {
  //       menuItemId: _id,
  //       name,
  //       image,
  //       quantity: 1,
  //       price,
  //       email: user.email,
  //     };

  //     fetch("http://localhost:3000/cart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(cartItem),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.insertedId) {
  //           Swal.fire({
  //             position: "top-end",
  //             icon: "success",
  //             title: "Your item has been saved",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error) ;
  //       });
    
  //   }else{
  //     Swal.fire({
  //       title: "Please Login",
  //       text: "You won't be able to add product without Account!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "SignUp Now!"
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         navigate("/signup",{state:{from:location}});
  //       }
  //     });
  //   }
  // };

   // add to cart handler
   const handleAddtoCart = item => {
    // console.log(item);
    if(user && user.email){
        const cartItem = {menuItemId: _id, name, quantity : 1, image, price, email: user.email}

        axios.post('http://localhost:3000/cart', cartItem)
        .then((response) => {
          console.log(response);
          if(response){
            refetch(); // refetch cart
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Food added on the cart.',
                  showConfirmButton: false,
                  timer: 1500
                })
          }
        })
        .catch( (error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500
          })
        });
    }
    else{
        Swal.fire({
            title: 'Please login to order the food',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login now!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/signup', {state: {from: location}})
            }
          })
    }
}

  
  
  return (
    <div>
      {/* <div className="relative shadow-xl w-96 card bg-base-100"> */}
      <div
        to={`/menu/${item._id}`}
        className="relative mr-5 shadow-xl card md:my-5"
      >
        <div
          className={`absolute  gap-1 p-4 rating right-2 top-2 bg-green heartStar ${
            isHeartFillted ? "text-rose-500" : "text-white"
          }`}
          onClick={handleHeartClick}
        >
          <FaHeart className="w-5 h-5 cursor-pointer"></FaHeart>
        </div>
        <Link to={`/menu/${item._id}`}>
          <figure>
            <img
              className="transition-all duration-200 m hover:scale-105 md:h-72"
              src={item.image}
              alt=""
            />
          </figure>
        </Link>
        <div className="card-body">
          <Link to={`/menu/${item._id}`}>
            {" "}
            <h2 className="font-semibold ">{item.name}</h2>
          </Link>
          <p>Description of the item</p>
          <div className="justify-between item-center card-actions">
            <h5 className="font-semibold">
              <span className="font-sm text-red">$</span>
              {item.price}
            </h5>
            <button
              className="text-white btn bg-green"
              onClick={() => handleAddtoCart(item)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// PropTypes
Cards.propTypes = {
  item: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      recipe: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
  }).isRequired,
};
export default Cards;
