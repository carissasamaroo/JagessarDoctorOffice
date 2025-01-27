import { Typography, Grid, TextField, Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { login, personByID } from "../../constants";
import { DataFromLogin } from "../../interfaces";
import logo from "../../assets/KlinicalLogo.png";

function Login(props: { sendDataToApp: (arg0: DataFromLogin) => void }) {
	const [username, setUsername] = useState("admin"); //TODO: remove when done testing
	const [password, setPassword] = useState("admin"); //TODO: remove when done testing

	const [error, setError] = useState("");
	const [dataFromLogin, setDataFromLogin] = useState<DataFromLogin>();

	useEffect(() => {
		if (dataFromLogin == undefined) return;
		props.sendDataToApp(dataFromLogin);
	}, [dataFromLogin]);

	//TODO: remove when done testing
	useEffect(() => {
		onAuthenticate();
	}, []);

	function handleUsernameOnChange(e: ChangeEvent<HTMLTextAreaElement>) {
		setUsername(e.target.value);
		setError("");
	}

	function handlePasswordOnChange(e: ChangeEvent<HTMLTextAreaElement>) {
		setPassword(e.target.value);
		setError("");
	}

	function onAuthenticate() {
		if (username == "" && password == "") {
			setError("Username and Password are required!");
			return;
		}
		if (username == "") {
			setError("Username is required!");
			return;
		}
		if (password == "") {
			setError("Password is required!");
			return;
		}
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username: username, pw: password }),
		};
		fetch(login, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setError(data.error);
				if (data.error == "") {
					const requestOptions = {
						method: "GET",
						headers: { "Content-Type": "application/json", Authorization: "Bearer " + data.accessToken },
					};
					fetch(personByID + data.userAccess.personID, requestOptions)
						.then((response) => response.json())
						.then((data2) => {
							setDataFromLogin({ token: data.accessToken, userAccess: data.userAccess, person: data2 });
						});
				} else {
					return;
				}
			});
	}

	return (
		<>
			<Grid container spacing={2}>
				<Grid item md={12} style={{ textAlign: "center" }}>
					<img src={logo} style={{ maxHeight: "20rem", maxWidth: "20rem" }} />
				</Grid>
				<Grid item md={12}>
					<TextField
						required
						label="Username"
						defaultValue=""
						style={{ width: "20rem" }}
						onChange={handleUsernameOnChange}
					/>
				</Grid>
				<Grid item md={12}>
					<TextField
						required
						label="Password"
						defaultValue=""
						type="password"
						style={{ width: "20rem" }}
						onChange={handlePasswordOnChange}
					/>
				</Grid>
				<Grid item md={12} style={{ textAlign: "center" }}>
					<Button
						variant="contained"
						style={{ backgroundColor: "#151269" }}
						size="large"
						onClick={onAuthenticate}
					>
						Login
					</Button>
				</Grid>
				<Grid item md={12} style={{ textAlign: "center" }}>
					<Typography variant="subtitle1" color="error">
						{error}
					</Typography>
				</Grid>
			</Grid>
		</>
	);
}

export default Login;
