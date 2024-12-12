import "dotenv/config";

export default {
	expo: {
		name: "bff-flawless",
		slug: "bff-flawless",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "light",
		newArchEnabled: true,
		splash: {
			image: "./assets/splash-icon.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
			package: "com.anonymous.bffflawless",
		},
		web: {
			favicon: "./assets/favicon.png",
		},
		extra: {
			supabaseUrl: process.env.SUPABASE_URL,
			supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
		},
	},
};
