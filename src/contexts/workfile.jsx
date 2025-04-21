import { createContext, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("joy");
  
const authInfo = {
    user,
   
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;



VITE_APIKEY = AIzaSyC77kI_Pdq9eaIQD6MPhwhlaxabRjRjus8
VITE_APPID = 1:976740968094:web:ed90f3b33056bebd6b3d8f
VITE_STORAGEBUCKET = food-delivery-web-app-3dc6e.appspot.com
VITE_PROJECTID = food-delivery-web-app-3dc6e
VITE_AUTHDOMAIN = food-delivery-web-app-3dc6e.firebaseapp.com
VITE_MESSAGINGSENDERID = 976740968094