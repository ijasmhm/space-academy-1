import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
