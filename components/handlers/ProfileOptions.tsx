// components/ProfileOptions.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { theme } from "../../src/theme";

const ProfileOptions = ({ navigation }: { navigation: any }) => {
	return (
		<View style={styles.profileOptionsContainer}>
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => navigation.navigate("Profile")}
			>
				<Button
					mode="contained"
					style={{ backgroundColor: theme.colors.primary }}
				>
					Profile
				</Button>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	profileOptionsContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		paddingTop: 30,
	},
});

export default ProfileOptions;
