

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="flex flex-col items-center justify-between gap-8 py-24 md:flex-row-reverse ">

        {/*image*/}
        <div className="md:w-1/2">
          <img src="/images/home/banner.png" alt="" />
          <div className="flex flex-col items-center justify-around gap-4 -mt-14 md:flex-row">
            <div className="flex items-center w-64 gap-3 px-3 py-2 bg-white shadow-md rounded-2xl">
              <img src="/images/home/b-food1.png" className="rounded-2xl"></img>
              <div className="space-y-1">
                <h5 className="mb-1 font-medium">Spicy noodles</h5>
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
                <p className="font-medium text-red">$ 18.00</p>
              </div>
            </div>

            <div className="items-center hidden w-64 gap-3 px-3 py-2 bg-white shadow-md sm:flex rounded-2xl">
              <img src="/images/home/b-food1.png" className="rounded-2xl"></img>
              <div className="space-y-1">
                <h5 className="mb-1 font-medium">Spicy noodles</h5>
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
                <p className="font-medium text-red">$ 18.00</p>
              </div>
            </div>
          </div>
        </div>
        
        {/*test*/}
        <div className="px-4 space-y-6 md:w-1/2">
          <h2 className="text-4xl font-bold leading-snug md:leading-snug md:text-5xl">
            Dive into Delights Of Delectable{" "}
            <span className="text-green">Food</span>
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Where Each Plate Waves a Story of Culinary Mastery and Passionate
            Craftmanship
          </p>
          <button className="px-8 py-3 font-semibold text-white rounded-full btn bg-green">
            {" "}
            Order Now
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default Banner;
