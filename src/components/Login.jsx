import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Link,
    TextField,
    Typography
} from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../actions/actions'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    userName: '',
    password: ''
  })
  const [error, setError] = useState({})

  const validate = () => {
    const errObj = {}
    if (!userDetails.userName) {
      errObj.userName = true
    }
    if (!userDetails.password) {
      errObj.password = true
    }
    setError(errObj)
    return errObj
  }
  const loginUser = () => {
    if (!Object.keys(validate()).length) {
      dispatch(login({ navigate, userDetails }))
    }
  }

  return (
    <>
    <React.Fragment>
      <Grid container spacing={2}>
        <Card sx={{ mt: 10, width: '100%' }} raised>
          <CardHeader
            sx={{
              mt: 5
            }}
            title='Login'
          ></CardHeader>
          <CardContent
            sx={{
              mb: 3
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                mt: 3,
                '& > :not(style)': {
                  m: 1
                }
              }}
            >
            <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant='button'
              display='block'
              sx={{ margin: '10px 10px 15px 50px' }}
              gutterBottom
            >
              User Name:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              required
              fullWidth
              {...(error.userName && {
                error,
                helperText: 'Please fill this field'
              })}
              value={userDetails.userName}
              onChange={e =>
                setUserDetails({ ...userDetails, userName: e.target.value })
              }
              label='Required'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant='button'
              display='block'
              sx={{ margin: '10px 10px 15px 50px' }}
              gutterBottom
            >
              Password:
            </Typography>{' '}
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              required
              type='password'
              {...(error.password && {
                error,
                helperText: 'Please fill this field'
              })}
              value={userDetails.password}
              onChange={e =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              fullWidth
              label='Required'
            />
          </Grid>
              <Grid item xs={12} sm={12} md={4}>
              
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
              
              <Button
              variant='contained'
              fullWidth
              sx={{
                mt: 5,
                background: 'color(rec2020 0.32 0.43 0.62)'
              }}
              onClick={() => loginUser()}
            >
              Login
            </Button>
            <Link
              variant='contained'
              
              sx={{
                cursor: 'pointer',
                m: 15,
              }}
              onClick={() => navigate('/signup')}
            >
              Signup
            </Link>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
    
    </>
  )
}

export default Login
