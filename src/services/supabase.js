import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gsjhmzqqaunqdhspqckm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzamhtenFxYXVucWRoc3BxY2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2MTgzMjAsImV4cCI6MjAyMjE5NDMyMH0.NDqKjC-e-GBuU8j6CyPw1doyJdowSei6ncbe1lRHmck";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
