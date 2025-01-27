import { useState } from "react";
import { DataFromLogin } from "../../interfaces";
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import React from "react";

function FindPatient(props: { dataFromLogin: DataFromLogin }) {
	interface Record {
		firstName: string;
		middleName?: string;
		lastName: string;
	}

	const dummyData: Record[] = [
		{ firstName: "John", middleName: "A.", lastName: "Doe" },
		{ firstName: "Jane", middleName: undefined, lastName: "Smith" },
		{ firstName: "Emily", middleName: "B.", lastName: "Johnson" },
		{ firstName: "Michael", middleName: "C.", lastName: "Brown" },
	];

	const [search, setSearch] = useState("");
	const [results, setResults] = useState<Record[]>([]);

	const handleSearch = () => {
		const filteredResults = dummyData.filter((record) =>
			`${record.firstName} ${record.middleName || ""} ${record.lastName}`
				.toLowerCase()
				.includes(search.toLowerCase())
		);
		setResults(filteredResults);
	};

	return (
		<>
			<Box sx={{ padding: 4 }}>
				<Typography variant="h4" gutterBottom>
					Find Patient
				</Typography>
				<Paper sx={{ padding: 2, marginBottom: 4 }}>
					<TextField
						label="Search by Name"
						variant="outlined"
						fullWidth
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						sx={{ marginBottom: 2 }}
					/>
					<Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
						Search
					</Button>
				</Paper>
				<Typography variant="h5" gutterBottom>
					Search Results
				</Typography>
				{results.length > 0 ? (
					<List component="nav" aria-label="search results">
						{results.map((record, index) => (
							<React.Fragment key={index}>
								<ListItem>
									<ListItemText
										primary={`${record.firstName} ${record.middleName || ""} ${record.lastName}`}
										secondary={`Profile: /profile/${record.firstName.toLowerCase()}-${record.lastName.toLowerCase()}`}
									/>
								</ListItem>
								{index < results.length - 1 && <Divider />}
							</React.Fragment>
						))}
					</List>
				) : (
					<Typography>No results found.</Typography>
				)}
			</Box>
		</>
	);
}

export default FindPatient;
