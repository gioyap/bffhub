import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Story() {
	return (
		<View style={styles.StoryContainer}>
			<Text style={styles.header}>Story Page</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	StoryContainer: {
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
