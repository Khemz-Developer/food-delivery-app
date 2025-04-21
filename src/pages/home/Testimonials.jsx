import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
        <div className="md:w-1/2">
          <img src="/images/home/testimonials/testimonials.png" />
        </div>
        <div className=" md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Testimonials</p>
            <h2 className="title"> What Our Customers Say About Us</h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              <p>
                "I had to pleasure of dining at KhemzKitchen last night , and
                I'm still raving about the experience! The attention to detail
                in presentation and service was imeccable"
              </p>
            </blockquote>
            {/*avatar */}
            <div className="flex flex-wrap items-center gap-4 ">
              <div className="-space-x-6 avatar-group rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial1.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial2.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial3.png"/>
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="w-12 bg-neutral text-neutral-content">
                    <span>+99</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h5 className="text-lg font-semibold ">Customer Feedback</h5>
                <div className="flex items-center gap-2 ">
                    <FaStar className="text-yellow-400"></FaStar>
                    <span className="font-medium">4.9</span><span className="text-[#807E7E]">(18.6k Reviews)</span>
                    
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
