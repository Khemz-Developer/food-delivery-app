import { ImSpoonKnife } from "react-icons/im";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'

const AddMenu = () => {
  const { register, handleSubmit ,reset} = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  
  //image_hosting_key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    // console.log(data)
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(hostingImg.data)
    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price), 
        recipe: data.recipe,
        image: hostingImg.data.data.display_url
      };

      // console.log(menuItem);
      const postMenuItem = axiosSecure.post('/menu', menuItem);
      if(postMenuItem){
        reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Item is inserted successfully!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };


  

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="my-4 text-2xl font-semibold">
        Upload A <span className="text-green">Menu Item</span>
      </h2>

      {/* form */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1st raw */}
          <div className="w-full form-control">
            {/* Recipe Name */}
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="w-full input input-bordered"
            />
          </div>

          {/* 2nd raw */}
          <div className="flex flex-col items-center gap-4 md:flex-row">
            {/* Category */}
            <div className="w-full my-6 form-control">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
              >
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="offered">Offered</option>
                <option value="popular">Popular</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            <div className="w-full form-control">
              {/* Price */}
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="w-full input input-bordered"
              />
            </div>
          </div>

          {/* 3rd raw */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="h-24 textarea textarea-bordered"
              placeholder="Tell the words about your Receipe"
            ></textarea>
          </div>

          {/* 4th raw */}
          <div className="w-full max-w-xs my-8 form-control">
            <input
              type="file"
              {...register("image", { required: true })}
              className="w-full max-w-xs file-input file-input-bordered"
            />
          </div>

          {/* 5th raw */}
          <button className="px-6 text-white btn bg-green">
            <ImSpoonKnife /> Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;

