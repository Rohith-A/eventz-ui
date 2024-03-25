// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import * as actionTypes from '../actionTypes/actionTypes'
// import { Box, Typography } from '@mui/material';
// import { getUsers } from '../actions/actions';

// const Header = () => {
//     const dispatch = useDispatch();
//     const state = useSelector((state) => state)
//     useEffect(() => {
//         dispatch(getUsers())
//     }, [])

//     return(<Box sx={{width: '100%',
//     background: 'color(rec2020 0.32 0.43 0.62)',
//     height: '60px'

// }}>
// <Typography variant='h5' sx={{
//     color: 'white',
//     position: 'absolute',
//     left: '30px',
//     top: '10px'
// }}>
// ToDo !
// </Typography>
//         </Box>)
// }

// // To make those two function works register it using connect
// export default Header;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import Logout from '@mui/icons-material/Logout';
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actionTypes from '../actionTypes/actionTypes';

// const logo = require('../logo/main-logo.png')
const Header = (props) => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    // const state = useSelector((state) => state)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    useEffect(() => {
        // dispatch({
        //     type: actionTypes.USER_DETAILS,
        //     payload: props.user
        // })
    }, [props.user])
    return (  <React.Fragment>
        <Box sx={{
        width: '100%',
        background: 'color(rec2020 0.32 0.43 0.62)',
        height: '65px',
        // position: 'fixed',
        position: 'sticky',
        top: 0,
        zIndex: 9999
    }}>
    <Typography variant='h5' sx={{
            color: 'white',
            position: 'absolute',
            left: '30px',
            top: '10px'
        }}>
        <b>Eventz.ie</b> !
        </Typography>

      
      <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            sx={{
                margin: '15px',
                float: 'right',
                background: 'none',
                boxShadow: 'none'
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
          <Typography sx={{color: 'white', mr: 2}}>{props?.user?.user?.username}</Typography>
            <Avatar sx={{ width: 32, height: 32 }}>{`${props?.user?.user?.username[0]}`.toUpperCase()}</Avatar>
            <Avatar sx={{ width: 32, height: 32 }}>{'R'}</Avatar>
          </IconButton>
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            zIndex: 9999,
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {
            handleClose()
            props.user.signOut()
        }} sx={{
            zIndex: 9999
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
    </React.Fragment>
    )
}

// To make those two function works register it using connect
export default Header;