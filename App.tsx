import React, { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import { Session } from "@supabase/supabase-js";
import { Provider, IconButton } from "react-native-paper";
import { theme } from "./src/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import BlankPage from "./components/BlankPage"; // Import BlankPage
import Icon from "react-native-vector-icons/FontAwesome5";

const Drawer = createDrawerNavigator();

// Custom Header Component
const CustomHeader = ({
	navigation,
	title,
}: {
	navigation: any;
	title: string;
}) => {
	return (
		<>
			<View style={styles.headerContainer}>
				<Image source={require("./assets/favicon.png")} style={styles.logo} />
				<IconButton
					icon="magnify"
					size={24}
					onPress={() => console.log("Search Pressed")}
				/>
			</View>
			<View style={styles.hamburgerContainer}>
				<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
					{/* Using the FontAwesome5 hamburger icon */}
					<Icon name="bars" style={styles.icon} />
				</TouchableOpacity>
			</View>
		</>
	);
};

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
				{session && session.user ? (
					<Drawer.Navigator
						initialRouteName="Blank"
						screenOptions={({ navigation }) => ({
							header: (props) => (
								<CustomHeader
									navigation={navigation}
									title={props.route.name}
								/>
							),
						})}
					>
						<Drawer.Screen name="Blank" component={BlankPage} />
						<Drawer.Screen name="Profile">
							{() => <Profile session={session} />}
						</Drawer.Screen>
					</Drawer.Navigator>
				) : (
					<Auth />
				)}
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#fff",
		paddingTop: 30, // Reduced padding on top and bottom
		elevation: 4,
	},
	logo: {
		width: 60,
		height: 30,
		resizeMode: "contain",
	},
	hamburgerContainer: {
		alignSelf: "flex-start",
		marginTop: 10,
		marginLeft: 16,
	},
	icon: {
		fontSize: 24,
		color: "#000",
	},
});
