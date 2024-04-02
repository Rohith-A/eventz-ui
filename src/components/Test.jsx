import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { Button } from "react-bootstrap";


const StateFull = () => {
    const [appState, setAppState] = useState({});

    return(
        <>
        <Grid container columns={{md: 2}} rowSpacing={3} columnSpacing={5}>
        <Grid item md={12} >
        <TextField value={appState.userName} onChange={(e) => setAppState({...appState, userName: e.target.value})}/>
        </Grid>
        <Grid item md={12} >
        <TextField type="password" value={appState.password} onChange={(e) => setAppState({...appState, password: e.target.value})}/>
        </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={() => {
            alert('Login Sucess')
        }}>
        Login
        </Button>
        </>
    )
}


export default StateFull;