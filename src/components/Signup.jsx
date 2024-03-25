/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actionTypes from '../actionTypes/actionTypes';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../actions/actions';


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    empId: '',
    password: ''
  })
  const [error, setError] = useState({});

  const validate = () => {
    const errObj = {}
    if (!userDetails.fullName) {
      errObj.fullName = true;
    }
    if (!userDetails.email) {
      errObj.email = true;
    }
    if (!userDetails.empId) {
      errObj.empId = true;
    }
    if (!userDetails.password) {
      errObj.password = true;
    }
    setError(errObj);
    return errObj;
  };

  // useEffect(() => {
  //   dispatch({
  //     type: actionTypes.TEST_API
  //   })
  // }, [])


  const registerUser = () => {
    if (!Object.keys(validate()).length) {
    dispatch(signUp({ navigate, userDetails }));
    // dispatch(signUp(){
    //   type: 'SIGN_UP_API',
    //   payload: { navigate, userDetails }
    // })
    }

  }
  return (
    <React.Fragment>
    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 2, md: 9 }}>

      <Card sx={{ width: 800 }} raised>
        <CardHeader
        sx={{
          mt: 5
        }}
          title="Create an account"
        >
        </CardHeader>
        <CardContent sx={{
          mb: 3
        }}>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              mt: 3,
              '& > :not(style)': {
                m: 1
              },
            }}
          >        <Grid container spacing={2}>
              <Paper elevation={3} />
              <Grid item xs={4}>
                <Typography variant="button" display="block" sx={{ margin: '10px 10px 15px 50px' }} gutterBottom>
                  Full name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  {...(error.fullName && ( {
                    error,
                    helperText: "Please fill this field"
                  }))}
                  value={userDetails.fullName}
                  onChange={(e) => setUserDetails({ ...userDetails, fullName: e.target.value })}
                  label="Required"
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="button" display="block" sx={{ margin: '10px 10px 15px 50px' }} gutterBottom>
                  Employee Id:
                </Typography>        </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  {...(error.empId && ( {
                    error,
                    helperText: "Please fill this field"
                  }))}
                  value={userDetails.empId}
                  onChange={(e) => setUserDetails({ ...userDetails, empId: e.target.value })}
                  label="Required"
                />
              </Grid>

              <Grid item xs={4}>
                <Typography variant="button" display="block" sx={{ margin: '10px 10px 15px 50px' }} gutterBottom >
                  Email:
                </Typography>        </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  {...(error.email && ( {
                    error,
                    helperText: "Please fill this field"
                  }))}
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  fullWidth
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
                  {...(error.password && ( {
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
          <Button variant="contained" fullWidth sx={{ ml: 32, mt: 5, width: '30%', background: 'color(rec2020 0.32 0.43 0.62)' }} onClick={() => registerUser()}>Sign up</Button>

        </CardContent>
      </Card>
      </Grid>
    </React.Fragment>
  )
}

// To make those two function works register it using connect
export default SignUp;