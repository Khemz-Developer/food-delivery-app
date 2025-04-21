import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PropTypes from 'prop-types'; // Import PropTypes
const PrivateRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return (
            <LoadingSpinner/>
        )
    }
    if(user){
        return children;
    }
  return (
    <div>
      <Navigate to="/signup" state={{from: location}} replace></Navigate>
    </div>
  )
}
// Add prop type validation for children
PrivateRouter.propTypes = {
  children: PropTypes.node.isRequired
};

export default PrivateRouter
