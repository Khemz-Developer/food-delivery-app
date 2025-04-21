import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://food-delivery-server-hosting.onrender.com',
   
  });



const useAxiosPublic = () => {
  return axiosPublic;
}

export default useAxiosPublic
