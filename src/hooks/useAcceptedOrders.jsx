import { useQuery } from "@tanstack/react-query";


const useAcceptedOrders = () => {
    
    const token = localStorage.getItem("access-token");

    const {refetch,data:accepted =[]} = useQuery({
      queryKey:["accepted "],
      queryFn:async ()=>{
        
        const res = await fetch(`https://food-delivery-server-hosting.onrender.com/payment/all-accepted-orders`,{
          headers:{
            authorization:`Bearer ${token}`
          }
        });
        //const res = await fetch(`https://food-delivery-server-hosting.onrender.com/cart?email=${user?.email}`);
        return res.json(); 
      }
    })
    return [accepted ,refetch]
}

export default useAcceptedOrders
