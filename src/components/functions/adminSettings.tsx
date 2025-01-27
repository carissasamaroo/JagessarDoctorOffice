import { SetStateAction, useState } from "react";
import {
	Tabs,
	Tab,
	Box,
	Typography,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	IconButton,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Card,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { DataFromLogin } from "../../interfaces";

const AdminSettings = (props: { dataFromLogin: DataFromLogin }) => {
	const [tabIndex, setTabIndex] = useState(0);

	const handleTabChange = (event: any, newValue: SetStateAction<number>) => {
		setTabIndex(newValue);
	};

	const renderTabContent = () => {
		switch (tabIndex) {
			case 0:
				return <PersonsTab />;
			case 1:
				return <OfficesTab />;
			case 2:
				return <PersonTypesTab />;
			default:
				return null;
		}
	};

	return (
		<>
			<Typography variant="h4" gutterBottom>
				Admin Settings
			</Typography>
			<Card variant="outlined">
				<Box>
					<Tabs value={tabIndex} onChange={handleTabChange} aria-label="Admin Settings Tabs">
						<Tab label="Persons" />
						<Tab label="Offices" />
						<Tab label="Person Types" />
					</Tabs>
					<Box mt={3}>{renderTabContent()}</Box>
				</Box>
			</Card>
		</>
	);
};

const PersonsTab = () => {
	const [editData, setEditData] = useState<{
		id: number;
		firstName: string;
		lastName: string;
		email: string;
		username: string;
	} | null>(null);

	const [data, setData] = useState<
		{
			id: number;
			firstName: string;
			lastName: string;
			email: string;
			username: string;
		}[]
	>([
		{
			id: 1,
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			username: "johndoe",
		},
	]);

	const handleAdd = () => {
		const newRecord = { id: Date.now(), firstName: "", lastName: "", email: "", username: "" };
		setData([...data, newRecord]);
		setEditData(newRecord);
	};

	const handleEdit = (record: any) => {
		setEditData(record);
	};

	const handleDelete = (id: number) => {
		setData(data.filter((item) => item.id !== id));
	};

	const handleSave = () => {
		if (editData) {
			setData(data.map((item) => (item.id === editData.id ? editData : item)));
			setEditData(null);
		}
	};

	return (
		<Box>
			<Typography variant="h6">Persons</Typography>
			<Button variant="contained" startIcon={<Add />} onClick={handleAdd} sx={{ my: 2 }}>
				Add New Person
			</Button>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>First Name</TableCell>
						<TableCell>Last Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((item) => (
						<TableRow key={item.id}>
							<TableCell>{item.firstName}</TableCell>
							<TableCell>{item.lastName}</TableCell>
							<TableCell>{item.email}</TableCell>
							<TableCell>
								<IconButton onClick={() => handleEdit(item)}>
									<Edit />
								</IconButton>
								<IconButton onClick={() => handleDelete(item.id)}>
									<Delete />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{editData && (
				<Dialog open onClose={() => setEditData(null)}>
					<DialogTitle>{editData.id ? "Edit Person" : "Add Person"}</DialogTitle>
					<DialogContent>
						<TextField
							label="First Name"
							value={editData.firstName}
							onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Last Name"
							value={editData.lastName}
							onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Email"
							value={editData.email}
							onChange={(e) => setEditData({ ...editData, email: e.target.value })}
							fullWidth
							margin="normal"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setEditData(null)}>Cancel</Button>
						<Button onClick={handleSave} variant="contained">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Box>
	);
};

const OfficesTab = () => {
	const [data, setData] = useState([
		{
			id: 1,
			street1: "123 Main St",
			city: "Springfield",
			country: "USA",
			email: "office@example.com",
		},
	]);
	const [editData, setEditData] = useState<{
		id: number;
		street1: string;
		city: string;
		country: string;
		email: string;
	} | null>(null);

	const handleAdd = () => {
		const newRecord = { id: Date.now(), street1: "", city: "", country: "", email: "" };
		setData([...data, newRecord]);
		setEditData(newRecord);
	};

	const handleEdit = (record: { id: number; street1: string; city: string; country: string; email: string }) => {
		setEditData(record);
	};

	const handleDelete = (id: number) => {
		setData(data.filter((item) => item.id !== id));
	};

	const handleSave = () => {
		if (editData) {
			setData(data.map((item) => (item.id === editData.id ? editData : item)));
			setEditData(null);
		}
	};

	return (
		<Box>
			<Typography variant="h6">Offices</Typography>
			<Button variant="contained" startIcon={<Add />} onClick={handleAdd} sx={{ my: 2 }}>
				Add New Office
			</Button>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Street</TableCell>
						<TableCell>City</TableCell>
						<TableCell>Country</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((item) => (
						<TableRow key={item.id}>
							<TableCell>{item.street1}</TableCell>
							<TableCell>{item.city}</TableCell>
							<TableCell>{item.country}</TableCell>
							<TableCell>{item.email}</TableCell>
							<TableCell>
								<IconButton onClick={() => handleEdit(item)}>
									<Edit />
								</IconButton>
								<IconButton onClick={() => handleDelete(item.id)}>
									<Delete />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{editData && (
				<Dialog open onClose={() => setEditData(null)}>
					<DialogTitle>{editData.id ? "Edit Office" : "Add Office"}</DialogTitle>
					<DialogContent>
						<TextField
							label="Street"
							value={editData.street1}
							onChange={(e) => setEditData({ ...editData, street1: e.target.value })}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="City"
							value={editData.city}
							onChange={(e) => setEditData({ ...editData, city: e.target.value })}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Country"
							value={editData.country}
							onChange={(e) => setEditData({ ...editData, country: e.target.value })}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Email"
							value={editData.email}
							onChange={(e) => setEditData({ ...editData, email: e.target.value })}
							fullWidth
							margin="normal"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setEditData(null)}>Cancel</Button>
						<Button onClick={handleSave} variant="contained">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Box>
	);
};

const PersonTypesTab = () => {
	const [data, setData] = useState([{ id: 1, typeOfPerson: "Manager" }]);
	const [editData, setEditData] = useState<{
		id: number;
		typeOfPerson: string;
	} | null>(null);

	const handleAdd = () => {
		const newRecord = { id: Date.now(), typeOfPerson: "" };
		setData([...data, newRecord]);
		setEditData(newRecord);
	};

	const handleEdit = (record: { id: number; typeOfPerson: string }) => {
		setEditData(record);
	};

	const handleDelete = (id: number) => {
		setData(data.filter((item) => item.id !== id));
	};

	const handleSave = () => {
		if (editData) {
			setData(data.map((item) => (item.id === editData.id ? editData : item)));
			setEditData(null);
		}
	};

	return (
		<Box>
			<Typography variant="h6">Person Types</Typography>
			<Button variant="contained" startIcon={<Add />} onClick={handleAdd} sx={{ my: 2 }}>
				Add New Person Type
			</Button>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Type of Person</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((item) => (
						<TableRow key={item.id}>
							<TableCell>{item.typeOfPerson}</TableCell>
							<TableCell>
								<IconButton onClick={() => handleEdit(item)}>
									<Edit />
								</IconButton>
								<IconButton onClick={() => handleDelete(item.id)}>
									<Delete />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{editData && (
				<Dialog open onClose={() => setEditData(null)}>
					<DialogTitle>{editData.id ? "Edit Person Type" : "Add Person Type"}</DialogTitle>
					<DialogContent>
						<TextField
							label="Type of Person"
							value={editData.typeOfPerson}
							onChange={(e) => setEditData({ ...editData, typeOfPerson: e.target.value })}
							fullWidth
							margin="normal"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setEditData(null)}>Cancel</Button>
						<Button onClick={handleSave} variant="contained">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Box>
	);
};

export default AdminSettings;
