import React from "react";

const servicesLists = [
    {id:1, title:"Catering", des: "Delight your guests with our flavors and presentation" , image: "/images/home/services/icon1.png"},
    {id:2, title:"Fast Delivery", des: "We deliver your order promptly to your door" , image: "/images/home/services/icon2.png"},
    {id:3, title:"Online Ordering", des: "Explore menu & order with ease using our Online Ordering" , image: "/images/home/services/icon3.png"},
    {id:4, title:"Gift Cards", des: "Give the gift of exceptional dining with Khemz Kitchen Cards" , image: "/images/home/services/icon4.png"}
    
]
const OurServices = () => {
  return (
    <div className=" section-container">
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
        
        {/*test*/}
        <div className=" md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">OUR STORY & SERVICES</p>
            <h2 className="title"> Our Culinary Journey And Services</h2>
            <p className="my-5 text-secondary leading-[30px]">
              
                Rooted in passion, we curate unforgettable dining experiences and offer exceptional Services, blending culinary artistry with warm hospitality.
              
            </p>
            <button className="px-8 py-3 text-white rounded-full btn bg-green">Explore</button>
           
            
          </div>
        </div>

        {/* images */}
        
        <div className="md:w-1/2">
          <div className="grid items-center gap-8 sm:grid-cols-2 grid-col">
          {
            servicesLists.map((service)=>(
                <div key={service.id} className="py-5 space-y-2 text-center transition-all duration-200 rounded-md shadow-md cursor-pointer text-green hover:border-indigo-600 hover:border">
                    <img src={service.image} className="mx-auto"></img>
                    <h5 className="pt-3 font-semibold">{service.title}</h5>
                    <p className="text-[#90BD95]">{service.des}</p>
                </div>
            ))
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
