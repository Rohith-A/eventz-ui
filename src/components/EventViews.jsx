import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import DisplayEvents from './DisplayEvents';
import MapContainerComponent from './mapContainer';
import { TabContext } from '@mui/lab';
import MenuDrawer from './MenuDrawer';

export default function CenteredTabs() {
  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<>
    <MenuDrawer />
    
    <Box sx={{ width: '100%', mt:0, bgcolor: 'background.paper' }}>
    <TabContext value={value}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="List View" value="0"/>
        <Tab label="Map View" value="1"/>
      </Tabs>

      <TabPanel value="0" index={0} >
      <DisplayEvents />
    </TabPanel>
    <TabPanel value="1" index={1} >
     <MapContainerComponent />
    </TabPanel>
    </TabContext>
    </Box>
    </>
  );
}