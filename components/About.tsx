import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function About() {
	return (
		<View style={styles.AboutContainer}>
			<Text style={styles.header}>About Page</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	AboutContainer: {
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
