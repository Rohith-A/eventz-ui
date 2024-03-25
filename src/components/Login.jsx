import { Box, Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/actions';



const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        userName: '',
        password: ''
    })
    const [error, setError] = useState({});

    const validate = () => {
        const errObj = {}
        if (!userDetails.userName) {
            errObj.userName = true;
        }
        if (!userDetails.password) {
            errObj.password = true;
        }
        setError(errObj);
        return errObj;
    };
    const loginUser = () => {
        if (!Object.keys(validate()).length) {
            dispatch(login({ navigate, userDetails }));

        }

    }

    return (
        <>
            <Card sx={{ width: 800 }} raised>
                <CardHeader
                    title="Login"
                >
                </CardHeader>
                <CardContent>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1
                            },
                        }}
                    >        <Grid container spacing={2}>
                            <Paper elevation={3} />
                            <Grid item xs={4}>
                                <Typography variant="button" display="block" sx={{ margin: '10px 10px 15px 50px' }} gutterBottom>
                                    User Name:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    {...(error.fullName && ({
                                        error,
                                        helperText: "Please fill this field"
                                    }))}
                                    value={userDetails.userName}
                                    onChange={(e) => setUserDetails({ ...userDetails, userName: e.target.value })}
                                    label="Required"
                                />
                            </Grid>


                            <Grid item xs={4}>
                                <Typography variant="button" display="block" sx={{ margin: '10px 10px 15px 50px' }} gutterBottom >
                                    Password:
                                </Typography>        </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    type='password'
                                    {...(error.password && ({
                                        error,
                                        helperText: "Please fill this field"
                                    }))}
                                    value={userDetails.password}
                                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                                    fullWidth
                                    label="Required"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Button variant="contained" fullWidth sx={{ ml: 32, mt: 5, width: '30%', background: 'color(rec2020 0.32 0.43 0.62)', }}
                        onClick={() => loginUser()}
                    >Login</Button>

                </CardContent>
            </Card>
        </>
    )
}

export default Login;