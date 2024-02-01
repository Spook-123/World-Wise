import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCity as deleteCityApi } from "../services/apiMap";
import toast from "react-hot-toast";

export function useDeleteCity() {
  // Get the instance of query client so then calling invalidate would re-fetch the data
  const queryClient = useQueryClient();
  //   Delete using useMutation hook
  //   mutate function can be connect with the delete button
  const { isLoading: isDeleting, mutate: deleteCity } = useMutation({
    mutationFn: (id) => deleteCityApi(id),
    // invalidating the cache -> which to re-fetch the data from the remote server
    // instruct what to do after deleting the element
    onSuccess: () => {
      toast.success("Marker deleted Successfully");
      queryClient.invalidateQueries({
        // specific the cache key to invalidate the data
        queryKey: ["City"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCity };
}
