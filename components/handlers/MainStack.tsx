// components/MainStack.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "./CustomHeader";
import Home from "./../Home";
import About from "./../About";
import Policies from "./../Policies";
import Portals from "./../Portals";
import Story from "./../Story";
import Profile from "./../Profile";
import Auth from "./../Auth";
import ProfileOptions from "./ProfileOptions";
import { Session } from "@supabase/supabase-js";

const Stack = createStackNavigator();

const MainStack = ({ session }: { session: Session | null }) => (
	<Stack.Navigator
		screenOptions={({ navigation, route }) => ({
			header: () => <CustomHeader navigation={navigation} title={route.name} />,
		})}
	>
		<Stack.Screen name="Home" component={Home} />
		<Stack.Screen name="About" component={About} />
		<Stack.Screen name="Policies" component={Policies} />
		<Stack.Screen name="Portals" component={Portals} />
		<Stack.Screen name="Story" component={Story} />
		<Stack.Screen name="Profile">
			{() => (session ? <Profile session={session} /> : <Auth />)}
		</Stack.Screen>
		<Stack.Screen name="ProfileOptions" component={ProfileOptions} />
	</Stack.Navigator>
);

export default MainStack;
