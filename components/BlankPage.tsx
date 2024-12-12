import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function BlankPage({ navigation }: { navigation: any }) {
	return (
		<View style={styles.blankPageContainer}>
			<Text style={styles.header}>Blank Page</Text>
			{/* Hamburger Icon to open Drawer Menu */}
			<TouchableOpacity
				onPress={() => navigation.openDrawer()}
				style={styles.hamburgerIcon}
			></TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	blankPageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
	},
	hamburgerIcon: {
		position: "absolute",
		top: 30,
		left: 20,
	},
	hamburgerText: {
		fontSize: 30,
	},
});
