import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Logout Successfully");
      // clears the cache data
      queryClient.removeQueries();
      // { replace: true } -> clears the stack
      navigate("/login", { replace: true });
    },
    onError: (err) => toast.error(err),
  });
  return { logout, isLoading };
}
