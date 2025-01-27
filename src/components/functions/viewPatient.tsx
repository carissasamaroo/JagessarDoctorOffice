import { Button, Card, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { DataFromLogin } from "../../interfaces";
import { SetStateAction, useState } from "react";
import InputMask from "react-input-mask";
import { Box, Tabs, Tab } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

interface EmergencyContact {
	firstName: string;
	middleName?: string;
	lastName: string;
	street1: string;
	street2?: string;
	city: string;
	country: string;
	email: string;
	contactNumber1?: string;
	contactNumber2?: string;
	contactNumber3?: string;
	additionalDetails?: string;
	emailError: boolean;
}

interface PatientAttachment {
	title: string;
	attachment: Uint8Array | null; // Null for initial state
	fileName?: string | null; // File name for display
}

interface Appointment {
	appointmentDate?: Date | null; // ISO 8601 string
	appointmentTime?: Date | null; // ISO 8601 time string
	notes?: string | null;
}

interface PatientVisit {
	visitDate?: Date | null; // Optional date property
	notes?: string; // Optional notes
	billing?: number | ""; // Optional billing formatted as currency
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 4 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function ViewPatient(props: { dataFromLogin: DataFromLogin }) {
	const [view, setView] = useState(0);

	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(false);
	const handleEmailChange = (event: { target: { value: any } }) => {
		const value = event.target.value;
		setEmail(value);

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setEmailError(!emailRegex.test(value));
	};

	const [contactNumber1, setcontactNumber1] = useState("");
	const handleContactNumber1Change = (event: { target: { value: SetStateAction<string> } }) => {
		setcontactNumber1(event.target.value);
	};

	const [contactNumber2, setcontactNumber2] = useState("");
	const handleContactNumber2Change = (event: { target: { value: SetStateAction<string> } }) => {
		setcontactNumber2(event.target.value);
	};

	const [contactNumber3, setcontactNumber3] = useState("");
	const handleContactNumber3Change = (event: { target: { value: SetStateAction<string> } }) => {
		setcontactNumber3(event.target.value);
	};

	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const [contacts, setContacts] = useState<EmergencyContact[]>([
		{
			firstName: "",
			middleName: "",
			lastName: "",
			street1: "",
			street2: "",
			city: "",
			country: "Trinidad and Tobago",
			email: "",
			contactNumber1: "",
			contactNumber2: "",
			contactNumber3: "",
			additionalDetails: "",
			emailError: false,
		},
	]);

	const handleAddContact = () => {
		setContacts([
			...contacts,
			{
				firstName: "",
				middleName: "",
				lastName: "",
				street1: "",
				street2: "",
				city: "",
				country: "",
				email: "",
				contactNumber1: "",
				contactNumber2: "",
				contactNumber3: "",
				additionalDetails: "",
				emailError: false,
			},
		]);
	};

	// Email Validation Function
	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleRemoveContact = (index: number) => {
		const updatedContacts = contacts.filter((_, i) => i !== index);
		setContacts(updatedContacts);
	};

	const handleInputChange = (index: number, field: keyof EmergencyContact, value: string) => {
		const updatedContacts = [...contacts];

		if (field === "email") {
			updatedContacts[index].emailError = !validateEmail(value); // Validate email
		}

		// Explicitly cast field to enforce correct assignment
		(updatedContacts[index] as any)[field] = value;
		setContacts(updatedContacts);
	};

	const [attachments, setAttachments] = useState<PatientAttachment[]>([
		{ title: "", attachment: null, fileName: "" },
	]);

	// Add a new patient attachment
	const addPatientAttachment = () => {
		setAttachments([...attachments, { title: "", attachment: null, fileName: "" }]);
	};

	// Remove a patient attachment
	const removePatientAttachment = (index: number) => {
		const updatedAttachments = attachments.filter((_, i) => i !== index);
		setAttachments(updatedAttachments);
	};

	// Handle changes in title or attachment
	const handlePatientAttachmentChange = (index: number, field: keyof PatientAttachment, value: string | File) => {
		const updatedAttachments = [...attachments];
		if (field === "attachment" && value instanceof File) {
			updatedAttachments[index].fileName = value.name; // Store file name
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					updatedAttachments[index].attachment = new Uint8Array(e.target.result as ArrayBuffer);
					setAttachments(updatedAttachments);
				}
			};
			reader.readAsArrayBuffer(value); // Read the file as binary data
		} else {
			(updatedAttachments[index] as any)[field] = value as string;
			setAttachments(updatedAttachments);
		}
	};

	const [appointments, setAppointments] = useState<Appointment[]>([
		{ appointmentDate: null, appointmentTime: null, notes: "" },
	]);

	const addAppointment = () => {
		setAppointments([...appointments, { appointmentDate: null, appointmentTime: null, notes: "" }]);
	};

	const removeAppointment = (index: number) => {
		const updatedAppointments = appointments.filter((_, i) => i !== index);
		setAppointments(updatedAppointments);
	};

	const handleAppointmentChange = (index: number, field: keyof Appointment, value: Date | string | null) => {
		const updatedAppointments = [...appointments];
		(updatedAppointments[index] as any)[field] = value;
		setAppointments(updatedAppointments);
	};

	const [patientVisits, setPatientVisits] = useState<PatientVisit[]>([{ visitDate: null, notes: "", billing: "" }]);

	// Add a new patient visit
	const addPatientVisit = () => {
		setPatientVisits([...patientVisits, { visitDate: null, notes: "", billing: "" }]);
	};

	// Remove a patient visit
	const removePatientVisit = (index: number) => {
		const updatedVisits = patientVisits.filter((_, i) => i !== index);
		setPatientVisits(updatedVisits);
	};

	// Handle input changes
	const handleVisitChange = (index: number, field: keyof PatientVisit, value: any) => {
		const updatedVisits = [...patientVisits];
		updatedVisits[index][field] = value;
		setPatientVisits(updatedVisits);
	};

	return (
		<>
			<Grid container spacing={2}>
				{/* Row 1 */}
				<Grid item md={4}>
					<TextField label="First Name" name="firstName" fullWidth required variant="outlined" />
				</Grid>
				<Grid item md={4}>
					<TextField label="Middle Name" name="middleName" fullWidth variant="outlined" />
				</Grid>
				<Grid item md={4}>
					<TextField label="Last Name" name="lastName" fullWidth required variant="outlined" />
				</Grid>

				{/* Row 2 */}
				<Grid item md={6}>
					<TextField label="Street 1" name="street1" fullWidth variant="outlined" />
				</Grid>
				<Grid item md={6}>
					<TextField label="Street 2" name="street2" fullWidth variant="outlined" />
				</Grid>

				{/* Row 3 */}
				<Grid item md={4}>
					<TextField label="City" name="city" fullWidth required variant="outlined" />
				</Grid>
				<Grid item md={4}>
					<TextField
						label="Country"
						name="country"
						fullWidth
						required
						variant="outlined"
						defaultValue={"Trinidad and Tobago"}
					/>
				</Grid>
				<Grid item md={4}>
					<TextField
						label="Email"
						name="email"
						fullWidth
						variant="outlined"
						value={email}
						onChange={handleEmailChange}
						error={emailError}
						helperText={emailError ? "Please enter a valid email address." : ""}
					/>
				</Grid>

				{/* Row 4 */}
				<Grid item md={4}>
					<InputMask
						mask="(999) 999-9999"
						value={contactNumber1 || ""}
						onChange={handleContactNumber1Change}
						disabled={false}
						maskChar=""
					>
						{() => (
							<TextField
								label="Contact Number 1"
								name="contactNumber1"
								fullWidth
								variant="outlined"
								required
							/>
						)}
					</InputMask>
				</Grid>
				<Grid item md={4}>
					<InputMask
						mask="(999) 999-9999"
						value={contactNumber2 || ""}
						onChange={handleContactNumber2Change}
						disabled={false}
						maskChar=""
					>
						{() => (
							<TextField label="Contact Number 2" name="contactNumber2" fullWidth variant="outlined" />
						)}
					</InputMask>
				</Grid>
				<Grid item md={4}>
					<InputMask
						mask="(999) 999-9999"
						value={contactNumber3 || ""}
						onChange={handleContactNumber3Change}
						disabled={false}
						maskChar=""
					>
						{() => (
							<TextField label="Contact Number 3" name="contactNumber3" fullWidth variant="outlined" />
						)}
					</InputMask>
				</Grid>

				{/* Row 5 */}
				<Grid item md={12}>
					<TextField
						label="Additional Details"
						name="additionalDetails"
						fullWidth
						multiline
						rows={4}
						variant="outlined"
					/>
				</Grid>

				<Grid item md={12}>
					<Card variant="outlined">
						<Box sx={{ width: "100%" }}>
							<Box sx={{ borderBottom: 1, borderColor: "divider", alignItem: "center" }}>
								<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
									<Tab label="Emergency Contacts" {...a11yProps(0)} />
									<Tab label="Attachments" {...a11yProps(1)} />
									<Tab label="Appointments" {...a11yProps(2)} />
									<Tab label="Visits" {...a11yProps(3)} />
								</Tabs>
							</Box>

							<CustomTabPanel value={value} index={0}>
								<Box sx={{ padding: 4 }}>
									<Typography variant="h4" gutterBottom>
										Emergency Contacts
									</Typography>
									{contacts.map((contact, index) => (
										<Box
											key={index}
											sx={{
												border: "1px solid #ccc",
												padding: 2,
												marginBottom: 3,
												borderRadius: 2,
											}}
										>
											<Typography variant="h6" gutterBottom>
												Emergency Contact {index + 1}
												<IconButton
													aria-label="delete contact"
													color="error"
													onClick={() => handleRemoveContact(index)}
													sx={{ float: "right" }}
												>
													<Delete />
												</IconButton>
											</Typography>
											<Grid container spacing={3}>
												<Grid item md={4}>
													<TextField
														label="First Name"
														fullWidth
														value={contact.firstName}
														onChange={(e) =>
															handleInputChange(index, "firstName", e.target.value)
														}
													/>
												</Grid>
												<Grid item md={4}>
													<TextField
														label="Middle Name"
														fullWidth
														value={contact.middleName}
														onChange={(e) =>
															handleInputChange(index, "middleName", e.target.value)
														}
													/>
												</Grid>
												<Grid item md={4}>
													<TextField
														label="Last Name"
														fullWidth
														value={contact.lastName}
														onChange={(e) =>
															handleInputChange(index, "lastName", e.target.value)
														}
													/>
												</Grid>
												<Grid item md={6}>
													<TextField
														label="Street 1"
														fullWidth
														value={contact.street1}
														onChange={(e) =>
															handleInputChange(index, "street1", e.target.value)
														}
													/>
												</Grid>
												<Grid item md={6}>
													<TextField
														label="Street 2"
														fullWidth
														value={contact.street2}
														onChange={(e) =>
															handleInputChange(index, "street2", e.target.value)
														}
													/>
												</Grid>
												<Grid item md={4}>
													<TextField
														label="City"
														fullWidth
														value={contact.city}
														required
														onChange={(e) =>
															handleInputChange(index, "city", e.target.value)
														}
													/>
												</Grid>
												<Grid item md={4}>
													<TextField
														label="Country"
														required
														fullWidth
														value={contact.country}
														onChange={(e) =>
															handleInputChange(index, "country", e.target.value)
														}
													/>
												</Grid>
												<Grid item md={4}>
													<TextField
														label="Email"
														fullWidth
														value={contact.email}
														onChange={(e) =>
															handleInputChange(index, "email", e.target.value)
														}
														error={contact.emailError} // Highlight field if email is invalid
														helperText={
															contact.emailError
																? "Please enter a valid email address."
																: ""
														}
													/>
												</Grid>
												{/* Contact Numbers with Masking */}
												<Grid item md={4}>
													<InputMask
														mask="(999) 999-9999"
														value={contact.contactNumber1 || ""}
														onChange={(e) =>
															handleInputChange(index, "contactNumber1", e.target.value)
														}
													>
														{() => (
															<TextField label="Contact Number 1" fullWidth required />
														)}
													</InputMask>
												</Grid>
												<Grid item md={4}>
													<InputMask
														mask="(999) 999-9999"
														value={contact.contactNumber2 || ""}
														onChange={(e) =>
															handleInputChange(index, "contactNumber2", e.target.value)
														}
													>
														{() => <TextField label="Contact Number 2" fullWidth />}
													</InputMask>
												</Grid>
												<Grid item md={4}>
													<InputMask
														mask="(999) 999-9999"
														value={contact.contactNumber3 || ""}
														onChange={(e) =>
															handleInputChange(index, "contactNumber3", e.target.value)
														}
													>
														{() => <TextField label="Contact Number 3" fullWidth />}
													</InputMask>
												</Grid>
												<Grid item md={12}>
													<TextField
														label="Additional Details"
														fullWidth
														multiline
														rows={2}
														value={contact.additionalDetails}
														onChange={(e) =>
															handleInputChange(
																index,
																"additionalDetails",
																e.target.value
															)
														}
													/>
												</Grid>
											</Grid>
										</Box>
									))}
									<Button variant="contained" color="primary" onClick={handleAddContact}>
										Add Emergency Contact
									</Button>
								</Box>
							</CustomTabPanel>
							<CustomTabPanel value={value} index={1}>
								<Box sx={{ padding: 4 }}>
									<Typography variant="h4" gutterBottom>
										Attachments
									</Typography>
									{attachments.map((attachment, index) => (
										<Box
											key={index}
											sx={{
												border: "1px solid #ccc",
												padding: 2,
												marginBottom: 3,
												borderRadius: 2,
											}}
										>
											<Typography variant="h6" gutterBottom>
												Attachment {index + 1}
												<IconButton
													aria-label="delete attachment"
													color="error"
													onClick={() => removePatientAttachment(index)}
													sx={{ float: "right" }}
												>
													<Delete />
												</IconButton>
											</Typography>
											<Grid container spacing={3}>
												{/* Title Field */}
												<Grid item md={6}>
													<TextField
														label="Title"
														fullWidth
														value={attachment.title}
														required
														onChange={(e) =>
															handlePatientAttachmentChange(
																index,
																"title",
																e.target.value
															)
														}
													/>
												</Grid>
												{/* File Upload Field */}
												<Grid item md={6}>
													<Button
														variant="contained"
														component="label"
														fullWidth
														sx={{ height: "56px" }}
													>
														Upload Attachment
														<input
															type="file"
															hidden
															accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
															onChange={(e) => {
																const file = e.target.files?.[0];
																handlePatientAttachmentChange(
																	index,
																	"attachment",
																	file || ""
																);
															}}
														/>
													</Button>
													{/* Show Selected File Name */}
													{attachment.fileName && (
														<Typography
															variant="body2"
															sx={{ marginTop: 1, color: "text.secondary" }}
														>
															Selected File: {attachment.fileName}
														</Typography>
													)}
												</Grid>
											</Grid>
										</Box>
									))}
									<Button
										variant="contained"
										color="primary"
										onClick={addPatientAttachment}
										sx={{ marginTop: 2 }}
									>
										Add Attachment
									</Button>
								</Box>
							</CustomTabPanel>
							<CustomTabPanel value={value} index={2}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<Box sx={{ padding: 4 }}>
										<Typography variant="h4" gutterBottom>
											Appointment Scheduler
										</Typography>
										{appointments.map((appointment, index) => (
											<Box
												key={index}
												sx={{
													border: "1px solid #ccc",
													padding: 2,
													marginBottom: 3,
													borderRadius: 2,
												}}
											>
												<Typography variant="h6" gutterBottom>
													Appointment {index + 1}
													<IconButton
														aria-label="delete appointment"
														color="error"
														onClick={() => removeAppointment(index)}
														sx={{ float: "right" }}
													>
														<Delete />
													</IconButton>
												</Typography>
												<Grid container spacing={3}>
													{/* Date Selector */}
													<Grid item md={6}>
														<DatePicker
															label="Appointment Date"
															value={appointment.appointmentDate}
															onChange={(newValue) =>
																handleAppointmentChange(
																	index,
																	"appointmentDate",
																	newValue
																)
															}
															slots={{ textField: TextField }} // Use `slots` to customize the text field
															slotProps={{ textField: { fullWidth: true } }} // Additional props for the text field
														/>
													</Grid>

													{/* Time Selector */}
													<Grid item md={6}>
														<TimePicker
															label="Appointment Time"
															value={appointment.appointmentTime}
															onChange={(newValue) =>
																handleAppointmentChange(
																	index,
																	"appointmentTime",
																	newValue
																)
															}
															slots={{ textField: TextField }} // Use `slots` to specify the input field
															slotProps={{ textField: { fullWidth: true } }} // Pass additional props to the input field
														/>
													</Grid>

													{/* Notes Field */}
													<Grid item md={12}>
														<TextField
															label="Notes"
															fullWidth
															multiline
															rows={3}
															value={appointment.notes}
															onChange={(e) =>
																handleAppointmentChange(index, "notes", e.target.value)
															}
														/>
													</Grid>
												</Grid>
											</Box>
										))}
										<Button
											variant="contained"
											color="primary"
											onClick={addAppointment}
											sx={{ marginTop: 2 }}
										>
											Add Appointment
										</Button>
									</Box>
								</LocalizationProvider>
							</CustomTabPanel>
							<CustomTabPanel value={value} index={3}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<Box sx={{ padding: 4 }}>
										<Typography variant="h4" gutterBottom>
											Visits
										</Typography>
										{patientVisits.map((visit, index) => (
											<Box
												key={index}
												sx={{
													border: "1px solid #ccc",
													padding: 2,
													marginBottom: 3,
													borderRadius: 2,
												}}
											>
												<Typography variant="h6" gutterBottom>
													Visit {index + 1}
													<IconButton
														aria-label="delete visit"
														color="error"
														onClick={() => removePatientVisit(index)}
														sx={{ float: "right" }}
													>
														<Delete />
													</IconButton>
												</Typography>
												<Grid container spacing={3}>
													{/* Visit Date */}
													<Grid item xs={12} md={6}>
														<DatePicker
															label="Visit Date"
															value={visit.visitDate}
															onChange={(newValue) =>
																handleVisitChange(index, "visitDate", newValue)
															}
															slots={{ textField: TextField }}
															slotProps={{ textField: { fullWidth: true } }}
														/>
													</Grid>

													{/* Billing */}
													<Grid item xs={12} md={6}>
														<TextField
															label="Billing"
															fullWidth
															type="number"
															value={visit.billing}
															onChange={(e) =>
																handleVisitChange(
																	index,
																	"billing",
																	parseFloat(e.target.value) || ""
																)
															}
															InputProps={{
																startAdornment: (
																	<InputAdornment position="start">$</InputAdornment>
																),
															}}
														/>
													</Grid>                                                    

													{/* Notes */}
													<Grid item xs={12} md={12}>
														<TextField
															label="Notes"
															multiline
															rows={3}
															fullWidth
															value={visit.notes}
															onChange={(e) =>
																handleVisitChange(index, "notes", e.target.value)
															}
														/>
													</Grid>
												</Grid>
											</Box>
										))}
										<Button
											variant="contained"
											color="primary"
											onClick={addPatientVisit}
											sx={{ marginTop: 2 }}
										>
											Add Visit
										</Button>
									</Box>
								</LocalizationProvider>
							</CustomTabPanel>
						</Box>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

export default ViewPatient;
