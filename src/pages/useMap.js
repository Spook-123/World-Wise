import { useQuery } from "@tanstack/react-query";
import { getMapData } from "../services/apiMap";

export function useMap(id) {
  const {
    isLoading,
    data: mapData,
    error,
  } = useQuery({ queryKey: ["City"], queryFn: () => getMapData(id) });

  // console.log(mapData);
  return { isLoading, error, mapData };
}
