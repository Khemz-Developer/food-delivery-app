import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Add this line to import PropTypes
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const GithubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create a user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign up with google
  const signUpWithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // sign up with facebook
  const signUpWithFacebook = () => {
    return signInWithPopup(auth, facebookProvider);
  };

  // sign up with github
  const signUpWithGithub = () => {
    return signInWithPopup(auth, GithubProvider);
  };

  // login with email and password
  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logOut = () => {
    return signOut(auth);
  };

  // update Profile
  const updateuserProfile = ({ name, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // check sign in user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        //after implement jwt and middleware now making this
        const userInfo = { email: currentUser.email };
        axios.post("http://localhost:3000/jwt", userInfo)
        .then((response) => {
          //console.log(response.data.token);
          if (response.data.token) {
            localStorage.setItem("access-token", response.data.token);
          }
        });
      } else {
        // console.log("no user");
        localStorage.removeItem("access-token");
      }

      setLoading(false);

      //setUser(null);
      //setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    loginWithEmail,
    logOut,
    updateuserProfile,
    loading,
    signUpWithFacebook,
    signUpWithGithub,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

// import { useEffect, useState } from "react";
// import { createContext } from "react";
// //import app from "../firebase/firebase.config";

// // import PropTypes from "prop-types";

// // AuthProvider.propTypes = {
// //   children: PropTypes.node.isRequired,
// // };

// import {
//   // GoogleAuthProvider,
//   // createUserWithEmailAndPassword,
//   //getAuth,
//   // onAuthStateChanged,
//   // signInWithEmailAndPassword,
//   // signInWithPopup,
//   // signOut,
//   // updateProfile,
// } from "firebase/auth";

// export const AuthContext = createContext();
// // Initialize Firebase Authentication and get a reference to the service
// //const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState("joy");
//   // const [loading, setLoading] = useState(true);
//   // const googleProvider = new GoogleAuthProvider();

//   // create a user
//   // const createUser = (email, password) => {
//   //   return createUserWithEmailAndPassword(auth, email, password);
//   // };

//   //sign up with google
//   // const signUpWithGmail = () => {
//   //   return signInWithPopup(auth, googleProvider);
//   // };

//   //login with email and password
//   // const loginWithEmail = (email, password) => {
//   //   return signInWithEmailAndPassword(auth, email, password);
//   // };

//   //logout
//   // const logOut = () => {
//   //   return signOut(auth);
//   // };

//   // update Profile
//   // const updateuserProfile = ({name, photoURL}) => {
//   //  return updateProfile(auth.currentUser, {
//   //     displayName: name,
//   //     photoURL: photoURL,
//   //   });
//   // };

//   //check sign in user

// //  useEffect(() => {

// //    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// //      if(currentUser){
// //        setUser(currentUser);
// //        setLoading(false);
// //      }
// //      else{
// //        //setUser(null);
// //        //setLoading(false);
// //      }
// //    });
// //    return () => {
// //      unsubscribe();
// //    };
// //  },[])

// const authInfo = {
//     user,
//     // createUser,
//     // signUpWithGmail,
//     // loginWithEmail,
//     // logOut,
//     // updateuserProfile,
//   };
//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;
