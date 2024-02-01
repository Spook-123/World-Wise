import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateForm } from "../services/apiMap";
import toast from "react-hot-toast";

export function useCreateForm() {
  // Making the back-end request
  const queryClient = useQueryClient();
  const { mutate: createForm, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateForm,
    onSuccess: () => {
      toast.success("Marker Added");
      queryClient.invalidateQueries({ queryKey: ["City"] });
      // Removed
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });
  // console.log("createForm Hook -> ", createForm);
  return { isCreating, createForm };
}
