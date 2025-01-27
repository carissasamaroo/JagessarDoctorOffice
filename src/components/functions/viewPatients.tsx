import {
	Box,
	Button,
	Card,
	Grid,
	Link,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { DataFromLogin } from "../../interfaces";
import { useState } from "react";
import AddPatient from "./addPatient";

function ViewPatients(props: { dataFromLogin: DataFromLogin }) {
	const [view, setView] = useState(0);

	interface Record {
		firstName: string;
		middleName?: string;
		lastName: string;
	}

	const dummyData: Record[] = [
		{ firstName: "John", middleName: "A.", lastName: "Doe" },
		{ firstName: "Jane", middleName: undefined, lastName: "Smith" },
		{ firstName: "Emily", middleName: "B.", lastName: "Johnson" },
	];

	const [filter, setFilter] = useState("");
	const [filteredData, setFilteredData] = useState<Record[]>(dummyData);

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.toLowerCase();
		setFilter(value);

		const filtered = dummyData.filter((record) =>
			`${record.firstName} ${record.middleName || ""} ${record.lastName}`.toLowerCase().includes(value)
		);

		setFilteredData(filtered);
	};

	return (
		<>
			{view !== 11 ? (
				<>
					<Typography variant="h4" gutterBottom>
						View Patients
					</Typography>
					<Card variant="outlined">
						<Grid
							container
							style={{
								paddingTop: "1rem",
								paddingBottom: "1rem",
								paddingLeft: "1rem",
								paddingRight: "1rem",
							}}
						>
							<Grid item md={10}></Grid>
							<Grid item md={2}>
								<Button
									id="basic-button"
									variant="contained"
									color="success"
									onClick={() => setView(11)}
								>
									Add New Patient
								</Button>
							</Grid>

							<Grid item md={12}>
								<Box sx={{ padding: 4 }}>
									<TextField
										label="Filter by Name"
										variant="outlined"
										fullWidth
										value={filter}
										onChange={handleFilterChange}
										sx={{ marginBottom: 2 }}
									/>
									<TableContainer component={Paper}>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>
														<strong>First Name</strong>
													</TableCell>
													<TableCell>
														<strong>Middle Name</strong>
													</TableCell>
													<TableCell>
														<strong>Last Name</strong>
													</TableCell>
													<TableCell>
														<strong>Actions</strong>
													</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{filteredData.length > 0 ? (
													filteredData.map((record, index) => (
														<TableRow key={index}>
															<TableCell>{record.firstName}</TableCell>
															<TableCell>{record.middleName || "N/A"}</TableCell>
															<TableCell>{record.lastName}</TableCell>
															<TableCell>
																<Link
																	href={`/profile/${record.firstName.toLowerCase()}-${record.lastName.toLowerCase()}`}
																	underline="hover"
																	color="primary"
																>
																	View Profile
																</Link>
															</TableCell>
														</TableRow>
													))
												) : (
													<TableRow>
														<TableCell colSpan={4} align="center">
															No records found.
														</TableCell>
													</TableRow>
												)}
											</TableBody>
										</Table>
									</TableContainer>
								</Box>
							</Grid>
						</Grid>
					</Card>
				</>
			) : (
				<></>
			)}

			{/* Add Patient */}
			{view == 11 ? (
				<>
					<Typography variant="h4" gutterBottom>
						Add New Patient
					</Typography>

					<Card variant="outlined">
						<Grid
							item
							md={12}
							style={{
								paddingTop: "1rem",
								paddingBottom: "1rem",
								paddingLeft: "1rem",
								paddingRight: "1rem",
							}}
						>
							<Grid
								item
								md={12}
								style={{
									paddingTop: "1rem",
									paddingBottom: "1rem",
									paddingLeft: "1rem",
									paddingRight: "1rem",
								}}
							></Grid>
							<AddPatient dataFromLogin={props.dataFromLogin} />
						</Grid>
					</Card>
				</>
			) : (
				<></>
			)}
		</>
	);
}

export default ViewPatients;
