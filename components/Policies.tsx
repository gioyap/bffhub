import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Policies() {
	return (
		<View style={styles.PoliciesContainer}>
			<Text style={styles.header}>Policies Page</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	PoliciesContainer: {
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
