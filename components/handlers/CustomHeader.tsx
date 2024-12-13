// components/CustomHeader.tsx
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

const CustomHeader = ({
	navigation,
	title,
}: {
	navigation: any;
	title: string;
}) => {
	return (
		<View style={styles.headerContainer}>
			{/* First row: Logo and Search Icon */}
			<View style={styles.firstRow}>
				<View style={styles.logoContainer}>
					<Image
						source={require("../assets/favicon.png")}
						style={styles.logo}
					/>
				</View>
				<View style={styles.searchContainer}>
					<IconButton
						icon="magnify"
						size={26}
						onPress={() => console.log("Search Pressed")}
					/>
				</View>
			</View>

			{/* Second row: Icons */}
			<View style={styles.secondRow}>
				<IconButton
					icon="home"
					size={24}
					onPress={() => navigation.navigate("Home")}
				/>
				<IconButton
					icon="information"
					size={24}
					onPress={() => navigation.navigate("About")}
				/>
				<IconButton
					icon="file-document"
					size={24}
					onPress={() => navigation.navigate("Policies")}
				/>
				<IconButton
					icon="web"
					size={24}
					onPress={() => navigation.navigate("Portals")}
				/>
				<IconButton
					icon="book-open"
					size={24}
					onPress={() => navigation.navigate("Story")}
				/>
				<TouchableOpacity onPress={() => navigation.navigate("ProfileOptions")}>
					<Icon name="bars" style={styles.icon} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: "#fff",
		paddingTop: 30,
		paddingBottom: 10,
		paddingHorizontal: 16,
		elevation: 4,
	},
	firstRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	logoContainer: {
		flexDirection: "row",
	},
	logo: {
		width: 30,
		height: 30,
		resizeMode: "contain",
	},
	searchContainer: {
		alignItems: "flex-end",
	},
	secondRow: {
		marginTop: 8,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	icon: {
		fontSize: 24,
		color: "#000",
		marginLeft: 16,
	},
});

export default CustomHeader;
