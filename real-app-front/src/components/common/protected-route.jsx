import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const ProtectedRoute = ({ children, bizOnly = false }) => {
  const { user } = useAuth();

  if (!user || (bizOnly && !user.biz)) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;
