import { Box, Typography, Grid, TextField, InputAdornment, Button, Card } from "@mui/material";
import { useState } from "react";
import { DataFromLogin } from "../../interfaces";
import InputMask from "react-input-mask";

function MyProfile(props: { dataFromLogin: DataFromLogin }) {
	interface EditableInfo {
		street1: string;
		street2?: string;
		city: string;
		country: string;
		email: string;
		contactNumber1?: string;
		contactNumber2?: string;
		contactNumber3?: string;
		additionalDetails?: string;
	}
	const [info, setInfo] = useState<EditableInfo>({
		street1: "",
		street2: "",
		city: "",
		country: "Trinidad and Tobago",
		email: "",
		contactNumber1: "",
		contactNumber2: "",
		contactNumber3: "",
		additionalDetails: "",
	});

	const [emailError, setEmailError] = useState(false);

	const handleInputChange = (field: keyof EditableInfo, value: string) => {
		setInfo({ ...info, [field]: value });
	};

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setEmailError(!emailRegex.test(email));
	};

	const handleSave = () => {
		if (emailError) {
			alert("Please correct the errors before saving.");
			return;
		}
		console.log("Saved Info:", info);
		alert("Information saved successfully!");
	};

	return (
		<>
			<Typography variant="h4" gutterBottom>
				My Office
			</Typography>
			<Card variant="outlined">
				<Box sx={{ padding: 4 }}>
					<Grid container spacing={3}>
						{/* Street 1 */}
						<Grid item xs={12} md={4}>
							<TextField
								label="Street 1"
								fullWidth
								value={info.street1}
								onChange={(e) => handleInputChange("street1", e.target.value)}
							/>
						</Grid>

						{/* Street 2 */}
						<Grid item xs={12} md={4}>
							<TextField
								label="Street 2"
								fullWidth
								value={info.street2}
								onChange={(e) => handleInputChange("street2", e.target.value)}
							/>
						</Grid>

						{/* City */}
						<Grid item xs={12} md={4}>
							<TextField
								label="City"
								fullWidth
								value={info.city}
								onChange={(e) => handleInputChange("city", e.target.value)}
							/>
						</Grid>

						{/* Country */}
						<Grid item xs={12} md={4}>
							<TextField
								label="Country"
								fullWidth
								value={info.country}
								onChange={(e) => handleInputChange("country", e.target.value)}
							/>
						</Grid>

						{/* Email */}
						<Grid item xs={12} md={4}>
							<TextField
								label="Email"
								fullWidth
								value={info.email}
								required
								onChange={(e) => {
									handleInputChange("email", e.target.value);
									validateEmail(e.target.value);
								}}
								error={emailError}
								helperText={emailError ? "Please enter a valid email address." : ""}
							/>
						</Grid>

						{/* Contact Number 1 */}
						<Grid item xs={12} md={4}>
							<InputMask
								mask="(999) 999-9999"
								value={info.contactNumber1 || ""}
								onChange={(e) => handleInputChange("contactNumber1", e.target.value)}
							>
								{() => <TextField label="Contact Number 1" fullWidth required />}
							</InputMask>
						</Grid>

						{/* Contact Number 2 */}
						<Grid item xs={12} md={4}>
							<InputMask
								mask="(999) 999-9999"
								value={info.contactNumber2 || ""}
								onChange={(e) => handleInputChange("contactNumber2", e.target.value)}
							>
								{() => <TextField label="Contact Number 2" fullWidth />}
							</InputMask>
						</Grid>

						{/* Contact Number 3 */}
						<Grid item xs={12} md={4}>
							<InputMask
								mask="(999) 999-9999"
								value={info.contactNumber3 || ""}
								onChange={(e) => handleInputChange("contactNumber3", e.target.value)}
							>
								{() => <TextField label="Contact Number 3" fullWidth />}
							</InputMask>
						</Grid>

						{/* Additional Details */}
						<Grid item xs={12}>
							<TextField
								label="Additional Details"
								fullWidth
								multiline
								rows={3}
								value={info.additionalDetails}
								onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
							/>
						</Grid>
					</Grid>

					{/* Save Button */}
					<Button variant="contained" color="primary" sx={{ marginTop: 3 }} onClick={handleSave}>
						Save
					</Button>
				</Box>
			</Card>
		</>
	);
}

export default MyProfile;
