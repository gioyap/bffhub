import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Portals() {
	return (
		<View style={styles.PortalsContainer}>
			<Text style={styles.header}>Portals Page</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	PortalsContainer: {
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
