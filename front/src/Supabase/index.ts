import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export const client = createClient<Database>("https://apigwprterggjoqqgmtr.supabase.co", (import.meta as any).env.VITE_API_KEY!);
