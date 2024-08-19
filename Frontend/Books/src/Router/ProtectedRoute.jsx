import { Outlet, Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";


const ProtectedRoute = () => {
    const isAuthenticated = AuthService.isAuthenticated();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;};
    


export default ProtectedRoute;
