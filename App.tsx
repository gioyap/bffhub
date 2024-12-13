import React, { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import { Session } from "@supabase/supabase-js";
import { Provider } from "react-native-paper";
import { theme } from "./src/theme";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import MainStack from "./components/handlers/MainStack";

export default function App() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<Provider theme={theme}>
			<NavigationContainer>
				{session && session.user ? <MainStack session={session} /> : <Auth />}
			</NavigationContainer>
		</Provider>
	);
}
