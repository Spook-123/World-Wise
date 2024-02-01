import supabase from "./supabase";

export async function getMapData(id) {
  const { data, error } = await supabase
    .from("City")
    .select("*")
    .eq("userId", id);
  // Modify the row level policy in supabase
  if (error) {
    console.error(error);
    throw new Error("Map Data could not be loaded");
  }
  // console.log("getMapData -> ", data);
  return data;
}

export async function createUpdateForm(newFormData) {
  // Modify the row level policy in supabase
  //   Fields must have to match as back-end model
  // 1. create a form data
  let query = supabase.from("City").insert([{ ...newFormData }]);
  // // CREATE QUERY
  // if (!id) query = query.insert([{ ...newFormData }]);
  // // UPDATE QUERY
  // if (id) query = query.update({ ...newFormData }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Form Data could not be loaded");
  }
  // console.log("createUpdateForm -> ", data);
  return data;
}

export async function getCity(id) {
  const { data, error } = await supabase.from("City").select("*").eq("id", id);
  // Modify the row level policy in supabase
  if (error) {
    console.error(error);
    throw new Error("Map could not be Loaded");
  }
  // console.log("Api Map", data);
  return data;
}

export async function deleteCity(id) {
  const { data, error } = await supabase.from("City").delete().eq("id", id);
  // Modify the row level policy in supabase
  if (error) {
    console.error(error);
    throw new Error("Form Data could not be Deleted");
  }
  // console.log("Deleted Data -> ", data);
  return data;
}
