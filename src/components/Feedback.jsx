import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Feedback = () => {

  const navigate = useNavigate();
  return (
    <div>
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="flex flex-col items-center justify-between gap-8 py-20 md:flex-row-reverse ">

        {/*image*/}
        <div className="md:w-1/2">
          {/* <img src="/images/home/banner.png" alt="" /> */}
          <div className="flex flex-col items-center justify-around gap-0 -mt-14 md:flex-row">
            {/* <div className="flex items-center w-64 gap-3 px-3 py-2 bg-white shadow-md rounded-2xl">
              <img src="/images/home/b-food1.png" className="rounded-2xl"></img>
              <div className="space-y-1">
                <h5 className="mb-1 font-medium">Siman Silva</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="bg-yellow-500 mask mask-star-2"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="bg-yellow-500 mask mask-star-2"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="bg-yellow-500 mask mask-star-2"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="bg-yellow-500 mask mask-star-2"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="bg-yellow-500 mask mask-star-2"
                    readOnly
                  />
                </div>
                <p className="font-medium text-red">Tasty</p>
              </div>
            </div>

            <div className="items-center hidden w-64 gap-3 px-3 py-2 bg-white shadow-md sm:flex rounded-2xl">
              <img src="/images/home/b-food1.png" className="rounded-2xl"></img>
              <div className="space-y-1">
                <h5 className="mb-1 font-medium">Jhon Wick</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="bg-yellow-500 mask mask-star-2"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="bg-yellow-500 mask mask-star-2"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="bg-yellow-500 mask mask-star-2"
                    readOnly
                    checked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="bg-yellow-500 mask mask-star-2"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="bg-yellow-500 mask mask-star-2"
                    readOnly
                  />
                </div>
                <p className="font-medium text-red">Well Pack</p>
              </div>
            </div> */}
          </div>
          <div>
           {/*avatar */}
           <div className="flex flex-wrap items-center gap-4 mx-8 mt-10">
              <div className="-space-x-6 avatar-group rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-20">
                    <img src="/images/home/testimonials/testimonial1.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-20">
                    <img src="/images/home/testimonials/testimonial2.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-20">
                    <img src="/images/home/testimonials/testimonial3.png"/>
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="w-20 bg-neutral text-neutral-content">
                    <span>+99</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1 ">
                <h5 className="text-lg font-semibold ">Overall Rating of Our Shop !</h5>
                <div className="flex items-center gap-2 ">
                    <FaStar className="text-yellow-400"></FaStar>
                    <span className="font-medium">4.9</span><span className="text-[#807E7E]">(18.6k Reviews)</span>
                    
                </div>
              </div>
              
            </div> 
          
          </div>
        </div>
        
        {/*test*/}
        <div className="px-4 space-y-6 md:w-1/2">
          <h2 className="text-2xl font-bold leading-snug md:leading-snug md:text-5xl">
              Discover What Our Customers <br /> 
            <span className="text-green">Are Saying !</span>
          </h2>
          {/* <p className="text-xl text-[#4A4A4A]">
          Explore the genuine voices of our valued patrons here. Feedback fuels our growth, guiding us to better serve you. Discover testimonials, reviews, and stories from customers like you, sharing their experiences. Dive in to see how we exceed expectations and forge lasting relationships. Your feedback matters; join us on this journey of improvement!
          </p> */}
          <button onClick={()=> navigate('/menu')} className="px-8 py-3 font-semibold text-white rounded-full btn bg-green">
            {" "}
            Order Now
          </button>
        </div>

        
      </div>
    </div>
    </div>
  )
}

export default Feedback
