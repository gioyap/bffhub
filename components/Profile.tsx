import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Alert, ScrollView, Text } from "react-native";
import { Button, Card, Input } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import Avatar from "./Avatar";
import { Picker } from "@react-native-picker/picker";

export default function Account({ session }: { session: Session }) {
	const [loading, setLoading] = useState(true);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthday, setBirthday] = useState("");
	const [gender, setGender] = useState("Gender"); // Default gender is Male
	const [phoneNumber, setPhoneNumber] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	const [otherGender, setOtherGender] = useState("");

	useEffect(() => {
		if (session) getProfile();
	}, [session]);

	async function getProfile() {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No user on the session!");

			const { data, error, status } = await supabase
				.from("profiles")
				.select(
					"first_name, last_name, birthday, gender, phone_number, avatar_url, custom_gender"
				)
				.eq("id", session?.user.id)
				.single();
			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setFirstName(data.first_name);
				setLastName(data.last_name);
				setBirthday(data.birthday);
				setGender(data.gender);
				setPhoneNumber(data.phone_number);
				setAvatarUrl(data.avatar_url);
				setOtherGender(data.custom_gender);
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	async function updateProfile({
		first_name,
		last_name,
		birthday,
		gender,
		phone_number,
		avatar_url,
		custom_gender,
	}: {
		first_name: string;
		last_name: string;
		birthday: string;
		gender: string;
		phone_number: string;
		avatar_url: string;
		custom_gender?: string;
	}) {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No user on the session!");

			const updates = {
				id: session?.user.id,
				first_name,
				last_name,
				birthday,
				gender,
				custom_gender: gender === "other" ? custom_gender : null,
				phone_number,
				avatar_url,
				updated_at: new Date(),
			};

			const { error } = await supabase.from("profiles").upsert(updates);

			if (error) {
				throw error;
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	// Function to format the birthday as DD/MM/YYYY
	const handleBirthdayChange = (text: string) => {
		// Remove any non-numeric characters
		let formattedText = text.replace(/[^\d]/g, "");

		// Automatically add slashes after day and month
		if (formattedText.length > 2) {
			formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
		}
		if (formattedText.length > 5) {
			formattedText = `${formattedText.slice(0, 5)}/${formattedText.slice(5)}`;
		}

		setBirthday(formattedText);
	};

	return (
		<ScrollView>
			<Card containerStyle={styles.cardContainer}>
				<View style={styles.avatarContainer}>
					<Avatar
						size={100} // Smaller size
						url={avatarUrl}
						onUpload={(url: string) => {
							setAvatarUrl(url);
							updateProfile({
								first_name: firstName,
								last_name: lastName,
								birthday,
								gender,
								phone_number: phoneNumber,
								avatar_url: url,
							});
						}}
					/>
				</View>

				{/* Profile Inputs */}
				<View style={styles.verticallySpaced}>
					<Input label="Email" value={session?.user?.email} disabled />
				</View>
				<View style={styles.verticallySpaced}>
					<Input
						label="First Name"
						value={firstName || ""}
						onChangeText={(text) => setFirstName(text)}
					/>
				</View>
				<View style={styles.verticallySpaced}>
					<Input
						label="Last Name"
						value={lastName || ""}
						onChangeText={(text) => setLastName(text)}
					/>
				</View>
				<View style={styles.verticallySpaced}>
					<Input
						label="Birthday (DD/MM/YYYY)"
						value={birthday}
						onChangeText={handleBirthdayChange}
						keyboardType="numeric" // Ensures only numbers can be entered
						maxLength={10} // Limit to 10 characters (DD/MM/YYYY)
						placeholder="DD/MM/YYYY"
					/>
				</View>
				<View style={styles.verticallySpaced}>
					<Input
						label="Phone Number"
						value={phoneNumber || ""}
						onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ""))} // Restrict non-numeric input
						keyboardType="numeric" // Ensures only numeric input
						maxLength={15} // Limit phone number length
					/>
				</View>
				<View style={styles.verticallySpaced}>
					<Picker
						selectedValue={gender}
						onValueChange={(value: string) => {
							setGender(value);
							if (value !== "other") {
								setOtherGender(""); // Reset 'Other' input when a different option is selected
							}
						}}
					>
						<Picker.Item label="Gender Options" value="default" />
						<Picker.Item label="Male" value="male" />
						<Picker.Item label="Female" value="female" />
						<Picker.Item label="Other (Specify)" value="other" />
					</Picker>
				</View>

				{/* Conditionally render the input field for "Other" gender */}
				{gender === "other" && (
					<View style={styles.verticallySpaced}>
						<Input
							label="Specify Gender"
							value={otherGender}
							onChangeText={setOtherGender}
							placeholder="Enter your gender"
						/>
					</View>
				)}

				{/* Action Buttons */}
				<View style={styles.verticallySpaced}>
					<Button
						title={loading ? "Loading ..." : "Update"}
						onPress={() =>
							updateProfile({
								first_name: firstName,
								last_name: lastName,
								birthday: birthday,
								gender: gender,
								phone_number: phoneNumber,
								avatar_url: avatarUrl,
								custom_gender: gender === "other" ? otherGender : undefined,
							})
						}
						disabled={loading}
					/>
				</View>

				<View style={styles.verticallySpaced}>
					<Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
				</View>
			</Card>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	avatarContainer: {
		alignItems: "center", // Center the avatar
		marginBottom: 20,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: "stretch",
	},
	mt20: {
		marginTop: 20,
	},
	cardContainer: {
		margin: 0,
		padding: 6,
		paddingTop: 20,
		paddingBottom: 20,
		overflow: "hidden", // Ensures content respects rounded corners
	},
});
