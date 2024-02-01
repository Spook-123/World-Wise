import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./useUser";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  if (isLoading) return <div>Loading</div>;
  // return isAuthenticated ? children : null;
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
