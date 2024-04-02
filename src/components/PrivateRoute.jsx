
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
    const userName = localStorage.getItem('userName')
    const session = localStorage.getItem('sessionId')
 // Your authentication logic goes here...
 
  return (session && userName) ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;