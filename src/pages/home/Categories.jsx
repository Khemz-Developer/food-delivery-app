

const categoryItems = [
  {
    id: 1,
    title: "Main Dish",
    des: "(86 dishes)",
    images: "/images/home/category/img1.png",
  },
  {
    id: 2,
    title: "Break Fast",
    des: "(12 break fast)",
    images: "/images/home/category/img2.png",
  },
  {
    id: 3,
    title: "Dessert",
    des: "(48 dishes)",
    images: "/images/home/category/img3.png",
  },
  {
    id: 4,
    title: "Browse All",
    des: "(255 Items)",
    images: "/images/home/category/img4.png",
  },
];
const Categories = () => {
  return (
    <div className="py-16 section-container">
      <div className="text-center">
        <p className="subtitle">Customer Favorites</p>
        <p className="title">Popular Catagories</p>
      </div>

      {/* category cards */}
      <div className="flex flex-col flex-wrap items-center justify-around gap-8 mt-12 sm:flex-row ">
        {categoryItems.map((item, i) => (
          <div key={i} className="px-5 py-6 mx-auto text-center transition-all duration-300 bg-white rounded-md shadow-md cursor-pointer w-72 hover:-translate-y-4">
            <div className="flex items-center justify-center w-full mx-auto">
              <img
                src={item.images}
                alt="image category"
                className="bg-[#C1F1C6] rounded-full w-28 h-28 p-5"
              ></img>
            </div>
            <div className="mt-5 space-y-1 ">
              <h5>{item.title}</h5>
              <p>{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
