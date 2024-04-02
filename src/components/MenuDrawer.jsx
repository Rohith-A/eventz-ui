import { CelebrationOutlined, ConfirmationNumberOutlined, EventAvailableOutlined, LogoutOutlined } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function MenuDrawer(props) {
  const { window } = props;
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const userDetails = useSelector((state) => state.userDetails)
  const organiser = userDetails?.organiser || localStorage?.organiser || false
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
          <ListItem key={'Events'} disablePadding>
            <ListItemButton onClick={() => {
                navigate('/events')
                handleDrawerClose()
            }}>
              <ListItemIcon>
                <CelebrationOutlined />
              </ListItemIcon>
              <ListItemText primary={'Events'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Bookings'} disablePadding onClick={() => {
            navigate('/bookings')
            handleDrawerClose()
        }}>
            <ListItemButton>
              <ListItemIcon>
                <ConfirmationNumberOutlined />
              </ListItemIcon>
              <ListItemText primary={'Bookings'} />
            </ListItemButton>
          </ListItem>
          {JSON.parse(organiser) && (<ListItem key={'Bookings'} disablePadding onClick={() => {
            navigate('/addEvent')
            handleDrawerClose()
        }}>
         <ListItemButton>
              <ListItemIcon>
                <EventAvailableOutlined />
              </ListItemIcon>
              <ListItemText primary={'Add Event'} />
            </ListItemButton>
          </ListItem>
          )}
      </List>
      <Divider />
      <List>
          <ListItem key={'Log Out'} disablePadding onClick={() => {
            localStorage.removeItem('sessionId')
            localStorage.removeItem('userName')
            navigate('/login')
          }}>
            <ListItemButton>
              <ListItemIcon>
                 <LogoutOutlined />
              </ListItemIcon>
              <ListItemText primary={'Log Out'} />
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (<>
    {(window?.location?.pathname !== '/login' && window?.location?.pathname !== '/signup') ? (
        <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
            mt: 8,
            mb:0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{position:'absolute', top: 0}}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            color="#3f7dac"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, m:0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
      </Box>
    </Box>): ''}
    </>
  );
}


export default MenuDrawer;
