import { useEffect, useState } from "react";
import { DataFromLogin, Office } from "../../interfaces";
import { officeByID } from "../../constants";
import { Button, Card, Grid2, Link, CardMedia } from "@mui/material";
import logo from "../../assets/KlinicalLogo.png";
import findPatientImg from "../../assets/Find Patient.png";
import viewPatientsImg from "../../assets/View Patients.png";
import adminImg from "../../assets/Admin.png";
import myProfileImg from "../../assets/My Profile.png";

//https://dvmhn07.medium.com/passing-data-between-parent-and-child-components-in-react-part-b405116c470e

function Home(props: { dataFromLogin: DataFromLogin }) {
	const [office, setOffice] = useState<Office>();
	const [dataFromLogin, setDataFromLogin] = useState<DataFromLogin>();

	useEffect(() => {
		if (props.dataFromLogin == undefined) return;
		setDataFromLogin(props.dataFromLogin);
		console.log("Data in Home", props.dataFromLogin);

		const requestOptions = {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + props.dataFromLogin.token },
		};

		fetch(officeByID + props.dataFromLogin.person?.office, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log("office", data);
				setOffice(data);
			});
	}, [props.dataFromLogin]);

	return (
		<>
			<Grid2 container spacing={2}>
				<Grid2 size={8} style={{ textAlign: "left" }}>
					<img src={logo} style={{ maxHeight: "5rem", maxWidth: "5rem" }} />
				</Grid2>
				<Grid2 size={4} style={{ textAlign: "right" }}>
					<Link
						component="button"
						variant="body2"
						onClick={() => {
							console.info("I'm a button.");
						}}
					>
						Log out {dataFromLogin !== undefined ? dataFromLogin.userAccess?.username : <></>}
					</Link>
				</Grid2>
				{/* Home */}
					{/* Functions */}
					<Grid2 size={6}>
						<Card variant="outlined">
							<Grid2 size={12}>
								<CardMedia
									component="img"
									image={viewPatientsImg}
									alt="View Patients"
									style={{
										maxHeight: "10rem",
										objectFit: "contain",
										paddingTop: "2rem",
										paddingBottom: "2rem",
									}}
								/>
							</Grid2>
							<Grid2 size={12} style={{ textAlign: "center" }}>
								<Button size="large">View Patients</Button>
							</Grid2>
						</Card>
					</Grid2>
					<Grid2 size={6}>
						<Card variant="outlined">
							<Grid2 size={12}>
								<CardMedia
									component="img"
									image={findPatientImg}
									alt="Find Patient"
									style={{
										maxHeight: "10rem",
										objectFit: "contain",
										paddingTop: "2rem",
										paddingBottom: "2rem",
									}}
								/>
							</Grid2>
							<Grid2 size={12} style={{ textAlign: "center" }}>
								<Button size="large">Find Patient</Button>
							</Grid2>
						</Card>
					</Grid2>
					{/* Settings */}
					<Grid2 size={6}>
						<Card variant="outlined">
							<Grid2 size={12}>
								<CardMedia
									component="img"
									image={myProfileImg}
									alt="Find Patient"
									style={{
										maxHeight: "10rem",
										objectFit: "contain",
										paddingTop: "2rem",
										paddingBottom: "2rem",
									}}
								/>
							</Grid2>
							<Grid2 size={12} style={{ textAlign: "center" }}>
								<Button size="large">My Profile</Button>
							</Grid2>
						</Card>
					</Grid2>
					<Grid2 size={6}>
						<Card variant="outlined">
							<Grid2 size={12}>
								<CardMedia
									component="img"
									image={adminImg}
									alt="Find Patient"
									style={{
										maxHeight: "10rem",
										objectFit: "contain",
										paddingTop: "2rem",
										paddingBottom: "2rem",
									}}
								/>
							</Grid2>
							<Grid2 size={12} style={{ textAlign: "center" }}>
								<Button size="large">Settings</Button>
							</Grid2>
						</Card>
					</Grid2>
			</Grid2>
		</>
	);
}

export default Home;
