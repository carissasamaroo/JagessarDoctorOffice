import { Grid2, TextField } from "@mui/material";
import { DataFromLogin } from "../../interfaces";

function AddPatient(props: { sendDataToApp: (arg0: DataFromLogin) => void }) {


	return (
		<>
        <Grid2 container spacing={2}>
            <Grid2>
            <TextField
						required
						label="Username"
						defaultValue=""
						style={{ width: "20rem" }}
						onChange={handleUsernameOnChange}
					/>
            </Grid2>

        </Grid2>
		</>
	);
}

export default AddPatient;
