import { useQuery } from "@tanstack/react-query";
import { getCity as getCityApi } from "../services/apiMap";

export function useGetCity(id) {
  const {
    isLoading: isCityLoading,
    data: getCityData,
    error,
  } = useQuery({ queryKey: ["City", id], queryFn: () => getCityApi(id) });
  // console.log("Get City Data", getCityData);
  return { getCityData, isCityLoading };
}
