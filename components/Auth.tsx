import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Image } from "react-native";
import { supabase } from "../lib/supabase";
import { TextInput, Button, HelperText } from "react-native-paper";
import { theme } from "../src/theme";

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function signInWithEmail() {
		setLoading(true);
		setError("");
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) setError(error.message);
		setLoading(false);
	}

	async function signUpWithEmail() {
		setLoading(true);
		setError("");
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) setError(error.message);
		if (!session) setError("Please check your inbox for email verification!");
		setLoading(false);
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.formContainer}>
				{/* Logo at the top */}
				<Image source={require("../assets/favicon.png")} style={styles.logo} />

				{/* Title and Subtitle */}
				<Text style={styles.title}>Welcome Back!</Text>
				<Text style={styles.subtitle}>Sign in or Sign up</Text>

				<TextInput
					label="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					keyboardType="email-address"
					autoCapitalize="none"
					mode="outlined" // Outlined style for TextInput
					style={styles.input}
				/>
				<TextInput
					label="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
					autoCapitalize="none"
					mode="outlined" // Outlined style for TextInput
					style={styles.input}
				/>
				{error ? <HelperText type="error">{error}</HelperText> : null}

				{/* Sign In Button */}
				<Button
					mode="contained"
					onPress={signInWithEmail}
					loading={loading}
					style={[styles.button, { backgroundColor: theme.colors.primary }]}
				>
					Sign In
				</Button>

				{/* Sign Up Button */}
				<Button
					mode="outlined"
					onPress={signUpWithEmail}
					disabled={loading}
					textColor="#e61e84"
					style={[styles.button, { borderColor: theme.colors.primary }]}
				>
					Sign Up
				</Button>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#f5f5f5",
	},
	formContainer: {
		width: "100%",
		padding: 16,
		alignItems: "center",
	},
	logo: {
		width: 100, // Adjust the logo size
		height: 100, // Adjust the logo size
		marginBottom: 20, // Space between the logo and title
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
		color: "#777",
		marginBottom: 20,
	},
	input: {
		marginBottom: 12,
		width: "100%", // Ensure input takes full width
	},
	button: {
		width: "100%", // Full width for buttons
		marginTop: 16,
	},
});
