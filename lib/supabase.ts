import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

interface ExtraConfig {
	supabaseUrl: string;
	supabaseAnonKey: string;
}

// Assert that `Constants.expoConfig?.extra` matches `ExtraConfig`
const extra = Constants.expoConfig?.extra as ExtraConfig | undefined;

if (!extra?.supabaseUrl || !extra?.supabaseAnonKey) {
	throw new Error("Supabase configuration is missing in app.config.ts");
}

const { supabaseUrl, supabaseAnonKey } = extra;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
