import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Home() {
	return (
		<View style={styles.homeContainer}>
			<Text style={styles.header}>Home Page</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	homeContainer: {
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
