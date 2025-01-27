import { useEffect, useState } from "react";
import { DataFromLogin, Office } from "../../interfaces";
import { officeByID } from "../../constants";
import { Button, Card, Grid, Link, CardMedia } from "@mui/material";
import logo from "../../assets/KlinicalLogo.png";
import findPatientImg from "../../assets/Find Patient.png";
import viewPatientsImg from "../../assets/View Patients.png";
import adminImg from "../../assets/Admin.png";
import myProfileImg from "../../assets/My Profile.png";
import ViewPatients from "../functions/viewPatients";
import FindPatient from "../functions/findPatient";
import MyProfile from "../functions/myProfile";
import AdminSettings from "../functions/adminSettings";

//https://dvmhn07.medium.com/passing-data-between-parent-and-child-components-in-react-part-b405116c470e

function Home(props: { dataFromLogin: DataFromLogin }) {
	const [office, setOffice] = useState<Office>();
	//const [dataFromLogin, setDataFromLogin] = useState<DataFromLogin>();
	const [view, setView] = useState(0);

	useEffect(() => {
		if (props.dataFromLogin == undefined) return;
		//setDataFromLogin(props.dataFromLogin);
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
			<Grid container spacing={2}>
				<Grid item md={8} style={{ textAlign: "left", cursor: "pointer" }} onClick={() => setView(0)}>
					<img src={logo} style={{ maxHeight: "5rem", maxWidth: "5rem" }} />
				</Grid>
				<Grid item md={4} style={{ textAlign: "right" }}>
					<Link
						component="button"
						variant="body2"
						onClick={() => {
							console.info("I'm a button.");
						}}
					>
						Log out {props.dataFromLogin !== undefined ? props.dataFromLogin.userAccess?.username : <></>}
					</Link>
				</Grid>
				{/* Home */}
				{view == 0 ? (
					<>
						<Grid item md={6}>
							<Card variant="outlined">
								<Grid item md={12}>
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
								</Grid>
								<Grid item md={12} style={{ textAlign: "center" }}>
									<Button size="large" onClick={() => setView(1)}>
										View Patients
									</Button>
								</Grid>
							</Card>
						</Grid>
						<Grid item md={6}>
							<Card variant="outlined">
								<Grid item md={12}>
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
								</Grid>
								<Grid item md={12} style={{ textAlign: "center" }}>
									<Button size="large" onClick={() => setView(2)}>
										Find Patient
									</Button>
								</Grid>
							</Card>
						</Grid>
						{/* Settings */}
						<Grid item md={6}>
							<Card variant="outlined">
								<Grid item md={12}>
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
								</Grid>
								<Grid item md={12} style={{ textAlign: "center" }}>
									<Button size="large" onClick={() => setView(3)}>
										My Office
									</Button>
								</Grid>
							</Card>
						</Grid>
						<Grid item md={6}>
							<Card variant="outlined">
								<Grid item md={12}>
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
								</Grid>
								<Grid item md={12} style={{ textAlign: "center" }}>
									<Button size="large" onClick={() => setView(4)}>
										Settings
									</Button>
								</Grid>
							</Card>
						</Grid>
					</>
				) : (
					<></>
				)}
				{/* View Patients */}
				{view == 1 ? (
					<>
						<Grid item md={12}>
							<ViewPatients dataFromLogin={props.dataFromLogin} />
						</Grid>
					</>
				) : (
					<></>
				)}

				{/* Find Patient */}
				{view == 2 ? (
					<>
						<Grid item md={12}>
							<FindPatient dataFromLogin={props.dataFromLogin} />
						</Grid>
					</>
				) : (
					<></>
				)}

				{/* My Profile */}
				{view == 3 ? (
					<>
						<Grid item md={12}>
							<MyProfile dataFromLogin={props.dataFromLogin} />
						</Grid>
					</>
				) : (
					<></>
				)}

				{/* Settings */}
				{view == 4 ? (
					<>
						<Grid item md={12}>
							<AdminSettings dataFromLogin={props.dataFromLogin} />
						</Grid>
					</>
				) : (
					<></>
				)}
			</Grid>
		</>
	);
}

export default Home;
