import { Navigate, Route, Routes } from "react-router-dom";

function ProtectedRoute({ children }) {
  if (!localStorage.getItem("accessToken")) return <Navigate to="/login" />;
  return children;
}
export default ProtectedRoute;
