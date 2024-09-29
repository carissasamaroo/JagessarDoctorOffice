import { Typography, Grid2, TextField, Button } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { login, personByID } from '../../constants';
import Home from '../home/home';

function Login(props: { sendDataToApp: (arg0: { token: string; personID: string; office: never[]; }) => void; }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [personID, setPersonID] = useState("");
    const [office, setOffice] = useState([]);
    
    useEffect(() => {
        //console.log(token, personID, office);
        props.sendDataToApp ({token: token, personID: personID, office: office})
      }, [token, personID, office]);

    function handleUsernameOnChange(e: ChangeEvent<HTMLTextAreaElement>){ 
        setUsername(e.target.value); 
        setError("");
    };

    function handlePasswordOnChange (e: ChangeEvent<HTMLTextAreaElement>){ 
        setPassword(e.target.value); 
        setError("");
    };

    function onAuthenticate(){
       
        if(username == "" && password == "") {
            setError("Username and Password are required!");
            return;
        };
        if(username == "") {
            setError("Username is required!");
            return;
        };
        if(password == "") {
            setError("Password is required!");
            return;
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, pw: password })
        };
        fetch(login, requestOptions)
        .then(response => response.json())
        .then(data => {
            setError(data.error);
            if(data.error == ""){
                setToken(data.accessToken);
                setPersonID(data.personID);
                getOffice(data.personID, data.accessToken);
            }else{
                return;
            }
        });        
    }

    function getOffice(id: string, accessToken: string) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken }
        };
        fetch(personByID + id, requestOptions)
        .then(response => response.json())
        .then(data => {
            setOffice(data); 
        }); 
    }

  return (
    <>
        {token !== "" ? 
            <Home dataFromLogin={{token: token, personID: personID, office: office}}/> 
            : 
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Typography variant='h3' style={{textAlign: "center", color: "#151269"}}>Klinical</Typography>
                </Grid2>
                <Grid2 size={12}>
                    <TextField required label="Username" defaultValue="" fullWidth onChange={handleUsernameOnChange}/>
                </Grid2>
                <Grid2 size={12}>
                    <TextField required label="Password" defaultValue="" type='password' fullWidth onChange={handlePasswordOnChange} onKeyDown={onAuthenticate}/>
                </Grid2>
                <Grid2>
                    <Button variant="contained" style={{backgroundColor: "#151269"}} size='large' onClick={onAuthenticate}>Login</Button>
                </Grid2>
                <Grid2 size={12}>
                    <Typography variant='subtitle1' color="error">{error}</Typography>
                </Grid2>
            </Grid2>
        }            
    </>
  )
}

export default Login

